import { createMDX } from 'fumadocs-mdx/next';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cloud.umami.is https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data: https:;
    connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev https://*.vercel-insights.com https://*.vercel-scripts.com https://ws.audioscrobbler.com;
    frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.loom.com;
    media-src 'self' https:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Avoid auto-writing AGENTS.md / CLAUDE.md on every `next dev`
  agentRules: false,
  // Typecheck via `tsc --noEmit` (full next type phase OOMs on 8GB machines)
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
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
      {
        protocol: 'https',
        hostname: 'snaphost.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/**',
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
