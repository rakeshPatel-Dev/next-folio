
// import Experience from '@/components/sections/exp'
import Exp from '@/components/sections/Exp'
import HeroData from '@/components/sections/Hero'
import HomeProjects from '@/components/sections/Project'
import React from 'react'

const page = () => {
  return (
    <div className=' w-full max-w-4xl mx-auto h-auto px-6 sm:px-4 lg:px-0'>
      <HeroData />
      <Exp />
      <HomeProjects />
    </div >
  )
}

export default page
