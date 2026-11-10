import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, works } from "@/lib/work";
import { Contact, Top } from "@/components/Chrome";
import { Ext, StatusMark, Todos } from "@/components/Bits";
import { hasPlate, Plate } from "@/components/Plate";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => works.map((w) => ({ slug: w.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const w = getWork((await params).slug);
  if (!w) return {};
  return {
    title: w.name,
    description: w.description,
    alternates: { canonical: `/work/${w.slug}` },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();
  const i = works.indexOf(w);
  const prev = works[(i - 1 + works.length) % works.length];
  const next = works[(i + 1) % works.length];
  const s = w.study;

  return (
    <>
      <Top />
      <main className="wrap">
        <header className="case-head">
          <h1>{w.name}</h1>
          {w.kind && <p className="kind">{w.kind}</p>}
        </header>

        <div className="case">
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
              <div>
                <dt>Field</dt>
                <dd>{w.disciplines.join(", ")}</dd>
              </div>
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
            {hasPlate(w.slug) && (
              <figure>
                <Plate slug={w.slug} />
              </figure>
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

        <nav className="pager" aria-label="More work">
          <Link href={`/work/${prev.slug}`}>
            <small>Previous</small>
            <strong>{prev.name}</strong>
          </Link>
          <Link href={`/work/${next.slug}`}>
            <small>Next</small>
            <strong>{next.name}</strong>
          </Link>
        </nav>
      </main>
      <Contact />
    </>
  );
}
