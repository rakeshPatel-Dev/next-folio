import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-4xl font-bold">404 - Not Found</h2>
      <p className="text-muted-foreground">Could not find the requested project.</p>
      <Button asChild>
        <Link href="/projects">Return to Projects</Link>
      </Button>
    </div>
  )
}