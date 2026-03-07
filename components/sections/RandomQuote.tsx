"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Dot, Quote, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'
import { MagneticHover } from '../motion/Reveal'

type Props = {
  author: string,
  content: string
}

const RandomQuote = () => {
  const URL = "/api/quotes";
  const [quotes, setQuotes] = useState<Props | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getRandomQuote = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(URL);
      setQuotes(res.data);
      setError(null)
    } catch (error) {
      console.log("Failed to fetch quote", error);
      setError("Failed to load quote. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

  return (
    <div className=" mt-20 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Card Container */}
        <div className=" rounded-2xl shadow-lg dark:shadow-2xl p-8 md:p-12 border ">

          {/* Quote Content */}
          <div className="space-y-6">
            {/* Quote Text */}
            <div className="relative">
              <Quote className=' rotate-y-180 text-muted' size={50} />
              <p className="text-xl md:text-2xl font-black font-sans text-center leading-relaxed pl-4">
                {error ? (
                  <span className="text-red-500">{error}</span>
                ) : isLoading ? (
                  <span>Loading quote...</span>
                ) : (
                  quotes?.content
                )}
              </p>
            </div>

            {/* Author */}
            <div className="flex  justify-center pt-4">
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                — {quotes?.author || "Author"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent my-8"></div>

          {/* Refresh Button */}
          <div className="flex justify-center">
            <MagneticHover strength={0.5}>

              <Button
                onClick={getRandomQuote}
                disabled={isLoading}
                variant="outline"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out hover:shadow-md dark:hover:shadow-lg active:scale-95"
              >
                <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                <span>Get New</span>
              </Button>
            </MagneticHover>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center flex items-center justify-center font-mono text-muted-foreground text-sm mt-8">Tech Quotes <Dot /> Random</p>
      </div>
    </div>
  )
}

export default RandomQuote