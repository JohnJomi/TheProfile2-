"use client";

import { useState } from "react";
import type { Discipline } from "@/lib/work";
import { WorkList, type Row } from "./WorkList";

const fields: (Discipline | "All")[] = ["All", "AI and ML", "Full-stack", "Security", "Research"];

export function ProjectFilter({ rows }: { rows: (Row & { fields: Discipline[] })[] }) {
  const [f, setF] = useState<Discipline | "All">("All");
  const shown = f === "All" ? rows : rows.filter((r) => r.fields.includes(f));
  return (
    <>
      <div className="chips" role="group" aria-label="Filter by field">
        {fields.map((x) => (
          <button key={x} aria-pressed={f === x} onClick={() => setF(x)}>
            {x}
            <small>{x === "All" ? rows.length : rows.filter((r) => r.fields.includes(x)).length}</small>
          </button>
        ))}
      </div>
      <p className="count" aria-live="polite">
        Showing {shown.length} of {rows.length} projects
      </p>
      <WorkList rows={shown} />
    </>
  );
}
