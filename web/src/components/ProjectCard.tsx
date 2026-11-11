import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/fx/Motion";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
      <Parallax amount={5} className="relative aspect-[16/10] bg-ink-3">
        <Image
          src={project.image.src}
          alt={`${project.name} website homepage`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </Parallax>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="label">
          {project.category} · {project.location}
        </p>
        <h3 className="display h-card">{project.name}</h3>
        <p className="text-[15px] leading-relaxed text-muted">{project.tagline}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-medium text-heat">
          Read case study
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
