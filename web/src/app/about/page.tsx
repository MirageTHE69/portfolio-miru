import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CtaBand, ProcessSteps, SectionHead, Testimonials } from "@/components/Sections";
import { stack } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — an independent developer for automation and web",
  description:
    "MirageDevo is an independent developer in Vadodara, India, building AI automation systems, custom websites and SEO for clinics, schools, D2C brands and agencies.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    name: "One person, start to finish",
    text: "The person you brief is the person who designs it, builds it and answers when something needs changing. Nothing gets lost between a sales call and a developer.",
  },
  {
    name: "A fixed number before work starts",
    text: "Every project gets a written scope and one price. If the scope grows, the change is priced before it happens.",
  },
  {
    name: "Something to look at every week",
    text: "You approve as it goes rather than at the end, so there are no surprises on launch day.",
  },
  {
    name: "Yours, not rented",
    text: "You get the code, the accounts, the documentation and a walkthrough recording. If we stop working together, everything keeps running.",
  },
];

const availability = [
  { label: "Based in", value: site.location },
  { label: "Timezone", value: site.timezone },
  { label: "Reply time", value: site.replyTime },
  { label: "Working with", value: "Clinics, schools, D2C, agencies" },
];

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="shell grid items-start gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <SectionHead
              as="h1"
              size="h-page"
              label="About"
              title={
                <>
                  A developer working <em className="text-heat">on your side.</em>
                </>
              }
            />
            <Reveal className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-bone/80">
              <p>
                I&apos;m an independent developer building AI automation systems, custom websites and SEO
                under the name MirageDevo. I started in 2024 and work with businesses across India from{" "}
                {site.location.split(",")[0]}.
              </p>
              <p>
                Most businesses I meet are not short of ideas. They are short of hours, because the same
                enquiries, follow-ups and bookings get handled by hand every single day. I map that work,
                then build the website or the system that does it for you.
              </p>
              <p>
                Right now most of my time goes into a WhatsApp booking agent for clinics and salons, and
                into fast, custom-coded websites for brands that have outgrown templates.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="card p-7">
              <Image src="/brand/mark.svg" alt="" width={88} height={88} unoptimized className="h-14 w-14" />
              <dl className="mt-7 divide-y divide-line border-t border-line">
                {availability.map((a) => (
                  <div key={a.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="label shrink-0">{a.label}</dt>
                    <dd className="text-right text-[15px]">{a.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line bg-ink-2">
        <div className="shell">
          <SectionHead label="How I work" title="Four things you can count on." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 80} className="h-full">
                <article className="card h-full !bg-ink p-7">
                  <span className="label !text-heat">0{i + 1}</span>
                  <h3 className="display h-card mt-4">{p.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell">
          <SectionHead label="The process" title="Diagnose, map, build, hand over." />
          <ProcessSteps />
        </div>
      </section>

      <section className="section border-t border-line bg-ink-2">
        <div className="shell">
          <SectionHead label="Built with" title="Tools I reach for." />
          <Reveal>
            <ul className="mt-10 flex flex-wrap gap-3">
              {stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-5 py-2.5 text-[15px] text-bone/85">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  );
}
