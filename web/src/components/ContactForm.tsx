"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { packages } from "@/lib/services";
import { mailtoLink, site, whatsappLink } from "@/lib/site";

const options = [...packages.map((p) => p.name), "SEO & digital marketing", "Not sure yet"];

type Channel = "whatsapp" | "email";

const subscribeToNothing = () => () => {};

export function ContactForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<Channel | null>(null);
  const hasWhatsapp = Boolean(site.whatsapp);

  // Pre-select the package when arriving from a "Get a quote" button.
  const query = useSyncExternalStore(
    subscribeToNothing,
    () => window.location.search,
    () => "",
  );
  const wanted = new URLSearchParams(query).get("service");
  const service = picked ?? (wanted && options.includes(wanted) ? wanted : "Not sure yet");

  const compose = () =>
    [
      `Hi MirageDevo, I'm ${name.trim()}${business.trim() ? ` from ${business.trim()}` : ""}.`,
      `Interested in: ${service}`,
      "",
      message.trim(),
    ].join("\n");

  const send = (channel: Channel) => {
    const text = compose();
    if (channel === "whatsapp") {
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoLink(`Project enquiry: ${service}`, text);
    }
    setSent(channel);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    send(submitter?.value === "email" || !hasWhatsapp ? "email" : "whatsapp");
  };

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="label">Your name</span>
          <input
            className="field"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Shah"
          />
        </label>
        <label className="grid gap-2">
          <span className="label">Business (optional)</span>
          <input
            className="field"
            name="business"
            autoComplete="organization"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Clinic, brand or agency"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="label">What do you need?</span>
        <select className="field" name="service" value={service} onChange={(e) => setPicked(e.target.value)}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="label">Tell me about it</span>
        <textarea
          className="field min-h-[150px] resize-y"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What do you keep doing by hand, or what should the website do?"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        {hasWhatsapp && (
          <button type="submit" value="whatsapp" className="btn btn-primary w-full sm:w-auto">
            Send on WhatsApp
          </button>
        )}
        <button
          type="submit"
          value="email"
          className={`btn w-full sm:w-auto ${hasWhatsapp ? "btn-ghost" : "btn-primary"}`}
        >
          Send by email
        </button>
      </div>

      <p role="status" className="min-h-[20px] text-sm text-muted">
        {sent === "whatsapp" && "WhatsApp opened with your message. Press send there to finish."}
        {sent === "email" &&
          `Your email app opened with the message ready. If nothing opened, write to ${site.email}.`}
        {!sent &&
          (hasWhatsapp
            ? "Your message opens in WhatsApp or your email app, ready to send."
            : "Your message opens in your email app, ready to send.")}
      </p>
    </form>
  );
}
