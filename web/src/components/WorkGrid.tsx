"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { categories, projects, type Category } from "@/lib/projects";

type Filter = "All" | Category;

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects by type" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`min-h-[44px] shrink-0 rounded-full border px-5 text-sm transition-colors ${
                active ? "border-heat bg-heat text-ink" : "border-line text-muted hover:border-bone hover:text-bone"
              }`}
            >
              {f} <span className={active ? "opacity-70" : "text-faint"}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.slug}>
            <ProjectCard project={p} priority={i < 3} />
          </li>
        ))}
      </ul>
    </>
  );
}
