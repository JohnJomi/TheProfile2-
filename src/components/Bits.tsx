import type { Status } from "@/lib/work";

export function StatusMark({ status }: { status: Status }) {
  const kind =
    status === "Completed" ? "done" : status === "In development" ? "dev" : "confirm";
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
