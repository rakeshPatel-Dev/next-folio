

import Experience from '@/components/layout/Home/Exp'
import HeroData from '@/components/layout/Home/HeroData'
import HomeProjects from '@/components/layout/Home/HomeProjects'
import React from 'react'

const page = () => {
  return (
    <div className=' w-full max-w-4xl mx-auto h-auto px-6 sm:px-4 lg:px-0'>
      <HeroData />
      <Experience />
      <HomeProjects />
    </div >
  )
}

export default page
