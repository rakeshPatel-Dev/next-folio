import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/layout/Footer";
import { AppDock } from "@/components/sections/GlobalDock";
import { APP_NAME, PUBLIC_TITLE } from "@/lib/constants";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: {
    default: `${PUBLIC_TITLE}`,
    template: `%s | ${APP_NAME}`
  },
  description: "Portfolio of Rakesh Patel, a full-stack developer based in Kathmandu, Nepal. Showcasing projects, case studies, and expertise in React, Next.js, TypeScript, Tailwind CSS, and software development best practices. Performance-focused, SEO-optimized, and production-ready.",
  keywords: [
    "Rakesh Patel",
    "portfolio",
    "Kathmandu",
    "Nepal",
    "full-stack developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "web development",
    "projects",
    "case studies",
    "software engineer"
  ],
  authors: [{ name: "Rakesh Patel" }],
  creator: "Rakesh Patel",
  openGraph: {
    title: "Rakesh Patel | Full-Stack Developer Portfolio",
    description: "Explore the professional projects, technical skills, and case studies of Rakesh Patel, a full-stack developer based in Kathmandu, Nepal. Built with Next.js, TypeScript, and Tailwind CSS for performance and SEO optimization.",
    url: "https://your-portfolio-url.com", // replace with live URL
    siteName: "Rakesh Patel Portfolio",
    type: "website",
    locale: "en_NP",
    images: [
      {
        url: "https://your-portfolio-url.com/og-image.png", // optional OG image
        width: 1200,
        height: 630,
        alt: "Rakesh Patel Full-Stack Developer Portfolio Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakesh Patel | Full-Stack Developer Portfolio",
    description: "Portfolio of Rakesh Patel, showcasing projects, case studies, and expertise in React, Next.js, TypeScript, and Tailwind CSS. Based in Kathmandu, Nepal.",
    images: ["https://your-portfolio-url.com/og-image.png"], // optional
    creator: "@RakeshPatelDev", // optional Twitter handle
  },
  metadataBase: new URL("https://your-portfolio-url.com"), // base URL for relative paths
  alternates: {
    canonical: "https://your-portfolio-url.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <AppDock />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}