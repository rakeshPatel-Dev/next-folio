import { FaCss3, FaHtml5, FaJs, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiGit } from "react-icons/si";

export const experiences = [
  {
    company: "LetsLearn Asia",
    role: "Frontend Developer Intern",
    location: "Kathmandu, Nepal (Hybrid)",
    period: "April 2026 – Present",
    isWorking: true,
    website: "https://letslearn.asia/",
    facebook: "https://www.facebook.com/letslearn.asia",
    tech: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Git", icon: SiGit, color: "#F05032" },
    ],
    objectives: [
      "Developing frontend interfaces for real-world and international projects using React.js and Next.js.",
      "Building scalable and reusable UI components with TypeScript and Tailwind CSS.",
      "Integrating REST APIs and handling dynamic data rendering in production-level applications.",
      "Collaborating with developers and designers in a Git-based workflow.",
      "Optimizing performance, responsiveness, and cross-device compatibility.",
    ],
  },

  {
    company: "Ghardailo Dugdh Dairy Co.",
    role: "Frontend Developer Intern",
    location: "Rautahat, Nepal",
    period: "May 2025 – November 2025",
    isWorking: false,
    website: "https://ghardailodairy.vercel.app/",
    facebook: "https://www.facebook.com/ghardailodairy",
    tech: [
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
    ],
    objectives: [
      "Built and maintained the official dairy website using HTML, CSS, and JavaScript.",
      "Improved UI responsiveness for mobile users in remote areas.",
      "Designed clean layouts and smooth navigation for better UX.",
      "Collaborated with management to update product information.",
      "Simplified digital workflows for farmers and staff.",
    ],
  },
];