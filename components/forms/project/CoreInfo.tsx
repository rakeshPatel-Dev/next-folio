import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Captions, ScrollText, Wallpaper } from "lucide-react"
import { FaInfoCircle } from "react-icons/fa"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import FieldError from "../FieldError"

type Props = {
  register: UseFormRegister<any>
  errors: any
  setValue: any
}

const CoreInfo = ({ register, errors, setValue }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaInfoCircle className="h-5 w-5 text-muted-foreground" />
          Core Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="project-title" className="flex items-center gap-2">
            <Captions className="h-4 w-4" /> Project Title
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="project-title"
            placeholder="Project title"
            {...register("title", { required: "Project title is required" })}
          />
          <FieldError message={errors?.title?.message} />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="project-description" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" /> Description
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="project-description"
            placeholder="Project description"
            rows={4}
            {...register("shortDescription", { required: "Description is required" })}
          />
          <FieldError message={errors?.shortDescription?.message} />
        </div>

        {/* Image */}
        <div className="space-y-1">
          <Label htmlFor="project-image" className="flex items-center gap-2">
            <Wallpaper className="h-4 w-4" />
            Cover Image <span className="text-red-500">*</span>
          </Label>

          <Input
            type="file"
            id="project-image"
            accept="image/*"
            onChange={(e) => setValue("image", e.target.files?.[0] ?? null)}
          />




          <FieldError message={errors?.image?.message} />
        </div>

      </CardContent>
    </Card>
  )
}

export default CoreInfo