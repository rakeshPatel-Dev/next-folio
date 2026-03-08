import { ThemeProvider } from "next-themes"
import "../globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function AdminPublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
