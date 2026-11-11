import Image from "next/image";
import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";

export function Footer() {
  const wa = whatsappLink("Hi MirageDevo, I'd like to talk about a project.");

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo.svg"
            alt="MirageDevo"
            width={811}
            height={216}
            unoptimized
            className="h-10 w-auto"
          />
          <p className="label mt-5">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            AI automation, websites and SEO for businesses that would rather not do the same work twice.
          </p>
        </div>

        <div>
          <p className="label">Explore</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-heat">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Get in touch</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-heat">
                {site.email}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-heat">
                  WhatsApp
                </a>
              </li>
            )}
            <li className="text-faint">{site.location}</li>
            <li className="text-faint">{site.timezone}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {site.year} {site.name}
          </p>
          <p className="label">Reply time · {site.replyTime}</p>
        </div>
      </div>
    </footer>
  );
}
