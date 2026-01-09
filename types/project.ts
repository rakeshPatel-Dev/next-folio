import { IconType } from "react-icons";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  typeColor: string;
  status: "Completed" | "In Progress";
  liveLink?: string;
  sourceLink?: string;
  icons: {
    icon: IconType;
    color: string;
    tooltip: string;
  }[];
  onClick?: () => void;
}


export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  readingTime: string;
  date: string;
  link: string;
}