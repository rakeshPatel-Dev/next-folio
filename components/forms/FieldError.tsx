type Props = {
  message?: string | undefined
}

export default function FieldError({ message }: Props) {
  if (!message) return null

  return (
    <p className="text-sm text-red-500 mt-1">
      {message}
    </p>
  )
}
