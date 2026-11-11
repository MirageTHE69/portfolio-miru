import type { Metadata } from "next";
import { CtaBand, SectionHead } from "@/components/Sections";
import { WorkGrid } from "@/components/WorkGrid";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — websites, platforms and booking systems",
  description: `${projects.length} websites, platforms and booking systems built by MirageDevo for healthcare, education, food, beauty and D2C brands in India. Each with a short case study.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="section !pb-0">
        <div className="shell">
          <SectionHead
            as="h1"
            size="h-page"
            label={`Work · ${projects.length} projects`}
            title="Everything I've shipped."
            intro="Websites, platforms and booking flows for clinics, schools, food brands and more. Open any project for a short case study and the live link."
          />
        </div>
      </section>
      <section className="section !pt-12">
        <div className="shell">
          <WorkGrid />
        </div>
      </section>
      <CtaBand title="Want yours on this list?" />
    </>
  );
}
