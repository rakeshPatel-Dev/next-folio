import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BookType, FileChartLine, Layers } from 'lucide-react'
import { Controller } from 'react-hook-form'
import FieldError from '../FieldError'

type Props = {
  control: any
  errors: any
}

const ProjectMeta = ({ control, errors }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-muted-foreground" /> Project Meta
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project Type */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <BookType className="h-4 w-4" /> Project Type
          </Label>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullStack">Full Stack</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError message={errors?.type?.message} />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <FileChartLine className="h-4 w-4" /> Status
          </Label>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="building">Building</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError message={errors?.status?.message} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectMeta
