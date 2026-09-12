(function () {
  "use strict";

  var ACCENT = "#ccf24d";
  var EASE = "cubic-bezier(.16,1,.3,1)";
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var raf = { loop: null };
  var timers = { pump: null, chat: [] };
  var chatRun = null;

  function q(sel) { return Array.from(document.querySelectorAll(sel)); }

  function scrollY() {
    var de = document.scrollingElement || document.documentElement;
    return (de && de.scrollTop) || window.scrollY || document.body.scrollTop || 0;
  }

  function applyAccent() {
    q("[data-accent-fg]").forEach(function (el) { el.style.color = ACCENT; });
    q("[data-accent-bg]").forEach(function (el) { el.style.background = ACCENT; });
    q("[data-accent-border]").forEach(function (el) { el.style.borderColor = ACCENT; });
    q("[data-accent-stroke]").forEach(function (el) { el.setAttribute("stroke", ACCENT); });
    q("[data-accent-svg-fg]").forEach(function (el) { el.setAttribute("fill", ACCENT); });
    q('[data-side="out"]').forEach(function (el) { el.style.borderColor = ACCENT; });
  }

  function splitHeadings() {
    q("[data-split]").forEach(function (el) {
      if (el.getAttribute("data-split-done")) return;
      var words = (el.textContent || "").split(/\s+/).filter(Boolean);
      el.textContent = "";
      words.forEach(function (word, wi) {
        var wrap = document.createElement("span");
        wrap.style.display = "inline-block";
        wrap.style.overflow = "hidden";
        wrap.style.verticalAlign = "top";
        wrap.style.paddingBottom = "0.07em";
        Array.from(word).forEach(function (ch) {
          var s = document.createElement("span");
          s.textContent = ch;
          s.style.display = "inline-block";
          s.setAttribute("data-char", "1");
          if (!REDUCE) {
            s.style.transform = "translateY(105%)";
            s.style.transition = "transform 1000ms " + EASE;
          }
          wrap.appendChild(s);
        });
        el.appendChild(wrap);
        if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
      });
      el.setAttribute("data-split-done", "1");
    });
  }

  function setupReveals() {
    if (REDUCE) return;
    q("[data-reveal]").forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(52px)";
      el.style.transition = "opacity 980ms " + EASE + ", transform 980ms " + EASE;
    });
  }

  function fireReveal(el, snap) {
    if (el.getAttribute("data-rv-done") === "1") return;
    el.setAttribute("data-rv-done", "1");
    if (el.hasAttribute("data-reveal")) {
      var sibs = Array.from(el.parentElement ? el.parentElement.children : []).filter(function (n) { return n.hasAttribute && n.hasAttribute("data-reveal"); });
      var n = Math.max(sibs.indexOf(el), 0);
      if (snap) el.style.transition = "none";
      el.style.transitionDelay = snap ? "0ms" : Math.min(n * 95, 460) + "ms";
      el.style.opacity = "1";
      el.style.transform = "none";
    }
    if (el.hasAttribute("data-split")) {
      Array.from(el.querySelectorAll("[data-char]")).forEach(function (s, i) {
        if (snap) s.style.transition = "none";
        s.style.transitionDelay = snap ? "0ms" : Math.min(i * 17, 680) + "ms";
        s.style.transform = "translateY(0)";
      });
    }
  }

  function paintDiagram(vh) {
    if (REDUCE) return;
    var section = document.querySelector("[data-diagram-section]");
    if (!section) return;
    var dnodes = q("[data-dnode]");
    var dlines = q("[data-dline]");
    if (!dnodes.length) return;

    dlines.forEach(function (p) {
      if (p.getAttribute("data-len")) return;
      var len = p.getTotalLength ? p.getTotalLength() : 160;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.setAttribute("data-len", len);
    });
    dnodes.forEach(function (g) {
      if (g.getAttribute("data-dn-init")) return;
      g.setAttribute("data-dn-init", "1");
      g.style.opacity = "0";
      g.style.transform = "translateY(16px)";
      g.style.transition = "opacity 720ms cubic-bezier(.16,1,.3,1), transform 720ms cubic-bezier(.16,1,.3,1)";
    });

    var r = section.getBoundingClientRect();
    var span = section.offsetHeight - vh;
    var p = Math.min(Math.max(-r.top / (span || 1), 0), 1);
    var total = dnodes.length;
    dnodes.forEach(function (g, i) {
      var on = p > i / (total + 0.6);
      g.style.opacity = on ? "1" : "0";
      g.style.transform = on ? "translateY(0)" : "translateY(16px)";
    });
    dlines.forEach(function (pl, i) {
      var len = parseFloat(pl.getAttribute("data-len")) || 160;
      var seg = Math.min(Math.max((p - (i + 0.4) / (total + 0.6)) * (total + 0.6), 0), 1);
      pl.style.strokeDashoffset = len * (1 - seg);
      pl.setAttribute("stroke", seg > 0.98 ? ACCENT : "rgba(236,230,218,0.3)");
    });
  }

  function applyFaq(item, open) {
    var ans = item.querySelector("[data-faq-a]");
    var icon = item.querySelector("[data-faq-icon]");
    item.setAttribute("data-open", open ? "1" : "0");
    if (ans) {
      ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0px";
      ans.style.opacity = open ? "1" : "0";
    }
    if (icon) {
      icon.style.transform = open ? "rotate(45deg)" : "rotate(0deg)";
      icon.style.color = open ? ACCENT : "rgba(236,230,218,0.5)";
    }
  }

  function setupFaq() {
    var items = q("[data-faq-item]");
    items.forEach(function (item) {
      var btn = item.querySelector("[data-faq-q]");
      var ans = item.querySelector("[data-faq-a]");
      var icon = item.querySelector("[data-faq-icon]");
      if (!btn || !ans) return;
      ans.style.transition = "max-height 620ms cubic-bezier(.16,1,.3,1), opacity 520ms ease";
      if (icon) icon.style.transition = "transform 420ms cubic-bezier(.16,1,.3,1), color 420ms ease";
      if (item.getAttribute("data-open") !== "1") applyFaq(item, false);
      if (btn.getAttribute("data-faq-bound") === "1") return;
      btn.setAttribute("data-faq-bound", "1");
      btn.addEventListener("click", function () {
        var next = item.getAttribute("data-open") !== "1";
        items.forEach(function (other) { if (other !== item) applyFaq(other, false); });
        applyFaq(item, next);
      });
    });
  }

  function setupChat() {
    var wrap = document.querySelector("[data-chat]");
    if (!wrap) return;
    var bubbles = Array.from(wrap.querySelectorAll("[data-bubble]"));
    var status = document.querySelector("[data-chat-status]");
    if (REDUCE) return;

    var typing = document.createElement("div");
    typing.style.cssText = "align-self:flex-start; display:none; gap:4px; padding:12px 14px; background:#182238; border:1px solid rgba(236,230,218,0.08); border-radius:14px 14px 14px 4px;";
    ["0ms", "140ms", "280ms"].forEach(function (d) {
      var dot = document.createElement("span");
      dot.style.cssText = "width:5px; height:5px; border-radius:50%; background:rgba(236,230,218,0.6); animation:md-dot 1.1s ease-in-out infinite; animation-delay:" + d + ";";
      typing.appendChild(dot);
    });

    var run = function () {
      timers.chat.forEach(clearTimeout);
      timers.chat = [];
      bubbles.forEach(function (b) {
        b.style.transition = "none";
        b.style.opacity = "0";
        b.style.transform = "translateY(14px) scale(0.97)";
      });
      typing.style.display = "none";
      if (status) status.textContent = "Replies instantly";

      var t = 500;
      bubbles.forEach(function (b) {
        var outbound = b.getAttribute("data-side") === "out";
        if (outbound) {
          timers.chat.push(setTimeout(function () {
            wrap.insertBefore(typing, b);
            typing.style.display = "flex";
            if (status) status.textContent = "Typing";
          }, t));
          t += 900;
        }
        timers.chat.push(setTimeout(function () {
          typing.style.display = "none";
          if (status) status.textContent = outbound ? "Online" : "Typically replies instantly";
          b.style.transition = "opacity 520ms " + EASE + ", transform 520ms " + EASE;
          b.style.opacity = "1";
          b.style.transform = "none";
        }, t));
        t += outbound ? 900 : 1150;
      });

      timers.chat.push(setTimeout(run, t + 3200));
    };

    chatRun = run;
  }

  function setupPointer() {
    if (!window.matchMedia("(pointer: fine)").matches || REDUCE) return;
    var magnets = q("[data-magnetic]");
    window.addEventListener("pointermove", function (e) {
      magnets.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var d = Math.hypot(dx, dy);
        if (d < 120) {
          el.style.transition = "transform 320ms cubic-bezier(.16,1,.3,1)";
          el.style.transform = "translate(" + dx * 0.2 + "px," + dy * 0.2 + "px)";
        } else if (el.style.transform) {
          el.style.transform = "translate(0,0)";
        }
      });
    }, { passive: true });
  }

  function setupScroll() {
    var nav = document.querySelector("[data-nav]");
    var chat = document.querySelector("[data-chat]");
    var chatStarted = false;

    var paint = function (y, settled) {
      var vh = window.innerHeight;
      var vw = window.innerWidth;

      if (nav) {
        var past = y > 50;
        nav.style.transition = "background 420ms ease, border-color 420ms ease";
        nav.style.background = past ? "rgba(11,17,32,0.82)" : "transparent";
        nav.style.backdropFilter = past ? "blur(16px)" : "none";
        nav.style.borderBottomColor = past ? "rgba(236,230,218,0.1)" : "transparent";
      }

      if (!REDUCE && settled) {
        q("[data-reveal], [data-split]").forEach(function (el) {
          if (el.getAttribute("data-rv-done") === "1") return;
          if (el.hasAttribute("data-reveal") && el.style.transition === "") {
            el.style.opacity = "0";
            el.style.transform = "translateY(52px)";
            el.style.transition = "opacity 980ms " + EASE + ", transform 980ms " + EASE;
          }
          if (el.hasAttribute("data-split") && !el.getAttribute("data-split-done")) { splitHeadings(); }
          var r = el.getBoundingClientRect();
          if (r.bottom <= 0 || r.right <= 0) { fireReveal(el, true); return; }
          if (r.top < vh * 0.9 && r.left < vw * 0.98) fireReveal(el, false);
        });

        if (!chatStarted && chat && chatRun) {
          var r2 = chat.getBoundingClientRect();
          if (r2.top < vh && r2.bottom > 0) { chatStarted = true; chatRun(); }
        }
      }

      paintDiagram(vh);
    };

    var last = -1;
    var frames = 0;
    var pump = function () {
      frames++;
      var y = scrollY();
      if (y !== last || frames < 40 || frames % 20 === 0) {
        last = y;
        paint(y, frames > 3);
      }
    };
    var loop = function () {
      raf.loop = requestAnimationFrame(loop);
      pump();
    };
    loop();
    timers.pump = setInterval(pump, 100);
    window.addEventListener("scroll", pump, { passive: true, capture: true });
    document.addEventListener("scroll", pump, { passive: true, capture: true });
    window.addEventListener("resize", pump);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyAccent();
    splitHeadings();
    setupReveals();
    setupFaq();
    setupChat();
    setupPointer();
    setupScroll();
  });
})();
