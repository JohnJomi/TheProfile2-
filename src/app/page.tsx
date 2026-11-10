import Image from "next/image";
import Link from "next/link";
import { experience, site } from "@/data/site";
import { selected, toRow, works } from "@/lib/work";
import { Kinetic } from "@/components/Kinetic";
import { WorkList } from "@/components/WorkList";
import { Badge, SayHello, Tape } from "@/components/Bits";

export default function Home() {
  const now = experience[0];
  return (
    <>
      <section className="hero" data-mood="fire">
        <Kinetic lines={["John", "Jomi"]} fill={110} />
        <div className="sub">
          <p>AI engineer and full-stack developer in Bengaluru. I train models and ship the products around them.</p>
          <div className="actions">
            <Link className="btn" href="/projects">
              See the projects
            </Link>
            <a className="btn ghost" href={site.resume}>
              Download résumé
            </a>
          </div>
        </div>
        <Badge href="/contact" ring="OPEN TO WORK ✺ FULL-TIME ✺ CONTRACT ✺" center="Hi!" />
      </section>

      <Tape words={["AI engineering", "Full-stack", "Security research", "Graph neural networks", "LLMs", "Cloud"]} />

      <section className="band" data-mood="night">
        <div className="band-head">
          <h2>Selected work</h2>
          <Link href="/projects">All {works.length} projects</Link>
        </div>
        <WorkList rows={selected.map(toRow)} />
      </section>

      <section className="band" data-mood="pink">
        <div className="split">
          <figure className="portrait">
            <Image src="/profile-photo.jpeg" alt="Portrait of John Jomi" width={1077} height={1280} sizes="(max-width: 800px) 90vw, 36vw" priority />
          </figure>
          <div>
            <div className="band-head">
              <h2>Hi, I&rsquo;m John</h2>
            </div>
            <div className="prose big">
              <p>
                A Computer Science undergraduate at CHRIST University, honors in AI and ML. So far: a graph neural network
                that flags card fraud, a login that never sends the password, phishing-detection research, and the web apps
                that put models in front of people.
              </p>
            </div>
            <p style={{ marginTop: 28 }}>
              <Link className="link" href="/about">
                More about me
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="band" data-mood="fire">
        <div className="band-head">
          <h2>Right now</h2>
          <Link href="/experience">Full experience</Link>
        </div>
        <ul className="rows">
          <li>
            <p className="when">{now.dates}</p>
            <div>
              <h3>
                <Link href={now.href.replace("/work/", "/projects/")}>{now.org}</Link>
              </h3>
              <p className="role">{now.role}</p>
              <p className="say">{now.text}</p>
            </div>
          </li>
        </ul>
      </section>

      <SayHello email={site.email} />
    </>
  );
}
