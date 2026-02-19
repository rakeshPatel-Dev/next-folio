"use client"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="w-full mt-10 max-w-4xl mb-20 mx-auto py-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-center ">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-sans text-sm text-muted-foreground text-center pt-4"
      >
        &copy; {new Date().getFullYear()} Rakesh Patel · Built with Next.js & Tailwind      </motion.p>
    </footer>

  )
}

export default Footer
