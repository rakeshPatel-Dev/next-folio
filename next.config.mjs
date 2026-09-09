import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Avoid auto-writing AGENTS.md / CLAUDE.md on every `next dev`
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Only packs used by IconRenderer / content — listing every react-icons
    // pack made webpack OOM (~4GB) on first compile of `/`.
    optimizePackageImports: [
      "react-icons/fa",
      "react-icons/si",
      "react-icons/bi",
      "react-icons/ri",
      "react-icons/ai",
      "react-icons/io5",
      "react-icons/tb",
      "lucide-react",
    ],
  },
};

const withMDX = createMDX({
  configPath: 'source.config.ts',
});

export default withMDX(nextConfig);
