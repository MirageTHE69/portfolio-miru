"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { bookHref } from "@/lib/site";

/** Thin progress line at the top, plus a "Book a call" pill once the visitor has scrolled. */
export function ScrollChrome() {
  const bar = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      // Hide near the bottom, where the page's own call-to-action is on screen.
      setShowCta(y > 700 && max - y > 900);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const ctaVisible = showCta && pathname !== "/contact";

  return (
    <>
      <div
        ref={bar}
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-heat"
        style={{ transform: "scaleX(0)" }}
      />
      <Link
        href={bookHref}
        tabIndex={ctaVisible ? 0 : -1}
        aria-hidden={!ctaVisible}
        className={`btn btn-primary fixed bottom-5 right-5 z-40 shadow-[0_10px_40px_rgb(255_90_31/0.35)] transition-[opacity,translate] duration-500 ${
          ctaVisible ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        Book a call <span aria-hidden>→</span>
      </Link>
    </>
  );
}
