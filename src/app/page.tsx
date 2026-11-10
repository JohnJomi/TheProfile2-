import Image from "next/image";
import Link from "next/link";
import { certificates } from "@/data/certificates";
import { experience, record, site, workingWith } from "@/data/site";
import { selected, works } from "@/lib/work";
import { Contact, Top } from "@/components/Chrome";
import { Ext, StatusMark, Todos } from "@/components/Bits";
import { Ledger } from "@/components/Ledger";
import { Plate } from "@/components/Plate";

const month = (iso: string) =>
  new Date(`${iso}-01T00:00:00Z`).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export default function Home() {
  const rows = works.map((w) => ({ ...w, study: undefined, long: undefined }));
  const certs = [...certificates].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Top />
      <main>
        <section className="wrap">
          <h1 className="name">{site.name}</h1>
          <div className="lead-grid">
            <p className="lead">I build AI products and the web software around them.</p>
            <figure className="portrait">
              <Image
                src="/profile-photo.jpeg"
                alt="John Jomi"
                width={1077}
                height={1280}
                sizes="(max-width: 900px) 60vw, 30vw"
                priority
              />
            </figure>
            <div className="intro">
              <p>
                I&rsquo;m an AI engineer and full-stack developer, and a Computer Science
                undergraduate at CHRIST University in Bengaluru.
              </p>
              <p>
                So far: a graph neural network that flags card fraud, a login that never sends
                the password, phishing detection research, and the web apps that put models in
                front of people. All {works.length} projects are below, each with its real
                status.
              </p>
              <p className="actions">
                <a href={`mailto:${site.email}`}>Email me</a>
                <a href={site.resume}>Download résumé (PDF)</a>
              </p>
            </div>
            <dl className="facts">
              <div>
                <dt>Now</dt>
                <dd>{site.availability}</dd>
              </div>
              <div>
                <dt>Based</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Studying</dt>
                <dd>
                  B.Tech Computer Science, honors in AI and ML, {record.education.dates}
                </dd>
              </div>
              <div>
                <dt>Worked at</dt>
                <dd>Prophaze Technologies, Proddy AI</dd>
              </div>
              <div>
                <dt>Elsewhere</dt>
                <dd>
                  <Ext href={site.github}>GitHub</Ext>, <Ext href={site.linkedin}>LinkedIn</Ext>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section wrap draw" id="work">
          <header>
            <h2>Selected work</h2>
            <p>Six projects, each drawn the way it works.</p>
          </header>
          {selected.map((w) => (
            <article className="spread" key={w.slug}>
              <figure>
                <Plate slug={w.slug} />
              </figure>
              <div className="text">
                <h3>
                  <Link href={`/work/${w.slug}`}>{w.name}</Link>
                </h3>
                {w.kind && <p className="kind">{w.kind}</p>}
                <p className="desc">{w.description}</p>
                {w.figures && (
                  <dl className="figures">
                    {w.figures.map((f) => (
                      <div key={f.label}>
                        <dt>{f.value}</dt>
                        <dd>{f.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {w.slug === "tycoon-2fa-detection" && (
                  <p className="note">
                    The architecture and scoring design are specified. The detection layers are
                    not yet built, so there are no measured results to report.
                  </p>
                )}
                <Todos items={w.todos} />
                <div className="meta">
                  <p>
                    <StatusMark status={w.status} /> {w.year}
                  </p>
                  <p>{w.stack.join(", ")}</p>
                  <p className="links">
                    <Link href={`/work/${w.slug}`}>Read the case study</Link>
                    {w.repo && <Ext href={w.repo}>Source on GitHub</Ext>}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="section wrap" id="index">
          <header>
            <h2>Index</h2>
            <p>Every project, finished or not. Select a row for details.</p>
          </header>
          <Ledger rows={rows} />
        </section>

        <section className="section wrap" id="experience">
          <header>
            <h2>Experience</h2>
          </header>
          <ul className="rows">
            {experience.map((e) => (
              <li key={e.org}>
                <p className="when">{e.dates}</p>
                <p className="what">
                  <strong>{e.href ? <Ext href={e.href}>{e.org}</Ext> : e.org}</strong>
                  <span>
                    {e.role}, {e.place}
                  </span>
                </p>
                <p className="say">{e.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section wrap" id="working-with">
          <header>
            <h2>Working with</h2>
          </header>
          <ul className="rows">
            {workingWith.map((s) => (
              <li key={s.label}>
                <p className="when">{s.label}</p>
                <p className="wide">{s.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section wrap" id="record">
          <header>
            <h2>Record</h2>
          </header>
          <ul className="rows">
            <li>
              <p className="when">{record.education.dates}</p>
              <p className="what">
                <strong>{record.education.school}</strong>
                <span>{record.education.detail}</span>
              </p>
              <p className="say">{record.education.degree}.</p>
            </li>
            <li>
              <p className="when">{record.scholarship.dates}</p>
              <p className="what">
                <strong>{record.scholarship.title}</strong>
                <span>{record.scholarship.by}</span>
              </p>
            </li>
            <li>
              <p className="when">{record.publication.status}</p>
              <p className="what">
                <strong>Paper</strong>
              </p>
              <p className="say">{record.publication.title}.</p>
            </li>
            <li>
              <p className="when">Certificates</p>
              <ul className="certs wide">
                {certs.map((c) => (
                  <li key={c.id}>
                    <span>
                      <a href={c.fileUrl}>{c.title.replace(" — ", ": ")}</a>
                      <small>{c.issuer.replace(" — ", ", ")}</small>
                    </span>
                    <time dateTime={c.date}>{month(c.date)}</time>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </section>
      </main>
      <Contact />
    </>
  );
}
