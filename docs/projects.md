# Projects Roadmap

7 practice projects that build on each other, ending in a full capstone. Each project lives in `projects/NN-name/` as a standalone Vite app.

---

## How to Use This Guide

1. Read the concept docs in [roadmap.md](roadmap.md) for the relevant phase first.
2. Scaffold the project (instructions per project below).
3. Build to the acceptance criteria — don't skip them, they define "done."
4. Write the tests before moving on. If you can't test it, you don't fully understand it yet.
5. Commit your work with conventional commit messages (`feat:`, `fix:`, `test:`).

---

## Project Index

| # | Project | Phase | Key Concepts | Tests |
| --- | --- | --- | --- | --- |
| [01](#01-component-zoo) | Component Zoo | 1 | JSX, props, composition | None |
| [02](#02-todo-app) | Todo App | 1–2 | useState, forms, events, lifting state | Render, user-event |
| [03](#03-weather-dashboard) | Weather Dashboard | 2 | useEffect, fetch, custom hooks, loading/error | Mock fetch |
| [04](#04-multi-page-site) | Multi-Page Site | 3 | React Router v7, layouts, params | Route assertions |
| [05](#05-theme-auth-context) | Theme & Auth Context | 3 | Context, useReducer, protected routes | Context renders |
| [06](#06-quiz-app) | Quiz App | 3–4 | useReducer state machine, useMemo, Error Boundary | Reducer + integration |
| [07](#07-job-board) | Job Board *(Capstone)* | All | Everything combined | Full suite |

---

## 01 — Component Zoo

**Phase:** 1 — React Fundamentals
**Folder:** `projects/01-component-zoo/`
**Paired concepts:** [1.1 JSX](roadmap.md#11-jsx--the-component-mental-model), [1.2 Props](roadmap.md#12-function-components--props), [1.5 Lists](roadmap.md#15-lists--keys), [1.6 Conditional Rendering](roadmap.md#16-conditional-rendering)

### Goal

Build a static component gallery — a page that showcases a library of reusable UI components. No global state. The purpose is to get comfortable writing JSX, designing props APIs, and composing components.

### Scaffold

```bash
cd projects
npm create vite@latest 01-component-zoo -- --template react
cd 01-component-zoo && npm install
```

### Components to Build

| Component | Props to implement |
| --- | --- |
| `Button` | `label`, `variant` (`primary`/`secondary`/`danger`), `size` (`sm`/`md`/`lg`), `disabled`, `onClick` |
| `Badge` | `text`, `color` (`green`/`yellow`/`red`/`blue`) |
| `Avatar` | `src`, `alt`, `size`, `fallback` (initials when no image) |
| `Card` | `title`, `description`, `image` (optional), `children`, `footer` (optional) |
| `Alert` | `message`, `type` (`info`/`success`/`warning`/`error`), `dismissible` |
| `Tag` | `label`, `onRemove` (optional) |

A `Gallery` page in `App.jsx` renders all variants of every component side by side.

### Acceptance Criteria

- [ ] Every component accepts and uses the listed props
- [ ] `Button` renders `disabled` attribute when `disabled={true}`
- [ ] `Avatar` shows initials when no `src` is provided
- [ ] `Alert` hides itself when the dismiss button is clicked (local state)
- [ ] All lists of items (e.g. a row of Badges) use a `key` prop
- [ ] No hardcoded colors or strings outside of the `Gallery` demo data
- [ ] `npm run build` completes without errors

### Tests

No tests for this project — the goal is fluency with JSX and props. Visual verification is sufficient.

### What to commit

```
feat: add Button component with variant and size props
feat: add Badge and Avatar components
feat: add Card, Alert, Tag components
feat: add Gallery page with all component demos
```

---

## 02 — Todo App

**Phase:** 1–2 — Fundamentals + State
**Folder:** `projects/02-todo-app/`
**Paired concepts:** [1.3 useState](roadmap.md#13-usestate--local-state), [1.4 Events](roadmap.md#14-event-handling), [1.7 Forms](roadmap.md#17-controlled-forms--inputs), [2.5 Lifting State](roadmap.md#25-lifting-state-up--prop-drilling), [4.1 Testing](roadmap.md#41-testing-with-vitest--react-testing-library)

### Goal

A classic CRUD todo app with filter tabs. This project forces you to manage lists with state, handle forms, and think about component boundaries and state ownership.

### Scaffold

```bash
cd projects
npm create vite@latest 02-todo-app -- --template react
cd 02-todo-app && npm install
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

### Features

- Add a todo by typing in an input and pressing Enter or clicking Add
- Mark a todo complete by clicking a checkbox
- Delete a todo with a delete button
- Edit a todo in-place (double-click to enter edit mode)
- Filter tabs: **All** | **Active** | **Done**
- Show a count: `3 items left`
- Clear all completed button (only visible when there are completed todos)

### Component Structure (suggested)

```
App.jsx
  TodoForm.jsx       — controlled input + submit
  FilterTabs.jsx     — All / Active / Done tabs
  TodoList.jsx       — maps todos → TodoItem
    TodoItem.jsx     — checkbox, label (edit mode), delete button
  TodoFooter.jsx     — item count + clear completed
```

### Acceptance Criteria

- [ ] Adding an empty string does nothing
- [ ] Completing a todo moves it out of the Active filter view
- [ ] Editing a todo updates its text; pressing Escape cancels the edit
- [ ] The `Clear completed` button only appears when at least one todo is done
- [ ] Filter state persists when items are added/removed
- [ ] Each todo has a unique `id` (use `crypto.randomUUID()`)
- [ ] `npm run build` completes without errors

### Test Strategy

Write tests in `src/__tests__/`. Run with `npm test`.

| Test | What to assert |
| --- | --- |
| Adding a todo | Renders in the list after form submit |
| Completing a todo | Checkbox toggles; item appears/disappears under Active/Done filters |
| Deleting a todo | Item removed from the list |
| Empty input | No new todo created |
| Filter tabs | Active tab only shows incomplete; Done tab only shows complete |

```jsx
// Example test structure
describe('Todo App', () => {
  it('adds a new todo on form submit', async () => { ... })
  it('does not add an empty todo', async () => { ... })
  it('marks a todo as complete', async () => { ... })
  it('deletes a todo', async () => { ... })
  it('filters show correct todos', async () => { ... })
})
```

---

## 03 — Weather Dashboard

**Phase:** 2 — Hooks & Side Effects
**Folder:** `projects/03-weather-dashboard/`
**Paired concepts:** [2.1 useEffect](roadmap.md#21-useeffect--side-effects), [2.2 Fetching Data](roadmap.md#22-fetching-data), [2.3 useRef](roadmap.md#23-useref), [2.4 Custom Hooks](roadmap.md#24-custom-hooks)

### Goal

Fetch live weather data from a public API and display it. The core skill is `useEffect` + async data fetching + the loading/error/data state pattern. You'll also extract a reusable `useFetch` custom hook.

**API: [Open-Meteo](https://open-meteo.com/)** — completely free, no API key required.

```
Hourly forecast example:
https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1
```

### Scaffold

```bash
cd projects
npm create vite@latest 03-weather-dashboard -- --template react
cd 03-weather-dashboard && npm install
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

### Features

- Search bar: enter a city name, click Search
  - Use a free geocoding API to resolve city → lat/lon: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1`
- Display current temperature, weather condition, and high/low for the day
- Hourly temperature chart (use a simple `<ul>` or a CSS bar chart — no chart library required)
- Loading skeleton while fetching
- Error message if the city isn't found or the fetch fails
- A "recent searches" list stored in `useRef` (doesn't need to persist on refresh)

### Component Structure (suggested)

```
App.jsx
  SearchBar.jsx          — controlled input, search button
  WeatherCard.jsx        — current conditions
  HourlyChart.jsx        — hourly temps as bars
  RecentSearches.jsx     — list from ref
  hooks/
    useFetch.js          — generic fetch hook
    useWeather.js        — weather-specific hook (wraps useFetch)
```

### Acceptance Criteria

- [ ] Shows a loading indicator while the API request is in flight
- [ ] Shows a clear error message when a city isn't found
- [ ] Shows a clear error message when the network request fails
- [ ] Re-fetches data when a new city is searched
- [ ] `useFetch` is a generic custom hook (not weather-specific — reusable for any URL)
- [ ] `useWeather` wraps `useFetch` with weather-specific logic
- [ ] No API call is made when the search input is empty
- [ ] `npm run build` completes without errors

### Test Strategy

| Test | What to assert |
| --- | --- |
| `useFetch` | Returns loading=true initially, data on success, error on failure |
| `WeatherCard` | Renders temp and condition from mock data |
| Loading state | Shows skeleton/spinner when loading=true |
| Error state | Shows error message when error is not null |
| Empty search | No fetch triggered |

**Mocking fetch in tests:**

```js
vi.spyOn(global, 'fetch').mockResolvedValueOnce({
  ok: true,
  json: async () => mockWeatherData,
})
```

---

## 04 — Multi-Page Site

**Phase:** 3 — Scaling React
**Folder:** `projects/04-multi-page-site/`
**Paired concepts:** [3.1 React Router](roadmap.md#31-react-router-v7)

### Goal

Build a personal portfolio shell with full client-side routing. The content doesn't matter — the goal is to get fluent with React Router v7: nested routes, dynamic segments, loaders, and programmatic navigation.

### Scaffold

```bash
cd projects
npm create vite@latest 04-multi-page-site -- --template react
cd 04-multi-page-site && npm install
npm install react-router
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

### Pages & Routes

| Route | Component | Notes |
| --- | --- | --- |
| `/` | `Home` | Hero section |
| `/projects` | `Projects` | List of project cards |
| `/projects/:slug` | `ProjectDetail` | Detail page using `useParams` |
| `/about` | `About` | Bio + skills |
| `/contact` | `Contact` | Controlled form (no submission required) |
| `*` | `NotFound` | 404 page with back-home link |

**Layout route** (`Layout.jsx`) — wraps all pages with `<Nav>` + `<Outlet>` + `<Footer>`.

### Features

- `NavLink` with active styling (the current page's link looks different)
- Dynamic project detail: clicking a project card navigates to `/projects/:slug`
- `useNavigate` for the "Back to projects" button on the detail page
- 404 page for any unknown URL
- Scroll to top on route change

### Acceptance Criteria

- [ ] All 5 routes render without errors
- [ ] `NavLink` highlights the active page
- [ ] `/projects/:slug` reads the slug from the URL and renders matching project data
- [ ] Navigating to a non-existent route shows the 404 page
- [ ] Clicking the browser Back/Forward buttons navigates correctly
- [ ] The layout (nav + footer) persists across route changes
- [ ] `npm run build` completes without errors

### Test Strategy

Use `MemoryRouter` to test routing in isolation.

| Test | What to assert |
| --- | --- |
| Route rendering | `/about` renders the About component |
| Dynamic param | `/projects/my-app` renders the correct project name |
| Not found | An unknown path renders the 404 page |
| NavLink active state | Active link has the expected `aria-current` attribute |

---

## 05 — Theme & Auth Context

**Phase:** 3 — Scaling React
**Folder:** `projects/05-theme-auth-context/`
**Paired concepts:** [3.2 Context](roadmap.md#32-context-api--usecontext), [3.3 useReducer](roadmap.md#33-usereducer)

### Goal

Build an app shell that demonstrates two of the most common real-world Context patterns: a theme switcher and a fake authentication flow with protected routes.

### Scaffold

```bash
cd projects
npm create vite@latest 05-theme-auth-context -- --template react
cd 05-theme-auth-context && npm install
npm install react-router
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

### Features

**Theme:**
- Toggle between light and dark mode
- Theme preference stored in `localStorage` and restored on load
- CSS custom properties (variables) change based on theme — no inline styles

**Auth:**
- Fake login form (any username/password passes)
- `AuthContext` with `useReducer` managing `{ user, isAuthenticated }` state
- A protected `/dashboard` route that redirects to `/login` when not authenticated
- After login, redirect back to the originally requested page
- Logout button clears auth state

### Component & Context Structure

```
src/
  contexts/
    ThemeContext.jsx    — ThemeProvider + useTheme hook
    AuthContext.jsx     — AuthProvider + useAuth hook + authReducer
  components/
    ProtectedRoute.jsx  — redirects to /login if not authenticated
    ThemeToggle.jsx
    NavBar.jsx
  pages/
    Login.jsx
    Dashboard.jsx       — protected
    Home.jsx
```

### Acceptance Criteria

- [ ] Theme toggle changes the CSS variables throughout the app
- [ ] Theme persists on page refresh via `localStorage`
- [ ] Visiting `/dashboard` while unauthenticated redirects to `/login`
- [ ] After login, the user lands on the page they originally tried to visit
- [ ] Logout returns the user to `/` and clears the protected content
- [ ] `AuthContext` uses `useReducer` (not `useState`) for the auth state
- [ ] `ThemeContext` and `AuthContext` are in separate files
- [ ] `npm run build` completes without errors

### Test Strategy

Wrap components in their Providers for tests.

| Test | What to assert |
| --- | --- |
| `ThemeToggle` | Clicking toggle switches theme value in context |
| `ProtectedRoute` | Redirects to `/login` when `isAuthenticated=false` |
| `ProtectedRoute` | Renders children when `isAuthenticated=true` |
| Auth login flow | Dispatching `LOGIN` action updates `isAuthenticated` |
| `authReducer` | Unit test: LOGIN, LOGOUT actions produce correct state |

```jsx
// Testing with a custom render helper
function renderWithProviders(ui, { initialAuth } = {}) {
  return render(
    <AuthProvider initialState={initialAuth}>
      <ThemeProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}
```

---

## 06 — Quiz App

**Phase:** 3–4 — Complex State + Testing
**Folder:** `projects/06-quiz-app/`
**Paired concepts:** [3.3 useReducer](roadmap.md#33-usereducer), [3.4 Error Boundary](roadmap.md#34-error-boundaries), [2.6 useMemo/useCallback](roadmap.md#26-usememo--usecallback), [4.1 Testing](roadmap.md#41-testing-with-vitest--react-testing-library)

### Goal

A timed multiple-choice quiz with a review screen. This project is about modeling a non-trivial state machine with `useReducer` — the quiz has clear states (idle → in-progress → reviewing → complete) that don't map cleanly to individual `useState` calls.

### Scaffold

```bash
cd projects
npm create vite@latest 06-quiz-app -- --template react
cd 06-quiz-app && npm install
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

### State Machine

```
idle
  → START → in-progress
in-progress
  → ANSWER → in-progress (next question) or reviewing (last question)
  → TIMEOUT → reviewing
reviewing
  → NEXT_QUESTION → in-progress (if going back through)
  → FINISH → complete
complete
  → RESTART → idle
```

### Features

- Load questions from a local `questions.js` file (10 questions, 4 options each)
- 30-second countdown timer per question (implemented with `useEffect` + `useRef`)
- If time runs out, the question is marked as unanswered
- After all questions: score summary screen showing `X / 10 correct`
- Review screen: see each question, your answer, and the correct answer
- Restart button resets to the beginning

### State Shape

```js
{
  status: 'idle' | 'in-progress' | 'reviewing' | 'complete',
  currentIndex: 0,
  answers: [],        // { questionId, selected, correct }[]
  timeLeft: 30,
}
```

### Derived values with `useMemo`

```js
const score = useMemo(
  () => state.answers.filter(a => a.correct).length,
  [state.answers]
)
```

### Acceptance Criteria

- [ ] Quiz can only start from the idle screen
- [ ] Timer counts down from 30 for each question
- [ ] Unanswered questions (timeout) are recorded as wrong
- [ ] Score is calculated correctly at the end
- [ ] Review screen shows all questions with correct/incorrect indication
- [ ] Restart resets all state to initial
- [ ] An `ErrorBoundary` wraps the quiz — if a question fails to render, a fallback appears
- [ ] `npm run build` completes without errors

### Test Strategy

This project has two test layers:

**Unit tests for the reducer:**

```js
describe('quizReducer', () => {
  it('START transitions status to in-progress', () => { ... })
  it('ANSWER records the answer and advances the index', () => { ... })
  it('TIMEOUT marks the question as unanswered', () => { ... })
  it('RESTART resets to initial state', () => { ... })
})
```

**Integration tests for the UI:**

| Test | What to assert |
| --- | --- |
| Start screen | "Start Quiz" button is visible |
| Answering a question | Selecting an option advances to the next question |
| Timer display | Countdown text is visible |
| Results screen | Score `X / 10` is shown after all questions answered |
| Review screen | Each question shows the correct answer |

---

## 07 — Job Board *(Capstone)*

**Phase:** All
**Folder:** `projects/07-job-board/`
**Paired concepts:** Everything from Phases 1–4

### Goal

A full-featured SPA that brings every concept together. This is the project you show in your portfolio. Build it as if you were a junior developer on a real team — with tests, accessible markup, code splitting, and clean component structure.

### Scaffold

```bash
cd projects
npm create vite@latest 07-job-board -- --template react
cd 07-job-board && npm install
npm install react-router
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**Data source:** Use [The Muse API](https://www.themuse.com/developers/api/v2) (free, no key for basic use) or create a local `public/jobs.json` mock file.

```bash
# .env.local
VITE_API_URL=https://www.themuse.com/api/public/jobs
```

### Pages & Routes

| Route | Notes |
| --- | --- |
| `/` | Home — featured jobs, search bar |
| `/jobs` | Browse — full listing with filters |
| `/jobs/:id` | Job detail — full description, apply link |
| `/saved` | Saved jobs — protected (auth required) |
| `/login` | Login page |
| `*` | 404 |

### Feature Breakdown

**Browsing & Search (Phase 1–2 concepts)**
- Job listing cards rendered from API data
- Search by keyword (filters on the client side)
- Filter by category / location
- Pagination or "Load more"
- Loading skeleton + error state for API calls
- `useFetch` or `useJobs` custom hook

**Routing (Phase 3)**
- React Router v7 with a root layout (nav + footer)
- Job detail page with `useParams` + fetches the individual job
- 404 fallback

**State Management (Phase 3)**
- `SavedJobsContext` — save/unsave jobs, persisted to `localStorage`
- `AuthContext` + `useReducer` — fake login/logout
- Protected `/saved` route

**Performance (Phase 4)**
- All routes lazy-loaded with `lazy` + `Suspense`
- `React.memo` on the `JobCard` component (renders a large list)

**Accessibility (Phase 4)**
- All images have `alt` text
- Search input has a visible label or `aria-label`
- Cards are keyboard-focusable and navigable with `Enter`
- Loading states use `aria-live="polite"`
- Color contrast passes WCAG AA

**Testing (Phase 4)**

| Test category | Examples |
| --- | --- |
| Custom hooks | `useFetch`: loading, success, error states |
| Reducers | `savedJobsReducer`: ADD_JOB, REMOVE_JOB, CLEAR |
| Components | `JobCard` renders title, company, location |
| Auth flow | Protected route redirects; login sets auth state |
| Search/filter | Filtering jobs by keyword returns correct results |

### Acceptance Criteria

- [ ] Browse page fetches and displays job listings
- [ ] Search filters jobs in real time
- [ ] Job detail page shows full job description
- [ ] Saving a job works and persists on refresh (localStorage)
- [ ] `/saved` is only accessible when logged in
- [ ] All routes are lazy-loaded (check Network tab: separate chunks per route)
- [ ] `npm run build` produces no warnings about chunk sizes over 500kb
- [ ] `npm test` passes all tests
- [ ] Zero console errors in the browser
- [ ] All interactive elements are keyboard-accessible
- [ ] `npm run lint` passes

### Suggested Component Structure

```
src/
  components/
    JobCard.jsx            — memoized
    JobList.jsx
    SearchBar.jsx
    FilterPanel.jsx
    Pagination.jsx
    SkeletonCard.jsx
    ProtectedRoute.jsx
    ErrorBoundary.jsx
  pages/
    Home.jsx
    Browse.jsx
    JobDetail.jsx
    Saved.jsx
    Login.jsx
    NotFound.jsx
  contexts/
    AuthContext.jsx
    SavedJobsContext.jsx
  hooks/
    useFetch.js
    useJobs.js
    useSavedJobs.js
  __tests__/
    useFetch.test.js
    savedJobsReducer.test.js
    JobCard.test.jsx
    Browse.test.jsx
    auth.test.jsx
```

### Stretch Goals (after core is complete)

- Add a dark/light theme toggle (reuse what you built in Project 05)
- Add skeleton loading animation with CSS
- Add keyboard shortcut to focus the search bar (`/` key)
- Deploy to Vercel or Netlify — share the URL

---

## General Project Guidelines

**Each project should have its own:**
- `README.md` in its folder describing what it does and how to run it
- Working `npm run dev`, `npm run build`, and `npm test` scripts
- `.gitignore` covering `node_modules/` and `dist/`

**Commit conventions:**
- `feat: add component` — new feature or component
- `fix: correct filter logic` — bug fix
- `test: add TodoItem tests` — adding tests
- `refactor: extract useFetch hook` — restructuring without behavior change
- `docs: add project README` — documentation only

**Code quality habits to build:**
- One component per file
- Prop destructuring at the top of each function
- No hardcoded magic strings/numbers — use constants or config
- No `console.log` left in committed code (use the linter to catch this)
