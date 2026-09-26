import HeroData from '@/components/sections/Hero'
import { getProjects } from '@/lib/projectSource'
import Exp from '@/components/sections/Exp'
import HomeProjects from '@/components/sections/Project'
import { AboutMe } from '@/components/sections/AboutMe'
import BlogSection from '@/components/sections/Blog'
import { Metadata } from 'next'
import { canonicalUrl, siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: "Rakesh Patel | Full-Stack Engineer | AI-Native Product Development & SaaS",
  description: "Full-stack engineer in Kathmandu, Nepal, building AI-native products and multi-tenant SaaS systems with React, Next.js, TypeScript, and Node.js.",
  keywords: ["Rakesh Patel developer", "Rakesh Patel portfolio", "Rakesh Patel Nepal",
    "Rakesh Patel Kathmandu", "Full-stack engineer Nepal", "Full-Stack Engineer",
    "React developer Kathmandu", "Next.js developer Nepal", "TypeScript developer",
    "MERN stack developer", "Full-stack developer Nepal",
    "AI-native product development", "LLM application development",
    "GenAI developer Nepal", "AI product engineer Nepal", "agentic development",
    "SaaS developer Nepal", "SaaS engineer Kathmandu",
    "multi-tenant SaaS architecture"],
  alternates: {
    canonical: canonicalUrl("/"),
  },
  openGraph: {
    title: "Rakesh Patel | Full-Stack Engineer | AI-Native Product Development & SaaS",
    description: "Full-stack engineer in Kathmandu, Nepal, building AI-native products and multi-tenant SaaS systems with React, Next.js, TypeScript, and Node.js.",
    url: siteConfig.url,
    siteName: "Rakesh Patel Portfolio",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Rakesh Patel Portfolio",
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakesh Patel | Full-Stack Engineer | AI-Native Product Development & SaaS",
    description: "Full-stack engineer in Kathmandu, Nepal, building AI-native products and multi-tenant SaaS systems with React, Next.js, TypeScript, and Node.js.",
    images: [siteConfig.ogImage],
    creator: siteConfig.links.twitter.split("/").pop(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const page = async () => {
  // Fetch projects from static content for better performance
  const allProjects = getProjects()


  return (
    <>
      <HeroData />
      <div className=' selection:bg-neutral-800 dark:selection:bg-neutral-200 w-full max-w-3xl mx-auto h-auto'>
        <Exp />
        <HomeProjects initialProjects={allProjects} />
        <AboutMe />
        <BlogSection />

      </div >
    </>
  )
}

export default page
