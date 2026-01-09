// import { Link } from "react-router-dom"
import Link from "next/link"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import Image from "next/image"

const Header = () => {


  const headerData = [
    {
      label: "Projects",
      href: "/projects"
    },
    {
      label: "Blog",
      href: "/blog"
    },
    {
      label: "Contact",
      href: "/contact"
    },
    {
      label: "Dashboard",
      href: "/dashboard"
    },
  ]

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
          {headerData.map((data, idx) => (
            <Link key={idx} href={data.href} className="hover:underline hover:underline-offset-8 transition-all">{data.label}</Link>

          ))}

        </nav>
        <AnimatedThemeToggler />
      </div>
    </header>
  )
}

export default Header
