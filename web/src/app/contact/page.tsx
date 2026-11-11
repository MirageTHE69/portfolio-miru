import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/Sections";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — book a 20-minute call",
  description:
    "Tell MirageDevo what you need: an AI automation, a website or SEO. Send a message by WhatsApp or email and get a reply within 12 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = whatsappLink("Hi MirageDevo, I'd like to book a call about a project.");

  const details = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...(wa ? [{ label: "WhatsApp", value: "Message me directly", href: wa }] : []),
    ...(site.bookingUrl ? [{ label: "Calendar", value: "Pick a time for a call", href: site.bookingUrl }] : []),
    { label: "Reply time", value: site.replyTime },
    { label: "Based in", value: site.location },
    { label: "Timezone", value: site.timezone },
  ];

  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHead
            as="h1"
            size="h-page"
            label="Contact"
            title={
              <>
                Let&apos;s talk about <em className="text-heat">your project.</em>
              </>
            }
            intro="Fill in the form and your message opens ready to send. A 20-minute call usually follows, and you get a straight answer on whether I can help."
          />
          <Reveal delay={100}>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {details.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="label shrink-0">{d.label}</dt>
                  <dd className="text-right text-[15px]">
                    {"href" in d && d.href ? (
                      <a
                        href={d.href}
                        className="text-heat underline-offset-4 hover:underline"
                        {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
