import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { about, record, site } from "@/data/site";
import { Kinetic } from "@/components/Kinetic";
import { SayHello, Tape } from "@/components/Bits";

export const metadata: Metadata = {
  title: "About",
  description: "Who John Jomi is, how he got here, and how he builds software.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="page-hero" data-mood="fire">
        <Kinetic lines={["About", "me"]} fill={70} />
        <p className="lede">AI engineer, full-stack developer and researcher. {site.availability}.</p>
      </section>

      <section className="band" data-mood="pink">
        <div className="split">
          <div>
            <figure className="portrait">
              <Image src="/profile-photo.jpeg" alt="Portrait of John Jomi" width={1077} height={1280} sizes="(max-width: 800px) 90vw, 36vw" />
            </figure>
            <p className="portrait-note">
              {record.education.degree}, {record.education.school}. {record.education.detail}.
            </p>
          </div>
          <div>
            <div className="prose big">
              {about.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="trio" style={{ marginTop: 48 }}>
              {about.pillars.map((p) => (
                <div key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band" data-mood="night">
        <div className="band-head">
          <h2>How I got here</h2>
        </div>
        <ol className="steps">
          {about.journey.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="band" data-mood="fire">
        <div className="band-head">
          <h2>What I&rsquo;m focused on</h2>
        </div>
        <div className="trio">
          {about.focus.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band" data-mood="pink">
        <div className="band-head">
          <h2>How I build software</h2>
        </div>
        <div className="trio">
          {about.values.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band" data-mood="night" style={{ paddingBottom: 0 }}>
        <div className="band-head">
          <h2>Beyond code</h2>
          <p>{about.beyond.join(", ")}.</p>
        </div>
      </section>
      <Tape words={about.beyond} tilt={2} />
      <section className="band" data-mood="night">
        <p className="actions">
          <Link className="btn" href="/projects">
            See the projects
          </Link>
          <Link className="btn ghost" href="/experience">
            See my experience
          </Link>
        </p>
      </section>

      <SayHello email={site.email} />
    </>
  );
}
