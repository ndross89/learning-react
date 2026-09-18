# 05 — Practice checkpoint

**No build.** Close the lessons if you can. Fill these in from memory. Then check the notes at the bottom.

The learning map’s gate:

> Write out in your own words: “A React component is ___. JSX is ___. The component tree is ___.” If you can fill those in without looking, you’re ready to move.

---

## 1. The three sentences

Write them somewhere (notes app, paper, a scratch file you will not commit). Use your words, not a recitation of the headings.

1. A React component is ________________________________.
2. JSX is ________________________________.
3. The component tree is ________________________________.

If a sentence needs a Flutter comparison to feel true, include it. That is a feature, not a cheat.

---

## 2. Four short checks

Answer in a phrase or two.

**Declarative vs. imperative**

- In vanilla JS, who is responsible for showing, hiding, and updating DOM nodes after a click?
- In React, what do you change instead of mutating those nodes?

**Startup (this repo)**

- Which file does the browser load first?
- Which file calls `createRoot` and `.render`?
- Which file is the root of *your* component tree?
- What is the DOM node React takes over, and where is it defined?

**JSX**

- Does the browser run JSX as-is, or does something compile it first?
- `<App />` vs `<div />`: which one is your component, and how can you tell?

**The tree**

- If `List`’s JSX contains three `<ListItem />`s, who is the parent of a `ListItem`?
- Can `Search` reach into a `ListItem` and change it, the way a vanilla script might `querySelector` it?

---

## 3. Ready / not ready

You are ready for **Module 2 — First Project Review** when:

- The three sentences are easy, not fragile.
- You can walk `index.html` → `main.jsx` → `App.jsx` without opening the files (or you only need a glance).
- You can explain the model without needing a widget on screen to “prove” it. You already put cards on screen in `first-project`.

If any sentence is still “HTML but fancy,” re-read [01](./01-declarative-vs-imperative.md) and [03](./03-jsx-and-createElement.md). If the file roles blur, re-read [04](./04-how-the-app-starts.md) with the files actually open.

---

## Notes (after you write, not before)

These are **example** answers, not the only correct wording.

### The three sentences

- **A React component** is a JavaScript function that returns a description of UI (JSX). React calls it when it needs to know what that part of the screen should look like. It is the same job as a Flutter widget’s `build()`.

- **JSX** is JavaScript syntax that looks like HTML. A compiler (Vite, in this repo) turns it into `createElement` / `jsx` function calls that produce immutable element objects. It is not HTML the browser parses by itself.

- **The component tree** is the hierarchy of components: parent is whoever rendered the child. `App` is the root in this project. The real DOM under `#root` is what React produces from that tree, analogous to a Flutter widget tree vs. the render objects on screen.

### Four short checks

- Vanilla JS: **you** are responsible (create/update/hide nodes yourself).
- React: you change **data** (later, state) or what the component **returns**; React updates the DOM.
- Browser loads **`index.html`** first.
- **`src/main.jsx`** calls `createRoot` and `.render`.
- **`src/App.jsx`** is your root component.
- React takes over **`<div id="root">`**, defined in `index.html`.
- JSX is **compiled first**; the browser never executes raw JSX.
- **`<App />`** is your component (capital letter, your function). **`<div />`** is a DOM tag (lowercase string type).
- **`List`** is the parent of each `ListItem`.
- **No** — `Search` does not reach across the tree. Relationships are parent → child, same as Flutter.

When this feels obvious, go to [Module 2 — First Project Review](../Module%202/README.md). If you already built `completed_projects/first-project`, Module 2 is a walkthrough of *that* tree, not a new UserCard.
