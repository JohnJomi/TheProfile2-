import type { Metadata } from "next";
import { site } from "@/data/site";
import { toRow, works } from "@/lib/work";
import { Kinetic } from "@/components/Kinetic";
import { ProjectFilter } from "@/components/ProjectFilter";
import { SayHello } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Projects",
  description: "Every project John Jomi has built, finished or not, with its real status.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return (
    <>
      <section className="page-hero" data-mood="fire">
        <Kinetic lines={["Projects"]} fill={92} />
        <p className="lede">All {works.length} projects, finished or not, each with its real status. Select one for the full write-up.</p>
      </section>
      <section className="band" data-mood="night">
        <ProjectFilter rows={works.map(toRow)} />
      </section>
      <SayHello email={site.email} />
    </>
  );
}
