"use client"

import { useEffect, useState } from 'react'
import { techQuotes } from '@/data/techQuotes'
import { Dot, Quote, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

function getRandomQuoteIndex() {
  return Math.floor(Math.random() * techQuotes.length)
}

function RandomQuoteContent() {
  const [quote, setQuote] = useState(() => {
    if (techQuotes.length === 0) {
      return { content: 'No quotes available', author: 'Unknown' }
    }
    return techQuotes[0]
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (techQuotes.length > 1) {
      const timeoutId = window.setTimeout(() => {
        setQuote(techQuotes[getRandomQuoteIndex()])
      }, 0)

      return () => window.clearTimeout(timeoutId)
    }
  }, [])

  const getNewQuote = () => {
    setIsLoading(true)
    setIsFading(true)

    setTimeout(() => {
      setQuote(techQuotes[getRandomQuoteIndex()])
      setIsFading(false)
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="mt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl relative max-h-auto shadow-lg dark:shadow-2xl border py-8 px-8 sm:py-10 sm:px-10">

          <div>
            <div className="relative">
              <Quote
                className="rotate-y-180 text-muted-foreground/50 absolute -top-5 -left-5"
                size={30}
              />
              <div
                className={`transition-all duration-300 ease-out ${
                  isFading
                    ? 'opacity-0 translate-y-1 blur-[2px]'
                    : 'opacity-100 translate-y-0 blur-0'
                }`}
              >
                <p className="text-xl font-black font-sans text-center leading-relaxed px-8">
                  {quote.content}
                </p>

                <div className="flex justify-center mt-6">
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    — {quote.author}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={getNewQuote}
            disabled={isLoading}
            title="Get New"
            variant="ghost"
            className="inline-flex absolute bottom-4 right-4 items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ease-in-out hover:shadow-md dark:hover:shadow-lg active:scale-95"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          </Button>
        </div>

        <p className="text-center flex items-center justify-center font-mono text-muted-foreground text-sm mt-4">
          Tech <Dot/> Scripture <Dot/> Wisdom
        </p>
      </div>
    </div>
  )
}

export default RandomQuoteContent