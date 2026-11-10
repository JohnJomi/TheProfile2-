import type { Metadata } from "next";
import { certificates } from "@/data/certificates";
import { site } from "@/data/site";
import { Kinetic } from "@/components/Kinetic";
import { SayHello } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Courses and credentials John Jomi has completed, with the original certificates.",
  alternates: { canonical: "/certifications" },
};

const month = (iso: string) =>
  new Date(`${iso.slice(0, 7)}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export default function Certifications() {
  const certs = [...certificates].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <section className="page-hero" data-mood="fire">
        <Kinetic lines={["Certifi-", "cations"]} fill={88} />
        <p className="lede">{certs.length} courses and credentials, newest first. Each one opens the original certificate.</p>
      </section>
      <section className="band" data-mood="night">
        <div className="cert-grid">
          {certs.map((c) => (
            <article className="cert" key={c.id}>
              <time dateTime={c.date}>{month(c.date)}</time>
              <h3>{c.title.replace(" — ", ": ")}</h3>
              <p>{c.issuer.replace(" — ", ", ")}</p>
              <a className="link" href={c.fileUrl} target="_blank" rel="noreferrer">
                View certificate
              </a>
            </article>
          ))}
        </div>
      </section>
      <SayHello email={site.email} />
    </>
  );
}
