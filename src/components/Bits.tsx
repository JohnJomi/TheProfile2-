import type { Status } from "@/lib/work";

export function StatusMark({ status }: { status: Status }) {
  const kind = status === "Completed" ? "done" : status === "In development" ? "dev" : "confirm";
  return <span className={`status status-${kind}`}>{status}</span>;
}

export function Todos({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="todos">
      {items.map((t) => (
        <li key={t}>[TODO] {t}</li>
      ))}
    </ul>
  );
}

export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

/** A slanted ticker of words. Decorative: the same words appear as text elsewhere. */
export function Tape({ words, tilt = -2 }: { words: string[]; tilt?: number }) {
  const run = [...words, ...words, ...words, ...words];
  return (
    <div className="tape" style={{ rotate: `${tilt}deg` }} aria-hidden="true">
      <div>
        {run.map((w, i) => (
          <span key={i}>
            {w}
            <b>✺</b>
          </span>
        ))}
      </div>
    </div>
  );
}

/** The spinning sticker. */
export function Badge({ href, ring, center }: { href: string; ring: string; center: string }) {
  return (
    <a className="badge" href={href} aria-label={ring.replaceAll(" ✺ ", ", ").replace(" ✺", "")}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="60" />
        <defs>
          <path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="ring">
          <textPath href="#ring">{ring}</textPath>
        </text>
        <text className="mid" x="60" y="68" textAnchor="middle">
          {center}
        </text>
      </svg>
    </a>
  );
}

/** Closing call to action shared by every page except Contact. */
export function SayHello({ email }: { email: string }) {
  return (
    <section className="hello" data-mood="blue">
      <p className="hello-lead">Full-time, contract or advisory</p>
      <a className="big" href={`mailto:${email}`}>
        Say hello
      </a>
      <p className="hello-mail">{email}</p>
    </section>
  );
}
