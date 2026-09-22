# 01 — The render loop you already wrote

**Goal:** Describe what happens after “Change Color” without talking about the DOM.

---

## Your code

```jsx
const [backgroundColor, setBackgroundColor] = useState(true)

// ...

<div className={backgroundColor ? 'alt-card' : 'card'}>
  {/* ... */}
  <button onClick={() => setBackgroundColor(!backgroundColor)}>
    Change Color
  </button>
</div>
```

The loop:

1. First render: `useState(true)` gives `true`. JSX uses `'alt-card'`.
2. Click: the setter is called with `false`.
3. React queues a re-render of **this** `Card` instance.
4. The function runs again. `useState` now gives `false` (it ignores the initial `true` after the first run).
5. JSX uses `'card'`. React updates the class on the existing `div`.

You did not write `document.querySelector` or `classList.toggle`. You changed data. That is Module 1, interactive.

Flutter rhyme: `setState` → `build()` again. `useState`’s setter is that request.

---

## Local to the instance

Six `Card`s means six `backgroundColor` bits. Siblings do not share them. If you *wanted* one button to recolor every card, that state would have to live in a parent and come down as props (Module 9). For “this card is highlighted,” local state is the right place. You chose correctly even without the vocabulary.

---

## What `useState` returns

```js
const [value, setValue] = useState(initialValue)
```

Array of two: current value, setter. The setter’s identity is stable. Calling it with the same value (`Object.is`) skips re-render.

Do not call the setter during render (`if (x) setX(...)` at the top of the function) except in specific patterns you do not need yet. Call it from events (now) and from effects (Module 8).

---

## Check yourself

> Setting state asks React to run this component again with a new value. The JSX is always “what the UI is for *this* value.” Other instances are unaffected.

Next: [02 — Naming and updaters](./02-naming-and-updaters.md).
