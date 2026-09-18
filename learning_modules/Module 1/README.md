# Module 1 — The React Mental Model

**Status:** complete (keep as reference)  
**Time:** ~1–2 days  
**Build:** none. Read, look at this repo’s files, then write the practice answers in your own words.

This module exists so the rest of the map has somewhere to land. You already think in a **declarative widget tree** from Flutter. React is the same idea, in the browser, with JavaScript.

If you already shipped [`completed_projects/first-project`](../../completed_projects/first-project/), you have *used* this model. Still write the three sentences in [05 — Practice](./05-practice.md) once if you skipped them — then go to [Module 2](../Module%202/README.md) (project review), not a from-scratch UserCard.

Source outline: [docs/react-learning-roadmap.md](../../docs/react-learning-roadmap.md)

---

## What you will be able to explain

By the end of this module, without looking:

1. What React does differently than vanilla JS (**declarative vs. imperative**).
2. What the **component tree** is (your Flutter widget tree, in React clothes).
3. What **JSX** is, and how it compiles down to `React.createElement()` (or the modern equivalent).
4. How **`index.html` + `src/main.jsx` + `src/App.jsx`** connect when the app starts.

If those four sentences are solid, you have the model. Module 2 reviews the project you already built; Module 4 starts Watchlist.

---

## How to study this module

Read in order. Each lesson is one idea. Props, `useState`, and routing have their own modules — you may already have touched the first two in `first-project`; come back here when you need the *why*.

| Order | Lesson | Idea |
| --- | --- | --- |
| 1 | [01 — Declarative vs. imperative](./01-declarative-vs-imperative.md) | You describe the UI. React (like Flutter) updates the screen. |
| 2 | [02 — The component tree](./02-the-component-tree.md) | The app is a tree of components, not a pile of DOM nodes you poke. |
| 3 | [03 — JSX and `createElement`](./03-jsx-and-createElement.md) | JSX is markup-in-JS that becomes element-creating function calls. |
| 4 | [04 — How this app starts](./04-how-the-app-starts.md) | Walk this repo: HTML shell → JS entry → root component. |
| 5 | [05 — Practice checkpoint](./05-practice.md) | Fill in the blanks. If you can, you are ready for Module 2. |

**Optional but useful:** with the dev server running (`npm run dev`), open the browser’s DevTools and find the **Components** tab from [React Developer Tools](https://react.dev/learn/react-developer-tools). That tab *is* the component tree. Lesson 2 will tell you what you are looking at.

---

## What this module is not

- Not a build. The old “static UserCard” exercise is retired; your first project already covered it.
- Not a JSX rules dump (`className`, fragments, self-closing tags). Module 2 reviews the habits in your existing code.
- Not state, props, or hooks as a how-to. You only need the *picture* of how React thinks. Those skills are Modules 3–6.

---

## Your files for this module

You only need to **read** these. Lesson 4 walks them line by line.

```
index.html          ← the real HTML page the browser loads
src/main.jsx        ← creates the React root and renders <App />
src/App.jsx         ← the top of your component tree
```

Vite glues them together. You do not need to understand the bundler yet — only that `index.html` asks the browser to run `src/main.jsx`.
