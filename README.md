# Weplic Studio — Official Website & Interactive Platform

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Animations by GSAP & Framer Motion](https://img.shields.io/badge/Animations-GSAP%20%2F%20Framer-yellow?style=flat-square)](https://gsap.com/)

**Weplic** is an AI-native digital product studio that designs and builds production-grade web applications, mobile apps, and custom AI platforms for ambitious, high-growth startups. 

This repository contains the official, fully interactive landing page and client portal for Weplic Studio.

---

## ⚡ Tech Stack & Architecture

The application is built on a modern, high-performance web stack:

*   **Framework:** [Next.js 16 (Turbopack)](https://nextjs.org/) — Utilizing App Router, dynamic server-less API routes, and optimized static rendering.
*   **Library:** [React 19](https://react.dev/) — Pure functional component architecture.
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — Sleek dark-mode aesthetic, customized typography, and modern responsive design system.
*   **Animation & Motion:** 
    *   [Framer Motion](https://www.framer.com/motion/) — Fluid transitions, spring animations, and state-driven drawers/modals.
    *   [GSAP (GreenSock)](https://gsap.com/) & [SplitType](https://github.com/lucasyhla/split-type) — Premium typography text-splitting animations.
*   **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/) — Hardware-accelerated smooth scrolling.
*   **Email Engine:** [Resend API](https://resend.com/) — Automated email scheduling and client notifications.

---

## 🎨 Interactive Features

*   **Interactive 3D Elements:** Embedded 3D canvas objects utilizing Spline.
*   **Dynamic Custom Cursor:** Smooth-following circle cursor that reacts, scales, and scales on hover over links and interactive elements.
*   **Project Request Drawer:** Conditional multi-step project brief builder and submission form.
*   **Integrated Discovery Booking Modal:** Custom calendar date/time slots picker interface linked with the email notification system.
*   **Interactive Bottom Dock:** Apple-like floating navigation dock at the bottom of the screen.

---

## 📂 Repository Structure

```directory
weplic/
├── app/                  # Next.js App Router pages, global styles, and API routes
│   ├── api/send/         # Email processing API route (Resend)
│   ├── layout.js         # Root HTML layout and font optimization
│   └── page.js           # Core landing page assembly
├── Components/           # Reusable UI widgets (Drawer, Booking Modal, Cursor, Dock)
├── Context/              # Global state provider (AppContext)
├── Sections/             # Page sections (Home, Services, Philosophy, Contact, Footer)
└── public/               # Public assets (high-res logos, typography, illustrations)
```

---

## 🛠️ Local Development & Setup

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weplic.git
   cd weplic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Resend API Key:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

### Command Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Next.js local development server (with Turbopack) |
| `npm run build` | Builds the application for production deployment |
| `npm run start` | Runs the built production server locally |
| `npm run lint` | Runs ESLint checks to enforce code quality |

---

## 🚀 Deployment

The site is optimized to be deployed on the [Vercel Platform](https://vercel.com). Make sure to configure the `RESEND_API_KEY` environment variable in the Vercel dashboard settings under Environment Variables.
