# Scorevant

Scorevant is a professional-grade officiating assistant, tournament management platform, and live scoring system built specifically for modern racket sports. Designed for tournament directors, referees, umpires, players, and spectators, it delivers a premium real-time experience for managing and broadcasting matches across multiple disciplines.

Supporting **Badminton, Tennis, Table Tennis, Squash, and Pickleball**, Scorevant combines tournament administration, intelligent scoring automation, live match tracking, spectator broadcasting, and resilient offline support within a single high-performance ecosystem.

---

## Overview

Scorevant was engineered to solve the operational challenges faced during competitive racket sport events. From generating tournament brackets and managing courts to officiating live matches and broadcasting scores in real time, the platform provides a seamless workflow from tournament setup to final results.

The system is powered by a highly optimized match engine architecture, secure authentication infrastructure, optional realtime synchronization, and a premium accessibility-focused user interface.

---

## Key Features

### Match Engine Architecture

At the core of Scorevant is a robust pure-function rules engine integrated with a `useReducer` state machine.

The engine accurately handles sport-specific scoring systems including:

- Tennis Deuce and Advantage logic
- Tiebreak scoring
- Rally scoring formats
- Badminton point-cap rules
- Table Tennis match progression
- Squash and Pickleball scoring variations

Key benefits include:

- Deterministic state transitions
- Instant O(1) undo and rollback operations
- Zero known scoring edge-case failures
- Fully predictable match history reconstruction
- Offline-safe state recovery

---

### Secure Authentication

Scorevant includes a complete authentication layer powered by NestJS.

Features include:

- User registration and login
- JWT-based authentication
- bcrypt password hashing
- Protected API endpoints
- User profile retrieval
- Secure session persistence

Available endpoints:

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

All protected requests automatically include JWT authorization tokens through the frontend API layer.

---

### Tournament Management

The platform supports complete tournament lifecycle management.

Administrators can:

- Create tournaments
- Register participants
- Seed players
- Generate brackets
- Assign courts (with optional court selection during creation)
- Manage match queues
- Launch officiated matches directly from bracket views
- Track tournament progression in real time

All tournament operations are powered by a NestJS backend and React Query-powered frontend architecture.

---

### Court Management

The Live Courts feature provides real-time court status tracking and match assignment capabilities.

Features include:

- Create and manage multiple courts
- View court status (Idle/In Use)
- Assign matches from queue to available courts
- Free courts after match completion
- Real-time status updates with 3-second polling
- Match queue management for pending assignments

---

### Spectator Display Mode

A dedicated spectator experience allows matches to be broadcast on large screens, mobile devices, or remote viewing stations.

Officials can simply:

1. Open a live match
2. Select **Copy Live Link**
3. Share the generated URL

The spectator view automatically reflects ongoing score updates and match events.

---

### Match History

Scorevant maintains a comprehensive match history for all completed matches.

Features include:

- Automatic match saving after completion
- Persistent storage using local storage
- Match details including players, scores, sets breakdown
- Sport type and date tracking
- Winner identification with trophy indicators
- Clear history functionality
- Historical data accessible from dedicated history page

---

### Offline Persistence & Recovery

Tournament environments are not always connected.

To ensure uninterrupted operation, Scorevant provides automatic persistence using local storage fallbacks.

Benefits include:

- Recovery after accidental tab closure
- Network interruption resilience
- Automatic state restoration
- Seamless continuation of active matches
- Reduced risk of scoring data loss

---

### Accessibility First

Accessibility is treated as a core platform requirement rather than an afterthought.

Implemented features include:

- High Contrast Mode detection
- Reduced Motion support
- Screen reader optimization
- Keyboard navigation support
- Accessible modal focus trapping
- Adaptive visual fallbacks

When users enable high-contrast preferences at the operating system level, advanced visual effects such as glassmorphism are automatically replaced with accessibility-friendly alternatives.

---

### Premium Interface Design

Scorevant utilizes a bespoke **Liquid Gold Design System** focused on clarity, responsiveness, and visual prestige.

Interface highlights include:

- Glassmorphic surfaces
- Fluid page transitions
- Magnetic interactive controls
- Cinematic motion design
- Responsive layouts
- Performance-optimized animations
- Interactive parallax environments

All animations gracefully degrade when reduced-motion preferences are detected.

---

# Technology Stack

## Frontend

