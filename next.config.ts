import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    // Case studies lived at /work/:slug in the previous build.
    return [{ source: "/work/:slug", destination: "/projects/:slug", permanent: true }];
  },
};

export default config;
