"use client";

import { useRef } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";
import { process } from "@/lib/services";

/**
 * Desktop: the four steps stay on screen and light up one at a time as the
 * visitor scrolls, with a progress line drawing down the side.
 * Without motion all four steps are simply visible.
 */
export function ProcessStory() {
  const outer = useRef<HTMLElement>(null);
  const numeral = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const section = outer.current;
        if (!section) return;
        section.style.height = "320vh";

        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", section);
        let active = -1;
        const activate = (index: number) => {
          if (index === active) return;
          active = index;
          steps.forEach((step, i) => {
            const on = i === index;
            gsap.to(step, { opacity: on ? 1 : 0.28, x: on ? 0 : -8, duration: 0.45, ease: "power3.out" });
            gsap.to(step.querySelector("[data-step-text]"), {
              height: on ? "auto" : 0,
              opacity: on ? 1 : 0,
              duration: 0.45,
              ease: "power3.out",
            });
          });
          if (numeral.current) {
            gsap.fromTo(
              numeral.current,
              { yPercent: 30, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            );
            numeral.current.textContent = process[index].step;
          }
        };
        activate(0);

        const line = gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              onUpdate: (self) => activate(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
            },
          },
        );

        return () => {
          line.scrollTrigger?.kill();
          section.style.height = "";
          gsap.set(steps, { clearProps: "all" });
          gsap.set("[data-step-text]", { clearProps: "all" });
        };
      });
    },
    { scope: outer },
  );

  return (
    <section ref={outer} className="relative hidden border-t border-line bg-ink-2 lg:block">
      <div className="sticky top-[68px] flex min-h-[calc(100svh-68px)] items-center py-16">
        <div className="shell grid grid-cols-[1fr_1.1fr] items-center gap-16">
          <div>
            <p className="label">How it goes</p>
            <h2 className="display h-section mt-4">Four steps, no mystery.</h2>
            <div className="mt-10 overflow-hidden">
              <span ref={numeral} className="display block text-[clamp(140px,17vw,260px)] leading-[0.8] text-heat">
                01
              </span>
            </div>
          </div>

          <div className="relative pl-10">
            <div aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-line">
              <div data-progress className="h-full w-full origin-top bg-heat" />
            </div>
            <ol className="space-y-8">
              {process.map((p) => (
                <li key={p.step} data-step>
                  <span className="label !text-heat">Step {p.step}</span>
                  <h3 className="display mt-2 text-[clamp(34px,3.4vw,52px)] leading-none">{p.name}</h3>
                  <div data-step-text className="overflow-hidden">
                    <p className="max-w-md pt-4 text-[17px] leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
