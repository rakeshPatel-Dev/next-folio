
import HeroData from '@/components/sections/Hero'
import { getProjects } from '@/utils/getProjects.server'
import dynamic from 'next/dynamic'

// Dynamically import below-the-fold heavy components
const Exp = dynamic(() => import('@/components/sections/Exp'))
const HomeProjects = dynamic(() => import('@/components/sections/Project'))
const AboutMe = dynamic(() => import('@/components/sections/AboutMe').then(m => m.AboutMe))
const BlogSection = dynamic(() => import('@/components/sections/Blog'))
const RandomQuote = dynamic(() => import('@/components/sections/RandomQuote'))

export const revalidate = 3600; // Cache pages for 1 hour to reduce TTFB

const page = async () => {
  // Fetch projects on server for better performance
  const allProjects = await getProjects()
  const completedProjects = allProjects.filter(p => p.status === 'completed')

  return (
    <>
      <HeroData />
      <div className=' selection:bg-neutral-800 dark:selection:bg-neutral-200 w-full max-w-3xl mx-auto h-auto px-6 sm:px-4 lg:px-0'>
        <Exp />
        <HomeProjects initialProjects={completedProjects} />
        <AboutMe />
        <BlogSection />
        <RandomQuote />

      </div >
    </>
  )
}

export default page
