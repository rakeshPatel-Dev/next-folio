function FooterCopy() {
  return (
    <p className="font-sans text-sm text-muted-foreground text-center pt-4">
      &copy; {new Date().getFullYear()} Rakesh Patel · Built with Next.js & Tailwind
    </p>
  )
}

const Footer = () => {
  return (
    <footer className="w-full mt-10 max-w-4xl mb-20 mx-auto py-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-center">
      <FooterCopy />
    </footer>
  )
}

export default Footer
