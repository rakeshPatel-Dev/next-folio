// This file is used ONLY in the admin panel to provide a searchable registry of icons.
// We use dynamic imports to ensure these heavy icon packs are NEVER bundled into the public site.

export const getIconPack = async (prefix: string) => {
  switch (prefix.toLowerCase()) {
    case "fa": return import("react-icons/fa");
    case "fa6": return import("react-icons/fa6");
    case "si": return import("react-icons/si");
    case "tb": return import("react-icons/tb");
    case "ai": return import("react-icons/ai");
    case "bi": return import("react-icons/bi");
    case "md": return import("react-icons/md");
    case "ri": return import("react-icons/ri");
    case "io": return import("react-icons/io5");
    case "hi": return import("react-icons/hi2");
    case "bs": return import("react-icons/bs");
    case "cg": return import("react-icons/cg");
    case "fi": return import("react-icons/fi");
    case "gi": return import("react-icons/gi");
    case "go": return import("react-icons/go");
    case "gr": return import("react-icons/gr");
    case "im": return import("react-icons/im");
    case "vsc": return import("react-icons/vsc");
    case "wi": return import("react-icons/wi");
    default: return null;
  }
};

// We still need a list of names for the search input.
// This is still heavy but much smaller than the actual icon components if we only store strings.
// However, even this list is huge. Let's see if we can avoid it.
export const ALL_ICON_NAMES: string[] = []; 
