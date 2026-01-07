import {
  RiReactjsFill,
  RiTailwindCssFill,
  RiJavascriptFill,
} from "react-icons/ri";

import { FaYoutube, FaUnsplash, FaReact } from "react-icons/fa";
import { SiExpress, SiFirebase, SiGithub, SiNextdotjs, SiNodedotjs, SiOpenai, SiShadcnui, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import { IoImage, IoSearch } from "react-icons/io5";
// import { TbBrandTypescript } from "react-icons/tb";

export interface ProjectType {
  id: string;
  image: string;
  title: string;
  description: string;
  type: "frontend" | "web-clone" | "feature" | "microapp" | "fullStack";
  typeColor: string;
  liveLink: string;
  sourceLink: string;
  status: string;
  icons: {
    icon: any;
    tooltip: string;
    color: string;
  }[];
}

export const projectData: ProjectType[] = [
   {
    id: "ishirable",
    image: "/images/ishirable.webp",
    title: "isHirable – GitHub Profile Analyzer",
    description:
      "An AI-powered platform that analyzes public GitHub activity and converts it into recruiter-focused hiring signals with clear improvement insights.",
    type: "fullStack",
    typeColor: "#800000", // blue = trust + tech
    liveLink: "https://ishirable.com", // update if different
    sourceLink: "https://github.com/rakeshpatel-dev/ishirable", // optional / private if needed
    status: "Building",
    icons: [
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
      { icon: SiNextdotjs, tooltip: "React / Next.js", color: "#61dafb" },
      { icon: SiTailwindcss, tooltip: "Tailwind CSS", color: "#38bdf8" },
      { icon: SiNodedotjs, tooltip: "Node.js", color: "#339933" },
      { icon: SiGithub, tooltip: "GitHub API", color: "#000000" },
      { icon: SiOpenai, tooltip: "AI Analysis", color: "#10a37f" }
    ],
  },
  {
    id: "cinebook",
    image: "/images/cinebook.webp",
    title: "CineBook - Movie Booking App",
    description: "A fully responsive React & Node.js-based movie booking application with filtering, pagination, and booking functionality.",
    type: "fullStack",
    typeColor: "#800000", // dark gray for cinema theme
    liveLink: "https://cinebook-rakesh.vercel.app/", // replace with your live link
    sourceLink: "https://github.com/rakeshPatel-Dev/cinebook", // replace with your repo
    status: "Completed",
    icons: [
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
      { icon: FaReact, tooltip: "React.js", color: "#61dafb" },
      { icon: SiTailwindcss, tooltip: "Tailwind CSS", color: "#38bdf8" },
      { icon: SiNodedotjs, tooltip: "Node.js", color: "#339933" },
      { icon: SiExpress, tooltip: "Express.js", color: "#000000" }
    ],
  },
 


  {
    id: "moodymusik",
    image: "/images/moodymusik.webp",
    title: "MoodyMusik",
    description:
      "A mood-based playlist generator with real-time search and a dedicated song player.",
    type: "fullStack",
    typeColor: "#800000",
    liveLink: "https://moodymusik.vercel.app/",
    sourceLink: "https://github.com/rakeshPatel-Dev/moodyMusik",
    status: "Completed",
    icons: [
      { icon: RiReactjsFill, tooltip: "React", color: "#61dafb" },
      { icon: RiTailwindCssFill, tooltip: "TailwindCSS", color: "#38bdf8" },
      { icon: FaYoutube, tooltip: "YouTube API", color: "#ff0000" },
    ],
  },

  {
    id: "imagetoolkit",
    image: "/images/toolkit.webp",
    title: "Image Toolkit",
    description:
      "A powerful image toolkit to resize, compress, convert and crop images instantly.",
    type: "frontend",
    typeColor: "#4ade80",
    liveLink: "https://imagetoolkit.vercel.app/",
    sourceLink: "https://github.com/rakeshPatel-Dev/image-toolkit",
    status: "Completed",
    icons: [
      { icon: IoImage, tooltip: "Image Operations", color: "#f97316" },
      { icon: RiReactjsFill, tooltip: "React", color: "#61dafb" },
      { icon: SiShadcnui, tooltip: "Shadcn UI", color: "#7c3aed" },
    ],
  },

  {
    id: "fintrack",
    image: "/images/fintrack.webp",
    title: "Fintrack",
    description: "A modern personal finance tracker to manage income, expenses, and budgets with analytics and reports.",
    type: "fullStack",
    typeColor: "#800000",
    liveLink: "https://fintrack-react.netlify.app/", // your deployed Vercel link
    sourceLink: "https://github.com/rakeshPatel-Dev/finTrack.git",
    status: "Completed",
    icons: [
      { icon: FaReact, tooltip: "React", color: "#61dafb" },
      { icon: SiTypescript, tooltip: "TypeScript", color: "#3178c6" },
      { icon: SiTailwindcss, tooltip: "Tailwind CSS", color: "#06b6d4" },
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
    ],
  },

  {
    id: "ems-portal",
    image: "/images/ems.webp",
    title: "EMS Admin & Employee Portal",
    description: "A responsive React-based portal for managing employees, tasks, and permissions in a Dairy Company's Emergency Management System.",
    type: "fullStack",
    typeColor: "#800000",
    liveLink: "https://ems-rakesh.vercel.app/", // replace with your live link
    sourceLink: "https://github.com/rakeshPatel-Dev/EMS.git",
    status: "Completed",
    icons: [
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
      { icon: FaReact, tooltip: "React.js", color: "#61dafb" },
      { icon: SiTailwindcss, tooltip: "Tailwind CSS", color: "#38bdf8" },
      { icon: SiFirebase, tooltip: "Firebase (Firestore & Auth)", color: "#ffcb2b" }
    ],
  },


  {
    id: "netflix-clone-nepal",
    image: "/images/netflix.webp",
    title: "Netflix Nepal Clone",
    description:
      "A UI-heavy clone showcasing movie grid, hero section, and animated UI.",
    type: "web-clone",
    typeColor: "#f472b6",
    liveLink: "#",
    sourceLink:
      "https://github.com/rakeshPatel-Dev/Clone-Projects/tree/main/Netflix",
    status: "Completed",
    icons: [
      { icon: RiTailwindCssFill, tooltip: "TailwindCSS", color: "#38bdf8" },
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
      { icon: SiVite, tooltip: "Vite", color: "#646cff" },
    ],
  },

  {
    id: "photolab",
    image: "/images/photolab.webp",
    title: "Photolab",
    description:
      "A clean gallery app with search, dark mode, and random image fetching.",
    type: "frontend",
    typeColor: "#4ade80",
    liveLink: "https://photolab-app.netlify.app/",
    sourceLink: "https://github.com/rakeshPatel-Dev/gallery-app",
    status: "Completed",
    icons: [
      { icon: IoSearch, tooltip: "Search Feature", color: "#facc15" },
      { icon: FaUnsplash, tooltip: "Unsplash API", color: "#0ea5e9" },
      { icon: RiReactjsFill, tooltip: "React", color: "#61dafb" },
    ],
  },

];
