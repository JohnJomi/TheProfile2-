import type { Metadata } from "next";
import { experience, experienceDetail, site } from "@/data/site";
import { Kinetic } from "@/components/Kinetic";
import { Ext, SayHello } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Experience",
  description: "Internships in on-device AI research and full-stack development, independent security research, and IEEE leadership.",
  alternates: { canonical: "/experience" },
};

const moods = ["night", "fire", "pink", "blue"];

export default function Experience() {
  return (
    <>
      <section className="page-hero" data-mood="fire">
        <Kinetic lines={["Experience"]} fill={92} />
        <p className="lede">
          Research on on-device AI, production full-stack features, phishing-detection research, and running a student branch&rsquo;s budget.
        </p>
      </section>
      {experience.map((e, i) => {
        const d = experienceDetail[e.org];
        const href = e.href.replace("/work/", "/projects/");
        return (
          <section className="band" data-mood={moods[i % 3]} key={e.org}>
            <ul className="rows">
              <li>
                <div>
                  <p className="when">{e.dates}</p>
                  <p>{e.place}</p>
                  {d && <p>{d.kind}</p>}
                </div>
                <div>
                  <h3>{href ? <Ext href={href}>{e.org}</Ext> : e.org}</h3>
                  <p className="role">{e.role}</p>
                  <p className="say">{e.text}</p>
                  {d && d.bullets.length > 0 && (
                    <ul className="ticks">
                      {d.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {d && d.stack.length > 0 && (
                    <ul className="stack" aria-label="Stack">
                      {d.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </section>
        );
      })}
      <SayHello email={site.email} />
    </>
  );
}
