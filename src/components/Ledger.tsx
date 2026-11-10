"use client";

import Link from "next/link";
import { useState } from "react";
import type { Discipline, Status, Work } from "@/lib/work";
import { StatusMark, Todos, Ext } from "./Bits";

type Row = Omit<Work, "study" | "long">;
type Filter = "All" | Status | Discipline;

const filters: Filter[] = [
  "All",
  "Completed",
  "In development",
  "AI and ML",
  "Full-stack",
  "Security",
  "Research",
];

export function Ledger({ rows }: { rows: Row[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = rows.filter(
    (r) =>
      filter === "All" || r.status === filter || r.disciplines.includes(filter as Discipline),
  );

  return (
    <div className="ledger">
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
        <span className="count" aria-live="polite">
          {shown.length} of {rows.length}
        </span>
      </div>

      {shown.map((r) => (
        <details key={r.slug} name="ledger">
          <summary>
            <span className="l-name">{r.name}</span>
            <span className="l-kind">{r.kind || r.stack.slice(0, 3).join(", ")}</span>
            <span className="l-year">{r.year}</span>
            <span className="l-status">
              <StatusMark status={r.status} />
            </span>
          </summary>
          <div className="l-body">
            <div>
              <p>{r.description}</p>
              {r.note && <p className="note">{r.note}</p>}
              <Todos items={r.todos} />
            </div>
            <div className="l-side">
              <p>{r.stack.join(", ")}</p>
              <p className="links">
                <Link href={`/work/${r.slug}`}>Read the case study</Link>
                {r.repo && <Ext href={r.repo}>Source on GitHub</Ext>}
                {r.live && <Ext href={r.live}>Open the live app</Ext>}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
