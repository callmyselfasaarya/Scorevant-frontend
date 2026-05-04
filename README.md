# Scorevant

Scorevant is a professional-grade officiating assistant and live scoring platform designed for racket sports. It provides a sleek, high-performance interface for tracking matches in Badminton, Tennis, and Table Tennis, ensuring accuracy and providing a premium experience for both officials and spectators.

## ✨ Key Features

- **Multi-Sport Support**: Tailored scoring logic for Badminton, Tennis, and Table Tennis.
- **Set & Match Tracking**: Automatic tracking of sets, match points, and win conditions.
- **Tennis Scoring Logic**: Specialized display for Tennis (15, 30, 40, Deuce, Advantage).
- **Undo Functionality**: Quick correction of scoring errors with a robust history stack.
- **Premium UI/UX**: Glassmorphism aesthetic with smooth Framer Motion animations and responsive design.
- **Match History**: Local storage-based persistence for past match results.
- **Monorepo Architecture**: Clean separation of concerns between frontend, backend, and shared libraries.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (Shadcn-based)
- **Routing**: [Wouter](https://github.com/molecula-js/wouter)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)

### Backend
- **Runtime**: [Node.js v24](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Logging**: [Pino](https://github.com/pinojs/pino)
- **Validation**: [Zod](https://zod.dev/)

### Infrastructure
- **Monorepo Tool**: [pnpm Workspaces](https://pnpm.io/workspaces)
- **API Spec**: OpenAPI 3.1
- **Code Generation**: [Orval](https://orval.dev/) for generating React hooks and Zod schemas from OpenAPI.
- **Build Tooling**: [esbuild](https://esbuild.github.io/) for backend bundling.

## 📂 Project Structure

```text
.
├── artifacts/
│   ├── api-server/         # Express backend server
│   ├── racket-scoreboard/  # Vite + React frontend application
│   └── mockup-sandbox/     # Design and component testing area
├── lib/
│   ├── api-spec/           # OpenAPI specification (openapi.yaml)
│   ├── api-zod/            # Generated Zod schemas
│   ├── api-client-react/   # Generated TanStack Query hooks
│   └── db/                 # Database schema and Drizzle configuration
├── scripts/                # Helper scripts for development and build
└── package.json           # Workspace configuration (npm workspaces)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js v24+.

### Installation
```bash
npm install
```

### Running Development Servers

**Frontend (Scoreboard):**
```bash
npm run dev --workspace=@workspace/racket-scoreboard
```

**Backend (API Server):**
```bash
npm run dev --workspace=@workspace/api-server
```

### Build & Typecheck
```bash
# Full typecheck across all packages
npm run typecheck

# Build all packages
npm run build
```

### API Codegen
If you modify the OpenAPI spec in `lib/api-spec/openapi.yaml`, regenerate the hooks and schemas:
```bash
pnpm --filter @workspace/api-spec run codegen
```

## 📜 License

MIT
