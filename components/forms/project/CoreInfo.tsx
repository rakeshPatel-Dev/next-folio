import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Captions, ScrollText, Wallpaper } from "lucide-react"
import { FaInfoCircle } from "react-icons/fa"
import FieldError from "../FieldError"

type Props = {
  register: any
  errors: any
}

const CoreInfo = ({ register, errors }: Props) => {
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
          </Label>
          <Input
            id="project-title"
            placeholder="Project title"
            {...register("title")}
          />
          <FieldError message={errors?.title?.message} />

        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="project-description" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" /> Description
          </Label>
          <Textarea
            id="project-description"
            placeholder="Project description"
            rows={4}
            {...register("shortDescription")}
          />
          <FieldError message={errors?.shortDescription?.message} />
        </div>

        {/* Image */}
        <div className="space-y-1">
          <Label htmlFor="project-image" className="flex items-center gap-2">
            <Wallpaper className="h-4 w-4" /> Cover Image
          </Label>
          <Input type="file" id="project-image" accept="image/*" {...register("image")} />
          <FieldError message={errors?.image?.message} />
        </div>      </CardContent>
    </Card>
  )
}

export default CoreInfo
