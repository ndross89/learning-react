# React Concept Roadmap

A 4-phase guide to every React concept you need to become job-ready. Each concept includes a plain-language explanation, the key pattern, common mistakes, and a link to the project that exercises it.

Work through phases in order. Resist jumping ahead — each phase builds vocabulary the next one needs.

---

## Table of Contents

- [Phase 1 — React Fundamentals](#phase-1--react-fundamentals)
- [Phase 2 — Hooks & Side Effects](#phase-2--hooks--side-effects)
- [Phase 3 — Scaling React](#phase-3--scaling-react)
- [Phase 4 — Professional Patterns](#phase-4--professional-patterns)

---

## Phase 1 — React Fundamentals

> **Weeks 1–2.** Build the core mental model: UI as a function of state.
> **Projects:** [01-component-zoo](../projects/01-component-zoo/), [02-todo-app](../projects/02-todo-app/)

---

### 1.1 JSX & the Component Mental Model

**What it is:** JSX is JavaScript that looks like HTML. React compiles it to `React.createElement()` calls. The key mental shift: your UI is not a template — it's the *return value* of a function.

**When to use:** Every time you write a component. JSX is the standard way to describe React UIs.

**Key pattern:**

```jsx
// A component is a plain function that returns JSX
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}

// JSX expressions: wrap JS in {}
function Price({ amount }) {
  return <span>${amount.toFixed(2)}</span>
}
```

**Rules to remember:**
- JSX must return a single root element. Use `<>...</>` (Fragment) if you don't want a wrapper div.
- Use `className` not `class`. Use `htmlFor` not `for`.
- All tags must be closed: `<img />`, `<input />`.
- Expressions in `{}` must evaluate to a value — you can't put `if/else` or `for` loops directly inside JSX (use ternary or array methods instead).

**Common mistakes:**
- Treating JSX like a template string. It is not — it's function calls.
- Forgetting that `{/* comment */}` is how you write JSX comments (not `//`).

> **Resources →** [JSX & Component Mental Model videos + articles](resources.md#11-jsx--the-component-mental-model)

---

### 1.2 Function Components & Props

**What it is:** A component is a function. Props are its arguments — data passed in from a parent. Think of props as function parameters you can't modify.

**When to use:** Every UI element should be a component. Start small and compose up.

**Key patterns:**

```jsx
// Declare props as a destructured parameter
function Button({ label, variant = 'primary', onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  )
}

// Compose components
function App() {
  return (
    <div>
      <Button label="Save" onClick={() => console.log('saved')} />
      <Button label="Cancel" variant="secondary" onClick={() => {}} />
    </div>
  )
}
```

**`children` prop:**

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

// Usage:
<Card title="Welcome">
  <p>Any JSX here becomes children.</p>
</Card>
```

**Common mistakes:**
- Mutating props: `props.value = 'new'` — never do this. Props are read-only.
- Making every piece of state a prop. If a value only changes inside a component, it should be state (next section).
- Giant monolith components. If a component is longer than ~80 lines, look for things to extract.

> **Resources →** [Function Components & Props videos + articles](resources.md#12-function-components--props)

---

### 1.3 `useState` — Local State

**What it is:** `useState` lets a component remember a value between renders. When state changes, React re-renders the component (calls the function again) and the UI updates.

**When to use:** Any value that changes over time and affects what the user sees.

**Key patterns:**

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // initial value = 0

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

**Updater function form** (use this when the new state depends on the old state):

```jsx
// Correct: uses updater function — always gets the latest value
setCount(prev => prev + 1)

// Risky: captures stale count if called multiple times in one cycle
setCount(count + 1)
```

**Objects in state:**

```jsx
const [user, setUser] = useState({ name: '', email: '' })

// Always spread to avoid losing other fields
setUser(prev => ({ ...prev, name: 'Alice' }))
```

**Common mistakes:**
- Mutating state directly: `user.name = 'Alice'` — React won't re-render. Always call the setter.
- Using a single giant state object for everything. Keep state as granular as it makes sense.
- Forgetting that `useState` is async — you can't read updated state right after calling the setter in the same render.

> **Resources →** [useState videos + articles](resources.md#13-usestate--local-state)

---

### 1.4 Event Handling

**What it is:** Attaching JavaScript functions to DOM events via JSX props (`onClick`, `onChange`, `onSubmit`, etc.).

**When to use:** Any user interaction that should trigger UI change or logic.

**Key patterns:**

```jsx
function Form() {
  function handleClick(event) {
    event.preventDefault()  // stop default browser behavior
    console.log('clicked')
  }

  // Inline arrow function — fine for simple cases
  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <button onClick={() => console.log('inline')}>Inline</button>
    </>
  )
}
```

**Passing data from events:**

```jsx
function List({ items }) {
  function handleDelete(id) {
    console.log('delete', id)
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
```

**Common mistakes:**
- Calling the function instead of passing it: `onClick={handleClick()}` — this runs immediately on render.
- Forgetting `event.preventDefault()` on form submit handlers.

> **Resources →** [Event Handling videos + articles](resources.md#14-event-handling)

---

### 1.5 Lists & Keys

**What it is:** Rendering arrays of data by mapping over them to produce JSX. The `key` prop helps React track which items changed, added, or removed.

**When to use:** Any time you render a dynamic list from an array.

**Key patterns:**

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}
```

**Keys must be:**
- Unique among siblings
- Stable (don't change between renders)
- From your data, not the array index (unless the list never reorders or filters)

**Common mistakes:**
- Using `index` as a key for a list that can reorder or filter — causes buggy animations and state.
- Putting the key on the wrong element: it goes on the outermost element returned by `map`, not inside it.
- Forgetting keys causes a React console warning and degraded performance.

> **Resources →** [Lists & Keys videos + articles](resources.md#15-lists--keys)

---

### 1.6 Conditional Rendering

**What it is:** Showing or hiding JSX based on a condition, using standard JavaScript expressions inside JSX.

**Key patterns:**

```jsx
// Ternary — show one thing or another
function Status({ isOnline }) {
  return <span>{isOnline ? 'Online' : 'Offline'}</span>
}

// Short-circuit — show something or nothing
function Badge({ count }) {
  return <div>{count > 0 && <span className="badge">{count}</span>}</div>
}

// Early return — simplest for complex conditions
function Profile({ user }) {
  if (!user) return <p>Loading...</p>
  return <h1>{user.name}</h1>
}
```

**Common mistakes:**
- `{0 && <Component />}` renders `0` instead of nothing. Use `{count > 0 && ...}` or `{!!count && ...}`.
- Deeply nested ternaries — extract into a variable or helper function.

> **Resources →** [Conditional Rendering videos + articles](resources.md#16-conditional-rendering)

---

### 1.7 Controlled Forms & Inputs

**What it is:** An input whose value is driven by React state, not the DOM. React owns the value; the DOM reflects it.

**When to use:** Any form or input you need to read, validate, or transform.

**Key pattern:**

```jsx
import { useState } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

**Common mistakes:**
- Forgetting `value` + `onChange` together — having one without the other makes the input read-only or uncontrolled.
- Using `e.target.value` outside the event handler (it's nullified by React's synthetic event pooling in older versions).
- Forgetting `event.preventDefault()` on the form's `onSubmit`.

> **Resources →** [Controlled Forms videos + articles](resources.md#17-controlled-forms--inputs)

### Phase 1 Checkpoint

Before moving to Phase 2, you should be able to:
- [ ] Write a component from scratch without looking anything up
- [ ] Pass and destructure props confidently
- [ ] Manage local state with `useState`
- [ ] Handle user events
- [ ] Render a dynamic list from an array
- [ ] Build a controlled form that logs its values on submit
- [ ] Complete [01-component-zoo](../projects/01-component-zoo/) and the first half of [02-todo-app](../projects/02-todo-app/)

---

## Phase 2 — Hooks & Side Effects

> **Weeks 3–4.** Work with time, the outside world (APIs), and shared logic.
> **Projects:** [02-todo-app](../projects/02-todo-app/) (complete), [03-weather-dashboard](../projects/03-weather-dashboard/)

---

### 2.1 `useEffect` — Side Effects

**What it is:** `useEffect` lets you run code *after* a render — to fetch data, set up subscriptions, manipulate the DOM, or set timers. Side effects are anything that reaches outside React's render cycle.

**When to use:** Fetching data on mount, subscriptions, timers, synchronizing with external systems.

**Key patterns:**

```jsx
import { useEffect, useState } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // This runs after every render where `seconds` changes
    const id = setInterval(() => setSeconds(s => s + 1), 1000)

    // Return a cleanup function — React runs it before the next effect or unmount
    return () => clearInterval(id)
  }, []) // Empty array = run once on mount only

  return <p>{seconds}s</p>
}
```

**Dependency array rules:**
- `useEffect(fn)` — runs after every render (usually a bug, use sparingly)
- `useEffect(fn, [])` — runs once on mount
- `useEffect(fn, [a, b])` — runs when `a` or `b` changes

**Common mistakes:**
- Missing a cleanup function for subscriptions/intervals — causes memory leaks.
- Adding a function to deps without wrapping it in `useCallback` — causes infinite loops.
- Trying to make the effect callback itself `async`. Instead, define an async function inside and call it:

```jsx
useEffect(() => {
  async function load() {
    const data = await fetchSomething()
    setData(data)
  }
  load()
}, [])
```

> **Resources →** [useEffect videos + articles](resources.md#21-useeffect--side-effects)

---

### 2.2 Fetching Data

**What it is:** Retrieving data from an API inside a `useEffect` and storing it in state.

**The standard pattern (loading + error + data):**

```jsx
import { useEffect, useState } from 'react'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading…</p>
  if (error) return <p>Error: {error}</p>
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

**Common mistakes:**
- Not handling loading or error states — your UI will be blank or crash.
- Not checking `res.ok` before calling `.json()` — a 404 won't throw by itself.
- Race conditions: if `id` changes fast, a slow previous fetch can overwrite a newer one. Fix with an `ignore` flag:

```jsx
useEffect(() => {
  let ignore = false
  fetch(`/api/user/${id}`)
    .then(res => res.json())
    .then(data => { if (!ignore) setUser(data) })
  return () => { ignore = true }
}, [id])
```

> **Resources →** [Fetching Data videos + articles](resources.md#22-fetching-data)

---

### 2.3 `useRef`

**What it is:** A mutable box that persists across renders but does *not* trigger a re-render when changed. Used for: referencing DOM elements, storing mutable values that shouldn't cause re-renders (timers, previous values).

**Key patterns:**

```jsx
import { useRef } from 'react'

// DOM reference
function AutoFocusInput() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}

// Mutable value (not state)
function StopWatch() {
  const intervalRef = useRef(null)

  function start() {
    intervalRef.current = setInterval(() => console.log('tick'), 1000)
  }
  function stop() {
    clearInterval(intervalRef.current)
  }
  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  )
}
```

**Common mistakes:**
- Using `useRef` instead of `useState` for values that should update the UI — `ref` changes are silent.
- Reading `ref.current` during render (before the element mounts) — it will be `null`.

> **Resources →** [useRef videos + articles](resources.md#23-useref)

---

### 2.4 Custom Hooks

**What it is:** A plain JavaScript function whose name starts with `use` that calls other hooks. Custom hooks let you extract and reuse stateful logic without changing your component tree.

**When to use:** When you copy-paste the same `useState` + `useEffect` logic into multiple components.

**Key pattern:**

```jsx
// useFetch.js
import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed')
        return res.json()
      })
      .then(json => { if (!ignore) { setData(json); setLoading(false) } })
      .catch(err => { if (!ignore) { setError(err.message); setLoading(false) } })
    return () => { ignore = true }
  }, [url])

  return { data, loading, error }
}

// Usage
function Posts() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')

  if (loading) return <p>Loading…</p>
  if (error) return <p>{error}</p>
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

**Common mistakes:**
- Naming the hook without `use` prefix — React's linter won't check its hook rules.
- Returning too much from a hook — keep the API minimal and focused.

> **Resources →** [Custom Hooks videos + articles](resources.md#24-custom-hooks)

---

### 2.5 Lifting State Up & Prop Drilling

**What it is:** When two sibling components need to share state, move that state up to their closest common ancestor and pass it down via props.

**Key pattern:**

```jsx
// State lives in the parent
function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <ResultsList query={query} />
    </>
  )
}

function SearchInput({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}

function ResultsList({ query }) {
  // filters items based on query
}
```

**Prop drilling** happens when you pass props through many layers of components that don't use them. It's not always bad, but when it becomes painful, that's a signal to use Context (Phase 3).

> **Resources →** [Lifting State Up videos + articles](resources.md#25-lifting-state-up--prop-drilling)

---

### 2.6 `useMemo` & `useCallback`

**What they are:**
- `useMemo(fn, deps)` — memoizes a *computed value*. Recalculates only when deps change.
- `useCallback(fn, deps)` — memoizes a *function reference*. Returns the same function instance until deps change.

**When to use:** Performance optimization — only when you've identified an actual slow render. Don't reach for these first.

**Key patterns:**

```jsx
import { useMemo, useCallback } from 'react'

function FilteredList({ items, filter }) {
  // Only recalculate when items or filter changes
  const filtered = useMemo(
    () => items.filter(item => item.includes(filter)),
    [items, filter]
  )

  return <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>
}

// useCallback: stabilize a function passed to a memoized child
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id))
}, []) // no deps — setItems is stable
```

**Common mistakes:**
- Using `useMemo` / `useCallback` everywhere "just in case" — they add overhead too.
- Incorrect deps array — can cause stale closures or unnecessary recalculation.
- Using `useCallback` on a function passed as a regular prop to a non-memoized child — has no effect.

> **Resources →** [useMemo & useCallback videos + articles](resources.md#26-usememo--usecallback)

### Phase 2 Checkpoint

Before moving to Phase 3, you should be able to:
- [ ] Use `useEffect` with correct dependencies and cleanup
- [ ] Fetch data from a public API and handle loading/error/empty states
- [ ] Extract reusable logic into a custom hook
- [ ] Use `useRef` to access a DOM element
- [ ] Explain when (and when not) to use `useMemo`/`useCallback`
- [ ] Complete [02-todo-app](../projects/02-todo-app/) and [03-weather-dashboard](../projects/03-weather-dashboard/)

---

## Phase 3 — Scaling React

> **Weeks 5–6.** Build multi-page apps with shared state.
> **Projects:** [04-multi-page-site](../projects/04-multi-page-site/), [05-theme-auth-context](../projects/05-theme-auth-context/)

---

### 3.1 React Router v7

**What it is:** A library for client-side navigation in a SPA. No page reload — React swaps components based on the URL.

**Install:**

```bash
npm install react-router
```

**Key patterns:**

```jsx
// main.jsx — wrap app in BrowserRouter
import { BrowserRouter } from 'react-router'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// App.jsx — define routes
import { Routes, Route } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

// Navigation
import { Link, NavLink, useNavigate, useParams } from 'react-router'

function Nav() {
  return (
    <nav>
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  )
}

function UserDetail() {
  const { id } = useParams()     // read :id from URL
  const navigate = useNavigate() // programmatic navigation
  return (
    <div>
      <p>User {id}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}
```

**Nested routes / layouts:**

```jsx
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>         {/* Layout wraps children */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />   {/* child routes render here */}
      <Footer />
    </>
  )
}
```

**Common mistakes:**
- Forgetting `<BrowserRouter>` (or using the wrong router type).
- Using `<a href>` instead of `<Link>` — causes full page reloads.
- Forgetting the `end` prop on `<NavLink to="/">` — it will match every route.

> **Resources →** [React Router v7 videos + articles](resources.md#31-react-router-v7)

---

### 3.2 Context API + `useContext`

**What it is:** A way to pass data through the component tree without prop drilling. A Context has a Provider (sets the value) and consumers (read it via `useContext`).

**When to use:** Data that many components need: theme, current user, language, auth status. Not a replacement for all state — keep local state local.

**Key pattern:**

```jsx
import { createContext, useContext, useState } from 'react'

// 1. Create
const ThemeContext = createContext('light')

// 2. Provide
function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  )
}

// 3. Consume (anywhere in the tree)
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <button
      className={`btn-${theme}`}
      onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
    >
      Toggle theme
    </button>
  )
}
```

**Encapsulate Context in a custom provider** (best practice):

```jsx
// ThemeContext.jsx
export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
```

**Common mistakes:**
- Putting everything in one giant Context — split by domain (AuthContext, ThemeContext).
- Providing a value that changes on every render (e.g. an inline object `value={{ a, b }}`) without memoizing it — causes all consumers to re-render unnecessarily.

> **Resources →** [Context API + useContext videos + articles](resources.md#32-context-api--usecontext)

---

### 3.3 `useReducer`

**What it is:** An alternative to `useState` for managing complex state that involves multiple sub-values or where the next state depends on the previous one in non-trivial ways. Inspired by Redux. State logic lives in a pure *reducer function*.

**When to use:** When you have 3+ related state values, or when state transitions are complex enough to benefit from naming (`{ type: 'ADD_ITEM' }`).

**Key pattern:**

```jsx
import { useReducer } from 'react'

