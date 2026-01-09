
// import Experience from '@/components/sections/exp'
import BlogSection from '@/components/sections/Blog'
import Exp from '@/components/sections/Exp'
import HeroData from '@/components/sections/Hero'
import HomeProjects from '@/components/sections/Project'
import React from 'react'

const page = () => {
  return (
    <>
      <HeroData />
      <div className=' w-full max-w-4xl mx-auto h-auto px-6 sm:px-4 lg:px-0'>
        <Exp />
        <HomeProjects />
        <BlogSection />

      </div >
    </>
  )
}

export default page
