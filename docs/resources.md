# Learning Resources

Videos and articles for every concept in the [roadmap](roadmap.md). Organized to match the roadmap phase by phase.

**How to use this:** Open the roadmap concept, read through the explanation and patterns, then come here to watch one or two of the recommended videos. Prioritize the video that covers the exact concept — use timestamps to jump straight to it.

---

## Channels worth bookmarking

| Channel | Strength | Link |
| --- | --- | --- |
| Web Dev Simplified (Kyle Cook) | Best all-round for React hooks and fundamentals | [youtube.com/@WebDevSimplified](https://www.youtube.com/@WebDevSimplified) |
| Fireship (Jeff Delaney) | Fast concept overviews, great for orientation | [youtube.com/@Fireship](https://www.youtube.com/@Fireship) |
| Codevolution (Vishwas) | Structured, university-style playlists | [youtube.com/@Codevolution](https://www.youtube.com/@Codevolution) |
| The Net Ninja | Steady-paced walkthroughs with full series | [youtube.com/@NetNinja](https://www.youtube.com/@NetNinja) |

---

## Phase 1 — React Fundamentals

### 1.1 JSX & the Component Mental Model

**Videos**
- [React in 100 Seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM) — Fireship — 2min — The best 2-minute orientation to what React is and how JSX, props, and state work together
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ) — Web Dev Simplified — 1h45m — Full project-based intro; watch from the start through to Props
  - ⏱ `6:27` — Thinking in Components
  - ⏱ `8:15` — Custom Components
  - ⏱ `14:26` — Props
  - ⏱ `24:40` — Rendering Arrays

**Articles & docs**
- [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx) — react.dev — The official JSX reference; short and precise
- [Your First Component](https://react.dev/learn/your-first-component) — react.dev
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) — react.dev

---

### 1.2 Function Components & Props

**Videos**
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ?t=516) — Web Dev Simplified — (same video as above, different section)
  - ⏱ `8:15` — Custom Components
  - ⏱ `14:26` — Props
  - ⏱ `37:00` — Advanced Props (children, spread, defaults)
- [React in 100 Seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM) — Fireship — 2min — Props and the data-down model explained in 30 seconds

**Articles & docs**
- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) — react.dev
- [Passing JSX as Children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) — react.dev — The `children` prop explained

---

### 1.3 `useState` — Local State

**Videos**
- [Learn useState In 15 Minutes](https://www.youtube.com/watch?v=O6P86uwfdR0) — Web Dev Simplified — 15min — Dedicated useState tutorial; covers updater function form and why it matters
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ?t=2875) — Web Dev Simplified
  - ⏱ `47:55` — useState Hook in a real project
- [All 12 useState & useEffect Mistakes Junior Developers Make](https://www.youtube.com/watch?v=-yIsQPp31L0) — 2026 — 42min — Watch this after you've used useState a few times; extremely practical
  - ⏱ `0:06` — State updates aren't immediate
  - ⏱ `4:46` — Updating object state (always spread)
  - ⏱ `7:59` — One big object vs multiple state vars
  - ⏱ `11:25` — Derived values (don't put them in state)
  - ⏱ `19:05` — Initializing state with a function

**Articles & docs**
- [useState Reference](https://react.dev/reference/react/useState) — react.dev
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) — react.dev — Why state exists

---

### 1.4 Event Handling

**Videos**
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ) — Web Dev Simplified
  - ⏱ `47:55` — Event handling tied to state changes
- [All The ReactJS You Need To Know](https://www.youtube.com/watch?v=Ycswfi9Sf6k) — 32min — Covers events alongside other Phase 1 concepts
  - ⏱ `12:29` — Event Handling in React

**Articles & docs**
- [Responding to Events](https://react.dev/learn/responding-to-events) — react.dev

---

### 1.5 Lists & Keys

**Videos**
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ?t=1455) — Web Dev Simplified
  - ⏱ `24:40` — Rendering Arrays (with keys)
- [All The ReactJS You Need To Know](https://www.youtube.com/watch?v=Ycswfi9Sf6k) — 32min
  - ⏱ `16:14` — Rendering Lists

**Articles & docs**
- [Rendering Lists](https://react.dev/learn/rendering-lists) — react.dev — Explains why keys matter and what makes a good key

---

### 1.6 Conditional Rendering

**Videos**
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ?t=4230) — Web Dev Simplified
  - ⏱ `1:10:30` — Conditional Rendering
- [All The ReactJS You Need To Know](https://www.youtube.com/watch?v=Ycswfi9Sf6k) — 32min
  - ⏱ `19:01` — Conditional Rendering

**Articles & docs**
- [Conditional Rendering](https://react.dev/learn/conditional-rendering) — react.dev

---

### 1.7 Controlled Forms & Inputs

**Videos**
- [All The ReactJS You Need To Know](https://www.youtube.com/watch?v=Ycswfi9Sf6k)
  - ⏱ `26:38` — States in React (including form state)
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ?t=1160) — Web Dev Simplified
  - ⏱ `19:20` — Form Custom Component (controlled input)

**Articles & docs**
- [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state) — react.dev
- [Forms in React](https://react.dev/reference/react-dom/components/input) — react.dev — The `value` + `onChange` contract

---

## Phase 2 — Hooks & Side Effects

### 2.1 `useEffect` — Side Effects

**Videos**
- [Learn useEffect In 13 Minutes](https://www.youtube.com/watch?v=0ZJgIjIuY7U) — Web Dev Simplified — 13min — The clearest short introduction to useEffect; covers all three dependency array forms
- [useEffect React Hook Tutorial (2024) — What YOU need to know](https://www.youtube.com/watch?v=vpPkUr86IG8) — 2024 — Thorough coverage of the dependency array and cleanup functions
- [Full React Tutorial #24 — useEffect Cleanup](https://www.youtube.com/watch?v=aKOQtGLT-Yk) — The Net Ninja — 9min — Focused specifically on cleanup and AbortController for fetch
- [All 12 useState & useEffect Mistakes](https://www.youtube.com/watch?v=-yIsQPp31L0) — 2026
  - ⏱ `33:08` — Stale closure
  - ⏱ `38:42` — Fetching in useEffect (the right way)

**Articles & docs**
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) — Dan Abramov / overreacted.io — Long but essential reading; explains the mental model deeply. Read after you've used useEffect a few times.
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) — react.dev
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — react.dev — Equally important: when NOT to use useEffect

---

### 2.2 Fetching Data

**Videos**
- [React JS Full Course 2024](https://www.youtube.com/watch?v=lAFbKzO-fss) — 6h+ total but use the timestamps
  - ⏱ `4:20:57` — useEffect Hook
  - ⏱ `4:40:00` — Fetching Data Example
  - ⏱ `5:01:12` — AbortController
  - ⏱ `5:04:00` — useEffect Cleanup Function
- [Full React Tutorial #24 — useEffect Cleanup](https://www.youtube.com/watch?v=aKOQtGLT-Yk) — The Net Ninja — Fetch + AbortController

**Articles & docs**
- [Fetching Data with Effects](https://react.dev/learn/synchronizing-with-effects#fetching-data) — react.dev — Official guide including the race-condition ignore pattern
- [freeCodeCamp: Testing React Applications with Vitest](https://www.freecodecamp.org/news/how-to-test-react-applications-with-vitest/) — Covers mocking fetch in tests too

---

### 2.3 `useRef`

**Videos**
- [Learn Advanced React Hooks In 35 Minutes](https://www.youtube.com/watch?v=13kvHrnppHE) — Web Dev Simplified — 35min — Covers useRef (DOM refs and mutable values) alongside useReducer and useContext
  - ⏱ Start around the `useRef` section (~20min in)
- [React JS Full Course 2024](https://www.youtube.com/watch?v=lAFbKzO-fss) — search for useRef section

**Articles & docs**
- [useRef Reference](https://react.dev/reference/react/useRef) — react.dev
- [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs) — react.dev

---

### 2.4 Custom Hooks

**Videos**
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ?t=5838) — Web Dev Simplified
  - ⏱ `1:34:30` — Custom Hooks (extracts logic from a real component)
- [Learn Advanced React Hooks In 35 Minutes](https://www.youtube.com/watch?v=13kvHrnppHE) — Web Dev Simplified — Covers how to extract useReducer into a custom hook
- [React JS Full Course 2024](https://www.youtube.com/watch?v=lAFbKzO-fss)
  - ⏱ `5:24:05` — Creating Custom Hooks

**Articles & docs**
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) — react.dev — The official guide; has great "when to extract" guidance

---

### 2.5 Lifting State Up & Prop Drilling

**Videos**
- [Sharing State Between Components](https://www.youtube.com/results?search_query=react+lifting+state+up+web+dev+simplified) — search for this on Web Dev Simplified's channel
- [All The ReactJS You Need To Know](https://www.youtube.com/watch?v=Ycswfi9Sf6k) — Covers state and the data flow model

**Articles & docs**
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) — react.dev — The canonical lifting-state-up guide

---

### 2.6 `useMemo` & `useCallback`

**Videos**
- [Learn useMemo in 12 Minutes](https://www.youtube.com/watch?v=wzzdOxoBjtM) — 12min — Focused useMemo tutorial with React.memo too
- [Learn Advanced React Hooks In 35 Minutes](https://www.youtube.com/watch?v=13kvHrnppHE) — Web Dev Simplified — Has a useCallback section

**Articles & docs**
- [useMemo Reference](https://react.dev/reference/react/useMemo) — react.dev
- [useCallback Reference](https://react.dev/reference/react/useCallback) — react.dev

---

## Phase 3 — Scaling React

### 3.1 React Router v7

**Videos**
- [React Router V7 FullStack CRUD Tutorial](https://www.youtube.com/watch?v=waI5CDisiuM) — Covers routing, loaders, and actions in v7
- [React Router Tutorial 2026 — Routing, useNavigate, useParams, Private Routes](https://www.youtube.com/watch?v=T43LbGA18kQ) — Part of a 2026 series; covers the exact hooks you'll use in Projects 04 and 07

**Articles & docs**
- [React Router v7 — Getting Started](https://reactrouter.com/start/library/installation) — reactrouter.com — Official docs; use Library mode (not Framework mode) for Vite + React
- [useNavigate](https://reactrouter.com/reference/react-router/useNavigate) — reactrouter.com
- [useParams](https://reactrouter.com/reference/react-router/useParams) — reactrouter.com

---

### 3.2 Context API + `useContext`

**Videos**
- [Learn useContext In 13 Minutes](https://www.youtube.com/watch?v=5LrDIWkK_Bc) — Web Dev Simplified — 13min — Best short intro; shows the full Provider + custom hook pattern
- [React State Management using Context API (useContext + useReducer)](https://www.youtube.com/watch?v=zxP4oGejqpU) — Shows Context and useReducer combined, which is how you'll use it in Projects 05 and 07
- [Learn React With This One Project](https://www.youtube.com/watch?v=9aTRnV6g0eQ?t=4310) — Web Dev Simplified
  - ⏱ `1:11:50` — useContext Hook in a real project

**Articles & docs**
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context) — react.dev
- [useContext Reference](https://react.dev/reference/react/useContext) — react.dev

---

### 3.3 `useReducer`

**Videos**
- [Learn useReducer In 20 Minutes](https://www.youtube.com/watch?v=kK_Wqx3RnHk) — Web Dev Simplified — 20min — Dedicated tutorial; covers the reducer pattern, dispatch, and when to choose useReducer over useState
- [React State Management using Context API (useContext + useReducer)](https://www.youtube.com/watch?v=zxP4oGejqpU) — Shows the real-world combination of useReducer + Context
- [Learn Advanced React Hooks In 35 Minutes](https://www.youtube.com/watch?v=13kvHrnppHE) — Web Dev Simplified — Covers useReducer as part of the advanced hooks series

**Articles & docs**
- [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) — react.dev — The official guide includes a full before/after refactor
- [useReducer Reference](https://react.dev/reference/react/useReducer) — react.dev

---

### 3.4 Error Boundaries

**Videos**
- [React JS Full Course 2024](https://www.youtube.com/watch?v=lAFbKzO-fss) — Search within the video for "Error Boundary" section

**Articles & docs**
- [Catching Rendering Errors with an Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) — react.dev

---

## Phase 4 — Professional Patterns

### 4.1 Testing with Vitest + React Testing Library

**Videos**
- [React Testing Library Tutorial 2025 — One Shot Full Course (Vitest)](https://www.youtube.com/watch?v=hX22rXIExIc) — Shubham Kulkarni — 41min — The single best beginner video; covers setup through async testing and mocking
  - ⏱ `0:51` — What is Vitest?
  - ⏱ `2:08` — Vitest vs Testing Library (understanding the relationship)
  - ⏱ `8:16` — Your first unit test
  - ⏱ `12:29` — Testing components with props
  - ⏱ `16:50` — Types of queries and query priority
  - ⏱ `22:36` — Interactive test cases
  - ⏱ `28:25` — User events
  - ⏱ `30:48` — Mocking the fetch API
  - ⏱ `33:50` — Testing with React Context
  - ⏱ `37:00` — Testing Router
  - ⏱ `37:52` — What is `act` and `waitFor`?
- [Vitest Crash Course](https://www.youtube.com/watch?v=qtm3wjM2eGI) — Web Dev Simplified — The complete Vitest setup and concepts guide; watch this to understand the test runner itself

**Articles & docs**
- [How to Test React Applications with Vitest](https://www.freecodecamp.org/news/how-to-test-react-applications-with-vitest/) — freeCodeCamp — Clear step-by-step setup guide with component and hook test examples
- [Testing Modern React Apps with Vitest and Testing Library](https://www.gersoncalienes.com/articles/testing-modern-react-applications-vitest-testing-library) — gersoncalienes.com — Covers async testing and `renderHook`
- [Testing React Applications with Vitest and React Testing Library](https://circleci.com/blog/testing-react-applications-with-vitest/) — CircleCI Blog

---

### 4.2 Performance: `React.memo`, `lazy`, `Suspense`

**Videos**
- [Learn useMemo in 12 Minutes](https://www.youtube.com/watch?v=wzzdOxoBjtM) — Covers `React.memo` (wrapping a component) as well as `useMemo`
- [All 12 useState & useEffect Mistakes](https://www.youtube.com/watch?v=-yIsQPp31L0)
  - ⏱ `33:08` — How stale closures relate to re-renders

**Articles & docs**
- [memo Reference](https://react.dev/reference/react/memo) — react.dev
- [lazy Reference](https://react.dev/reference/react/lazy) — react.dev
- [Suspense Reference](https://react.dev/reference/react/Suspense) — react.dev

---

### 4.3 Compound Components & Render Props

**Videos**
- [Learn Advanced React Hooks In 35 Minutes](https://www.youtube.com/watch?v=13kvHrnppHE) — Web Dev Simplified — Context + component composition patterns

**Articles & docs**
- [Thinking in React](https://react.dev/learn/thinking-in-react) — react.dev — The foundational article on composition and component design
- [Composition vs Inheritance](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) — react.dev

---

### 4.4 Accessibility in React

**Videos**
- [Web Accessibility Tutorial (A11y) — Keyboard Navigation, ARIA, Contrast, Semantics](https://www.youtube.com/watch?v=VyWRmepESoQ) — RoadsideCoder — Comprehensive; covers tabIndex, ARIA roles, semantic HTML, and color contrast
- [React and Accessibility Fundamentals](https://www.youtube.com/watch?v=kz9e81oRs3Y) — Deque Systems — Focused on React-specific a11y: focus management, keyboard events, ARIA Live
  - ⏱ `7:05` — Page Titles
  - ⏱ `12:06` — Focus Management (including `useRef` for focus)
  - ⏱ `20:33` — Keyboard Navigation and Events
  - ⏱ `30:55` — Dynamically Added Content and `aria-live`
  - ⏱ `37:56` — Accessibility Within the React Framework

**Articles & docs**
- [Accessibility — React.dev](https://react.dev/learn/accessibility) — react.dev
- [React Accessibility: Building Inclusive Components](https://a11ypath.com/guides/react-accessibility/) — a11ypath.com — Covers JSX attribute gotchas (`className` vs `class`), semantic HTML pitfalls, and focus management with `useRef`

---

### 4.5 Environment Variables (`VITE_*`)

**Articles & docs**
- [Env Variables and Modes — Vite](https://vite.dev/guide/env-and-modes) — vite.dev — The complete reference for `VITE_*` variables

---

## Capstone: 07 — Job Board

When you reach the capstone, everything you've learned comes together. Here are resources that bridge concepts at the project level:

| Topic | Resource |
| --- | --- |
| Project structure at scale | [Bulletproof React](https://github.com/alan2207/bulletproof-react) — GitHub repo — Reference architecture for large React apps |
| Data fetching best practices | [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — react.dev |
| Testing a whole feature | [React Testing Library — testing user flows](https://testing-library.com/docs/react-testing-library/intro/) — testing-library.com |
| Accessibility audit | [axe DevTools](https://www.deque.com/axe/devtools/) — Deque — Free browser extension that finds a11y issues |

---

## What to watch vs what to read

**Watch videos for:**
- First exposure to a concept (see the pattern in action)
- Understanding the mental model
- Seeing common mistakes demonstrated

**Read docs for:**
- API reference (exact function signatures, edge cases)
- Revisiting something you watched but didn't fully grasp
- Deep dives (Dan Abramov's useEffect article is the definitive guide)

The [official React docs (react.dev)](https://react.dev/learn) are unusually well-written for a technical reference. Read each learn guide after you watch the video for a concept — they complement each other well.
