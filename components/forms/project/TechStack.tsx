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

type TechItem = {
  label: string
  icon: string
}

type Props = {
  watch: any
  setValue: any
  errors: string
}

export default function TechStack({ watch, setValue, errors }: Props) {
  const techStack: TechItem[] = watch("techStack") || []

  const [newTechLabel, setNewTechLabel] = useState("")
  const [newTechIcon, setNewTechIcon] = useState("")

  const addTech = () => {
    if (!newTechLabel.trim()) return

    if (
      techStack.some(
        (t) => t.label.toLowerCase() === newTechLabel.toLowerCase()
      )
    )
      return

    setValue("techStack", [
      ...techStack,
      { label: newTechLabel, icon: newTechIcon || "" },
    ])

    setNewTechLabel("")
    setNewTechIcon("")
  }

  const removeTech = (index: number) => {
    setValue("techStack", techStack.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-muted-foreground" /> Tech Stack
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Manual add */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" /> Tech Label
            </Label>
            <Input
              value={newTechLabel}
              onChange={(e) => setNewTechLabel(e.target.value)}
              placeholder="e.g. Next.js"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Component className="h-4 w-4" /> Icon
            </Label>
            <IconInput
              value={newTechIcon}
              onChange={setNewTechIcon}
            />
          </div>
        </div>

        <Button type="button" onClick={addTech}>
          Add Technology
        </Button>

        {/* RHF error */}
        <FieldError message={errors?.techStack?.message} />

        {/* Selected tech list */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
              >
                <IconRenderer name={tech.icon} className="h-4 w-4" />
                <span>{tech.label}</span>

                <button
                  title="remove"
                  type="button"
                  onClick={() => removeTech(index)}
                  className="ml-1 hover:opacity-70"
                >
                  <X className="h-4 w-4 hover:bg-muted rounded-full p-0.2 transition-all" />
                </button>
              </span>
            ))}

          </div>
        )}
      </CardContent>
    </Card>
  )
}
