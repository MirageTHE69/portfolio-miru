import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CtaBand, Faq, JsonLd, Marquee, SectionHead } from "@/components/Sections";
import { bookHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Automation — WhatsApp booking agent for clinics and salons",
  description:
    "A WhatsApp AI agent that answers ad replies, website enquiries and missed calls in seconds, qualifies the lead, holds the slot and hands the booking to your team. Live in 7 days.",
  alternates: { canonical: "/ai-automation" },
};

const stats = [
  { value: "< 10 sec", label: "First reply" },
  { value: "24 / 7", label: "Coverage" },
  { value: "7 days", label: "To go live" },
];

const leaks = [
  {
    when: "After 7pm",
    text: "Meta ads keep spending after the clinic shuts. Those replies sit unread until morning, by which time the patient has messaged two competitors.",
  },
  {
    when: "Mid-shift",
    text: "Your receptionist is with a walk-in, on a call, and watching the WhatsApp queue grow. Enquiries get one-line answers or none.",
  },
  {
    when: "On arrival",
    text: "Nobody asked which service, which branch, or whether it was urgent. The slot is booked blind and the consultation runs over.",
  },
];

const features = [
  {
    name: "Answers every channel",
    text: "Click-to-WhatsApp ads, the website widget, and a follow-up text to anyone whose call you missed. One thread per patient.",
  },
  {
    name: "Asks what you'd ask",
    text: "Service, preferred day and time, branch, whether it is urgent, and any prep your treatment needs. Your script, not a generic bot's.",
  },
  {
    name: "Holds the slot",
    text: "Reads live availability, holds a time against your rules, and releases it if the patient goes quiet. No double bookings.",
  },
  {
    name: "Escalates properly",
    text: "Medical questions, complaints and anything urgent go to a human immediately, with the thread attached. The agent never diagnoses or quotes off-list.",
  },
  {
    name: "Reminds and recovers",
    text: "A reminder the day before, a reschedule offer if they cancel, and a follow-up to anyone who never showed.",
  },
  {
    name: "Reports weekly",
    text: "Leads answered, booked, escalated and lost, split by campaign, so you know which ads are actually filling the chairs.",
  },
];

const captured = [
  { label: "Service", value: "Laser · underarms" },
  { label: "Slot held", value: "Sat 11:30, Andheri branch" },
  { label: "Urgency", value: "Standard, first-time patient" },
  { label: "Source", value: "Meta ad · laser campaign" },
  { label: "Prep needed", value: "Patch test · form sent" },
  { label: "Handoff at", value: "22:43 · 2 min after first reply" },
];

const timeline = [
  {
    day: "Day 1–2",
    name: "Service list & rules",
    text: "We write down your services, slot lengths, branch hours and what must always reach a human.",
  },
  {
    day: "Day 3–4",
    name: "Number & templates",
    text: "WhatsApp Business verification, message templates submitted to Meta, ads pointed at the new thread.",
  },
  {
    day: "Day 5–6",
    name: "Dry run",
    text: "Your team messages the agent like patients would. We correct tone, edge cases and escalation triggers.",
  },
  {
    day: "Day 7",
    name: "Live, watched",
    text: "It goes live with me reading every thread for the first week, tuning as real patients arrive.",
  },
];

const faqs = [
  {
    q: "Will patients know it isn't a person?",
    a: "It introduces itself as the clinic's assistant and never claims to be a doctor or a named staff member. Most patients only care that someone replied at 11pm. Anything clinical goes straight to your team.",
  },
  {
    q: "What if it books something wrong?",
    a: "It holds slots rather than confirming them outright, within the rules you set: minimum notice, slot length per service, practitioner availability. The front desk confirms. A hold that nobody confirms releases itself.",
  },
  {
    q: "Do we keep our existing number?",
    a: "Usually yes, if it isn't already tied to a personal WhatsApp account. Where it is, we start on a clean business number and forward the old one. Either way the number, the templates and the chat history belong to you.",
  },
  {
    q: "Where does patient data sit?",
    a: "In your accounts, not mine. The sheet, calendar or CRM is yours; I hold access only while we work together. The agent collects what a booking needs and nothing else, and no clinical history is requested over chat.",
  },
  {
    q: "What happens if we cancel?",
    a: "Thirty days' notice, no exit fee. You keep the number, the approved templates and the full conversation history, and the WhatsApp account transfers to your own platform login if you want to keep running it yourself.",
  },
] as const;

