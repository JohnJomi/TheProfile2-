import type { Metadata } from "next";
import { site } from "@/data/site";
import { Kinetic } from "@/components/Kinetic";
import { CopyEmail } from "@/components/CopyEmail";
import { Ext } from "@/components/Bits";

export const metadata: Metadata = {
  title: "Contact",
  description: `${site.availability}. Email John Jomi at ${site.email}.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <section className="hero" data-mood="blue">
        <p className="hello-lead">Jobs, research, or a project you want built</p>
        <Kinetic lines={["Say", "hello"]} fill={80} />
        <div className="sub">
          <p>Email is the fastest way to reach me. I usually reply within a day.</p>
          <div className="actions">
            <a className="btn" href={`mailto:${site.email}`}>
              Email me
            </a>
            <CopyEmail email={site.email} />
          </div>
        </div>
      </section>
      <section className="band" data-mood="night">
        <dl className="facts">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>{site.availability}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{site.location}</dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <Ext href={site.github}>JohnJomi</Ext>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <Ext href={site.linkedin}>John Jomi</Ext>
            </dd>
          </div>
          <div>
            <dt>Résumé</dt>
            <dd>
              <a href={site.resume}>Download PDF</a>
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