const initialState = { count: 0, step: 1 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step }
    case 'decrement':
      return { ...state, count: state.count - state.step }
    case 'set_step':
      return { ...state, step: action.payload }
    case 'reset':
      return initialState
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  )
}
```

**Pair with Context** for app-wide state management:

```jsx
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
```

**Common mistakes:**
- Mutating state in the reducer: `state.count++` — always return a new object.
- Overusing `useReducer` for simple state that `useState` handles fine.

> **Resources →** [useReducer videos + articles](resources.md#33-usereducer)

---

### 3.4 Error Boundaries

**What it is:** A class component (still class-based as of React 19) that catches JavaScript errors anywhere in its child component tree, logs them, and shows a fallback UI instead of crashing the whole app.

**When to use:** Wrap sections of your app that load data or render user-generated content.

**Key pattern:**

```jsx
import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Log to an error reporting service
    console.error('Caught by boundary:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>Something went wrong.</p>
    }
    return this.props.children
  }
}

// Usage
<ErrorBoundary fallback={<p>Failed to load posts.</p>}>
  <PostList />
</ErrorBoundary>
```

**Common mistakes:**
- Error Boundaries don't catch: async errors (inside `useEffect`, event handlers, async/await). For those, handle errors locally.
- Forgetting to reset `hasError` when you navigate away — the fallback will persist.

> **Resources →** [Error Boundaries videos + articles](resources.md#34-error-boundaries)

### Phase 3 Checkpoint

Before moving to Phase 4, you should be able to:
- [ ] Build a multi-page SPA with React Router (routes, layouts, params, navigation)
- [ ] Create a Context + Provider and consume it anywhere in the tree
- [ ] Use `useReducer` for a non-trivial state machine
- [ ] Add an Error Boundary around a section of the UI
- [ ] Complete [04-multi-page-site](../projects/04-multi-page-site/) and [05-theme-auth-context](../projects/05-theme-auth-context/)

---

## Phase 4 — Professional Patterns

> **Weeks 7–8.** Write testable, performant, accessible React.
> **Project:** [06-quiz-app](../projects/06-quiz-app/)

---

### 4.1 Testing with Vitest + React Testing Library

**What it is:**
- **Vitest** — a Vite-native test runner (fast, uses the same config)
- **React Testing Library (RTL)** — renders components in a simulated DOM and queries them the way a user would: by label text, role, and visible text

**Install:**

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**`vite.config.js` addition:**

```js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
```

**`src/test-setup.js`:**

```js
import '@testing-library/jest-dom'
```

**Key patterns:**

```jsx
// Button.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders its label', () => {
    render(<Button label="Save" onClick={() => {}} />)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button label="Save" onClick={handleClick} />)
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

