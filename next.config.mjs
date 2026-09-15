import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Avoid auto-writing AGENTS.md / CLAUDE.md on every `next dev`
  agentRules: false,
  // Typecheck via `tsc --noEmit` (full next type phase OOMs on 8GB machines)
  typescript: { ignoreBuildErrors: true },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.freetls.fastly.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.last.fm',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.rakeshpatel.me',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    cpus: 2,
    optimizePackageImports: ["lucide-react"],
  },
};

const withMDX = createMDX({
  configPath: 'source.config.ts',
});

export default withMDX(nextConfig);
