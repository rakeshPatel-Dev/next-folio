"use client"

type UploadResult = {
  url: string
  publicId: string
}

export function useCloudinaryUpload() {
  const uploadImage = async (file: File): Promise<UploadResult> => {
    if (!file) throw new Error("No file provided")

    const formData = new FormData()
    formData.append("file", file)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    )

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error?.message || "Image upload failed")
    }

    const data = await res.json()

    return {
      url: data.secure_url,
      publicId: data.public_id,
    }
  }

  return { uploadImage }
}