**RTL query priority** (use in this order):
1. `getByRole` — most resilient, tests accessibility too
2. `getByLabelText` — for form inputs
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` — last resort

**Testing async components:**

```jsx
it('shows user name after fetch', async () => {
  render(<UserCard id={1} />)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  expect(await screen.findByText('Alice')).toBeInTheDocument()
})
```

**Mocking fetch:**

```jsx
import { vi } from 'vitest'

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ name: 'Alice' }),
  })
})

afterEach(() => vi.restoreAllMocks())
```

**Common mistakes:**
- Testing implementation details (internal state, component methods) — test what the *user sees*.
- Using `getBy*` for async content — use `findBy*` (returns a Promise).
- Not cleaning up mocks between tests — use `afterEach`.

> **Resources →** [Testing with Vitest + RTL videos + articles](resources.md#41-testing-with-vitest--react-testing-library)

---

### 4.2 Performance: `React.memo`, `lazy`, `Suspense`

**`React.memo`** — wraps a component so it only re-renders when its props change.

```jsx
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
})
// Only re-renders if `items` reference changes
```

**`lazy` + `Suspense`** — code splitting. The bundle for `HeavyPage` is only downloaded when needed.

```jsx
import { lazy, Suspense } from 'react'

const HeavyPage = lazy(() => import('./HeavyPage'))

