// import { Link } from "react-router-dom"
import Link from "next/link"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import Image from "next/image"

const Header = () => {
  return (
    <header className="font-sans  w-full backdrop-blur-xl shadow-sm py-3 px-6 sticky top-0 z-1">
      <div className="flex items-center flow-row justify-between  max-w-4xl mx-auto">
        <Link href='/' className="flex items-center gap-3 bg-black rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm">
          <Image
            width={16}
            height={16}
            src="/images/logo.webp"
            alt="Logo"
            className="h-16 w-16 object-contain"
          />
        </Link>
        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link href='/projects' className="hover:underline hover:underline-offset-8 transition-all">Projects</Link>

          <Link href='/blog' className="hover:underline hover:underline-offset-8 transition-all">Blogs</Link>

          {/* <Link href="/experience">EXP</Link> */}

          <Link href="/contact" className="hover:underline hover:underline-offset-8 transition-all">Contact</Link>

        </nav>
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}

export default Header
