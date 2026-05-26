// lib/metadata.ts
import type { Metadata } from "next";

export const DASHBOARD_METADATA: Metadata = {
  title: "Dashboard"
};
export const PROJECTS_METADATA: Metadata = {
  title: "Projects"
};
export const BLOGS_METADATA: Metadata = {
  title: "Blogs"
};
export const ADDPROJECTS_METADATA: Metadata = {
  title: "Add Project | Projects"
};
export const ADDBLOGS_METADATA: Metadata = {
  title: "Add Blog | Blogs"
};
export const LOGINPAGE_METADATA: Metadata = {
  title: "Login | Admin Panel"
};
export const ADMINPROFILE_METADATA: Metadata = {
  title: "Profile"
};

export const PUBLIC_CONTACT_METADATA: Metadata = {
  title: "Contact",
  description:
    "Get in touch for collaboration, freelance work, or professional inquiries.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://rakeshpatel.me"}/contact`,
  },
  openGraph: {
    title: "Contact | Rakesh Patel",
    description:
      "Get in touch for collaboration, freelance work, or professional inquiries.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://rakeshpatel.me"}/contact`,
    type: "website",
    images: [
      {
        url: "https://rakeshpatel.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rakesh Patel — Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Rakesh Patel",
    description:
      "Get in touch for collaboration, freelance work, or professional inquiries.",
    images: ["https://rakeshpatel.me/og-image.png"],
  },
}