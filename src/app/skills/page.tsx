import type { Metadata } from "next";
import { site, skillStages, workingWith } from "@/data/site";
import { Kinetic } from "@/components/Kinetic";
import { SayHello } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Skills",
  description: "The languages, frameworks and tools John Jomi uses, from first line of code to production.",
  alternates: { canonical: "/skills" },
};

const moods = ["night", "pink", "fire", "blue"];
const spoken = workingWith.find((w) => w.label === "Spoken");

export default function Skills() {
  return (
    <>
      <section className="page-hero" data-mood="fire">
        <Kinetic lines={["Skills"]} fill={80} />
        <p className="lede">How I build software, from the first line of code to production. Hover a tool to stretch it.</p>
      </section>
      {skillStages.map((s, i) => (
        <section className="stage" data-mood={moods[i % moods.length]} key={s.stage}>
          <div>
            <p className="n">
              Stage {i + 1} of {skillStages.length}: {s.stage}
            </p>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </div>
          <ul className="tools">
            {s.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ))}
      {spoken && (
        <section className="stage" data-mood="pink">
          <div>
            <h2>Spoken</h2>
          </div>
          <p className="prose big">
            <span style={{ fontSize: "clamp(1.2rem, 2.1vw, 1.75rem)" }}>{spoken.text}</span>
          </p>
        </section>
      )}
      <SayHello email={site.email} />
    </>
  );
}
