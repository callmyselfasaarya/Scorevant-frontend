# Scorevant

Scorevant is a professional-grade officiating assistant and live scoring platform designed for racket sports. It provides a sleek, high-performance interface for tracking matches in Badminton, Tennis, and Table Tennis, ensuring accuracy and providing a premium experience for both officials and spectators.

## ✨ Key Features

- **Cinematic Landing Page**: Premium Gold, White, and Black identity with interactive parallax backgrounds, cinematic scanline effects, and glassmorphism.
- **High-Performance Animations**: Powered by Framer Motion, featuring Magnetic Buttons, fluid page transitions, and staggered entry animations.
- **Dynamic Score Preview**: Real-time match preview components showcasing live scoring logic and point-by-point animations.
- **Smooth Navigation**: Integrated smooth-scroll transitions for seamless exploration of features and sports disciplines.
- **Multi-Sport Support**: Tailored scoring logic for Badminton, Tennis, and Table Tennis with automatic win condition detection.
- **Undo Functionality**: Quick correction of scoring errors with a robust history stack.
- **Mobile Optimized**: Fully responsive design that feels native on both mobile devices and desktops.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [Wouter](https://github.com/molecula-js/wouter)

## 📂 Project Structure

```text
.
├── Frontend/           # Core React application
│   ├── src/
│   │   ├── components/ # Reusable UI and Motion components
│   │   ├── pages/      # Landing, Scoreboard, and Setup pages
│   │   ├── types/      # TypeScript definitions
│   │   └── lib/        # Utility functions and scoring logic
│   └── public/         # Static brand assets and logos
├── package.json        # Project-level dependencies
└── README.md           # Documentation
```

## 🛠️ Getting Started

### Prerequisites
- Node.js v20+.

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running Development Server
```bash
npm run dev
```

## 🎨 Design System
Scorevant uses a bespoke "Liquid Gold" design system:
- **Primary Color**: `#F4C542` (Gold)
- **Background**: `#000000` (Pure Black)
- **Accents**: Glassmorphism (White/5% - 10%)
- **Typography**: Inter / Modern Sans-Serif
