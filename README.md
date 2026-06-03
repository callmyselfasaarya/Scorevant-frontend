# Scorevant

Scorevant is a professional-grade officiating assistant, tournament manager, and live scoring platform designed for racket sports. It provides a sleek, high-performance interface for tracking matches in Badminton, Tennis, Table Tennis, Squash, and Pickleball, ensuring precision and providing a premium, realtime experience for officials, players, and spectators alike.

## ✨ Core Features

- **🏆 Match Engine Architecture**: A robust pure-function rules engine seamlessly integrated with a `useReducer` state machine. It handles disparate logic perfectly—from Tennis (Deuce/Ad, Tiebreaks) to Rally Scoring (Table Tennis, Badminton cap rules) with 0 edge-case bugs and instant O(1) state rollbacks/undos.
- **🔐 Secure JWT Authentication**: Native NestJS auth endpoints (`/auth/register`, `/auth/login`, `/auth/me`) with bcrypt-hashed passwords, JWT access tokens, and protected tournament/court APIs.
- **⚡ Realtime Synchronization (Optional)**: Supports **Supabase Realtime** (`supabase.channel`) for live spectator broadcast. If Supabase is not configured, core match/tournament features continue working.
- **📺 Spectator Display Mode**: A dedicated, live-updating spectator view. Umpires can simply click "Copy Live Link" to share a direct broadcast of the match to any screen in the venue.
- **🏅 Tournament Management**: End-to-end tournament operations powered by a NestJS backend and React Query. Features include creating tournaments, seeding players, generating brackets, and launching directly into an officiated match directly from the bracket UI.
- **💾 Offline & Persistence Support**: The officiating engine features automatic offline persistence using a local storage fallback. If an umpire accidentally closes the tab or loses internet connection, the state is fully preserved and seamlessly restored when re-opened.
- **♿ Production-Ready Accessibility**: Features High Contrast Mode detection (`@media (prefers-contrast: more)`) that intelligently disables glassmorphism for legibility, full `useReducedMotion` support to disable complex animations, screen reader optimization, and compliant focus trapping for modals.
- **🎬 Premium Cinematic UI**: High-performance Framer Motion animations, "Liquid Gold" design language, Magnetic Buttons, fluid page transitions, and interactive parallax backgrounds.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Data & API**: REST API (NestJS) + [React Query](https://tanstack.com/query/latest)
- **Realtime (Optional)**: [Supabase JS](https://supabase.com/) for spectator broadcast channels
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [Wouter](https://github.com/molecula-js/wouter)

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: MongoDB (via Mongoose schemas) for users, tournaments, courts, and bracket state
- **Auth**: JWT (`@nestjs/jwt`) + Passport + bcrypt

## 📂 Project Structure

```text
.
├── frontend/           # Core React application
│   ├── src/
│   │   ├── components/ # Reusable UI (Buttons, Modals, Scoreboards)
│   │   ├── pages/      # Landing, Scoreboard, Setup, Tournaments, Spectate
│   │   ├── hooks/      # useMatchState, useMatchHistory
│   │   ├── types/      # TypeScript definitions
│   │   └── lib/        # Utility functions, scoring logic, API client
│   └── public/         # Static brand assets and logos
├── backend/            # NestJS API Server
│   └── src/
│       ├── auth/       # Authentication modules
│       ├── court/      # Court assignment & queues
│       ├── tournament/ # Tournament bracket generation & match logic
│       └── schemas/    # MongoDB schemas
└── README.md           # Documentation
```

## 🛠️ Getting Started

### Prerequisites
- Node.js v20+
- MongoDB instance (for Tournament storage)
- Supabase project (optional, only for realtime spectator sync)

### Installation
1. Clone the repository
2. Install dependencies for both frontend and backend:
```bash
# In frontend directory
npm install

# In backend directory
npm install
```

### Environment Setup
Create a `.env` file in the `backend/` directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/SCOREVANT
JWT_SECRET=your-jwt-secret-at-least-32-chars

# Optional: only needed if validating Supabase-issued tokens
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:3000

# Optional: only needed for live spectator broadcast
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Running Development Servers
You will need to run both servers concurrently:

**Frontend**:
```bash
cd frontend
npm run dev
```

**Backend**:
```bash
cd backend
npm start
```

## 🔑 Authentication API

Scorevant now includes built-in authentication routes:

- `POST /auth/register` — create account and receive `access_token`
- `POST /auth/login` — sign in and receive `access_token`
- `GET /auth/me` — fetch current user profile (requires `Authorization: Bearer <token>`)

The frontend stores the JWT in local storage and automatically includes it in protected API requests.

## 🧪 Quick Verification

1. Start backend and frontend servers.
2. Open the app and create an account from the **Create one** link.
3. Sign in and confirm navigation to the dashboard.
4. Open Tournament pages and verify authenticated API access.

## 🛠️ Troubleshooting

- **Login shows "Failed to fetch"**: ensure backend is running on `http://localhost:3000` and `VITE_API_BASE_URL` matches.
- **MongoDB case-sensitive DB issue on Windows**: use a consistent DB name in `MONGODB_URI` (for example `SCOREVANT`).
- **Realtime not updating spectators**: verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; realtime is optional and does not block core app usage.

## 🎨 Design System
Scorevant uses a bespoke "Liquid Gold" design system that responds automatically to system-level accessibility preferences:
- **Primary Color**: `#F4C542` (Gold)
- **Background**: `#000000` (Pure Black)
- **Glassmorphism**: Layered `backdrop-filter: blur()` utilities (falls back to solid borders in High Contrast Mode)
- **Motion**: Physics-based springs and cinematic tweens (falls back to snap transitions when Reduced Motion is enabled by the OS)
