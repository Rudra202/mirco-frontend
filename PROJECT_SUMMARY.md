# Micro-Frontend Platform — Full Project Explained

## What is this project?

A **SaaS (Software-as-a-Service) platform** built using **micro-frontend architecture**. Instead of one big app, we split the frontend into smaller independent apps (like Dashboard, Reports, Settings) that work together inside a "Shell" app — just like how micro-services work on the backend.

---

## 🏗 The Big Picture (Architecture)

```
                    ┌─────────────────────────────────────────────┐
                    │              SHELL APP (Port 3000)          │
                    │  ┌──────────┬──────────┬─────────────────┐  │
                    │  │  Login   │  Layout  │  Remote Loader  │  │
                    │  │  Page    │ (Sidebar │  (loads other    │  │
                    │  │          │ +Header) │   apps on demand)│  │
                    │  └──────────┴──────────┴─────────────────┘  │
                    └────────────────┬────────────────────────────┘
                                     │ Module Federation
                                     │ (Webpack feature)
          ┌──────────────────────────┼──────────────────────────┐
          │           │             │             │             │
    ┌─────▼─────┐ ┌──▼──────┐ ┌───▼──────┐ ┌───▼──────────┐
    │ Dashboard  │ │ Workflow │ │ Reports  │ │  Settings    │
    │ (Port 3001)│ │(Port3002)│ │(Port3003)│ │ (Port 3004)  │
    └────────────┘ └──────────┘ └──────────┘ └──────────────┘
          │             │            │              │
          └─────────────┴────────────┴──────────────┘
                              │
                    ┌─────────┴──────────┐
                    │   SHARED PACKAGES  │
                    │  (types, utils,     │
                    │   hooks, api, store,│
                    │   ui components)    │
                    └────────────────────┘
```

**Simple explanation**: The Shell is like a TV. The remotes (Dashboard, Reports, etc.) are like Netflix, YouTube, Prime Video apps on that TV. You open the TV (Shell), and it loads whichever app you click on — without downloading everything at once.

---

## 🧰 Tools We Use & Why

### pnpm (Package Manager)
- **What**: Like npm but faster and smarter
- **Why**: Saves disk space by sharing packages across projects. Uses `workspace:*` to link local packages (like `@platform/types`) without publishing them to npm

### Turborepo (Build Orchestrator)
- **What**: A tool that runs commands across all apps/packages
- **Why**: When you run `pnpm run build`, it builds packages in the right order (e.g., builds `@platform/types` FIRST, then the apps that depend on it). It also caches results — if you didn't change anything, the next build takes 1 second instead of 10

### Webpack 5 + Module Federation (Bundler)
- **What**: Webpack bundles your code into browser-ready files. Module Federation is a special feature that lets apps share code at runtime
- **Why**: Each micro-frontend builds its own bundle. Module Federation lets the Shell load Dashboard's bundle from a different server/port — independently deployable

### TypeScript
- **What**: Adds types to JavaScript
- **Why**: Catches bugs before running the code. When you change a type in `@platform/types`, TypeScript yells at you everywhere that type is used wrong

### React 18
- **What**: UI library
- **Why**: Component-based, widely used, works well with Module Federation

### Tailwind CSS
- **What**: Utility-first CSS framework
- **Why**: Write styles directly in HTML with classes like `text-sm`, `bg-gray-950` — no separate CSS files needed

---

## 📁 ROOT-LEVEL FILES & FOLDERS

### Root Files

| File | What it does |
|---|---|
| `package.json` | Master config — lists all dependencies (React, Zustand, etc.). Scripts like `pnpm run dev` run all apps at once |
| `pnpm-workspace.yaml` | Tells pnpm: "everything in apps/ and packages/ is part of this monorepo" |
| `turbo.json` | Pipeline rules — "build packages first, then apps" |
| `tsconfig.base.json` | Shared TypeScript settings for all workspaces. Also sets `@platform/*` path aliases |
| `tailwind.config.js` | Shared Tailwind CSS theme config (colors, fonts, etc.) |
| `postcss.config.js` | PostCSS plugins — processes Tailwind CSS |
| `.npmrc` | pnpm settings (strict mode, etc.) |
| `.gitignore` | Files to ignore in Git (node_modules, dist) |

