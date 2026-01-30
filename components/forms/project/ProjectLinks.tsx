import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, FolderSymlink, Github } from "lucide-react"
import FieldError from "../FieldError"

type Props = {
  register: any
  errors: any
}

const ProjectLinks = ({ register, errors }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderSymlink className="h-5 w-5 text-muted-foreground" />
          Project Links
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Live URL */}
        <div className="space-y-1">
          <Label className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" /> Live URL
          </Label>
          <Input
            placeholder="https://example.com"
            {...register("liveUrl")}
          />
          <FieldError message={errors?.liveUrl?.message} />
        </div>

        {/* Repo URL */}
        <div className="space-y-1">
          <Label className="flex items-center gap-2">
            <Github className="h-4 w-4" /> Source Code (optional)
          </Label>
          <Input
            placeholder="https://github.com/username/repo"
            {...register("repoUrl")}
          />
          <FieldError message={errors?.repoUrl?.message} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectLinks
