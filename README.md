# Next.js Portfolio v2

A performance-focused, SEO-first developer portfolio built with **Next.js App Router**.
This project emphasizes **clear architecture, content-driven pages, and deliberate technical decisions** over visual gimmicks.

---

## Overview

This portfolio is designed to showcase projects as **case studies**, not thumbnails.

Key goals:
- Strong SEO through server-rendered pages
- Minimal client-side JavaScript
- Clean separation of content, layout, and motion
- Scalable structure for projects and blogs

This is not a template or tutorial project.

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (client-only, isolated usage)
- **MDX** for project case studies and blogs
- **next/font** for optimized font loading (Geist)

---

## Architecture Principles

### Server Components by Default
All pages and components are server-rendered unless browser-only behavior is required.

Client components are limited to:
- animations
- forms
- interactive UI logic

This keeps the JavaScript payload small and avoids hydration issues.

---

### Content-Driven Routing
Projects and blog posts are generated from MDX content and mapped to dynamic routes:

```
/projects/[slug]
/blog/[slug]
```

This enables:
- scalable content addition
- dynamic metadata generation
- strong SEO without duplication

---

### Motion Is Isolated
Animations:
- wrap content instead of owning it
- live in dedicated motion components
- are always client-only

No animation logic leaks into core layout or content.

---

## Project Structure

```txt
app/
 ├─ layout.tsx
 ├─ page.tsx
 ├─ about/
 ├─ projects/
 │   ├─ page.tsx
 │   └─ [slug]/page.tsx
 ├─ blog/
 │   ├─ page.tsx
 │   └─ [slug]/page.tsx
 └─ contact/

components/
 ├─ ui/
 ├─ layout/
 ├─ motion/
 └─ mdx/

content/
 ├─ projects/
 └─ blog/

lib/
 ├─ mdx.ts
 ├─ seo.ts
 └─ utils.ts
```

This structure is intentionally strict to maintain long-term clarity.

---

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

The main landing page lives at:

```
app/page.tsx
```

---

## Fonts & Optimization

This project uses `next/font` to load the **Geist** font family with:
- zero layout shift
- no external font requests
- optimized performance by default

---

## Deployment

The recommended deployment platform is **Vercel**, which provides native support for:
- Server Components
- App Router features
- automatic performance optimizations

Deployment guide:
https://nextjs.org/docs/app/building-your-application/deploying

---

## What This Project Is Not

- ❌ UI playground
- ❌ SaaS demo
- ❌ Dashboard clone
- ❌ Framework showcase

This portfolio exists to answer one question:

**Can this developer design, structure, and ship responsibly?**

---

## Final Note

This repository values:
- clarity over cleverness
- decisions over decoration
- depth over trends

If you change those priorities, you defeat the purpose of the project.
