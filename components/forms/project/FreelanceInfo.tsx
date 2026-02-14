"use client"

import { Briefcase, Eye, EyeOff, MapPin, Building2, User } from "lucide-react"
import { Controller } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import FieldError from "@/components/forms/FieldError"

type Props = {
  control: any
  register: any
  watch: any
  errors: any
}

export default function FreelanceInfo({
  control,
  register,
  watch,
  errors,
}: Props) {
  const isFreelance = watch("isFreelance")
  const isClientPublic = watch("isClientPublic")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          Freelance / Client Info
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* isFreelance toggle */}
        <Controller
          name="isFreelance"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Checkbox
                id="isFreelance"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="isFreelance">
                This project was done as freelance work
              </Label>
            </div>
          )}
        />

        {/* Client fields (conditional) */}
        {isFreelance && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Client Name
                </Label>
                <Input
                  placeholder="ABC Pvt. Ltd."
                  {...register("clientName")}
                />
                <FieldError message={errors?.clientName?.message} />
              </div>

              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Client Location
                </Label>
                <Input
                  placeholder="Kathmandu, Nepal"
                  {...register("clientLocation")}
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <Label className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Client Industry
                </Label>
                <Input
                  placeholder="Fintech, Healthcare, Education…"
                  {...register("clientIndustry")}
                />
              </div>
            </div>

            {/* Public / Private */}
            <Controller
              name="isClientPublic"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3 pt-2">
                  <Checkbox
                    id="isClientPublic"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label
                    htmlFor="isClientPublic"
                    className="flex items-center gap-2"
                  >
                    {isClientPublic ? (
                      <>
                        <Eye className="h-4 w-4" />
                        Client name can be shown publicly
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Client name is confidential
                      </>
                    )}
                  </Label>
                </div>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}
