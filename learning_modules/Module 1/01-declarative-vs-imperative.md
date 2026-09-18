# 01 — Declarative vs. imperative

**Goal:** Explain, in one sentence, what React does that vanilla DOM code does not.

---

## The two ways to update a screen

**Imperative** means you issue step-by-step commands: create this node, set that class, append it here, hide that other thing.

**Declarative** means you describe the UI that should exist *right now*, given the current data. The library figures out the DOM (or widget) updates.

You already live in the second world. A Flutter `build()` method does not say “find the old Text and replace its data.” It returns the widget tree that should be on screen. The framework diffs and updates.

React is that same contract, for the web.

---

## Vanilla JS: you drive the DOM

Suppose you want a heading that says hello, inside the empty `#root` div.

```js
const heading = document.createElement('h1')
heading.className = 'title'
heading.textContent = 'Hello'
document.getElementById('root').appendChild(heading)
```

That is a recipe. You named every mutation. It works for a heading. It falls apart when the UI has many pieces that appear, disappear, enable, and disable together.

React’s own docs use a form as the cautionary tale: on submit you must disable the textarea, disable the button, show a loading message, hide the error, then on success hide the form and show a success heading — and on failure reverse a different subset of those. Miss one `show()` / `hide()` and the UI lies.

> “In React, you don’t directly manipulate the UI — meaning you don’t enable, disable, show, or hide components directly. Instead, you **declare what you want to show**, and React figures out how to update the UI.”
>
> — [React: Reacting to input with state](https://react.dev/learn/reacting-to-input-with-state)

Their taxi analogy: you tell the driver the destination (declarative). You do not narrate every turn (imperative).

---

## React: you describe the UI

The same heading, as a React component:

```jsx
function App() {
  return <h1 className="title">Hello</h1>
}
```

You did not call `createElement` on the real DOM, did not `appendChild`, did not keep a pointer to the node. You returned a **description**. React turns that description into DOM.

When data changes later (Module 5 — `useState`), you will not write “now go find the heading and change its text.” You will change the data. The component function runs again, returns a new description, and React updates the parts of the DOM that actually changed.

That loop is the whole game:

1. Data in memory.
2. Component function returns “what the UI should look like.”
3. React commits that to the browser.

Flutter’s loop is the same: state → `build()` → framework updates render objects.

---

## Side by side (read only — do not implement yet)

A tiny interactive contrast. You do **not** need `useState` yet; just notice who is responsible for the DOM.

**Imperative (vanilla):** the click handler mutates the page.

```js
button.addEventListener('click', () => {
  count += 1
  label.textContent = String(count)
})
```

**Declarative (React, later):** the click handler only updates data. The returned JSX is always “the truth” for the current count.

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

The button’s label is not stored in a separate variable you remember to refresh. It is *derived* from `count` every time the function runs.

That is the mental shift: **the UI is a function of data**, not a pile of leftover mutations.

---

## Why this matters before you write a component

If you bring an imperative habit into React, you will fight the library:

- Querying the DOM (`document.querySelector`) to “fix” what is on screen.
- Toggling classes by hand after a click.
- Keeping a mental model of “what I already appended.”

In React (as in Flutter), those are usually the wrong tools. You change data — or, for now in Module 1, you change what the component *returns* — and you let the tree be the source of truth.

---

## Check yourself

Before lesson 2, say this out loud:

> Vanilla JS tells the browser **how** to change the page, step by step. React lets me **describe** the page for the current data, and it handles the changes. That is the same idea as Flutter’s `build()`.

If that feels true, go to [02 — The component tree](./02-the-component-tree.md).
