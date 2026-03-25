# Workspace

## Overview

pnpm workspace monorepo using TypeScript. KOMPWEB Studios client portal — AI-first freelance design/dev business.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 20
- **Package manager**: pnpm
- **TypeScript version**: ~5.8
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod schemas (hand-authored, not generated)
- **Build**: esbuild bundles api-server from TypeScript source
- **Frontend**: React 19 + Vite 7, Tailwind CSS v4, React Query v5, Wouter

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (PORT=8080)
│   └── client-portal/      # React + Vite client portal frontend (PORT=3000)
├── lib/
│   ├── api-zod/            # Hand-authored Zod schemas for API validation
│   ├── api-client-react/   # Hand-authored React Query hooks
│   └── db/                 # Drizzle ORM schema + DB connection
├── pnpm-workspace.yaml
├── tsconfig.base.json      # Base TS config (customConditions: ["workspace"])
├── tsconfig.json           # Root tsconfig — references lib packages
└── package.json
```

## Important Architecture Notes

- **lib packages resolve to TypeScript source** — both `workspace` AND `default` export conditions in `lib/*/package.json` point to `./src/index.ts`. esbuild (api-server) and Vite (client-portal) both handle TypeScript natively. There is NO compiled `dist/` directory for lib packages.
- **API proxy** — the client-portal Vite config has a proxy that forwards `/api/*` → `http://localhost:8080`. All React Query hooks use relative `/api/...` URLs.
- **Google Sheets tab name** — spreadsheet `1UHLLoZMR8rhPQa3UGFh6rEIl18CHdXtOqTYiaOMrThs` has three tabs: "Get In Touch", "Clients", "Not Q". Contact leads go to "Get In Touch".

## Features

- **Home Page** — Marketing page with platform marquee + technologies grid, contact modal
- **About, Blog, Service Pages** — 7 service pages, about page, blog page
- **Legal Pages** — Privacy Policy, Terms of Service
- **Submit Request** — Clients submit design project requests
- **Track Project** — Clients look up projects by email, see visual status stepper
- **File Upload** — Clients can attach files to projects (stored in Google Drive)
- **Admin Dashboard** — `/admin` (admin@kompweb.com / kompweb2024) — view/manage all projects
- **Client Account** — Registration/login with session storage (`kw_user` key in sessionStorage)
- **Contact Form** — Saves leads to Google Sheets "Get In Touch" tab

## Database Schema

Tables: `projects`, `project_files`, `project_tasks`, `users`

Enums:
- `project_status`: submitted | in_review | in_progress | needs_feedback | delivered | cancelled
- `project_type`: logo_design | brand_identity | web_design | social_media | print_design | illustration | other

## API Routes

- `GET  /api/healthz` — health check
- `GET  /api/projects` — list (filter: ?status=, ?clientEmail=)
- `POST /api/projects` — submit new project
- `GET  /api/projects/:id` — get project with files
- `PATCH /api/projects/:id` — update project (admin)
- `POST /api/projects/:id/upload` — upload file to Google Drive
- `GET  /api/files/:fileId` — download/proxy file from Google Drive
- `DELETE /api/files/:fileId` — delete file from Drive + DB
- `GET  /api/projects/:id/tasks` — list tasks
- `POST /api/projects/:id/tasks` — create task
- `PATCH /api/tasks/:taskId` — update task
- `DELETE /api/tasks/:taskId` — delete task
- `GET  /api/admin/stats` — admin stats
- `POST /api/contact-leads` — append row to Google Sheets "Get In Touch" tab

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Builds via esbuild (build.mjs). Files are stored in Google Drive.
- Entry: `src/index.ts` → `src/app.ts` → `src/routes/`
- Port: 8080
- Dev: `PORT=8080 pnpm --filter @workspace/api-server run dev`

### `artifacts/client-portal` (`@workspace/client-portal`)

React 19 + Vite 7 frontend. Vite proxies `/api/*` → port 8080.
- Port: 3000
- Dev: `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/client-portal run dev`
- Pages: home, about, blog, service-page, submit-request, track-lookup, project-view, admin-dashboard, privacy-policy, terms-of-service, not-found

### `lib/db` (`@workspace/db`)

Drizzle ORM schema + connection. Source-only (no compiled output).
- Entry: `src/index.ts` — exports `db`, `projectsTable`, `projectFilesTable`, `projectTasksTable`, `usersTable`

### `lib/api-zod` (`@workspace/api-zod`)

Zod schemas for API request/response validation. Used only by api-server.
- Entry: `src/index.ts` → `src/generated/api.ts`

### `lib/api-client-react` (`@workspace/api-client-react`)

React Query hooks for client-portal. Uses relative `/api/...` URLs (proxied via Vite).
- Entry: `src/index.ts` → `src/generated/api.ts`
- Exports: `useListProjects`, `useGetProject`, `useCreateProject`, `useUpdateProject`, `useGetAdminStats`, `useGetProjectTasks`, `useCreateProjectTask`, `useUpdateProjectTask`, `useDeleteProjectTask`, `useUploadProjectFile`, `useDeleteFile`
- Types: `Project`, `ProjectFile`, `ProjectTask`, `ProjectStatus`, `ProjectType`, `AdminStats`

## Integrations

- **Google Sheets** — `conn_google-sheet_01KME6BPAQKDDWN2FNY1X90EQZ` — contact lead capture
- **Google Drive** — `conn_google-drive_01KME2GYG7XND4KJGP5FZHBH5K` — file uploads
- Spreadsheet ID: `1UHLLoZMR8rhPQa3UGFh6rEIl18CHdXtOqTYiaOMrThs`

## Custom Domain

kompweb.com → A record @/www → 34.111.179.208; TXT replit-verify on @ and www

## Assets

- OG image: `artifacts/client-portal/public/images/og-image.jpg` (1200×630)
- Favicon: `artifacts/client-portal/public/favicon.ico` (multi-size)
- Apple touch icon: `artifacts/client-portal/public/apple-touch-icon.png` (180×180)
- KOMPWEB icon: `artifacts/client-portal/public/kompweb-icon.png` (512×512)