| Category         | Technology               |
| ---------------- | ------------------------ |
| Framework        | React 19 + Vite          |
| Language         | TypeScript               |
| State Management | React Hooks + useReducer |
| Data Fetching    | React Query (TanStack)   |
| Styling          | Tailwind CSS v4          |
| Animations       | Framer Motion            |
| Icons            | Lucide React             |
| Routing          | Wouter                   |
| Forms            | React Hook Form          |
| UI Components    | Radix UI + shadcn/ui     |
| Date Handling    | date-fns                 |

---

## Backend

> [!NOTE]
> The NestJS backend code has been moved to a separate repository. This repository now contains the frontend code only, which communicates with the backend via REST API endpoints.

| Category          | Technology     |
| ----------------- | -------------- |
| Framework         | NestJS         |
| Database          | MongoDB        |
| ODM               | Mongoose       |
| Authentication    | JWT + Passport |
| Password Security | bcrypt         |

---

# Project Structure

```text
.
├── src/                          # React 19 + Vite frontend source code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn/ui components (60+ components)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── ... (60+ components)
│   │   ├── auth/                 # Authentication components
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── MatchHistoryPanel.tsx
│   │   └── MotionWrappers.tsx
│   ├── contexts/                 # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useMatchHistory.ts
│   │   └── useMatchState.ts
│   ├── lib/                      # Utility libraries
│   │   ├── api.ts                # API client and endpoints
│   │   ├── auth-api.ts           # Authentication utilities
│   │   ├── core/                 # Core utilities
│   │   ├── design-system.ts      # Design system configuration
│   │   ├── scoring.ts            # Sport-specific scoring logic
│   │   └── utils.ts              # General utilities
│   ├── pages/                    # Page components
│   │   ├── auth/                 # Authentication pages
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── Dashboard.tsx         # User dashboard
│   │   ├── Documentation.tsx     # Documentation page
│   │   ├── History.tsx           # Match history page
│   │   ├── Home.tsx              # Match setup page
│   │   ├── Landing.tsx           # Landing page
│   │   ├── LiveCourts.tsx        # Court management page
│   │   ├── Scoreboard.tsx        # Live scoring page
│   │   ├── Spectate.tsx          # Spectator view page
│   │   ├── TournamentDetails.tsx # Tournament details page
│   │   ├── Tournaments.tsx      # Tournament management page
│   │   └── not-found.tsx
│   ├── types/                    # TypeScript type definitions
│   ├── assets/                   # Static assets (images, etc.)
│   ├── App.tsx                   # Main app component with routing
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
│   └── brand/                    # Brand assets (logos, etc.)
├── .env                          # Environment variables (not in git)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
├── components.json              # shadcn/ui configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript config for Node
├── vite.config.ts               # Vite build configuration
├── vercel.json                  # Vercel deployment configuration
└── README.md                    # This file
```

---

# Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm start` | Start the development server (alias for `npm run dev`) |
| `npm run dev` | Start the Vite development server on `0.0.0.0` |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run serve` | Serve the production build (alias for `npm run preview`) |
| `npm run typecheck` | Run TypeScript type checking without emitting files |

---

# Getting Started

## Prerequisites

Before running the project, ensure you have:

- Node.js v20 or newer
- npm or yarn package manager
- An active backend server running (either locally from the backend repository or deployed online)

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Scorevant-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
   Replace `http://localhost:3000` with your backend server URL.

---

## Running the Application

Start the frontend development server:

```bash
npm start
# or
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

---

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

---

# API Endpoints

## Authentication

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

---

## Tournaments

### List Tournaments
```http
GET /tournaments
Authorization: Bearer <token>
```

### Create Tournament
```http
POST /tournaments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Summer Open 2026",
  "sportType": "Tennis",
  "maxSets": 3,
  "entrants": [
    { "name": "Player 1", "seed": 1 },
    { "name": "Player 2", "seed": 2 }
  ],
  "courtId": "optional-court-id"
}
```

### Get Tournament Details
```http
GET /tournaments/:id
Authorization: Bearer <token>
```

### Generate Bracket
```http
POST /tournaments/:id/generate-bracket
Authorization: Bearer <token>
```

### Update Match
```http
PUT /tournaments/matches/:matchId
Authorization: Bearer <token>
Content-Type: application/json

