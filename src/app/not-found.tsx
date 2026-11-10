import Link from "next/link";
import { Top } from "@/components/Chrome";

export default function NotFound() {
  return (
    <>
      <Top />
      <main className="wrap">
        <header className="case-head">
          <h1>No page here</h1>
          <p className="kind">
            This address doesn&rsquo;t match anything on the site. <Link href="/#index">Go to the index of projects</Link>.
          </p>
        </header>
      </main>
    </>
  );
}
