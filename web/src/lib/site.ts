/**
 * One place for everything that changes without touching design:
 * contact details, site URL, navigation and the testimonials switch.
 */
export const site = {
  name: "MirageDevo",
  tagline: "SEO · Digital Marketing · Web & Software",
  description:
    "MirageDevo builds AI automation systems, custom websites and SEO for clinics, salons, schools, D2C brands and agencies in India. Fixed scope, fast turnaround.",
  // Used for canonical URLs, sitemap and social previews. Change if your domain differs.
  url: "https://miragedevo.com",
  email: "hello@miragedevo.com",
  // WhatsApp number in international format, digits only (example: "919876543210").
  // Leave empty to hide WhatsApp buttons; the contact form then sends by email.
  whatsapp: "",
  // Optional Calendly / Cal.com link. Leave empty to send "Book a call" to the contact page.
  bookingUrl: "",
  location: "Vadodara, Gujarat, India",
  timezone: "IST · UTC+5:30",
  replyTime: "Under 12 hours",
  year: 2026,
  // Flip to true once real client quotes are added in src/lib/testimonials.ts
  showTestimonials: false,
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/ai-automation", label: "AI Automation" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function whatsappLink(message: string) {
  if (!site.whatsapp) return "";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body = "") {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}

/** Where every "Book a call" button goes. */
export const bookHref = site.bookingUrl || "/contact";
