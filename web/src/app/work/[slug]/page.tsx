import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScaleIn } from "@/components/fx/Motion";
import { Reveal } from "@/components/Reveal";
import { CtaBand, JsonLd } from "@/components/Sections";
import { getProject, nextProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

// Every case study is prerendered at build time, so the page can read its slug directly.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.industry} case study`;
  return {
    title,
    description: project.seoDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.seoDescription,
      url: `/work/${project.slug}`,
      images: [{ url: project.image.src, width: project.image.width, height: project.image.height, alt: project.name }],
    },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);
  const pageUrl = `${site.url}/work/${project.slug}`;

  const details = [
    { label: "Industry", value: project.industry },
    { label: "Location", value: project.location },
    { label: "Type", value: project.category },
    { label: "Scope", value: project.scope.join(" · ") },
  ];

  return (
    <>
      <article>
        <header className="section !pb-10">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="label rise flex flex-wrap gap-2">
              <Link href="/" className="hover:text-heat">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/work" className="hover:text-heat">
                Work
              </Link>
              <span aria-hidden>/</span>
              <span className="text-bone">{project.name}</span>
            </nav>
            <h1 className="display h-page rise mt-6" style={{ animationDelay: "80ms" }}>
              {project.name}
            </h1>
            <p className="lede rise mt-5 max-w-2xl !text-[clamp(18px,1.8vw,24px)]" style={{ animationDelay: "160ms" }}>
              {project.tagline}
            </p>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rise mt-8"
                style={{ animationDelay: "240ms" }}
              >
                Visit live site <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </header>

        <div className="shell">
          <ScaleIn>
            <div className="overflow-hidden rounded-[20px] border border-line bg-ink-3">
              <Image
                src={project.image.src}
                alt={`${project.name} website homepage`}
                width={project.image.width}
                height={project.image.height}
                priority
                sizes="(min-width: 1240px) 1144px, 92vw"
                className="h-auto w-full"
              />
            </div>
          </ScaleIn>
        </div>

        <section className="section !pt-14">
          <div className="shell grid gap-12 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <dl className="divide-y divide-line border-y border-line">
                {details.map((d) => (
                  <div key={d.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="label shrink-0">{d.label}</dt>
                    <dd className="text-right text-[15px]">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="space-y-12">
              <Reveal>
                <h2 className="label !text-heat">The brief</h2>
                <p className="mt-4 text-lg leading-relaxed text-bone/85">{project.brief}</p>
              </Reveal>
              <Reveal>
                <h2 className="label !text-heat">What I built</h2>
                <p className="mt-4 text-lg leading-relaxed text-bone/85">{project.approach}</p>
              </Reveal>
              <Reveal>
                <h2 className="label !text-heat">Highlights</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="card flex gap-3 p-5 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-heat" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      </article>

      <section className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="shell flex items-center justify-between gap-6 py-12">
            <div>
              <p className="label">Next project</p>
              <p className="display h-section mt-3 transition-colors group-hover:text-heat">{next.name}</p>
            </div>
            <span aria-hidden className="display text-5xl text-heat transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </Link>
      </section>

      <CtaBand title="Need something like this?" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${project.name} website`,
          headline: project.tagline,
          description: project.seoDescription,
          url: pageUrl,
          image: `${site.url}${project.image.src}`,
          genre: project.industry,
          creator: { "@type": "Organization", name: site.name, url: site.url },
          ...(project.url ? { sameAs: project.url } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
            { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
          ],
        }}
      />
    </>
  );
}