function App() {
  return (
    <Suspense fallback={<p>Loading page…</p>}>
      <HeavyPage />
    </Suspense>
  )
}
```

**Common mistakes:**
- Memoizing components that receive new object/array props on every render without memoizing those props too — `React.memo` will still re-render.
- Wrapping every component in `React.memo` — adds overhead; measure first.

> **Resources →** [Performance: memo, lazy, Suspense videos + articles](resources.md#42-performance-reactmemo-lazy-suspense)

---

### 4.3 Compound Components & Render Props

**Compound components** — multiple components that work together, sharing implicit state via Context.

```jsx
// Tabs.jsx
const TabsContext = createContext(null)

function Tabs({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab)
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>
}

function Tab({ name, children }) {
  const { active, setActive } = useContext(TabsContext)
  return <button onClick={() => setActive(name)} aria-selected={active === name}>{children}</button>
}

function TabPanel({ name, children }) {
  const { active } = useContext(TabsContext)
  return active === name ? <div>{children}</div> : null
}

Tabs.Tab = Tab
Tabs.Panel = TabPanel

// Usage
<Tabs defaultTab="a">
  <Tabs.Tab name="a">Tab A</Tabs.Tab>
  <Tabs.Tab name="b">Tab B</Tabs.Tab>
  <Tabs.Panel name="a">Content A</Tabs.Panel>
  <Tabs.Panel name="b">Content B</Tabs.Panel>
