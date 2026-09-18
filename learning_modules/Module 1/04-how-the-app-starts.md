# 04 — How this app starts

**Goal:** Trace one load of this project from the HTML file to the component on screen, using *your* files, not a generic diagram.

---

## The three files

| File | Role |
| --- | --- |
| [`index.html`](../../index.html) | The document the browser actually loads. Contains an empty box: `<div id="root">`. |
| [`src/main.jsx`](../../src/main.jsx) | JavaScript entry. Creates a React **root** on that box and renders `<App />`. |
| [`src/App.jsx`](../../src/App.jsx) | Your root **component** — the top of the tree from lesson 2. |

Vite is the dev server / bundler. When you run `npm run dev`, it serves `index.html` and understands JSX because `vite.config.js` includes `@vitejs/plugin-react`. You do not import Vite in your components.

---

## Step 1 — The browser loads `index.html`

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

Two important lines:

1. **`<div id="root"></div>`** — an empty DOM node. This is the only “real” HTML React will take over. Everything you see in the app will be inserted *inside* this div. It is the mount point, like Flutter’s `runApp` attaching to the screen, except the rest of the document (the `<html>` shell, the `<title>`) stays normal HTML.

2. **`<script type="module" src="/src/main.jsx">`** — tells the browser (with Vite’s help) to execute your entry file as an ES module. That is how React gets a chance to run.

There is no React in the HTML besides that empty box. React does not replace `index.html`; it fills `#root`.

---

## Step 2 — `main.jsx` mounts React

This is the entire file:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

Line by line:

**`import { StrictMode } from 'react'`**  
A development wrapper. Extra checks, not a visual layout widget. You can ignore it for learning UI; do not delete it.

**`import { createRoot } from 'react-dom/client'`**  
`react` is the library (components, later hooks). `react-dom` is the **renderer** that talks to the browser DOM. Flutter analog: the framework vs. the engine that paints pixels. On native mobile React uses a different renderer; same components, different `createRoot`.

**`import './index.css'`**  
Side-effect import: load global CSS. Not a component.

**`import App from './App.jsx'`**  
The default export from `App.jsx` — the function named `App`. Now `main.jsx` can write `<App />`.

**`document.getElementById('root')`**  
Vanilla DOM, used once, on purpose: “here is the box we own.” This is the blessed exception to “don’t poke the DOM.” You need a container to hand React.

**`createRoot(...)`**  
[Creates a React root](https://react.dev/reference/react-dom/client/createRoot) bound to that node. One root per app like this.

**`.render(...)`**  
The first render. React takes the element tree you passed (`StrictMode` → `App`) and commits DOM into `#root`.

`<App />` is JSX. After the transform it is “create an element whose type is the `App` function.” React will call `App()` to see what it returns, then keep going down the tree.

---

## Step 3 — `App.jsx` is the top of *your* tree

```jsx
import './App.css'

function App() {}

export default App
```

- `function App() {}` — a component. Module 2 will make it `return` JSX.
- `export default App` — so `main.jsx` can import it.
- Returning nothing means React renders nothing inside the root. The mount still happened.

**Flutter rhyme:**

```dart
void main() {
  runApp(const MyApp());
}
```

`runApp` is `createRoot(...).render(...)`. `MyApp` is `App`.

---

## The startup sequence as a picture

```
npm run dev
        │
        ▼
Browser requests index.html
        │
        ▼
Empty <div id="root">
+ script /src/main.jsx
        │
        ▼
main.jsx
  createRoot(#root)
  render(<StrictMode><App /></StrictMode>)
        │
        ▼
React calls App()
  App returns a description (JSX → elements)
        │
        ▼
React commits real DOM nodes into #root
        │
        ▼
You see the UI (or a blank page, while App returns nothing)
```

If this chain breaks, the failure mode is specific:

| Symptom | Likely break |
| --- | --- |
| Blank page, no errors, `#root` empty | `App` returns nothing (your current file) or `render` never ran. |
| `createRoot` target is `null` | `getElementById('root')` found no node — id mismatch in `index.html`. |
| Browser never runs your JS | Script tag missing or Vite not serving. |
| JSX syntax error | Transform failed; Vite overlay in the browser. |

You are not debugging those yet. Knowing *where* each step lives is the point.

---

## What you should open once

With the app running:

1. View-source or inspect `index.html` — confirm `#root` and the `main.jsx` script.
2. DevTools → **Elements** — `#root` is the DOM host.
3. DevTools → **Components** — `StrictMode` → `App` is the React tree.

Elements vs. Components is the two-tree idea from lesson 2: browser DOM vs. your component tree.

---

## Check yourself

> The browser loads `index.html`. A module script runs `src/main.jsx`. That file attaches React to `#root` and renders `<App />`. `App` is the root component. From here, the tree in lesson 2 is whatever `App` returns.

Last step: [05 — Practice checkpoint](./05-practice.md).
