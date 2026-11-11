"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop only: an orange dot that trails the pointer, grows over links,
 * shows a label over anything with data-cursor, and makes buttons magnetic.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    const text = label.current;
    if (!el || !text) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    let magnet: HTMLElement | null = null;
    let mode = "";

    const release = () => {
      if (!magnet) return;
      gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      magnet = null;
    };

    const setMode = (next: string, word = "") => {
      if (next === mode && text.textContent === word) return;
      mode = next;
      text.textContent = word;
      if (next === "label") {
        gsap.to(el, { width: 84, height: 84, opacity: 1, duration: 0.35, ease: "power3.out" });
      } else if (next === "link") {
        gsap.to(el, { width: 44, height: 44, opacity: 0.28, duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(el, { width: 12, height: 12, opacity: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    const onMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
      gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });

      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) setMode("label", labelled.dataset.cursor ?? "");
      else if (target?.closest("a, button, summary, select, input, textarea")) setMode("link");
      else setMode("");

      const btn = target?.closest<HTMLElement>(".btn") ?? null;
      if (btn !== magnet) release();
      if (btn) {
        magnet = btn;
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.28,
          y: (e.clientY - (r.top + r.height / 2)) * 0.28,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };

    const onLeave = () => {
      release();
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      release();
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none invisible fixed left-0 top-0 z-[90] grid h-3 w-3 place-items-center rounded-full bg-heat"
    >
      <span ref={label} className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink" />
    </div>
  );
}