</Tabs>
```

**Render props** — pass a function as a prop to share logic while letting the consumer control rendering.

```jsx
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  )
}
// Usage
<MouseTracker render={({ x, y }) => <p>Mouse at {x}, {y}</p>} />
```

> In modern React, custom hooks usually replace render props. Know both patterns.

> **Resources →** [Compound Components & Render Props videos + articles](resources.md#43-compound-components--render-props)

---

### 4.4 Accessibility in React

**What it is:** Building UIs that work for everyone — keyboard users, screen reader users, users with motor impairments.

**Key practices:**

```jsx
// Use semantic HTML — a button that submits should be <button type="submit">, not a <div>
<button type="button" onClick={handleDelete}>Delete</button>

// Always provide accessible labels
<input type="search" aria-label="Search jobs" value={q} onChange={...} />

// Announce dynamic content changes
<div role="status" aria-live="polite">{statusMessage}</div>

// Manage focus on route changes or modal open/close
import { useEffect, useRef } from 'react'
function Modal({ onClose, children }) {
  const closeRef = useRef(null)
  useEffect(() => { closeRef.current?.focus() }, [])
  return (
    <div role="dialog" aria-modal="true">
      {children}
      <button ref={closeRef} onClick={onClose}>Close</button>
    </div>
  )
}
```

**Checklist:**
- [ ] All images have `alt` text (or `alt=""` for decorative images)
- [ ] All form inputs have a visible `<label>` or `aria-label`
- [ ] Interactive elements are keyboard-reachable (`Tab`, `Enter`, `Space`)
- [ ] Color is not the only way information is conveyed
- [ ] Contrast ratio ≥ 4.5:1 for normal text

> **Resources →** [Accessibility in React videos + articles](resources.md#44-accessibility-in-react)

---

### 4.5 Environment Variables (`VITE_*`)

**What it is:** A way to configure the app per environment (dev, staging, prod) without hardcoding values.

**Key rules:**
- All client-accessible vars **must** start with `VITE_`
- Never commit real `.env` files — only `.env.example`
- Access via `import.meta.env.VITE_VAR_NAME`

```bash
# .env.local (not committed)
VITE_API_URL=https://api.example.com

# .env.example (committed as a template)
VITE_API_URL=
```

```jsx
const API_URL = import.meta.env.VITE_API_URL
```

> **Resources →** [Environment Variables article](resources.md#45-environment-variables-vite_)

### Phase 4 Checkpoint

Before starting the capstone, you should be able to:
- [ ] Write unit tests for a component and a custom hook
- [ ] Test async components with mock fetch
- [ ] Use `lazy` + `Suspense` to code-split a route
- [ ] Identify and fix an accessibility issue in an existing component
- [ ] Complete [06-quiz-app](../projects/06-quiz-app/)

---

## What's Next After the Capstone

Once you finish [07-job-board](../projects/07-job-board/), you're ready to explore:

- **Next.js** — server-side rendering, file-based routing, server components. The framework most React jobs use.
- **TypeScript** — add types to your JSX. Start the [TS setup guide](setup.md) and convert a completed project.
- **Zustand or Jotai** — simpler global state than Context + useReducer for larger apps.
- **React Query / SWR** — data fetching libraries that handle caching, revalidation, and background syncs.
- **Storybook** — build and document component libraries in isolation.
