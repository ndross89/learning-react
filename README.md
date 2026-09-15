# Learning React

A structured, hands-on repo for learning React from first principles to job-ready skills. Built with **React 19 + Vite + JSX**.

> **Goal:** Build deep React knowledge through concept guides, regular practice projects, and a full capstone — enough to work professionally as a React developer.

---

## Prerequisites

Before you start, make sure you have:

- [ ] **Node.js LTS** (v20+) — `node -v` to confirm
- [ ] **npm** (bundled with Node) or pnpm / yarn / bun
- [ ] **[React Developer Tools](https://react.dev/learn/react-developer-tools)** — browser extension (Chrome / Firefox). Install this now. It's your primary debugging tool.
- [ ] Solid JavaScript: ES6+, arrow functions, array methods, destructuring, async/await
- [ ] Comfort with the terminal and a code editor

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## How This Repo Is Organized

```
learning-react/
├── src/                    # Main app (used for scratchpad / sandbox)
├── projects/               # Practice projects — one folder each
│   ├── 01-component-zoo/
│   ├── 02-todo-app/
│   ├── 03-weather-dashboard/
│   ├── 04-multi-page-site/
│   ├── 05-theme-auth-context/
│   ├── 06-quiz-app/
│   └── 07-job-board/       # Capstone
└── docs/
    ├── setup.md            # Install guide, configs, tooling
    ├── roadmap.md          # 4-phase concept learning roadmap
    └── projects.md         # 7-project build roadmap + capstone
```

---

## Learning Path

Work through these in order. Each phase has a concept guide, then a project to apply it.

| Phase | Topic | Weeks | Project |
| --- | --- | --- | --- |
| [Phase 1](docs/roadmap.md#phase-1--react-fundamentals) | React Fundamentals | 1–2 | [Component Zoo](projects/01-component-zoo/) |
| [Phase 2](docs/roadmap.md#phase-2--hooks--side-effects) | Hooks & Side Effects | 3–4 | [Todo App](projects/02-todo-app/) + [Weather Dashboard](projects/03-weather-dashboard/) |
| [Phase 3](docs/roadmap.md#phase-3--scaling-react) | Scaling React | 5–6 | [Multi-Page Site](projects/04-multi-page-site/) + [Theme & Auth](projects/05-theme-auth-context/) |
| [Phase 4](docs/roadmap.md#phase-4--professional-patterns) | Professional Patterns | 7–8 | [Quiz App](projects/06-quiz-app/) |
| Capstone | Everything | 9–10 | [Job Board](projects/07-job-board/) |

---

## Documentation

- [**Setup Guide**](docs/setup.md) — scaffolding, install commands, Prettier, testing setup
- [**Concept Roadmap**](docs/roadmap.md) — every React concept with examples, pitfalls, and project links
- [**Projects Roadmap**](docs/projects.md) — all 7 projects with goals, acceptance criteria, and test strategy

---

## Progress Tracker

Check these off as you complete them.

### Phase 1 — React Fundamentals
- [ ] JSX & the component mental model
- [ ] Function components & props
- [ ] `useState` — local state
- [ ] Event handling
- [ ] Lists & keys
- [ ] Conditional rendering
- [ ] Controlled forms & inputs
- [ ] **Project: 01-component-zoo**
- [ ] **Project: 02-todo-app** (first half)

### Phase 2 — Hooks & Side Effects
- [ ] `useEffect` — side effects, dependency array, cleanup
- [ ] Fetching data with `fetch` + `async/await`
- [ ] Loading and error states
- [ ] `useRef`
- [ ] Custom hooks
- [ ] Lifting state up / prop drilling
- [ ] `useMemo` & `useCallback`
- [ ] **Project: 02-todo-app** (complete)
- [ ] **Project: 03-weather-dashboard**

### Phase 3 — Scaling React
- [ ] React Router v7 — routes, NavLink, useParams, loaders
- [ ] Context API + `useContext`
- [ ] `useReducer`
- [ ] Error Boundaries
- [ ] **Project: 04-multi-page-site**
- [ ] **Project: 05-theme-auth-context**

### Phase 4 — Professional Patterns
- [ ] Vitest + React Testing Library
- [ ] `React.memo`, `lazy`, `Suspense`
- [ ] Compound components & render props
- [ ] Accessibility in React (ARIA, focus, semantics)
- [ ] Environment variables (`VITE_*`)
- [ ] **Project: 06-quiz-app**

### Capstone
- [ ] **Project: 07-job-board** — all skills combined

---

## Useful Commands

```bash
# Run the sandbox app
npm run dev

# Lint
npm run lint

# Build
npm run build

# Run tests (once Vitest is configured — see docs/setup.md)
npm test
```

---

## Key Resources

- [React docs](https://react.dev/) — official, excellent
- [Vite docs](https://vite.dev/guide/)
- [React Router v7](https://reactrouter.com/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
