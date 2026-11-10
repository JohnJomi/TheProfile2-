import Link from "next/link";
import { Kinetic } from "@/components/Kinetic";

export default function NotFound() {
  return (
    <section className="hero" data-mood="fire">
      <Kinetic lines={["404"]} fill={60} />
      <div className="sub">
        <p>Nothing lives at this address. The projects are a good place to start.</p>
        <div className="actions">
          <Link className="btn" href="/projects">
            See the projects
          </Link>
          <Link className="btn ghost" href="/">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
