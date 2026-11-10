import type { NextConfig } from "next";

// Old URLs from the previous site keep working.
const anchors: Record<string, string> = {
  "/about": "/",
  "/projects": "/#index",
  "/skills": "/#working-with",
  "/experience": "/#experience",
  "/certifications": "/#record",
  "/contact": "/#contact",
};

const config: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      ...Object.entries(anchors).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default config;
