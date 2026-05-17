import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/8.x/notionists/svg',
      }
    ],
  },
  experimental: {
    optimizePackageImports: [
      "react-icons/si",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/ri",
      "react-icons/io5",
      "react-icons/bi",
      "react-icons/ai",
      "react-icons/tb",
      "react-icons/hi2",
      "react-icons/bs",
      "react-icons/cg",
      "react-icons/fi",
      "react-icons/gi",
      "react-icons/go",
      "react-icons/gr",
      "react-icons/im",
      "react-icons/vsc",
      "react-icons/wi",
    ],
  },
};

const withMDX = createMDX({
  configPath: 'source.config.ts',
});

export default withMDX(nextConfig);   