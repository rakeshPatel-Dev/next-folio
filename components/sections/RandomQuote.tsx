"use client"

import { useState } from 'react'
import { techQuotes } from '@/data/techQuotes'
import { Dot, Quote, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

function RandomQuoteContent() {
  const [quote, setQuote] = useState(() => {
    if (techQuotes.length === 0) {
      return { content: 'No quotes available', author: 'Unknown' }
    }
    const idx = Math.floor(Math.random() * techQuotes.length)
    return techQuotes[idx]
  })
  const [isLoading, setIsLoading] = useState(false)

  const getNewQuote = () => {
    setIsLoading(true)
    setTimeout(() => {
      const idx = Math.floor(Math.random() * techQuotes.length)
      setQuote(techQuotes[idx])
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className=" mt-20 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className=" rounded-2xl shadow-lg dark:shadow-2xl p-8 md:p-12 border ">

          <div className="space-y-6">
            <div className="relative">
              <Quote className=' rotate-y-180 text-muted' size={50} />
              <p className="text-xl md:text-2xl font-black font-sans text-center leading-relaxed pl-4">
                {quote.content}
              </p>
            </div>

            <div className="flex  justify-center pt-4">
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                — {quote.author}
              </p>
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent my-8"></div>

          <div className="flex justify-center">
            <Button
              onClick={getNewQuote}
              disabled={isLoading}
              variant="outline"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out hover:shadow-md dark:hover:shadow-lg active:scale-95"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              <span>Get New</span>
            </Button>
          </div>
        </div>

        <p className="text-center flex items-center justify-center font-mono text-muted-foreground text-sm mt-8">Tech Quotes <Dot /> Random</p>
      </div>
    </div>
  )
}

export default RandomQuoteContent

