"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Row = { href: string; title: string; side: string[]; note: string };

const colors = ["#FF4A1C", "#FFC4E4", "#2233FF", "#C8FF2E"];

/** Huge condensed titles that widen on hover, with a colour plate that trails the pointer. */
export function WorkList({ rows }: { rows: Row[] }) {
  const plate = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState<number | null>(null);

  useEffect(() => {
    const el = plate.current;
    if (!el || matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, rot = 0, raf = 0;
    const move = (e: PointerEvent) => {
      tx = Math.min(e.clientX, innerWidth - 290);
      ty = e.clientY;
    };
    const f = () => {
      const dx = tx - x;
      x += dx * 0.14;
      y += (ty - y) * 0.14;
      rot += (Math.max(-14, Math.min(14, dx * 0.25)) - rot) * 0.15;
      el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      raf = requestAnimationFrame(f);
    };
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(f);
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const cur = on === null ? null : rows[on];
  return (
    <>
      <ol className="worklist">
        {rows.map((r, i) => (
          <li key={r.href}>
            <Link href={r.href} onPointerEnter={() => setOn(i)} onPointerLeave={() => setOn(null)}>
              <strong>{r.title}</strong>
              <em>
                {r.side.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </em>
            </Link>
          </li>
        ))}
      </ol>
      <div
        ref={plate}
        className={`plate${cur ? " on" : ""}`}
        style={{ background: on === null ? undefined : colors[on % colors.length] }}
        aria-hidden="true"
      >
        <b>{cur?.title[0]}</b>
        <span>{cur?.note}</span>
      </div>
    </>
  );
}
