import type { Metadata } from "next";
import Link from "next/link";
import { ProcessStory } from "@/components/ProcessStory";
import { Reveal } from "@/components/Reveal";
import { CtaBand, Faq, JsonLd, ProcessSteps, SectionHead } from "@/components/Sections";
import { packages, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & pricing — AI automation, websites and SEO",
  description:
    "AI automation, custom Next.js websites and SEO from MirageDevo. Four clear packages, each with a written scope and one fixed price agreed before work starts.",
  alternates: { canonical: "/services" },
};

const faqs = [
  {
    q: "Why are there no prices on this page?",
    a: "Every project gets a written scope and one fixed number before work starts. The number depends on what you need, so I would rather quote it accurately on a short call than publish a range that misleads you.",
  },
  {
    q: "What happens if the scope grows midway?",
    a: "We price the change before it happens. Nothing is added to the bill without you agreeing to it first.",
  },
  {
    q: "How long does a project take?",
    a: "Most websites and automation builds take three to four weeks, with something for you to review every week. The WhatsApp booking agent goes live in seven days.",
  },
  {
    q: "Do I own the work afterwards?",
    a: "Yes. The code, the accounts and the documentation are yours. You also get a walkthrough recording and thirty days of support after handover.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="section !pb-0">
        <div className="shell">
          <SectionHead
            as="h1"
            size="h-page"
            label="Services"
            title={
              <>
                Built once, <em className="text-heat">working every day.</em>
              </>
            }
            intro="Three things I do well, and four ways to buy them. Every project starts with a written scope and one fixed price."
          />
        </div>
      </section>

      <section className="section">
        <div className="shell divide-y divide-line border-y border-line">
          {services.map((s) => (
            <Reveal key={s.id}>
              <article id={s.id} className="grid scroll-mt-24 gap-6 py-10 md:grid-cols-[120px_1fr_1fr] md:gap-10">
                <span className="display text-5xl text-heat">{s.number}</span>
                <div>
                  <h2 className="display h-section !text-[clamp(28px,3.4vw,46px)]">{s.name}</h2>
                  <Link href={s.href} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-heat">
                    {s.cta} <span aria-hidden>→</span>
                  </Link>
                </div>
                <div>
                  <p className="text-[17px] leading-relaxed text-muted">{s.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((pt) => (
                      <li key={pt} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="pricing" className="section scroll-mt-16 border-t border-line bg-ink-2">
        <div className="shell">
          <SectionHead
            label="Packages"
            title="Fixed before we start."
            intro="Choose the package closest to what you need. On the call I confirm the scope and give you one price in writing."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((p, i) => {
              const highlight = "highlight" in p && p.highlight;
              return (
                <Reveal key={p.name} delay={i * 70} className="h-full">
                  <article
                    className={`card flex h-full flex-col gap-5 !bg-ink p-7 ${highlight ? "!border-heat" : ""}`}
                  >
                    <div className="flex min-h-[22px] items-center justify-between gap-3">
                      <span className="label">Package 0{i + 1}</span>
                      {highlight && (
                        <span className="rounded-full bg-heat px-2.5 py-1 text-[11px] font-medium text-ink">
                          Most requested
                        </span>
                      )}
                    </div>
                    <h3 className="display h-card">{p.name}</h3>
                    <p className="text-[15px] leading-relaxed text-muted">{p.for}</p>
                    <ul className="space-y-3 border-t border-line pt-5 text-[15px] text-bone/85">
                      {p.includes.map((inc) => (
                        <li key={inc} className="flex gap-3">
                          <span aria-hidden className="text-heat">
                            ✓
                          </span>
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/contact?service=${encodeURIComponent(p.name)}`}
                      className={`btn mt-auto w-full ${highlight ? "btn-primary" : "btn-ghost"}`}
                    >
                      Get a quote
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessStory />
      <section className="section border-t border-line lg:hidden">
        <div className="shell">
          <SectionHead label="How it goes" title="Four steps, no mystery." />
          <ProcessSteps />
        </div>
      </section>

      <section className="section border-t border-line bg-ink-2">
        <div className="shell">
          <SectionHead label="Fair questions" title="Before you ask." />
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand title="Not sure which one fits?" text="Tell me what you are trying to fix. I will tell you which package fits, or that none does." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
