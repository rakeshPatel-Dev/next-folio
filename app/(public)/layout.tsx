import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/layout/Footer";
import { AppDock } from "@/components/sections/GlobalDock";
import { siteConfig } from "@/lib/site-config";
import { RootProvider } from "fumadocs-ui/provider/next"
import { PageTransition } from "@/components/motion/PageTransition";
import { ToastProvider } from "@/components/zenblocks/toast";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/sections/JsonLd";
import { Noise } from "@/components/ui/noise";
import { GridPattern } from "@/components/ui/grid-pattern";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.links.twitter.split("/").pop(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  appleWebApp: {
    title: siteConfig.name,
  },
  verification: {
    google: siteConfig.googleVerification,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* LCP Preload */}
        <link
          rel="preload"
          as="image"
          href="/images/the-hero.webp"
          type="image/webp"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Noise />
          <GridPattern />
          <Header />
          <ToastProvider>
            <PageTransition>
              <RootProvider>
                <JsonLd />
                {children}
                <Toaster />
              </RootProvider>
            </PageTransition>
          </ToastProvider>
          <AppDock />
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}