### Root Scripts (run from terminal)

| Command | What it does |
|---|---|
| `pnpm run dev` | Starts ALL 5 apps in parallel (shell on 3000, dashboard on 3001, etc.) |
| `pnpm run build` | Builds ALL apps for production (output goes to each app's `dist/` folder) |
| `pnpm run dev:shell` | Start ONLY the shell app |
| `pnpm run dev:dashboard` | Start ONLY the dashboard app |
| `pnpm --filter @platform/shell dev` | Same as above — filter to one workspace |

---

## 📂 APPS — The Micro-Frontends

### `apps/shell/` (Host — Port 3000)
**The main container app. This is what the user sees first.**

| File | Purpose |
|---|---|
| `webpack.config.js` | Webpack config with Module Federation — tells Shell where to find the 4 remote apps |
| `public/index.html` | The HTML page (has `<div id="root">`) |
| `src/index.ts` | **Entry point** — loads CSS, then dynamically imports bootstrap |
| `src/bootstrap.tsx` | Mounts React into the DOM (`createRoot` → renders `<App />`) |
| `src/App.tsx` | **Root component** — checks auth, shows Login or MainLayout |
| `src/index.css` | Global Tailwind styles |
| `src/auth/Login.tsx` | Login form — email/password, calls auth store's login() |
| `src/auth/AuthGuard.tsx` | Feature toggle — hides a section if tenant doesn't have that feature |
| `src/federation/remote.ts` | **Remote registry** — stores URLs for Dashboard, Workflow, Reports, Settings |
| `src/federation/RemoteLoader.tsx` | Lazy-loads a remote app with a loading spinner and error handling |
| `src/layouts/MainLayout.tsx` | Main layout after login — Sidebar + Header + content area with routing |
| `src/providers/AppProviders.tsx` | Sets up dark theme on load |

**How Shell works step-by-step:**
1. Browser loads `index.html` → loads `main.js`
2. `index.ts` imports CSS, then dynamically imports `bootstrap.tsx`
3. `bootstrap.tsx` mounts `<App />` into the DOM
4. `App.tsx` checks: is user logged in?
   - No → show `<Login />`
   - Yes → show `<MainLayout />`
5. `MainLayout.tsx` renders Sidebar (nav menu) + Header (user info)
6. When user clicks "Dashboard" in sidebar → `RemoteLoader` fetches `http://localhost:3001/remoteEntry.js` and renders the Dashboard component

### `apps/dashboard/` (Remote — Port 3001)
**Shows stats, charts, activity feed.**

| File | Purpose |
|---|---|
| `webpack.config.js` | Module Federation — exposes `./DashboardApp` so the Shell can load it |
| `src/index.ts` | Entry — dynamic import to bootstrap |
| `src/bootstrap.tsx` | Mounts `<DashboardPage />` (for standalone dev) |
| `src/app.tsx` | Exported default `<DashboardPage />` — what the Shell imports |
| `src/pages/DashboardPage.tsx` | 4 stat cards (Total Users, Revenue, etc.), 3 charts (Area, Bar, Donut), activity feed |
| `src/pages/mockData.ts` | Fake data for charts (monthly revenue, users by plan) |

### `apps/workflow/` (Remote — Port 3002)
**List of workflows with search and status toggle.**

| File | Purpose |
|---|---|
| `webpack.config.js` | Exposes `./WorkflowApp` |
| `src/index.ts` | Entry |
| `src/bootstrap.tsx` | Mounts standalone |
| `src/app.tsx` | Exported `<WorkflowPage />` |
| `src/pages/WorkflowPage.tsx` | Search bar, workflow cards with pause/activate toggle, confirmation dialog |

### `apps/reports/` (Remote — Port 3003)
**Reports table with filters and a donut chart.**

| File | Purpose |
|---|---|
| `webpack.config.js` | Exposes `./ReportsApp` |
| `src/index.ts` | Entry |
| `src/bootstrap.tsx` | Mounts standalone |
| `src/app.tsx` | Exported `<ReportsPage />` |
| `src/pages/ReportsPage.tsx` | Donut chart by type, searchable table, modals to generate/delete reports |

### `apps/settings/` (Remote — Port 3004)
**User settings — profile, password, theme.**

| File | Purpose |
|---|---|
| `webpack.config.js` | Exposes `./SettingsApp` |
| `src/index.ts` | Entry |
| `src/bootstrap.tsx` | Mounts standalone |
| `src/app.tsx` | Exported `<SettingsPage />` |
| `src/pages/SettingsPage.tsx` | Profile form, password change, dark/light toggle, notifications, danger zone (delete account) |

### How Module Federation connects them

**In Shell's webpack:**
```js
remotes: {
  dashboard: 'dashboard@http://localhost:3001/remoteEntry.js',
  workflow:  'workflow@http://localhost:3002/remoteEntry.js',
  reports:   'reports@http://localhost:3003/remoteEntry.js',
  settings:  'settings@http://localhost:3004/remoteEntry.js',
}
```

**In each Remote's webpack:**
```js
new ModuleFederationPlugin({
  name: 'dashboard',
  filename: 'remoteEntry.js',
  exposes: { './DashboardApp': './src/app' }
})
```

**Translation**: Each remote builds a special file called `remoteEntry.js`. The Shell fetches this file at runtime (when user navigates to that section) and loads the exposed component. That's why it's called "micro-frontend" — each app deploys independently!

---

## 📦 PACKAGES — Shared Code

### `packages/types/` (`@platform/types`)
**Zero-dependency TypeScript types — the data contracts.**

```
User → { id, email, name, role }
Tenant → { id, name, features, theme }
TenantFeatures → { dashboard, workflow, reports, settings }
RemoteConfig → { name, url, scope, module, enabled }
MenuItem → { path, label, icon, badge? }
AuthState → { user, token, isAuthenticated, isInitialized }
```

**Why separate?** Every file that needs a `User` type imports from `@platform/types` — one source of truth.

### `packages/utils/` (`@platform/utils`)
**Pure utility functions (no React, no hooks).**

| Function | What it does |
|---|---|
| `cn()` | Merges CSS class names (filters out undefined/null values) |
| `formatCurrency()` | `1234.5` → `"$1,234.50"` |
| `formatDate()` | Timestamp → `"Jan 15, 2024"` |
| `formatRelativeTime()` | Timestamp → `"5m ago"`, `"2d ago"` |
| `truncate()` | Long string → `"Hello wor..."` |
| `pluralize()` | `pluralize(1, "user")` → `"1 user"`, `pluralize(3, "user")` → `"3 users"` |

### `packages/hooks/` (`@platform/hooks`)
**Custom React hooks for common browser-side logic.**

| Hook | What it does |
|---|---|
| `useDebounce()` | Waits before updating — useful for search input (don't call API on every keystroke) |
| `useMediaQuery()` | Detects screen size — `useMediaQuery('(min-width: 768px)')` tells you if desktop |
| `useLocalStorage()` | Like `useState` but saved to localStorage — survives page refresh |
| `useOnClickOutside()` | Detects click outside a dropdown/modal to close it |

### `packages/api/` (`@platform/api`)
**HTTP communication layer — talks to the backend.**

| File | Purpose |
|---|---|
| `axios.ts` | Pre-configured Axios (like fetch but better). Base URL: `http://localhost:8080/api`. Auto-attaches JWT token from localStorage. On 401 error → redirects to `/login` |
| `auth.api.ts` | `login()`, `logout()`, `getMe()` — calls backend auth endpoints |
| `dashboard.api.ts` | `getStats()` — calls backend for dashboard numbers |

### `packages/store/` (`@platform/store`)
**State management using Zustand (like Redux but simpler).**

| Store | What it holds |
|---|---|
| `auth.store.ts` | Current user, JWT token, login/logout functions. Persists to localStorage so you stay logged in after refresh |
| `tenant.store.ts` | Current organization info, feature flags. `isFeatureEnabled('reports')` → true/false |
| `theme.store.ts` | Dark or light mode. Toggles `dark` class on `<html>` |

**How stores are used:**
```tsx
import { useAuthStore } from '@platform/store';

function Header() {
  const user = useAuthStore(s => s.user);        // get current user
  const logout = useAuthStore(s => s.logout);    // get logout function
  return <span>{user.name}</span>;
}
```

### `packages/ui/` (`@platform/ui`)
**Shared UI component library — 18 components used by all apps.**

| Component | What it does |
|---|---|
| `Button` | Reusable button with variants (primary, secondary, danger), sizes, loading spinner |
| `Input` | Text input with label, error message, helper text |
| `Select` | Dropdown select with placeholder |
| `Card` | Bordered container with header and body |
| `Modal` | Popup dialog with title, content, footer. Closes on Escape key |
| `Table` | Data table with loading skeletons, empty state, clickable rows |
| `Sidebar` | Collapsible navigation — icons only or full labels |
| `Header` | Top bar with user avatar, name, role, theme toggle, logout |
| `Loader` | Centered spinner (small/medium/large) |
| `Skeleton` | Animated placeholder shapes for loading state |
| `Skeletons` | Pre-made skeleton patterns (stat card, chart, activity list) |
| `EmptyState` | "No data yet" placeholder with icon |
| `Badge` | Small colored tag (e.g., "Active", "Pending") |
| `PageHeader` | Page title with optional breadcrumbs and action buttons |
| `PageTransition` | Animated wrapper — old page fades out, new page fades in |
| `AreaChart` | Area chart with gradient fill (uses Recharts) |
| `BarChart` | Grouped bar chart (Recharts) |
| `DonutChart` | Donut chart with percentage labels (Recharts) |
| `animations.ts` | Reusable animation presets (fadeIn, slideUp, stagger) for Framer Motion |

---

## 🔄 DATA FLOW (How things work together)

### User logs in:
```
Login form → auth.store.login() → stores user + token in localStorage
                              → App.tsx detects isAuthenticated = true
                              → renders MainLayout (Sidebar + Header + routes)
```

### User views Dashboard:
```
Clicks "Dashboard" in Sidebar
  → MainLayout finds the route for /dashboard
  → RemoteLoader loads dashboard's remoteEntry.js from port 3001
  → DashboardPage renders stats cards + charts
  → DashboardPage calls dashboardApi.getStats() to fetch data
```

### Feature toggle (multi-tenant):
```
AuthGuard checks: tenant.features.dashboard === true?
  → Yes → show the route
  → No → show "Feature not available" message
```

---

## 🚦 HOW TO RUN

```bash
# From the root folder (C:\Users\Lenovo\Desktop\mirco-frontend)

pnpm run dev           # Start ALL apps (5 terminals in one)
pnpm run dev:shell     # Only shell (port 3000)
pnpm run dev:dashboard # Only dashboard (port 3001)
pnpm run build         # Build everything for production
```

Open http://localhost:3000 in browser.

---

## 💡 Key Concepts to Remember

1. **Monorepo** = Multiple projects in one Git repo. Tools like pnpm + Turborepo manage them together
2. **Module Federation** = Webpack feature that lets apps share code at runtime (not at build time). Each app builds independently, then loads others on demand
3. **Micro-frontend** = Split the frontend into independent apps (like micro-services on backend). Each team can own one micro-frontend
4. **Zustand** = State management. Like Redux but less boilerplate. A store is just a function
5. **Turborepo** = Smart task runner. Only rebuilds what changed. Runs tasks in parallel where possible
