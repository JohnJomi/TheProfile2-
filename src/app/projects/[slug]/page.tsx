import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, works } from "@/lib/work";
import { site } from "@/data/site";
import { Ext, SayHello, StatusMark, Todos } from "@/components/Bits";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => works.map((w) => ({ slug: w.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = getWork((await params).slug);
  if (!w) return {};
  return { title: w.name, description: w.description, alternates: { canonical: `/projects/${w.slug}` } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();
  const i = works.indexOf(w);
  const prev = works[(i - 1 + works.length) % works.length];
  const next = works[(i + 1) % works.length];
  const s = w.study;

  return (
    <>
      <section className="page-hero" data-mood="fire">
        <p style={{ marginBottom: 18 }}>
          <Link className="link" href="/projects">
            All projects
          </Link>
        </p>
        <h1 className="case-title">{w.name}</h1>
        {w.kind && <p className="case-kind">{w.kind}</p>}
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
      </section>

      <div className="case" data-mood="night">
        <aside>
          <dl className="facts">
            <div>
              <dt>Status</dt>
              <dd>
                <StatusMark status={w.status} />
              </dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{w.year}</dd>
            </div>
            {w.disciplines.length > 0 && (
              <div>
                <dt>Field</dt>
                <dd>{w.disciplines.join(", ")}</dd>
              </div>
            )}
            <div>
              <dt>Built with</dt>
              <dd>{w.stack.join(", ")}</dd>
            </div>
            {(w.repo || w.live) && (
              <div>
                <dt>Links</dt>
                <dd>
                  {w.repo && <Ext href={w.repo}>Source on GitHub</Ext>}
                  {w.repo && w.live && <br />}
                  {w.live && <Ext href={w.live}>Open the live app</Ext>}
                </dd>
              </div>
            )}
          </dl>
          <Todos items={w.todos} />
        </aside>

        <article>
          <p className="summary">{s?.summary ?? w.description}</p>
          {w.note && <p className="note">{w.note}</p>}
          {w.slug === "tycoon-2fa-detection" && (
            <p className="note">
              The architecture and scoring design are specified. The detection layers are not yet built, so there are no
              measured results to report.
            </p>
          )}
          {s?.problem && (
            <>
              <h2>The problem</h2>
              <p>{s.problem}</p>
            </>
          )}
          {!s && w.long && (
            <>
              <h2>How it works</h2>
              <p>{w.long}</p>
            </>
          )}
          {s?.sections.map((sec) => (
            <section key={sec.heading}>
              <h2>{sec.heading}</h2>
              {sec.body && <p>{sec.body}</p>}
              {sec.bullets && (
                <ul className="bul">
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {sec.table && (
                <table>
                  <thead>
                    <tr>
                      <th scope="col">{sec.table.headers[0]}</th>
                      <th scope="col">{sec.table.headers[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.table.rows.map(([a, b]) => (
                      <tr key={a}>
                        <td>{a}</td>
                        <td>{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ))}
          {s?.stack && s.stack.length > 0 && (
            <section>
              <h2>Stack</h2>
              <table>
                <tbody>
                  {s.stack.map((g) => (
                    <tr key={g.label}>
                      <td>{g.label}</td>
                      <td>{g.items.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </article>
      </div>

      <nav className="pager" aria-label="More projects" data-mood="pink">
        <Link href={`/projects/${prev.slug}`}>
          <small>Previous project</small>
          <strong>{prev.name}</strong>
        </Link>
        <Link href={`/projects/${next.slug}`}>
          <small>Next project</small>
          <strong>{next.name}</strong>
        </Link>
      </nav>
      <SayHello email={site.email} />
    </>
  );
}
