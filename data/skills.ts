 import { IconType } from "react-icons";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiFirebase,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiJavascript,
} from "react-icons/si";


export type Skill = {
  name: string;
  Icon: IconType;
  color: string;
}

 export const skills = [
  { name: "React", Icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", Icon: FaNodeJs, color: "#6DA55F" },
  { name: "Express.js", Icon: SiExpress, color: "#ffffff" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
];