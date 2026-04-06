
import HeroData from '@/components/sections/Hero'
import { getProjects } from '@/utils/getProjects.server'
import Exp from '@/components/sections/Exp'
import HomeProjects from '@/components/sections/Project'
import { AboutMe } from '@/components/sections/AboutMe'
import BlogSection from '@/components/sections/Blog'
import RandomQuote from '@/components/sections/RandomQuote'

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
