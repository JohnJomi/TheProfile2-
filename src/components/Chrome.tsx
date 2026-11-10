import Link from "next/link";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { Ext } from "./Bits";

export function Top() {
  return (
    <header className="top wrap">
      <Link className="home" href="/">
        {site.name}
      </Link>
      <nav aria-label="Sections">
        <Link href="/#work">Work</Link>
        <Link href="/#index">Index</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#record">Record</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}

export function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <div className="wrap">
          <p>{site.availability}. The fastest way to reach me is email.</p>
          <a className="mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="links">
            <Ext href={site.github}>GitHub</Ext>
            <Ext href={site.linkedin}>LinkedIn</Ext>
            <a href={site.resume}>Résumé (PDF)</a>
          </div>
        </div>
      </section>
      <footer className="foot wrap">
        <span>{site.name}, 2026. Set in Archivo and Newsreader.</span>
        <ThemeToggle />
      </footer>
    </>
  );
}
