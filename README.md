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
├── src/                         # Sandbox — current practice build
├── completed_projects/          # Snapshots of finished practice (e.g. first-project)
├── learning_modules/            # Lessons, one folder per module
└── docs/
    ├── setup.md
    └── react-learning-roadmap.md
```

---

## Learning Path

Work the **10-module map**. Practice for Modules 4–10 is a Watchlist through-line in `src/`. The original UserCard / team-member builds are retired; `first-project` already covered that ground.

| Module | Topic | Status |
| --- | --- | --- |
| 1 | Mental model | Complete — reference |
| 2 | First project review | Recap |
| 3 | Props | Recap |
| 4 | Lists, keys, show/hide | Gap + Watchlist start |
| 5 | useState | Recap |
| 6 | Controlled inputs | **Next new skill** |
| 7 | Forms | Upcoming |
| 8 | useEffect | Upcoming |
| 9 | Lifting state | Upcoming |
| 10 | Router + Supabase | Upcoming |

Full assessment, retired exercises, and links: [docs/react-learning-roadmap.md](docs/react-learning-roadmap.md).

---

## Documentation

- [**Setup Guide**](docs/setup.md) — scaffolding, install commands, Prettier, testing setup
- [**Learning Map**](docs/react-learning-roadmap.md) — 10 modules, assessment of `first-project`, Watchlist practices

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
