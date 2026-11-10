"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** The page colour follows whichever section with a `data-mood` sits in the middle of the screen. */
export function Mood() {
  const path = usePathname();
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-mood]");
    document.body.dataset.mood = sections[0]?.dataset.mood ?? "fire";
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) document.body.dataset.mood = (e.target as HTMLElement).dataset.mood;
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [path]);
  return null;
}