{
  "score": { ... },
  "winnerId": "entrant-id",
  "status": "completed"
}
```

---

## Courts

### List Courts
```http
GET /courts
Authorization: Bearer <token>
```

### Create Court
```http
POST /courts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Court 1"
}
```

### Get Match Queue
```http
GET /courts/queue
Authorization: Bearer <token>
```

### Assign Match to Court
```http
PUT /courts/:courtId/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "matchId": "match-id"
}
```

### Free Court
```http
PUT /courts/:courtId/free
Authorization: Bearer <token>
```

---

# Pages & Routes

| Route | Page | Description | Authentication |
| ----- | ---- | ----------- | -------------- |
| `/` | Landing | Landing page with hero section | Public |
| `/login` | Login | User login form | Public |
| `/register` | Register | User registration form | Public |
| `/dashboard` | Dashboard | User dashboard | Protected |
| `/setup` | Home | Match setup page | Protected |
| `/scoreboard` | Scoreboard | Live scoring interface | Protected |
| `/history` | History | Match history archive | Public |
| `/tournaments` | Tournaments | Tournament management | Protected |
| `/tournaments/:id` | TournamentDetails | Tournament bracket view | Protected |
| `/courts` | LiveCourts | Court management | Protected |
| `/spectate/:id` | Spectate | Spectator view for matches | Public |
| `/docs` | Documentation | Documentation page | Public |

---

# Key Components

## Custom Hooks

- **useMatchState**: Manages match state with sport-specific scoring logic
- **useMatchHistory**: Handles match history persistence and retrieval
- **useToast**: Toast notification management
- **useMobile**: Mobile device detection

## Core Libraries

- **api.ts**: Centralized API client with authentication
- **auth-api.ts**: JWT token management and storage
- **scoring.ts**: Sport-specific scoring algorithms
- **design-system.ts**: Design system configuration and utilities

## UI Components

The project uses shadcn/ui components with custom styling. Key components include:

- **Button**: Styled buttons with variants
- **Card**: Card containers for content grouping
- **Dialog**: Modal dialogs
- **Form**: Form components with validation
- **Input**: Text input fields
- **Select**: Dropdown selection
- **Toast**: Notification toasts
- **LoadingScreen**: Loading state display

---

# Verification Checklist

After setup:

1. Ensure your backend server is running
2. Start the frontend application with `npm start`
3. Open the application in your browser at `http://localhost:5173`
4. Create a new account using the registration form
5. Sign in with your credentials
6. Confirm redirection to the dashboard
7. Navigate to the Tournaments page
8. Create a new tournament with entrants
9. Optionally select a court during tournament creation
10. Generate the tournament bracket
11. Launch a match and validate scoring functionality
12. Test spectator mode and live-link sharing
13. Verify match history is saved after completing a match
14. Test court management features

---

# Troubleshooting

### Login Displays "Failed to Fetch"

Verify:

- The backend server is running and accessible
- The `VITE_API_BASE_URL` in `.env` correctly points to your backend server URL
- Port `3000` (or whichever port your backend uses) is accessible and not blocked by a firewall

### Build Errors

If you encounter build errors during `npm run build`:

- Clear the node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear the Vite cache `rm -rf .vite && npm run build`
- Ensure TypeScript is properly configured

### MongoDB Database Naming Issues

Windows environments may behave differently with inconsistent database naming.

Use a single database name consistently:

```env
SCOREVANT
```

### Port Already in Use

If port `5173` is already in use:

- The dev server will automatically use the next available port
- Or specify a different port in `vite.config.ts`

---

# Deployment

## Vercel Deployment

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Connect your repository to Vercel
2. Set the `VITE_API_BASE_URL` environment variable in Vercel settings
3. Deploy automatically on push to main branch

## Environment Variables

Required environment variables:

- `VITE_API_BASE_URL`: URL of your backend API server

---

# Design System

### Liquid Gold

| Property           | Value                 |
| ------------------ | --------------------- |
| Primary Color      | `#F4C542`             |
| Background         | `#000000`             |
| Accent Style       | Liquid Gold           |
| Motion System      | Physics-Based Springs |
| Accessibility Mode | Automatic Adaptation  |

### Visual Principles

- Premium competitive sports aesthetic
- Minimal latency perception
- Accessibility-first interactions
- Responsive by default
- Motion with graceful degradation
- High readability under tournament conditions

---

# Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Ensure all tests pass
5. Submit a pull request

---

# License

This project is licensed under the MIT License.

---

# Vision

Scorevant aims to become the definitive digital officiating and tournament operations platform for racket sports. By combining intelligent match management, professional-grade officiating tools, resilient offline support, realtime broadcasting, and a modern user experience, it provides everything required to run competitive events with confidence and precision.
