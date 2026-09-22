# 03 — JSX and `createElement`

**Goal:** Know what JSX is, why it looks like HTML inside JavaScript, and what it becomes at compile time.

---

## JSX is not HTML in the browser

**JSX** is a syntax extension for JavaScript. It lets you write markup-shaped code in a `.jsx` file:

```jsx
const element = <h1 className="title">Hello</h1>
```

The browser does not understand that. Vite (via `@vitejs/plugin-react` in this repo) **transforms** it into ordinary function calls before the code runs.

Most React codebases use JSX because it is easier to see structure than nested `createElement` calls. You could skip JSX and call the functions yourself. Almost nobody does.

Official intro: [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx).

---

## The compilation target: `createElement`

Conceptually, the line above means:

```js
import { createElement } from 'react'

const element = createElement('h1', { className: 'title' }, 'Hello')
```

[`createElement(type, props, ...children)`](https://react.dev/reference/react/createElement) builds a **React element**: a plain object that describes a node.

| Argument | Meaning |
| --- | --- |
| `type` | What to create: a string like `'h1'` for a DOM tag, or a **function** for your component. |
| `props` | The configuration object (`className`, `src`, later your own props). `null` means “no props.” |
| `children` | Nested content: text, other elements, or nothing. |

That object is **immutable**. You do not mutate `element.props` after creation. You return a new description on the next render. Flutter widgets are immutable for the same reason: they are snapshots, not live scene objects.

A nested tree is just nested calls:

```jsx
const tree = (
  <div>
    <h1>Team</h1>
    <p>Three people</p>
  </div>
)
```

is the same idea as:

```js
createElement(
  'div',
  null,
  createElement('h1', null, 'Team'),
  createElement('p', null, 'Three people')
)
```

Hold that in your head: **JSX is a nicer spelling of nested `createElement` calls.** The tree from lesson 2 is this nested structure.

---

## HTML tags vs. your components

Capitalization is a compiler rule, not a style preference:

```jsx
<h1>Hello</h1>       // createElement('h1', ...)     → built-in DOM tag
<Header />           // createElement(Header, ...)   → your function, Header
<header />           // createElement('header', ...) → the HTML <header> element
```

Lowercase → string type → browser element.  
Uppercase → the function (or class) in scope → a component.

Flutter’s closest rhyme: `Text('Hello')` is a widget you constructed; you do not confuse it with a raw engine primitive. In React the confusion is easier because the syntax looks like HTML, so the capital letter is the tell.

You will practice this in Module 2. For now, just know why `<App />` in `main.jsx` is a component: `App` is imported as a function, and the tag is capitalized.

---

## What the modern transform actually emits

This project uses the **automatic JSX runtime**. You do **not** write `import React from 'react'` at the top of every file.

Under the hood, Vite compiles JSX to something closer to:

```js
import { jsx as _jsx } from 'react/jsx-runtime'

const element = _jsx('h1', { className: 'title', children: 'Hello' })
```

`jsx` / `jsxs` are the current implementation. `createElement` is still the public API and the right mental model. Same job: turn type + props + children into an element object.

You will still import React **APIs** you use (`useState`, `createElement` if you call it by hand). You just do not import React solely so JSX works.

---

## JSX is JavaScript

Because this is JS, not a template language:

- You can assign JSX to a variable.
- You can return it from a function (that function *is* a component).
- Later, you will embed expressions in `{ }` (Module 2).

It is closer to nested Flutter constructors than to an HTML file:

```dart
Column(
  children: [
    Text('Team'),
    Text('Three people'),
  ],
)
```

```jsx
function Panel() {
  return (
    <div>
      <h1>Team</h1>
      <p>Three people</p>
    </div>
  )
}
```

Both are code that **returns a tree**.

---

## What an element is (and is not)

`createElement` / JSX does **not** immediately punch a hole in the page. It returns a description.

The description is committed to the real DOM only when React **renders** it into a root — which is the next lesson (`createRoot(...).render(<App />)`).

So:

- JSX → element object(s) (the tree description)
- `render` → React walks that tree and updates the DOM

If you only created elements and never rendered them, the page would stay empty. That is why `main.jsx` exists.

---

## Check yourself

> JSX is JavaScript syntax that looks like HTML. The compiler turns it into `createElement` / `jsx` calls. Those calls produce immutable element objects — descriptions of the component tree — not live DOM nodes.

Next: [04 — How this app starts](./04-how-the-app-starts.md).
