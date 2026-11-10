"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const pages = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const path = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;
  const setOpen = (v: boolean) => setOpenOn(v ? path : null);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <header className={`nav${open ? " open" : ""}`}>
      <Link className="mark" href="/" aria-label={`${site.name}, home`}>
        JJ
      </Link>
      <nav aria-label="Main">
        <ul>
          {pages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} aria-current={current(p.href)}>
                {p.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.resume}>Résumé</a>
          </li>
        </ul>
      </nav>
      <button className="menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <div className="sheet" id="menu" hidden={!open}>
        <ul>
          {[{ href: "/", label: "Home" }, ...pages].map((p) => (
            <li key={p.href}>
              <Link href={p.href} aria-current={p.href === "/" ? (path === "/" ? "page" : undefined) : current(p.href)}>
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
        <p>
          <a href={site.resume}>Download résumé (PDF)</a>
        </p>
      </div>
    </header>
  );
}
