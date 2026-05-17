import HeroData from '@/components/sections/Hero'
import { getProjects } from '@/utils/getProjects.server'
import Exp from '@/components/sections/Exp'
import HomeProjects from '@/components/sections/Project'
import { AboutMe } from '@/components/sections/AboutMe'
import BlogSection from '@/components/sections/Blog'
import RandomQuote from '@/components/sections/RandomQuote'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: "Rakesh Patel | Portfolio | Full Stack Developer",
  description: "Explore the portfolio of Rakesh Patel, a Full Stack Developer specializing in React, Next.js, and MERN. Showcasing modern web experiences, technical blogs, and creative projects.",
  keywords: ["Rakesh Patel", "Frontend Developer", "Full Stack Developer",
    "React Developer", "Next.js Portfolio", "Web Developer Nepal"],
  openGraph: {
    title: "Rakesh Patel | Portfolio | Full Stack Developer",
    description: "Explore the portfolio of Rakesh Patel, a Full Stack Developer specializing in React, Next.js, and MERN. Showcasing modern web experiences, technical blogs, and creative projects.",
    url: siteConfig.url,
    siteName: "Rakesh Patel Portfolio",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Rakesh Patel Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
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

export const revalidate = 3600; // Cache pages for 1 hour to reduce TTFB

const page = async () => {
  // Fetch projects on server for better performance
  const allProjects = await getProjects()


  return (
    <>
      <HeroData />
      <div className=' selection:bg-neutral-800 dark:selection:bg-neutral-200 w-full max-w-3xl mx-auto h-auto px-6 sm:px-4 lg:px-0'>
        <Exp />
        <HomeProjects initialProjects={allProjects} />
        <AboutMe />
        <BlogSection />
        <RandomQuote />

      </div >
    </>
  )
}

export default page
