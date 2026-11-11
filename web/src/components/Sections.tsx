import Link from "next/link";
import type { ReactNode } from "react";
import { SplitReveal } from "@/components/fx/Motion";
import { Reveal } from "@/components/Reveal";
import { capabilities, process } from "@/lib/services";
import { bookHref, site, whatsappLink } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

/** Label + serif heading + optional intro, used at the top of most sections. */
export function SectionHead({
  label,
  title,
  intro,
  as: Tag = "h2",
  size = "h-section",
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  size?: "h-section" | "h-page";
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="label">{label}</p>
      </Reveal>
      <SplitReveal as={Tag} className={`display ${size} mt-4`}>
        {title}
      </SplitReveal>
      {intro && (
        <Reveal delay={180}>
          <p className="lede mt-6">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Marquee({ items = capabilities }: { items?: readonly string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="label flex items-center gap-8 pr-8 !text-[12px] sm:gap-12 sm:pr-12">
          {item}
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-heat" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden border-y border-line py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function ProcessSteps() {
  return (
    <ol className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {process.map((p, i) => (
        <li key={p.step} className="bg-ink-2">
          <Reveal delay={i * 80} className="flex h-full flex-col gap-4 p-7">
            <span className="label !text-heat">Step {p.step}</span>
            <h3 className="display h-card">{p.name}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{p.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="mt-10 divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-heat transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-7 text-[15px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Hidden until real quotes exist and the switch in site.ts is on. */
export function Testimonials() {
  if (!site.showTestimonials || testimonials.length === 0) return null;

  return (
    <section className="section border-t border-line">
      <div className="shell">
        <SectionHead label="What clients say" title="In their words." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card flex flex-col gap-6 p-7">
              <blockquote className="display text-2xl leading-snug">“{t.quote}”</blockquote>
              <figcaption className="mt-auto text-sm text-muted">
                <span className="block font-medium text-bone">{t.name}</span>
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call-to-action shown at the bottom of every page. */
export function CtaBand({
  title = "Tell me what you keep doing by hand.",
  text = "A 20-minute call is enough to know whether I can help. You get a straight answer either way.",
}: {
  title?: string;
  text?: string;
}) {
  const wa = whatsappLink("Hi MirageDevo, I'd like to book a call about a project.");

  return (
    <section className="section relative overflow-hidden border-t border-line">
      <div aria-hidden className="sun-glow pointer-events-none absolute -bottom-[45%] left-1/2 h-[90%] w-[min(900px,120%)] -translate-x-1/2" />
      <Reveal className="shell relative text-center">
        <p className="label">Start here</p>
        <h2 className="display h-page mx-auto mt-5 max-w-4xl">{title}</h2>
        <p className="lede mx-auto mt-6 max-w-xl">{text}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={bookHref} className="btn btn-primary w-full sm:w-auto">
            Book a 20-minute call
          </Link>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full sm:w-auto">
              Message on WhatsApp
            </a>
          ) : (
            <a href={`mailto:${site.email}`} className="btn btn-ghost w-full sm:w-auto">
              {site.email}
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
