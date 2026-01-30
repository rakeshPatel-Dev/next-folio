import { Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BlogFormValues } from "@/config/blogFormSchema"
import { FaInfoCircle } from "react-icons/fa"
import { Captions, ScrollText, Wallpaper } from "lucide-react"

export function BlogBasics({ control }: { control: Control<BlogFormValues> }) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <FaInfoCircle className="h-5 w-5 text-muted-foreground" />
        <CardTitle>Blog Basics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Captions className=" h-4 w-4 text-muted-foreground" />
                Title
              </FormLabel>
              <FormControl>
                <Input placeholder="Blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <ScrollText className=" h-4 w-4 text-muted-foreground" />
                Description
              </FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="coverImage"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <FormItem>
              <FormLabel>
                <Wallpaper className="h-4 w-4 text-muted-foreground" />
                Cover Image
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  name={name}
                  ref={ref}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) onChange(file)
                  }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />      </CardContent>
    </Card>
  )
}  