import { LocationTag } from '@/components/location-tag'
import { Button } from '@/components/ui/button'
import { Highlighter } from '@/components/ui/highlighter'
import { Ripple } from '@/components/ui/ripple'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HeroData = () => {
  return (
    <div>
      <section
        className="mb-2 relative h-170 w-full flex flex-col items-center justify-center text-center rounded-md overflow-hidden"
      >
        {/* Main Content */}
        <div className=" flex flex-col items-center gap-4 px-6 animate-fade-in-up">
          {/* Floating Badge */}
          <LocationTag city="Kathmandu" country="Nepal" timezone="NPT" />
          {/* Name */}
          <h1 className="font-sans  text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-primary drop-shadow-lg translate-z-20 text-center">
            Rakesh Patel
          </h1>
          <p className="leading-loose text-black/70 dark:text-gray-200 font-body sm:text-lg md:text-xl lg:text-2xl max-w-3xl">
            A{" "}
            <Highlighter action="underline" color="#FF9800">
              <span className="font-bold font-sans">
                Frontend Developer
              </span>
            </Highlighter>{" "}
            focused on clean interfaces, motion, and usability.

          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 translate-z-10">
            <Link href="/projects"
              rel="prefetch"
            >
              <Button size="lg">
                View My Work

              </Button>
            </Link>
            <a
              href="/docs/Rakesh Patel CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="cursor-pointer">
                View Resume
                <ArrowUpRight />
              </Button>
            </a>

          </div>
        </div>
        <div
          id="toastContainer"
          className="fixed top-5 right-5 flex flex-col gap-2 z-50"
        />
        <div>
          <Ripple />
        </div>
      </section>
    </div>
  )
}

export default HeroData
