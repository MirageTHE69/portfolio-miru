"use client";

import Link from "next/link";
import { useRef } from "react";
import { MirageSun, type SunState } from "@/components/fx/MirageSun";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { bookHref, site } from "@/lib/site";
import { onSplashDone } from "@/lib/splash";

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  // Read by the WebGL sun every frame; GSAP animates these numbers.
  const sun = useRef<SunState>({ intro: 0, scroll: 0 });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        sun.current.intro = 1;
      });

      mm.add(MOTION_OK, () => {
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "power4.out" } })
          .to(sun.current, { intro: 1, duration: 2.2, ease: "power3.out" }, 0)
          .fromTo("[data-hero-line] > span", { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1.15, stagger: 0.12 }, 0.15)
          .fromTo(
            "[data-hero-fade]",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" },
            0.55,
          )
          .fromTo("[data-hero-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.4);

        const off = onSplashDone(() => intro.play());

        // On scroll the sun sinks and shimmers harder while the copy drifts away.
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
          })
          .to(sun.current, { scroll: 1, ease: "none" }, 0)
          .to("[data-hero-copy]", { yPercent: -18, opacity: 0, ease: "none" }, 0);

        return off;
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden">
      <div
        aria-hidden
        className="sun-glow pointer-events-none absolute -right-[20%] -top-[30%] h-[110%] w-[80%] max-w-[900px] opacity-60"
      />
      <MirageSun state={sun} />

      <div
        data-hero-copy
        className="shell relative flex min-h-[calc(100svh-68px)] flex-col justify-end pb-14 pt-[36svh] sm:pb-20 lg:justify-center lg:py-20"
      >
        <p data-hero-fade className="hero-fade label">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-heat align-middle" />
          {site.tagline}
        </p>

        <h1 className="display h-hero mt-6">
          <span data-hero-line className="hero-line">
            <span>I build the work</span>
          </span>
          <span data-hero-line className="hero-line">
            <span>you keep</span>
          </span>
          <span data-hero-line className="hero-line">
            <span>
              <em className="text-heat">doing by hand.</em>
            </span>
          </span>
        </h1>

        <p data-hero-fade className="hero-fade lede mt-8 max-w-xl">
          I&apos;m an independent developer building AI automation systems, custom websites and SEO for clinics,
          salons, schools and growing brands. Fixed scope, one number, no surprises.
        </p>

        <div data-hero-fade className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href={bookHref} className="btn btn-primary">
            Book a 20-minute call
          </Link>
          <Link href="/work" className="btn btn-ghost">
            See what I&apos;ve built <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div data-hero-rule aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />
    </section>
  );
}
