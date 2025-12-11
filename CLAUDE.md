# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bonsale OutboundKit is a standalone outbound calling system designed to support various outbound functions like Morning Call. It's built as an independent, decoupled system that can be deployed locally or in the cloud, and integrated into Bonsale via iframe.

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) with Emotion styling
- **Routing**: React Router v6 with lazy loading
- **Data Fetching**: SWR
- **Form Management**: React Hook Form + Zod validation
- **Internationalization**: i18next + react-i18next
- **Utilities**: Lodash, date-fns, Axios

## Development Commands

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
# Runs on http://localhost:5174 with host exposed
```

### Build
```bash
npm run build
# TypeScript compilation + Vite build
```

### Linting
```bash
npm run lint          # Type check + ESLint
npm run lint:fix      # Auto-fix linting issues
```

### Preview Production Build
```bash
npm run preview
```

## Architecture

### Path Aliases
- `@/*` maps to `src/*` (configured in both tsconfig.json and vite.config.ts)
- Always use `@/` imports for internal modules

### Router Architecture
- Uses React Router v6 with `createBrowserRouter`
- Located in `src/router/index.tsx`
- Implements lazy loading for route components using dynamic imports
- Pattern: `lazy: async () => { const { Component } = await import('@/features/...'); return { Component } }`
- 404 fallback route configured at path `*`

### Feature-Based Organization
- Features are organized by business domain in `src/features/`
- Each feature directory exports its components via barrel exports (index.tsx)
- Currently implemented: `morningCall` feature for managing daily outbound call tasks
- Features are self-contained modules that include their own components, hooks, and logic

### Theme Configuration
- Material-UI theme configured in `App.tsx`
- Global theme provider wraps entire application
- CssBaseline applied for consistent baseline styles

### API Integration
- Vite dev server proxies `/api` requests to backend
- API URL configured via `VITE_APP_API_URL` environment variable (defaults to http://localhost:3000)
- Create `.env` from `.env.example` and set appropriate API URL

### TypeScript Configuration
- Strict mode enabled
- Unused locals and parameters flagged as errors
- Bundler module resolution for Vite compatibility
- Path mapping configured for `@/*` imports

### ESLint Rules
- React Hooks rules enforced
- TypeScript recommended rules
- `@typescript-eslint/no-explicit-any`: warn (allowed but discouraged)
- Unused variables: warn (prefix with `_` to ignore)
- React Refresh: only-export-components warning

## Directory Structure

```
src/
├── features/        # Feature modules (morningCall, etc.)
├── components/      # Shared components
├── hooks/           # Custom React hooks
├── services/        # API service layer
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── locales/         # i18n translation files
├── router/          # Route configuration
├── assets/          # Static assets
├── App.tsx          # Root component with theme provider
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Development Guidelines

### Adding New Features
1. Create feature directory under `src/features/[feature-name]/`
2. Export components via barrel export in feature's `index.tsx`
3. Add route in `src/router/index.tsx` with lazy loading
4. Use feature-based organization to keep related code together

### Adding Routes
- Add routes to `src/router/index.tsx`
- Use lazy loading pattern for code splitting
- Import components from feature barrel exports (`@/features/[feature]`)

### Component Development
- Use Material-UI components and styling system
- Follow React Hooks best practices
- Use TypeScript for type safety
- Leverage path aliases (`@/`) for clean imports

### Environment Variables
- Prefix all environment variables with `VITE_` to expose to client
- Access via `import.meta.env.VITE_*`
- Store sensitive config in `.env` (gitignored)
