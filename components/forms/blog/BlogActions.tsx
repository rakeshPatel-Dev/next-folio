"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/zenblocks/toast"
import { useRouter } from "next/navigation"
export function BlogActions({ path }: { path: string }) {
  const router = useRouter()
  const { toast } = useToast();

  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          toast({
            title: "Cancelled",
            description: "No changes were saved.",
            variant: "warning"
          })
          router.push(path)
        }}
      >
        Cancel
      </Button>
      <Button type="submit">Save Blog</Button>
    </div>
  )
}
