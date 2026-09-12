(function () {
  "use strict";

  var ACCENT = "#ccf24d";
  var EASE = "cubic-bezier(.16,1,.3,1)";
  var HEAVY = "cubic-bezier(.76,0,.24,1)";
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DUR = 1050; // motion: cinematic
  var DIST = 64;

  var pointer = { x: -999, y: -999, hx: 0.5, hy: 0.5 };
  var raf = { loop: null, field: null };
  var timers = { pump: null, quote: null };

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
    var cur = document.querySelector("[data-cursor]");
    if (cur) cur.style.borderColor = ACCENT;
  }

  function splitHeadings() {
    q("[data-split]").forEach(function (el) {
      if (el.getAttribute("data-split-done")) return;
      var words = (el.textContent || "").split(/\s+/).filter(Boolean);
      el.textContent = "";
      el.style.display = el.tagName === "SPAN" ? "block" : el.style.display;
      words.forEach(function (word, wi) {
        var wrap = document.createElement("span");
        wrap.style.display = "inline-block";
        wrap.style.overflow = "hidden";
        wrap.style.verticalAlign = "top";
        wrap.style.paddingBottom = "0.06em";
        Array.from(word).forEach(function (ch) {
          var s = document.createElement("span");
          s.textContent = ch;
          s.style.display = "inline-block";
          s.setAttribute("data-char", "1");
          if (!REDUCE) {
            s.style.transform = "translateY(105%)";
            s.style.transition = "transform " + DUR + "ms " + EASE;
          }
          wrap.appendChild(s);
        });
        el.appendChild(wrap);
        if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
      });
      el.setAttribute("data-split-done", "1");
    });
  }

  function runSplash() {
    var splash = document.querySelector("[data-splash]");
    if (!splash) return;
    if (sessionStorage.getItem("md_splash_v3_seen") === "1") { splash.style.display = "none"; playHero(); return; }
    sessionStorage.setItem("md_splash_v3_seen", "1");
    var chars = Array.from(splash.querySelectorAll("[data-splash-char]"));
    var fades = Array.from(splash.querySelectorAll("[data-splash-fade]"));
    var fill = splash.querySelector("[data-splash-fill]");
    var pct = splash.querySelector("[data-splash-pct]");
    var word = splash.querySelector("[data-splash-word]");
    var overlay = splash.querySelector("[data-splash-overlay]");
    var top = splash.querySelector("[data-panel-top]");
    var bot = splash.querySelector("[data-panel-bot]");
    var run = REDUCE ? 500 : 1900;
    var hold = REDUCE ? 600 : 2500;

    if (!REDUCE) {
      chars.forEach(function (c) { c.style.transform = "translateY(110%)"; });
      fades.forEach(function (f) { f.style.opacity = "0"; });
      requestAnimationFrame(function () {
        chars.forEach(function (c, i) {
          c.style.transition = "transform 900ms " + EASE;
          c.style.transitionDelay = 80 + i * 55 + "ms";
          c.style.transform = "translateY(0)";
        });
        fades.forEach(function (f, i) {
          f.style.transition = "opacity 800ms ease";
          f.style.transitionDelay = 300 + i * 120 + "ms";
          f.style.opacity = "1";
        });
        if (fill) { fill.style.transition = "transform " + run + "ms " + EASE; fill.style.transform = "scaleX(1)"; }
        if (pct) {
          var t0 = performance.now();
          var tick = function (now) {
            var p = Math.min((now - t0) / run, 1);
            pct.textContent = ("00" + Math.round(100 * (1 - Math.pow(1 - p, 2.2)))).slice(-3);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    } else {
      if (fill) fill.style.transform = "scaleX(1)";
      if (pct) pct.textContent = "100";
    }

    setTimeout(function () {
      if (word) { word.style.transition = "transform 700ms " + HEAVY; word.style.transform = "translateY(-40px)"; }
      if (overlay) { overlay.style.transition = "opacity 620ms ease"; overlay.style.opacity = "0"; }
    }, hold - 350);

    setTimeout(function () {
      if (top) { top.style.transition = "transform 1150ms " + HEAVY; top.style.transform = "translateY(-100%)"; }
      if (bot) { bot.style.transition = "transform 1150ms " + HEAVY; bot.style.transform = "translateY(100%)"; }
      playHero();
      setTimeout(function () { splash.style.display = "none"; }, 1250);
    }, hold);
  }

  function playHero() {
    var hero = document.querySelector("#top");
    if (!hero) return;
    revealNode(hero);
  }

  function revealNode(scope) {
    Array.from(scope.querySelectorAll("[data-split]")).forEach(function (el) {
      el.setAttribute("data-rv-done", "1");
      Array.from(el.querySelectorAll("[data-char]")).forEach(function (s, i) {
        s.style.transitionDelay = Math.min(i * 16, 620) + "ms";
        s.style.transform = "translateY(0)";
      });
    });
    Array.from(scope.querySelectorAll("[data-reveal]")).forEach(function (el, i) {
      el.setAttribute("data-rv-done", "1");
      el.style.transitionDelay = Math.min(i * 90, 520) + "ms";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    Array.from(scope.querySelectorAll("[data-mask]")).forEach(function (el) {
      el.setAttribute("data-mask-open", "1");
      el.style.clipPath = "inset(0% 0% 0% 0%)";
    });
  }

  function fireReveal(el, snap) {
    if (el.getAttribute("data-rv-done") === "1") return;
    el.setAttribute("data-rv-done", "1");
    if (el.hasAttribute("data-reveal")) {
      var sibs = Array.from(el.parentElement ? el.parentElement.children : []).filter(function (n) { return n.hasAttribute && n.hasAttribute("data-reveal"); });
      var n = Math.max(sibs.indexOf(el), 0);
      el.style.transitionDelay = snap ? "0ms" : Math.min(n * 100, 480) + "ms";
      if (snap) el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    }
    if (el.hasAttribute("data-split")) {
      Array.from(el.querySelectorAll("[data-char]")).forEach(function (s, i) {
        s.style.transitionDelay = snap ? "0ms" : Math.min(i * 18, 700) + "ms";
        if (snap) s.style.transition = "none";
        s.style.transform = "translateY(0)";
      });
    }
  }

  function fireScramble(el, snap) {
    if (el.getAttribute("data-sc-done") === "1") return;
    el.setAttribute("data-sc-done", "1");
    var final = el.getAttribute("data-scramble");
    if (snap) { el.textContent = final; return; }
    var len = final.length;
    var t0 = performance.now();
    var tick = function (now) {
      var p = Math.min((now - t0) / 1400, 1);
      if (p < 1) {
        var settled = Math.floor(p * p * len);
        var out = final.slice(0, settled);
        for (var i = settled; i < len; i++) out += String(Math.floor(Math.random() * 10));
        el.textContent = out;
        requestAnimationFrame(tick);
      } else {
        el.textContent = final;
      }
    };
    requestAnimationFrame(tick);
  }

  function setupReveals() {
    if (REDUCE || !("IntersectionObserver" in window)) return;
    q("[data-reveal]").forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(" + DIST + "px)";
      el.style.transition = "opacity " + DUR + "ms " + EASE + ", transform " + DUR + "ms " + EASE;
    });
    q("[data-mask]").forEach(function (el) {
      el.style.clipPath = "inset(0% 0% 100% 0%)";
      el.style.transition = "clip-path " + (DUR + 200) + "ms " + EASE;
    });
  }

  function setupScramble() {
    if (REDUCE) return;
    q("[data-scramble]").forEach(function (el) { el.textContent = "0"; });
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
      var len = p.getTotalLength ? p.getTotalLength() : 200;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.setAttribute("data-len", len);
    });
    dnodes.forEach(function (g) {
      if (g.getAttribute("data-dn-init")) return;
      g.setAttribute("data-dn-init", "1");
      g.style.opacity = "0";
      g.style.transform = "translateY(18px)";
      g.style.transition = "opacity 700ms cubic-bezier(.16,1,.3,1), transform 700ms cubic-bezier(.16,1,.3,1)";
    });

    var r = section.getBoundingClientRect();
    var span = section.offsetHeight - vh;
    var p = Math.min(Math.max(-r.top / (span || 1), 0), 1);
    var total = dnodes.length;
    dnodes.forEach(function (g, i) {
      var on = p > i / (total + 0.6);
      g.style.opacity = on ? "1" : "0";
      g.style.transform = on ? "translateY(0)" : "translateY(18px)";
    });
    dlines.forEach(function (pl, i) {
      var len = parseFloat(pl.getAttribute("data-len")) || 200;
      var seg = Math.min(Math.max((p - (i + 0.4) / (total + 0.6)) * (total + 0.6), 0), 1);
      pl.style.strokeDashoffset = len * (1 - seg);
      pl.setAttribute("stroke", seg > 0.98 ? ACCENT : "rgba(236,230,218,0.35)");
    });
  }

  function setupQuotes() {
    var wrap = document.querySelector("[data-quotes]");
    if (!wrap) return;
    var quotes = Array.from(wrap.querySelectorAll("[data-quote]"));
    var dots = q("[data-quote-dot]");
    var i = 0;
    var show = function (n) {
      i = (n + quotes.length) % quotes.length;
      quotes.forEach(function (fig, k) {
        var on = k === i;
        fig.style.transition = "opacity 900ms cubic-bezier(.16,1,.3,1), transform 900ms cubic-bezier(.16,1,.3,1)";
        fig.style.opacity = on ? "1" : "0";
        fig.style.transform = on ? "translateY(0)" : "translateY(26px)";
        fig.style.pointerEvents = on ? "auto" : "none";
      });
      dots.forEach(function (d, k) { d.style.background = k === i ? ACCENT : "rgba(236,230,218,0.25)"; });
    };
    dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); }); });
    show(0);
    timers.quote = setInterval(function () { show(i + 1); }, 6200);
  }

  function setupPointer() {
    var cur = document.querySelector("[data-cursor]");
    var label = document.querySelector("[data-cursor-label]");
    var fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) { if (cur) cur.style.display = "none"; }
    var magnets = q("[data-magnetic]");
    var cx = -999, cy = -999;

    var onPointer = function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      var hero = document.querySelector("#top");
      if (hero) {
        var r = hero.getBoundingClientRect();
        pointer.hx = (e.clientX - r.left) / r.width;
        pointer.hy = (e.clientY - r.top) / r.height;
      }
      if (cur && fine) {
        cur.style.opacity = "1";
        var target = e.target.closest ? e.target.closest("[data-cursor-label], [data-magnetic]") : null;
        var text = target && target.getAttribute("data-cursor-label");
        var isLink = target && target.hasAttribute("data-magnetic");
        cur.style.width = text ? "84px" : isLink ? "56px" : "34px";
        cur.style.height = text ? "84px" : isLink ? "56px" : "34px";
        cur.style.margin = text ? "-42px 0 0 -42px" : isLink ? "-28px 0 0 -28px" : "-17px 0 0 -17px";
        cur.style.background = text ? ACCENT : "transparent";
        if (label) { label.textContent = text || ""; label.style.opacity = text ? "1" : "0"; }
      }
      if (!REDUCE) {
        magnets.forEach(function (el) {
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          var d = Math.hypot(dx, dy);
          if (d < 130) {
            el.style.transition = "transform 320ms cubic-bezier(.16,1,.3,1)";
            el.style.transform = "translate(" + dx * 0.22 + "px," + dy * 0.22 + "px)";
          } else if (el.style.transform) {
            el.style.transform = "translate(0,0)";
          }
        });
      }
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    if (cur && fine) {
      var follow = function () {
        cx += (pointer.x - cx) * 0.18;
        cy += (pointer.y - cy) * 0.18;
        cur.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
        requestAnimationFrame(follow);
      };
      requestAnimationFrame(follow);
    }
  }

  function setupHeroField() {
    var canvas = document.querySelector("[data-hero-canvas]");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var pts = [];
    var N = 64;
    var w = 0, h = 0, dpr = 1;

    var resize = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.max(w * dpr, 1);
      canvas.height = Math.max(h * dpr, 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (var i = 0; i < N; i++) {
      pts.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00035, vy: (Math.random() - 0.5) * 0.00035, r: 0.8 + Math.random() * 1.6 });
    }

    var hexToRgb = function (hex) {
      var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [204, 242, 77];
    };
    var rgb = hexToRgb(ACCENT);

    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.02 }).observe(canvas);
    }

    var draw = function () {
      raf.field = requestAnimationFrame(draw);
      if (!visible || w === 0) return;
      ctx.clearRect(0, 0, w, h);
      var px = pointer.hx, py = pointer.hy;
      var still = REDUCE;

      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!still) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
          var dx = px - p.x, dy = py - p.y;
          var d = Math.hypot(dx, dy);
          if (d < 0.22 && d > 0.001) { p.x -= dx * 0.006; p.y -= dy * 0.006; }
        }
      }
      for (var i2 = 0; i2 < pts.length; i2++) {
        for (var j = i2 + 1; j < pts.length; j++) {
          var a = pts[i2], b = pts[j];
          var ddx = (a.x - b.x) * w, ddy = (a.y - b.y) * h;
          var dd = Math.hypot(ddx, ddy);
          if (dd < 170) {
            var t = 1 - dd / 170;
            ctx.strokeStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (t * 0.16).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      for (var i3 = 0; i3 < pts.length; i3++) {
        var p3 = pts[i3];
        var dm = Math.hypot(px - p3.x, py - p3.y);
        var glow = dm < 0.2 ? 1 : 0.42;
        ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + (0.28 * glow + 0.12).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(p3.x * w, p3.y * h, p3.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    window.addEventListener("resize", resize);
  }

  function setupScroll() {
    var pin = document.querySelector("[data-pin]");
    var track = document.querySelector("[data-pin-track]");
    var bar = document.querySelector("[data-pin-progress]");
    var idx = document.querySelector("[data-pin-index]");
    var nav = document.querySelector("[data-nav]");
    var stepIdx = document.querySelector("[data-step-index]");
    var arrow = document.querySelector("[data-scroll-arrow]");

    var paint = function () {
      var cases = q("[data-case]");
      var steps = q("[data-step]");
      var parallax = q("[data-parallax]");
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var y = scrollY();

      if (!REDUCE) {
        cases.forEach(function (el) {
          var m = el.querySelector("[data-case-metric]");
          if (!m || m.style.transition !== "") return;
          m.style.opacity = "0";
          m.style.transform = "translateY(22px)";
          m.style.transition = "opacity 820ms cubic-bezier(.16,1,.3,1), transform 820ms cubic-bezier(.16,1,.3,1)";
        });
        steps.forEach(function (el, i) {
          if (el.style.transition !== "") return;
          el.style.opacity = i === 0 ? "1" : "0.38";
          el.style.transition = "opacity 600ms ease";
        });
      }

      if (nav) {
        var past = y > 60;
        nav.style.transition = "background 420ms ease, border-color 420ms ease";
        nav.style.background = past ? "rgba(11,17,32,0.8)" : "transparent";
        nav.style.backdropFilter = past ? "blur(16px)" : "none";
        nav.style.borderBottomColor = past ? "rgba(236,230,218,0.1)" : "transparent";
      }
      if (arrow) arrow.style.opacity = y > 200 ? "0" : "1";

      q("[data-reveal], [data-split]").forEach(function (el) {
        if (el.getAttribute("data-rv-done") === "1") return;
        if (el.hasAttribute("data-reveal") && el.style.transition === "" && !REDUCE) {
          el.style.opacity = "0";
          el.style.transform = "translateY(" + DIST + "px)";
          el.style.transition = "opacity " + DUR + "ms " + EASE + ", transform " + DUR + "ms " + EASE;
        }
        if (el.hasAttribute("data-split") && !el.getAttribute("data-split-done")) { splitHeadings(); }
        var r = el.getBoundingClientRect();
        if (r.bottom <= 0 || r.right <= 0) { fireReveal(el, true); return; }
        if (r.top < vh * 0.9 && r.left < vw * 0.98) fireReveal(el, REDUCE);
      });
      q("[data-scramble]").forEach(function (el) {
        if (el.getAttribute("data-sc-done") === "1") return;
        var r = el.getBoundingClientRect();
        if (r.bottom <= 0) { fireScramble(el, true); return; }
        if (r.top < vh * 0.85) fireScramble(el, REDUCE);
      });
      q("[data-mask]").forEach(function (el) {
        if (el.getAttribute("data-mask-open") === "1") return;
        var r = el.getBoundingClientRect();
        var snap = REDUCE || r.bottom <= 0 || r.right <= 0;
        if (snap || (r.top < vh * 0.88 && r.left < vw * 0.95)) {
          if (snap) el.style.transition = "none";
          el.style.clipPath = "inset(0% 0% 0% 0%)";
          el.setAttribute("data-mask-open", "1");
        }
      });

      parallax.forEach(function (el) {
        var k = parseFloat(el.getAttribute("data-parallax")) || 0.1;
        var r = el.getBoundingClientRect();
        var mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = "translate3d(0," + (-mid * k) + "px,0)";
      });

      if (pin && track) {
        var r2 = pin.getBoundingClientRect();
        var span = pin.offsetHeight - vh;
        var p = Math.min(Math.max(-r2.top / (span || 1), 0), 1);
        var shift = Math.max(track.scrollWidth - vw, 0);
        track.style.transform = "translate3d(" + (-p * shift) + "px,0,0)";
        if (bar) bar.style.transform = "scaleX(" + p + ")";
        if (idx) idx.textContent = ("0" + Math.min(cases.length, Math.floor(p * cases.length) + 1)).slice(-2);
        if (!REDUCE) {
          cases.forEach(function (el) {
            var m = el.querySelector("[data-case-metric]");
            if (!m) return;
            var cr = el.getBoundingClientRect();
            var on = cr.left < vw * 0.55 && cr.right > vw * 0.3;
            m.style.opacity = on ? "1" : "0";
            m.style.transform = on ? "translateY(0)" : "translateY(22px)";
          });
        }
      }

      paintDiagram(vh);

      if (steps.length) {
        var active = 0;
        steps.forEach(function (el, i) {
          if (el.getBoundingClientRect().top < vh * 0.55) active = i;
        });
        if (!REDUCE) steps.forEach(function (el, i) { el.style.opacity = i === active ? "1" : "0.38"; });
        if (stepIdx) stepIdx.textContent = ("0" + (active + 1)).slice(-2);
      }
    };

    var last = -1;
    var frames = 0;
    var pump = function () {
      frames++;
      var y = scrollY();
      if (y !== last || frames < 40 || frames % 20 === 0) { last = y; paint(); }
    };
    var loop = function () { raf.loop = requestAnimationFrame(loop); pump(); };
    loop();
    timers.pump = setInterval(pump, 100);
    window.addEventListener("scroll", pump, { passive: true, capture: true });
    document.addEventListener("scroll", pump, { passive: true, capture: true });
    window.addEventListener("resize", pump);
    paint();
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyAccent();
    splitHeadings();
    setupReveals();
    setupScramble();
    runSplash();
    setupQuotes();
    setupPointer();
    setupHeroField();
    setupScroll();
  });
})();
