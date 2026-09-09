// Dynamic icon-pack registry for IconRenderer (experience, skills, project cards).
// Only packs referenced by content/data are registered — keeps webpack/turbopack memory down.

export const getIconPack = async (prefix: string) => {
  switch (prefix.toLowerCase()) {
    case "fa":
      return import("react-icons/fa")
    case "si":
      return import("react-icons/si")
    case "bi":
      return import("react-icons/bi")
    case "ri":
      return import("react-icons/ri")
    case "ai":
      return import("react-icons/ai")
    case "io":
      return import("react-icons/io5")
    case "tb":
      return import("react-icons/tb")
    default:
      return null
  }
}