const chat = [
  { from: "lead", text: "Hi, saw your ad. Do you do laser hair removal?" },
  { from: "agent", text: "We do. Full legs, underarms or a custom area?" },
  { from: "lead", text: "Underarms. Is Saturday possible?" },
  { from: "agent", text: "Saturday has 11:30 and 4:15 free. Which suits you?" },
  { from: "lead", text: "11:30" },
  { from: "agent", text: "Held for you. Name and age for the patch-test form?" },
];

export default function AiAutomationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="sun-glow pointer-events-none absolute -right-[25%] -top-[35%] h-[110%] w-[80%] max-w-[900px]" />
        <div className="shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div>
            <p className="label rise">Product 01 · WhatsApp agent</p>
            <h1 className="display h-page rise mt-5" style={{ animationDelay: "90ms" }}>
              Your front desk closes at 7. <em className="text-heat">Your leads don&apos;t.</em>
            </h1>
            <p className="lede rise mt-7 max-w-xl" style={{ animationDelay: "180ms" }}>
              A WhatsApp agent that answers ad replies, website enquiries and missed-call leads in seconds,
              qualifies them, holds the slot, and hands the booking to your team. Twenty-four hours a day,
              including the ones when nobody is in the clinic.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "270ms" }}>
              <Link href={bookHref} className="btn btn-primary">
                See it on your number
              </Link>
              <a href="#how" className="btn btn-ghost">
                How it works <span aria-hidden>↓</span>
              </a>
            </div>
            <dl className="rise mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-7" style={{ animationDelay: "360ms" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="display text-[clamp(26px,3.2vw,40px)]">{s.value}</dd>
                  <dt className="label mt-2">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="card rise mx-auto w-full max-w-md overflow-hidden" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-heat font-semibold text-ink">S</span>
              <div>
                <p className="text-sm font-medium">Skin &amp; Smile Clinic</p>
                <p className="text-xs text-faint">Example conversation · replies instantly · 22:41</p>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5 p-5">
              {chat.map((m) => (
                <li
                  key={m.text}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "agent" ? "self-start rounded-bl-md bg-ink-3" : "self-end rounded-br-md bg-heat text-ink"
                  }`}
                >
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Click-to-WhatsApp ads",
          "Website enquiries",
          "Missed-call follow-up",
          "Slot holds",
          "Reminders",
          "No-show recovery",
        ]}
      />

      {/* Problem */}
      <section className="section">
        <div className="shell">
          <SectionHead label="The problem" title="Where the money leaks." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {leaks.map((l, i) => (
              <Reveal key={l.when} delay={i * 80} className="h-full">
                <article className="card h-full p-7">
                  <h3 className="display h-card text-heat">{l.when}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{l.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section scroll-mt-16 border-t border-line bg-ink-2">
        <div className="shell">
          <SectionHead
            label="The path a lead takes"
            title="Reply, qualify, hold, hand over."
            intro="Nothing is invented. The agent works from your service list, your slot rules and your escalation triggers."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={f.name} className="bg-ink">
                <Reveal delay={(i % 3) * 70} className="h-full p-7">
                  <span className="label !text-heat">0{i + 1}</span>
                  <h3 className="display h-card mt-4">{f.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it captures */}
      <section className="section border-t border-line">
        <div className="shell grid items-start gap-12 lg:grid-cols-2">
          <SectionHead
            label="What it captures"
            title="Six messages, a full booking."
            intro="Every field is written to your sheet or CRM as the conversation happens. The front desk opens a booking that is already complete."
          />
          <Reveal delay={100}>
            <dl className="card divide-y divide-line">
              {captured.map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                  <dt className="label shrink-0">{c.label}</dt>
                  <dd className="text-right text-[15px]">{c.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-faint">Example booking record.</p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section border-t border-line bg-ink-2">
        <div className="shell">
          <SectionHead
            label="Setup"
            title="Live in seven days."
            intro="You need about ninety minutes of front-desk time across the week. Everything else is on me."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <li key={t.day}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="card h-full !bg-ink p-7">
                    <span className="label !text-heat">{t.day}</span>
                    <h3 className="display h-card mt-4">{t.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-line">
        <div className="shell">
          <SectionHead label="Fair questions" title="The things clinics ask first." />
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Send it a message and see."
        text="I'll set up a working demo on a test number with your three most-booked services, so you can message it like a patient before committing to anything."
      />

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
