# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Client portal for a freelance design business.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Tailwind CSS, React Query, Wouter

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── client-portal/      # React + Vite client portal frontend
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Features

- **Submit Request** — Clients submit design project requests (name, email, title, description, service type, deadline)
- **Track Project** — Clients look up projects by ID or email, see visual status progress stepper
- **File Upload** — Clients can attach files (briefs, reference images) to their projects
- **Admin Dashboard** — `/admin` route for the designer: view all projects, filter by status, update project status and notes
- **Stats** — Admin sees project counts by status

## Database Schema

- `projects` — project requests with status, client info, deadline, admin notes
- `project_files` — file uploads stored as base64 in database, linked to projects

## Routes

- `GET /api/projects` — list projects (filter by status, clientEmail)
- `POST /api/projects` — submit new project request
- `GET /api/projects/:id` — get project with files
- `PATCH /api/projects/:id` — update project (admin)
- `POST /api/projects/:id/upload` — upload file
- `GET /api/files/:fileId` — download file
- `GET /api/admin/stats` — admin stats

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts`
- App setup: `src/app.ts`
- Routes: `src/routes/index.ts`, `src/routes/projects.ts`
- Depends on: `@workspace/db`, `@workspace/api-zod`, `multer`
- `pnpm --filter @workspace/api-server run dev`

### `artifacts/client-portal` (`@workspace/client-portal`)

React + Vite frontend.

- `pnpm --filter @workspace/client-portal run dev`

### `lib/db` (`@workspace/db`)

- Schema: `src/schema/projects.ts` — projects and project_files tables
- `pnpm --filter @workspace/db run push` — push schema changes

### `lib/api-spec` (`@workspace/api-spec`)

- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client/Zod
