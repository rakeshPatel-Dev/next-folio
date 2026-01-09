// blogData.ts
export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  readingTime: string;
  date: string;
  link: string;
  varient?: "featured" | "default"
}

export const blogData: BlogPost[] = [
  {
    id: "1",
    title: "Building a Dairy Inventory System for Remote Villages",
    subtitle: "How I created a lightweight inventory system to help farmers in Nepal track milk production efficiently.",
    image: "https://images.unsplash.com/photo-1649424221028-8e7d31f2e3c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwc3lzdGVtJTIwZGFzaGJvYXJkfGVufDB8fDB8fHww",
    category: "Case Study",
    readingTime: "5 min read",
    date: "2025-01-15",
    link: "/blog/building-dairy-inventory",
    varient: "featured",
  },
  {
    id: "2",
    title: "Optimizing Web UI for Low Connectivity Areas",
    subtitle: "Tips and techniques to design responsive and fast-loading websites in regions with poor internet infrastructure.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVpfGVufDB8fDB8fHww",
    category: "UX / Design",
    readingTime: "4 min read",
    date: "2025-02-02",
    link: "/blog/low-connectivity-ui",
  },
  {
    id: "3",
    title: "Next.js: Edge Functions vs Traditional APIs",
    subtitle: "Exploring why Edge Functions can improve performance for modern apps and when to use them.",
    image: "https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV4dGpzfGVufDB8fDB8fHww",
    category: "Tech Insight",
    readingTime: "6 min read",
    date: "2025-02-20",
    link: "/blog/nextjs-edge-functions",
  },
  {
    id: "4",
    title: "My 30-Day Freelance Journey",
    subtitle: "Lessons learned from starting freelance web development in Nepal, landing clients, and managing projects.",
    image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZWxhbmNpbmd8ZW58MHx8MHx8fDA%3D",
    category: "Career / Hustle",
    readingTime: "5 min read",
    date: "2025-03-05",
    link: "/blog/30-day-freelance-journey",
  },
  {
    id: "5",
    title: "Designing Dashboards for Small Businesses",
    subtitle: "How to create intuitive dashboards for decision-making without overwhelming users with data.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
    category: "Case Study",
    readingTime: "4 min read",
    date: "2025-03-20",
    link: "/blog/small-business-dashboards",
  },
];
