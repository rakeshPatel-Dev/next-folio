"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CldImage } from 'next-cloudinary';

type FormValues = {
  title: string
  image: FileList
}

export default function DemoForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const [imageUrl, setImageUrl] = useState("")

  const onSubmit = async (data: FormValues) => {
    if (!data.image || data.image.length === 0) {
      toast.error("Please select an image")
      return
    }

    const file = data.image[0]
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      )

      const result = await res.json()
      if (result.secure_url) {
        setImageUrl(result.secure_url)
        toast.success("Image uploaded successfully!")
        reset()
      } else {
        toast.error("Upload failed")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Title" {...register("title")} />

        <Input type="file" accept="image/*" {...register("image")} />

        <Button type="submit">Upload Image</Button>
      </form>

      {imageUrl && (
        <div className="mt-4">
          <p className="font-semibold">Uploaded Image:</p>
          {/* <Image width={100} height={100} src={imageUrl} alt="Uploaded" className="w-full rounded-md mt-2" /> */}
          <CldImage
            width="960"
            height="600"
            src={imageUrl}
            sizes="100vw"
            alt="Description of my image"
          />
        </div>
      )}
    </div>
  )
}
