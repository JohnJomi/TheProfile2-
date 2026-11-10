"use client";

import { useEffect, useRef } from "react";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Font size is set so the longest line fills about this share of the viewport width. */
  fill?: number;
  /** Upper bound for the font size. */
  max?: string;
};

/**
 * Display type where every letter is its own variable-font instance. Letters swell toward
 * the pointer; with no pointer they ripple slowly. Static under reduced motion.
 */
export function Kinetic({ lines, as: Tag = "h1", className = "", fill = 92, max = "22rem" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const longest = Math.max(...lines.map((l) => l.length));

  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...root.querySelectorAll<HTMLSpanElement>("[data-l]")];
    const v = els.map(() => 0.6);
    let boxes: { x: number; y: number }[] = [];
    const measure = () => {
      boxes = els.map((e) => {
        const b = e.getBoundingClientRect();
        return { x: b.left + b.width / 2 + scrollX, y: b.top + b.height / 2 + scrollY };
      });
    };
    let px = -1;
    let py = -1;
    let last = 0;
    let visible = false;
    let raf = 0;
    let frame = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX + scrollX;
      py = e.clientY + scrollY;
      last = performance.now();
    };
    const tick = (ms: number) => {
      if (frame++ % 20 === 0) measure();
      const active = ms - last < 1800 && px >= 0;
      const reach = innerWidth * 0.34;
      els.forEach((el, i) => {
        let target = 0.5 + 0.5 * Math.sin(ms / 620 - i * 0.85);
        if (active) {
          const b = boxes[i];
          const d = Math.hypot(px - b.x, py - b.y);
          const t = Math.max(0, 1 - d / reach);
          target = t * t * 0.95 + 0.05;
        }
        v[i] += (target - v[i]) * 0.12;
        el.style.fontVariationSettings = `"wght" ${Math.round(160 + 840 * v[i])}, "wdth" ${Math.round(28 + 123 * v[i])}`;
      });
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(root);
    addEventListener("pointermove", move, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`kinetic ${className}`}
      aria-label={lines.join(" ")}
      style={{ fontSize: `min(${(fill / longest).toFixed(2)}vw, ${max})` }}
    >
      {lines.map((line, li) => (
        <span className="kl" key={li} aria-hidden="true">
          {[...line].map((c, i) =>
            c === " " ? (
              <span key={i} className="ksp" />
            ) : (
              <span key={i} data-l="">
                {c}
              </span>
            ),
          )}
        </span>
      ))}
    </Tag>
  );
}
