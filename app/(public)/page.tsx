
// import Experience from '@/components/sections/exp'
import { AboutMe } from '@/components/sections/AboutMe'
import BlogSection from '@/components/sections/Blog'
import Exp from '@/components/sections/Exp'
import HeroData from '@/components/sections/Hero'
import HomeProjects from '@/components/sections/Project'

const page = () => {
  return (
    <>
      <HeroData />
      <div className=' selection:bg-neutral-800 dark:selection:bg-neutral-200 w-full max-w-3xl mx-auto h-auto px-6 sm:px-4 lg:px-0'>
        <Exp />
        <HomeProjects />
        <AboutMe />
        <BlogSection />

      </div >
    </>
  )
}

export default page
