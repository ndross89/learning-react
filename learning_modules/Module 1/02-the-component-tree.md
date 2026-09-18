# 02 — The component tree

**Goal:** See a React app the way you already see a Flutter app: a tree of composable units, not a flat HTML file.

---

## The Flutter picture you already have

In Flutter, the screen is not “a Column plus some widgets you sprinkled.” It is a **tree**.

```
MyApp
└── MaterialApp
    └── Scaffold
        ├── AppBar
        │   └── Text('Team')
        └── Column
            ├── SearchBar
            └── ListView
                ├── ListTile
                ├── ListTile
                └── ListTile
```

Each widget:

- is a class (or a function that returns widgets)
- can nest children
- describes a piece of UI
- does not reach sideways and rewrite a sibling

React’s **component tree** is that diagram with different names.

---

## Components instead of widgets

A **component** is a JavaScript function that returns a description of UI (JSX — next lesson).

That function is a node in a tree. Its return value can include **other components**, which become child nodes.

```
App                         ← src/App.jsx in this repo
├── Header
│   └── Logo
├── Search
└── List
    ├── ListItem            ← same component, used three times
    ├── ListItem
    └── ListItem
```

Parent / child means **who rendered whom**, not CSS layout. `List` is the parent of each `ListItem` because `List`’s JSX includes `<ListItem />`. Two `ListItem`s are siblings. `Search` cannot reach into `ListItem` any more than a Flutter `SearchBar` can reach into a `ListTile`.

Data will later flow **down** the tree as props (Module 3). Shared state will later live in a common parent (Module 9). You do not need those mechanisms yet — only the shape.

---

## What you are looking at in this repo

Right now `src/App.jsx` is:

```jsx
function App() {}

export default App
```

`App` is still a component. It is the **root of your tree**. It currently returns nothing (`undefined`), so React has a tree of one empty node and paints nothing inside `#root`.

That is fine for Module 1. The tree exists as soon as `main.jsx` renders `<App />`. Module 2 is when `App` starts returning JSX, and when you split pieces out into child components.

---

## Three trees (keep this light)

Flutter secretly has more than one tree (widgets, elements, render objects). React has an analogous split. You only need a coarse version:

| Layer | Flutter-ish analog | What it is |
| --- | --- | --- |
| Components / elements | Widget tree | Your description: “I want an `App` that contains a `Header`.” Immutable snapshots. |
| Fiber (React internals) | Element tree | React’s bookkeeping for what is mounted, so it can update efficiently. You do not write this. |
| DOM | RenderObject / actual pixels | Real `<div>`s in the browser. React writes this. You rarely touch it by hand. |

When people say “virtual DOM,” they mean: React keeps a description of the UI, compares a new description to the last one, and only then patches the real DOM. Same job as Flutter’s reconciliation, different renderer.

You will not manage Fiber. You will write components. The Components tab in React Developer Tools shows **your** tree, which is the one that matters.

---

## How to see it

1. Run `npm run dev` if it is not already running.
2. Open the app in the browser.
3. Open DevTools → **Components** (React Developer Tools).
4. You should see `StrictMode` wrapping `App`.

```
StrictMode          ← from src/main.jsx; development checks only
└── App             ← src/App.jsx; your root
```

`StrictMode` is not a visual widget. It is a wrapper React uses in development to highlight problems. Treat it as scaffolding around your tree, not as something you style.

As you add components in later modules, this tab is how you confirm “who is whose parent” and what data each node received.

---

## Composition is the whole architecture

You do not build a React app by growing one giant HTML file. You build it the way you build a Flutter screen: small pieces, nested.

A useful test, which Module 9 will make official:

> If I can name it, and it has its own reason to change, it is probably its own component.

For now, just remember: **the app is a tree, `App` is the root, children are whatever `App` (and its children) return.**

---

## Check yourself

> A React component tree is a hierarchy of components, the same idea as a Flutter widget tree. The parent is whoever rendered the child. The browser’s DOM is the *output* of that tree, not the thing I primarily edit.

Next: [03 — JSX and `createElement`](./03-jsx-and-createElement.md).
