"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SPLASH_DONE_EVENT, splashPending } from "@/lib/splash";

/**
 * Sunrise splash: a counter runs to 100 while the sun from the logo rises and
 * its stripes draw in, then the screen splits along the logo's diagonal slash.
 */
export function Splash() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !splashPending()) return;

      const html = document.documentElement;
      const counter = el.querySelector<HTMLElement>("[data-count]");
      const state = { v: 0 };

      const finish = () => {
        html.dataset.splash = "done";
        try {
          sessionStorage.setItem("md-splash", "1");
        } catch {}
      };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-splash-fade]", { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 })
        .to(
          state,
          {
            v: 100,
            duration: 1.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(state.v)).padStart(3, "0");
            },
          },
          0,
        )
        .fromTo("[data-dome]", { y: 44 }, { y: 0, duration: 1.5, ease: "power3.out" }, 0.15)
        .fromTo(
          "[data-stripe]",
          { scaleX: 0, transformOrigin: "50% 50%" },
          { scaleX: 1, duration: 0.7, stagger: 0.11, ease: "power3.inOut" },
          0.55,
        )
        .fromTo(
          "[data-slash-wrap]",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut" },
          1.75,
        )
        .to("[data-content]", { opacity: 0, scale: 1.06, duration: 0.4, ease: "power2.in" }, 1.95)
        // The site starts its own intro as the panels begin to open.
        .add(() => window.dispatchEvent(new Event(SPLASH_DONE_EVENT)), 2.2)
        .to("[data-panel='left']", { xPercent: -64, duration: 1.05, ease: "power4.inOut" }, 2.2)
        .to("[data-panel='right']", { xPercent: 64, duration: 1.05, ease: "power4.inOut" }, 2.2)
        .to("[data-slash-wrap]", { opacity: 0, duration: 0.35 }, 2.3)
        .add(finish);

      // Safety net: if the animation never completes, uncover the site anyway.
      const failsafe = window.setTimeout(() => {
        if (html.dataset.splash !== "play") return;
        finish();
        window.dispatchEvent(new Event(SPLASH_DONE_EVENT));
      }, 7000);

      return () => window.clearTimeout(failsafe);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="splash fixed inset-0 z-[100]" aria-hidden>
      <div
        data-panel="left"
        className="absolute inset-0 bg-ink"
        style={{ clipPath: "polygon(0 0, 58.15% 0, 42.15% 100%, 0 100%)" }}
      />
      <div
        data-panel="right"
        className="absolute inset-0 bg-ink"
        style={{ clipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)" }}
      />

      <svg
        data-slash-wrap
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          data-slash
          x1="58"
          y1="0"
          x2="42"
          y2="100"
          stroke="#ff5a1f"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div data-content className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 flex justify-between p-[clamp(20px,4vw,48px)]">
          <span data-splash-fade className="label">
            miragedevo
          </span>
          <span data-splash-fade className="label">
            Est. 2024 · IST
          </span>
        </div>

        <svg
          viewBox="0 0 100 100"
          className="absolute left-1/2 top-1/2 w-[min(46vw,230px)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        >
          <defs>
            <mask id="splash-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect width="100" height="100" fill="#fff" />
              <polygon points="58,2 68,2 42,98 32,98" fill="#000" />
            </mask>
            <clipPath id="splash-horizon">
              <rect x="0" y="0" width="100" height="50" />
            </clipPath>
          </defs>
          <g fill="#ff5a1f" mask="url(#splash-cut)">
            <g clipPath="url(#splash-horizon)">
              <path data-dome d="M10,50 A40,40 0 0 1 90,50 Z" />
            </g>
            <rect data-stripe x="10.8" y="55" width="78.4" height="6" />
            <rect data-stripe x="14" y="65" width="72" height="5" />
            <rect data-stripe x="19.6" y="74" width="60.8" height="4" />
            <rect data-stripe x="28.1" y="82" width="43.8" height="3" />
            <rect data-stripe x="41" y="88.5" width="18" height="2" />
          </g>
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[clamp(20px,4vw,48px)]">
          <span data-count className="display text-[clamp(64px,13vw,180px)] leading-[0.8]">
            000
          </span>
          <span data-splash-fade className="label">
            Loading
          </span>
        </div>
      </div>
    </div>
  );
}
