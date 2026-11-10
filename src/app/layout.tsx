import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { Mood } from "@/components/Mood";
import { Nav } from "@/components/Nav";
import { Ext } from "@/components/Bits";
import "./globals.css";

const flex = localFont({
  src: "../fonts/roboto-flex-latin-standard.woff2",
  variable: "--font-flex",
  weight: "100 1000",
  declarations: [{ prop: "font-stretch", value: "25% 151%" }],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s, ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#FF4A1C" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={flex.variable}>
      <body data-mood="fire">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <Mood />
        <main id="main">{children}</main>
        <footer className="foot">
          <span>{site.name}, 2026. Set in Roboto Flex.</span>
          <span className="foot-links">
            <Ext href={site.github}>GitHub</Ext>
            <Ext href={site.linkedin}>LinkedIn</Ext>
            <a href={site.resume}>Résumé</a>
          </span>
        </footer>
      </body>
    </html>
  );
}
