"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onSplashDone } from "@/lib/splash";

/** Wraps every word in a clipping box so it can slide up into place. */
function splitWords(node: ReactNode, keyPrefix = "w"): ReactNode {
  return Children.map(node, (child, i) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((part, j) =>
        part.trim() ? (
          <span key={`${keyPrefix}-${i}-${j}`} className="split-word">
            <span>{part}</span>
          </span>
        ) : (
          part
        ),
      );
    }
    if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>;
      return cloneElement(el, { children: splitWords(el.props.children, `${keyPrefix}-${i}`) });
    }
    return child;
  });
}

/** A heading whose words rise into view one after another when it enters the screen. */
export function SplitReveal({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const words = el.querySelectorAll(".split-word > span");
        let tween: gsap.core.Tween | undefined;
        // Headings at the top of a page wait for the splash to clear.
        const off = onSplashDone(() => {
          tween = gsap.fromTo(
            words,
            { yPercent: 115, y: 0 },
            {
              yPercent: 0,
              y: 0,
              duration: 0.95,
              ease: "power4.out",
              stagger: 0.045,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });
        return () => {
          off();
          tween?.scrollTrigger?.kill();
          tween?.kill();
        };
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`split ${className}`}>
      {splitWords(children)}
    </Tag>
  );
}

/** Moves its content slower than the page, inside a clipped frame. */
export function Parallax({
  children,
  amount = 8,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el.firstElementChild,
          { yPercent: -amount, scale: 1 + amount / 50 },
          {
            yPercent: amount,
            scale: 1 + amount / 50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="h-full w-full will-change-transform">{children}</div>
    </div>
  );
}

/** Opens up from a smaller, clipped frame to full size as it scrolls into view. */
export function ScaleIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { scale: 0.86, clipPath: "inset(8% 6% 8% 6% round 28px)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 20px)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.6 },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { v: 0 };
        el.textContent = "0";
        const tween = gsap.to(state, {
          v: value,
          duration: 1.6,
          ease: "power2.out",
          paused: true,
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });
        const st = ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => tween.play() });
        return () => {
          st.kill();
          tween.kill();
          el.textContent = String(value);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
