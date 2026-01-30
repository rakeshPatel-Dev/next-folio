"use client"

type UploadResult = {
  url: string
  publicId: string
}

export function useCloudinaryUpload() {
  const uploadImage = async (file: File): Promise<UploadResult> => {
    if (!file) throw new Error("No file provided")

      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

      if(!uploadPreset || !cloudName) {
        throw new Error ("Cloudinary preset or cloud in .env file is not configured")
      }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!res.ok) {
      let errorMessage = "Image upload failed"
      try {
        const error = await res.json()
        errorMessage = error.error?.message || errorMessage
      } catch {
        // Response wasn't JSON, use status text
        errorMessage = `Image upload failed: ${res.status} ${res.statusText}`
      }
      throw new Error(errorMessage)
    }
    const data = await res.json()

    return {
      url: data.secure_url,
      publicId: data.public_id,
    }
  }

  return { uploadImage }
}
