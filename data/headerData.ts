import { FolderKanban, BookOpen, Home, FileUser } from 'lucide-react';

export const headerData = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
  {
    label: "Resume",
    href: process.env.NEXT_PUBLIC_RESUME_LINK ?? "",
    icon: FileUser,
    external: true,
  },
]