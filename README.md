# APS — Security Platform (Fenrir Assessment)

A production-grade, responsive **B2B SaaS Security Platform** built with React + Vite + Tailwind CSS. Features three interconnected screens with full dark/light mode support.

## 🚀 Live Demo

[**Visit the deployed app →**](#https://fenrir-assignment-nu.vercel.app/) *(Update with your Vercel/Netlify URL after deployment)*

## ✨ Features

- **3 Fully Implemented Screens** — Login, Dashboard, and Scan Detail
- **Dark & Light Mode** — Global theme toggle with smooth transitions, persisted to localStorage
- **Responsive Design** — Mobile (375px) to Desktop (1280px+) with collapsible sidebar
- **Full Interactivity** — Tab switching, search/filter, toasts, modals, form validation
- **Mock Data** — Realistic penetration testing data with vulnerability findings
- **Skeleton Loaders** — Smooth loading states for tables and cards
- **Page Transitions** — Animated route transitions with Framer Motion
- **Reusable Components** — SeverityBadge, StatusChip, Button, Modal, Toast, ProgressBar
- **Accessibility** — ARIA labels, keyboard navigation, semantic HTML

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework (functional components + hooks) |
| **Vite 7** | Build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling with custom theme |
| **React Router 7** | Client-side routing |
| **Framer Motion** | Animations and page transitions |
| **Lucide React** | Icon library |

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx      # Main app wrapper with header
│   │   └── Sidebar.jsx        # Responsive navigation sidebar
│   └── ui/
│       ├── Button.jsx          # Multi-variant button
│       ├── Modal.jsx           # Reusable modal dialog
│       ├── ProgressBar.jsx     # Progress indicator
│       ├── SearchInput.jsx     # Search with icon
│       ├── SeverityBadge.jsx   # Critical/High/Medium/Low badges
│       ├── Skeleton.jsx        # Loading skeleton components
│       ├── StatusChip.jsx      # Completed/Scheduled/Failed chips
│       ├── ThemeToggle.jsx     # Dark/light mode toggle
│       └── Toast.jsx           # Toast notification system
├── context/
│   └── ThemeContext.jsx        # Theme state management
├── data/
│   └── mockData.js             # Realistic mock data
├── pages/
│   ├── LoginPage.jsx           # Screen 1 — Login / Sign-up
│   ├── DashboardPage.jsx       # Screen 2 — Dashboard (Scan list)
│   └── ScanDetailPage.jsx      # Screen 3 — Active Scan Detail
├── App.jsx                     # Router + providers
├── main.jsx                    # Entry point
└── index.css                   # Global styles + Tailwind
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Fenrir_Assessment

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🌐 Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

## 📝 Design Decisions

- **Tailwind CSS** with `darkMode: 'class'` for instant theme switching
- **Inter** font for clean, professional typography
- **Teal (#0CC8A8)** as the primary accent color
- **Framer Motion** for polished page transitions and micro-animations
- **Context API** for lightweight global theme state
- **Mock data** structured with realistic penetration testing narrative

## 📋 Requirements Checklist

- [x] **R1** — Recreate UI matching design reference (dark + light mode)
- [x] **R2** — Connect screens with navigation (Login → Dashboard → Scan Detail)
- [x] **R3** — Add interactivity (tabs, toasts, modals, search, filter, theme toggle)
- [x] **R4** — Responsive (375px mobile + 1280px+ desktop)
- [x] **R5** — Mock data (hardcoded, realistic)
- [x] **R6** — Deploy ready (production build succeeds)
- [x] **R7** — React with Vite (functional components + hooks)

### Bonus Features
- [x] Skeleton loaders for loading states
- [x] Animations and page transitions (Framer Motion)
- [x] Reusable component library (badges, chips, buttons, modals, toasts)
- [x] Keyboard navigation and ARIA labels
