# 02 — Naming and updaters

**Goal:** Store the fact, not the stylesheet, and set state from the previous value when you need to.

---

## Name the data

`backgroundColor` is a boolean. Readers will look for `"#0ff"`. Names that match the type:

```js
const [isAlt, setIsAlt] = useState(true)
const [isHighlighted, setIsHighlighted] = useState(false)
```

Then `className={isAlt ? 'alt-card' : 'card'}`. CSS is derived from the fact. The fact is “are we in the alt style?”

Watchlist example: store `watched: true` on the show (or `isFavorite` in state), not `badgeColor`.

---

## Updater function

```js
setIsAlt(!isAlt)           // works; closes over this render's isAlt
setIsAlt((prev) => !prev)  // next value computed from the queued state
```

For a toggle, both work. Prefer the updater when the next value **depends on the previous** — especially if two updates could batch, or if you will soon set state from an effect. Counter: `setCount(c => c + 1)` is the form to remember even though you are not building a counter.

---

## Multiple state variables

You can call `useState` more than once:

```js
const [isAlt, setIsAlt] = useState(false)
const [isFavorite, setIsFavorite] = useState(false)
```

They are independent. Toggling favorite does not reset alt. You do not need this for Module 4’s static list.

---

## Do not store what you can derive

If you have `shows` and `query`, the visible list is `shows.filter(...)`. That filtered array is **not** a second `useState` unless you have a rare reason. Two copies get out of sync. Module 6 will make you practice this.

Filtering in `useEffect` + `setFiltered` is the classic extra-state bug. [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).

---

## Optional practice

Only if Watchlist (Module 4) is already on screen and you want a second toggle with better names:

- Add `isFavorite` state inside `ShowCard` (starts `false`).
- A button toggles it with `setIsFavorite(prev => !prev)`.
- Show a “Favorite” badge with `&&`.

Do **not** build the old counter app. Do **not** rebuild the summary/detail team card.

---

## Check yourself

> State holds facts. Names should sound like those facts. `setX(prev => next)` when next depends on prev. Derive filtered data; do not duplicate it in state.

Next: [Module 6](../Module%206/README.md).
