// src/data/caseStudies.ts

export interface CaseStudy {
  id: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  techStack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "moodymusik",
    problem:
      "Users struggled to find personalized playlists that matched their mood throughout the day. Existing music apps had generic playlists and limited mood-based recommendations.",
    solution:
      "Developed a full-stack web app that dynamically generates mood-based playlists. Integrated sentiment analysis, user mood selection, real-time audio previews, and smooth UI transitions. Implemented Firebase for authentication and cloud storage.",
    result:
      "User engagement increased significantly. Average listening time per session rose by 35%, and users reported higher satisfaction due to personalized playlists. The app also improved discoverability of new music.",
    features: [
      "Mood-based playlist generator",
      "Real-time search and filtering",
      "Dedicated song player with audio previews",
      "Real-time mood tagging",
      "Save favorite playlists",
      "Responsive design for mobile & desktop",
      "Dark mode toggle",
      "Smooth animations and transitions",
    ],
    techStack: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "ShadCN UI",
      "Firebase (Auth & Firestore)",
      "Vercel for deployment",
      "ESLint & Prettier for code quality",
    ],
  },

  {
    id: "imagetoolkit",
    problem:
      "People needed quick image edits without downloading heavy software or using complicated workflows. Existing online tools were slow, clunky, or lacked essential features like crop, resize, and compress.",
    solution:
      "Built a lightweight web tool that allows users to crop, resize, compress, convert, and apply filters to images instantly. Implemented drag-and-drop functionality, multiple file format support, and a real-time preview. The interface is minimal and responsive for both desktop and mobile users.",
    result:
      "Users can now edit images instantly online. Page load is under 1 second, and editing operations are completed in real-time without lag. User feedback shows high satisfaction for ease-of-use and speed.",
    features: [
      "Crop, resize, compress images",
      "Apply filters and adjust brightness/contrast",
      "Download images in multiple formats (JPEG, PNG, WebP)",
      "Drag-and-drop workspace",
      "Instant preview of edits",
      "Minimalist UI for better focus",
      "Dark mode compatible",
      "Responsive design for mobile and desktop",
      "Undo/Redo functionality",
    ],
    techStack: [
      "React",
      "JavaScript",
      "TailwindCSS",
      "Vite",
      "Browser APIs for image manipulation",
      "LocalStorage for saved images",
      "ESLint & Prettier",
      "Netlify for deployment",
    ],
  },
  
  {
    id: "ems-portal",
    problem:
      "The Dairy Company needed a way to manage employees, tasks, and access control efficiently. Manual tracking caused delays, miscommunication, and difficulty distinguishing admin vs employee actions.",
    solution:
      "Built a full React-based EMS portal with Firestore backend. Admins can create employee accounts, assign tasks, and track status. Employees can view tasks, update progress, and check deadlines. The system includes role-based access, responsive UI, and a mobile-friendly layout.",
    result:
      "Admin and employee workflows are streamlined. Tasks are tracked in real-time, reducing errors and improving productivity. Admins can manage users directly from the portal. Employees get a clear view of their tasks with notifications for status changes.",
    features: [
      "Role-based access (Admin & Employee)",
      "Admin can create, update, and delete employee accounts",
      "Task creation, assignment, and tracking",
      "Real-time task status updates",
      "Due date tracking and priority indicators",
      "Responsive UI for desktop and mobile",
      "Dark mode support",
      "User-friendly forms and dashboards",
      "Notifications for task changes",
    ],
    techStack: [
      "React.js",
      "JavaScript (ES6+)",
      "TailwindCSS",
      "Firebase Firestore (Database)",
      "Firebase Authentication (optional)",
      "Vite for project setup",
      "ESLint & Prettier",
      "Netlify for deployment",
    ],
  }, 
  
  {
    id: "fintrack",
    problem:
      "Users needed a way to track their income, expenses, and budgets efficiently. Manual tracking in spreadsheets caused errors, lack of insights, and difficulty in understanding spending patterns.",
    solution:
      "Built a modern personal finance tracker using React and TypeScript with TailwindCSS. Users can log income and expenses, categorize transactions, filter and sort them, view summaries, and analyze spending patterns. Includes date-range filtering, category-specific analytics, and responsive UI for mobile and desktop.",
    result:
      "Users can now track finances in real-time with visual summaries. Budget management and spending analysis are simplified. The app provides insights into highest spending categories, total income vs expenses, and remaining budget, helping users make informed financial decisions.",
    features: [
      "Add, edit, and delete income and expense transactions",
      "Filter by transaction type, category, and date range",
      "Sort transactions by date or amount",
      "View highest spent category and total spending",
      "Budget tracking with remaining amount and percentage",
      "Responsive UI for desktop and mobile devices",
      "Dark mode support",
      "LocalStorage for persistent data",
      "Interactive tables with actions for editing and deleting",
      "Quick presets for common date ranges",
    ],
    techStack: [
      "React.js",
      "TypeScript",
      "TailwindCSS",
      "Vite for project setup",
      "Lucide-react for icons",
      "React Hot Toast for notifications",
      "LocalStorage for data persistence",
      "ESLint & Prettier",
      "Vercel for deployment",
    ],
  },
  {
  id: "ishirable",
  problem:
    "Users struggled to monitor their GitHub activity, contributions, and project growth efficiently. Manual profile checks lacked insights into hiring potential and skills visibility.",
  solution:
    "Developed isHirable, a modern web app using React, Next.js, TypeScript, and TailwindCSS, which automatically analyzes public GitHub activity. Users receive actionable insights, visual summaries of contributions, and recruiter-focused metrics. Features include project analysis, commit trends, language usage breakdown, and profile recommendations, all with a responsive design.",
  result:
    "Users can now understand how their GitHub profiles appear to recruiters in real-time. The app highlights strengths, gaps, and improvement opportunities, helping developers optimize portfolios for higher job potential.",
  features: [
    "Analyze GitHub repositories and contributions automatically",
    "Visual summaries of commits, PRs, and project activity",
    "Language usage breakdown and tech stack insights",
    "Highlight profile strengths and weaknesses",
    "Receive actionable suggestions to improve hiring potential",
    "Responsive design for desktop and mobile",
    "Dark mode support",
    "Real-time analysis with minimal delays",
    "Downloadable summary reports",
    "Secure connection via GitHub OAuth",
  ],
  techStack: [
    "React.js & Next.js",
    "TypeScript",
    "TailwindCSS",
    "GitHub API",
    "Lucide-react for icons",
    "Axios for data fetching",
    "Vercel for deployment",
    "ESLint & Prettier",
    "Framer Motion for animations",
  ],
},


  {
    id: "photolab",
    problem:
      "Users needed a way to explore, search, and manage high-quality photos efficiently. Existing image websites were slow, cluttered, or lacked proper organization and fullscreen view features.",
    solution:
      "Built a modern photo gallery app using React and TailwindCSS integrated with Unsplash API. Users can search for images in real-time, view them in a fullscreen mode with navigation, download images, and explore random images. Includes pagination, hover overlays, responsive layout, and dark mode support for desktop and mobile devices.",
    result:
      "Users can now search and view images efficiently with smooth navigation and fullscreen mode. The app provides easy downloads, responsive viewing on all devices, and a seamless dark/light experience. Random image exploration and pagination make browsing enjoyable and intuitive.",
    features: [
      "Search photos in real-time",
      "View images in fullscreen with next/prev navigation",
      "Download photos directly",
      "Random image browsing",
      "Hover overlay with photographer name and download icon",
      "Pagination with floating page numbers",
      "Dark mode support",
      "Responsive layout for mobile and desktop",
      "Smooth animations using Framer Motion",
      "Swipe navigation support for mobile",
    ],
    techStack: [
      "React.js",
      "TailwindCSS",
      "Vite for project setup",
      "Lucide-react for icons",
      "Framer Motion for animations",
      "Unsplash API for images",
      "ESLint & Prettier",
      "Netlify or Vercel for deployment",
    ],
  },
  {
  id: "cinebook",
  problem:
    "Users wanted a simple and fast way to browse, filter, and book movie tickets online. Existing platforms were either slow, cluttered, or lacked modern UI, responsive design, and filtering features like genre and language.",
  solution:
    "Built a fully responsive movie booking application using React, TailwindCSS, and Node.js. Users can filter movies by genre and language, view detailed movie information (poster, banner, duration, cast, and description), and paginate through large lists of movies. Implemented backend API with Node.js & Express for movie data, integrated with a movie JSON dataset. Includes hover effects, smooth transitions with Framer Motion, and mobile-friendly design.",
  result:
    "Users can now easily discover and book movies online with a seamless experience. Filtering by genre and language, pagination, and smooth hover animations improve usability. The app is fully responsive, works on all devices, and provides a modern cinematic UI, enhancing the overall movie browsing and booking experience.",
  features: [
    "Browse movies with poster, banner, genres, duration, cast, and description",
    "Filter movies by genre and language",
    "Pagination for large movie lists",
    "Hover effect with 'Book Now' button",
    "Responsive layout for desktop and mobile",
    "Smooth animations using Framer Motion",
    "Duration displayed in hours and minutes",
    "No movies found message when filter yields empty results",
    "Light/dark theme support",
    "Single-page navigation with React Router",
  ],
  techStack: [
    "React.js",
    "TailwindCSS",
    "Node.js & Express for backend API",
    "Framer Motion for animations",
    "React Router for navigation",
    "Vite for project setup",
    "ESLint & Prettier",
    "Netlify or Vercel for deployment",
  ],
},


];
