"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";
import { featuredProjects, projects } from "@/lib/projects";

/**
 * Screenshot height is derived from the viewport so the heading, the browser
 * frame and its caption always fit on screen, however short the window is.
 * The frame is exactly 16:10, the same shape as the screenshots, so nothing is cropped.
 */
const sizing = {
  "--shot-h": "clamp(240px, calc(100svh - 68px - 250px), 580px)",
  "--shot-w": "calc(var(--shot-h) * 1.6)",
} as CSSProperties;

const host = (url?: string) => (url ? new URL(url).host.replace(/^www\./, "") : "case study");

/**
 * Desktop showpiece: the section stays on screen while the featured projects
 * slide sideways with the scroll. Without motion it is a normal sideways-scrolling row.
 */
export function WorkShowcase() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const total = featuredProjects.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const section = outer.current;
        const row = track.current;
        if (!section || !row) return;

        const distance = () => Math.max(0, row.scrollWidth - window.innerWidth);
        // Vertical scroll needed is shorter than the sideways distance, so it moves briskly.
        const setHeight = () => {
          section.style.height = `${distance() * 0.62 + window.innerHeight}px`;
        };
        setHeight();
        row.style.overflowX = "visible";

        const slide = gsap.to(row, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: setHeight,
            onUpdate: (self) => {
              const i = Math.min(total, Math.floor(self.progress * total) + 1);
              if (count.current) count.current.textContent = String(i).padStart(2, "0");
            },
          },
        });

        // Each browser frame settles into place, and its caption slides in, as the panel arrives.
        gsap.utils.toArray<HTMLElement>("[data-work-panel]", row).forEach((panel, i) => {
          if (i === 0) return; // the first panel is already on screen
          const trigger = { trigger: panel, containerAnimation: slide, start: "left right", end: "left 45%", scrub: true };
          gsap.fromTo(
            panel.querySelector("[data-frame]"),
            { scale: 0.9, rotate: 1.5, transformOrigin: "left center" },
            { scale: 1, rotate: 0, ease: "none", scrollTrigger: trigger },
          );
          gsap.fromTo(
            panel.querySelector("[data-info]"),
            { x: 70, opacity: 0 },
            { x: 0, opacity: 1, ease: "none", scrollTrigger: trigger },
          );
        });

        return () => {
          section.style.height = "";
          row.style.overflowX = "";
        };
      });
    },
    { scope: outer },
  );

  return (
    <section ref={outer} style={sizing} className="relative hidden border-b border-line lg:block">
      <div className="sticky top-[68px] flex h-[calc(100svh-68px)] flex-col justify-center gap-6 overflow-hidden py-6">
        <div className="shell flex items-end justify-between gap-8">
          <div>
            <p className="label">Selected work</p>
            <h2 className="display mt-2 text-[clamp(30px,3.4vw,52px)]">Sites and systems, shipped.</h2>
          </div>
          <p className="label shrink-0 pb-1">
            <span ref={count} className="text-heat">
              01
            </span>{" "}
            / {String(total).padStart(2, "0")} · Scroll
          </p>
        </div>

        <div
          ref={track}
          className="flex gap-16 overflow-x-auto pl-[max(48px,calc((100vw-1240px)/2+48px))] pr-[12vw] will-change-transform"
        >
          {featuredProjects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              data-work-panel
              data-cursor="View"
              className="group flex shrink-0 items-center gap-10"
            >
              {/* Browser window holding the full, uncropped screenshot */}
              <div
                data-frame
                className="overflow-hidden rounded-2xl border border-line bg-ink-3 shadow-[0_30px_80px_rgb(0_0_0/0.45)] transition-colors duration-300 group-hover:border-heat/60"
              >
                <div className="flex h-10 items-center gap-4 border-b border-line bg-ink-2 px-4">
                  <span aria-hidden className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-heat" />
                    <span className="h-2.5 w-2.5 rounded-full bg-bone/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-bone/25" />
                  </span>
                  <span className="mx-auto max-w-[60%] truncate rounded-full bg-ink px-4 py-1 font-mono text-[11px] text-faint">
                    {host(p.url)}
                  </span>
                  <span aria-hidden className="w-[42px]" />
                </div>
                <div className="relative h-[var(--shot-h)] w-[var(--shot-w)]">
                  <Image
                    src={p.image.src}
                    alt={`${p.name} website homepage`}
                    fill
                    sizes="930px"
                    priority={i === 0}
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div data-info className="w-[300px]">
                <span className="display text-5xl text-heat">{String(i + 1).padStart(2, "0")}</span>
                <p className="label mt-4">
                  {p.category} · {p.location}
                </p>
                <h3 className="display mt-3 text-[clamp(30px,2.6vw,40px)] leading-none">{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-heat">
                  Read case study
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/work"
            data-cursor="All"
            className="group flex h-[calc(var(--shot-h)+40px)] w-[400px] shrink-0 flex-col justify-between self-center rounded-2xl border border-line bg-ink-2 p-9 transition-colors hover:border-heat"
          >
            <span className="label">More work</span>
            <span className="display text-[clamp(40px,4vw,60px)] leading-[0.95]">
              All {projects.length} <em className="text-heat">projects</em>
              <span aria-hidden className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
