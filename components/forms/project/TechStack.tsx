"use client"

import { useState } from "react"
import { Cpu, Tag, Component, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FieldError from "@/components/forms/FieldError"
import IconRenderer from "./IconRenderer"
import IconInput from "./IconInput"
import { useToast } from "@/components/zenblocks/toast"

type TechItem = {
  label: string
  icon: string
}

type Props = {
  watch: (name: string) => any
  setValue: (
    name: string,
    value: any,
    options?: {
      shouldDirty?: boolean
      shouldTouch?: boolean
      shouldValidate?: boolean
    }
  ) => void
  errors: any
}

export default function TechStack({ watch, setValue, errors }: Props) {

  const { toast } = useToast();

  const techStack: TechItem[] = watch("techStack") ?? []

  const [label, setLabel] = useState("")
  const [icon, setIcon] = useState("")

  const addTech = () => {
    const trimmedLabel = label.trim()

    if (!trimmedLabel) {
      toast({
        title: trimmedLabel,
        description: "Please enter a tech label",
        variant: "error",
      })
      return
    }


    const exists = techStack.some(
      (t) => t.label.toLowerCase() === trimmedLabel.toLowerCase()
    )
    if (exists) return

    setValue(
      "techStack",
      [...techStack, { label: trimmedLabel, icon: icon.trim() }],
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true, // 🔥 REQUIRED
      }
    )

    setLabel("")
    setIcon("")
  }

  const removeTech = (labelToRemove: string) => {
    setValue(
      "techStack",
      techStack.filter((t) => t.label !== labelToRemove),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true, // 🔥 REQUIRED
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-muted-foreground" />
          Tech Stack
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Technology
            </Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Next.js"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Component className="h-4 w-4" />
              Icon (react-icons)
            </Label>
            <IconInput value={icon} onChange={setIcon} />
          </div>
        </div>

        <Button
          type="button"
          onClick={addTech}
          className="w-full sm:w-fit"
        >
          Add Technology
        </Button>

        {/* Error */}
        <FieldError message={errors?.techStack?.message} />

        {/* List */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {techStack.map((tech) => (
              <span
                key={tech.label}
                className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
              >
                {tech.icon && (
                  <IconRenderer name={tech.icon} className="h-4 w-4" />
                )}

                <span>{tech.label}</span>

                <button
                  type="button"
                  title="Remove"
                  onClick={() => removeTech(tech.label)}
                  className="ml-1 hover:opacity-70"
                >
                  <X className="h-4 w-4 rounded-full p-0.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
