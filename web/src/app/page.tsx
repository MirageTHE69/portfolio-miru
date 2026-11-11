import Link from "next/link";
import { CountUp } from "@/components/fx/Motion";
import { HomeHero } from "@/components/HomeHero";
import { ProcessStory } from "@/components/ProcessStory";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { WorkShowcase } from "@/components/WorkShowcase";
import { CtaBand, Marquee, ProcessSteps, SectionHead, Testimonials } from "@/components/Sections";
import { featuredProjects, projects } from "@/lib/projects";
import { services } from "@/lib/services";

const facts: { count?: number; value: string; label: string }[] = [
  { count: projects.length, value: "", label: "Projects in the portfolio" },
  { value: "3–4 wks", label: "Typical build time" },
  { count: 7, value: " days", label: "WhatsApp agent go-live" },
  { value: "< 12 hrs", label: "Reply time" },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <Marquee />

      {/* Facts */}
      <section className="border-b border-line">
        <dl className="shell grid grid-cols-2 gap-y-10 py-12 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 70}>
              <dd className="display text-[clamp(36px,4.6vw,64px)]">
                {f.count !== undefined && <CountUp value={f.count} />}
                {f.value}
              </dd>
              <dt className="label mt-3">{f.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Selected work: pinned sideways gallery on desktop, card grid on smaller screens */}
      <WorkShowcase />
      <section className="section lg:hidden">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHead
              label="Selected work"
              title="Sites and systems, shipped."
              intro="A few recent builds. Each one has a short case study on what the business needed and how the site answers it."
            />
            <Link href="/work" className="btn btn-ghost shrink-0 self-start md:self-auto">
              All {projects.length} projects <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section border-t border-line bg-ink-2">
        <div className="shell">
          <SectionHead
            label="What I do"
            title="Three ways I can help."
            intro="Pick one, or combine them. Most projects start with a website or a single automation and grow from there."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 80} className="h-full">
                <article className="card flex h-full flex-col gap-5 !bg-ink p-7">
                  <span className="label !text-heat">{s.number}</span>
                  <h3 className="display h-card">{s.name}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{s.summary}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.points.map((pt) => (
                      <li key={pt} className="rounded-full border border-line px-3 py-1.5 text-xs text-muted">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-heat">
                    {s.cta} <span aria-hidden>→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/services" className="btn btn-ghost">
              Services and packages <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* AI automation teaser */}
      <section className="section border-t border-line">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              label="AI automation"
              title={
                <>
                  Your front desk closes at 7. <em className="text-heat">Your leads don&apos;t.</em>
                </>
              }
              intro="A WhatsApp agent that answers enquiries in seconds, qualifies them, holds the slot and hands the booking to your team. Built for clinics and salons, live in seven days."
            />
            <Reveal className="mt-8">
              <Link href="/ai-automation" className="btn btn-primary">
                See how it works <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <ChatPreview />
          </Reveal>
        </div>
      </section>

      {/* Process: pinned story on desktop, simple grid on smaller screens */}
      <ProcessStory />
      <section className="section border-t border-line bg-ink-2 lg:hidden">
        <div className="shell">
          <SectionHead label="How it goes" title="Four steps, no mystery." />
          <ProcessSteps />
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  );
}

function ChatPreview() {
  const messages = [
    { from: "lead", text: "Hi, saw your ad. Do you do laser hair removal?" },
    { from: "agent", text: "We do. Full legs, underarms or a custom area?" },
    { from: "lead", text: "Underarms. Is Saturday possible?" },
    { from: "agent", text: "Saturday has 11:30 and 4:15 free. Which suits you?" },
    { from: "lead", text: "11:30" },
    { from: "agent", text: "Held for you. Name and age for the patch-test form?" },
  ];

  return (
    <div className="card mx-auto w-full max-w-md overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-heat font-semibold text-ink">S</span>
        <div>
          <p className="text-sm font-medium">Skin &amp; Smile Clinic</p>
          <p className="text-xs text-faint">Example conversation · 22:41</p>
        </div>
      </div>
      <ul className="flex flex-col gap-2.5 p-5">
        {messages.map((m) => (
          <li
            key={m.text}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.from === "agent" ? "self-start rounded-bl-md bg-ink-3 text-bone" : "self-end rounded-br-md bg-heat text-ink"
            }`}
          >
            {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
