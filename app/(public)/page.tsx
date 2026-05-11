
import dynamic from 'next/dynamic'
import HeroData from '@/components/sections/Hero'
import { getProjects } from '@/utils/getProjects.server'

// Below the fold components
const Exp = dynamic(() => import('@/components/sections/Exp'))
const HomeProjects = dynamic(() => import('@/components/sections/Project'))
const AboutMe = dynamic(() => import('@/components/sections/AboutMe').then(mod => mod.AboutMe))
const BlogSection = dynamic(() => import('@/components/sections/Blog'))
const RandomQuote = dynamic(() => import('@/components/sections/RandomQuote'))

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
