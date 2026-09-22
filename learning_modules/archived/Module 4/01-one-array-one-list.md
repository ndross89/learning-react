# 01 — One array, one list

**Goal:** Treat a list on screen as a transformation of an array, every render.

Official: [Rendering Lists](https://react.dev/learn/rendering-lists).

---

## What you already did

```jsx
const TeamMembers = [
  { id: 1, name: 'Nathan', label: 'Fourth', Date: 'Sept 17th' },
  // ...
]

export const NewCard = () => {
  return TeamMembers.map(({ id, label, name, Date }) => (
    <Card key={id} label={label} name={name} date={Date} />
  ))
}
```

That is the whole pattern:

1. Data is an array of objects with a stable `id`.
2. `.map()` returns JSX.
3. Each child gets `key={id}` plus the props it needs.

Property naming: use `date`, not `Date`. It is just a key, but capital-D fights the built-in `Date` in your head.

---

## What to drop from `App`

```jsx
<Card label="First" date="Sept 17th" name="James" />
<Card label="Second" date="October 17th" name="Mary" />
<Card label="Third" date="November 17th" name="Jesse" />
<NewCard />
```

James, Mary, and Jesse belong **in the array**, not as extra JSX. Two sources of truth will drift (you add a field on objects and forget the hardcoded copies). Watchlist starts with one `shows` array and one `.map()`.

---

## Why `key` exists

React reconciles the new tree with the last one. For lists, it needs to know whether “item 2” is the same show as last time or a different row that slid into that slot. `key` is that identity.

- **Good:** `key={show.id}` — an id you own, stable if the array is reordered or filtered (Module 6).
- **Acceptable for a static never-reordered list:** `key={index}` — React’s docs allow it when the list is static. You will filter this list soon, so do not start with index.
- **Bad:** `key={Math.random()}` — a new identity every render; React remounts everything.
- **Bad:** missing `key` — console warning, and bugs when the list changes.

`key` is not a prop you read inside `ShowCard`. React consumes it. Pass `id` as a normal prop if the child needs the id.

---

## Where the array lives (for now)

A `const shows = [...]` at the top of `App.jsx` (or a `src/data/shows.js` you import) is enough. It is not state yet. Module 7 is when the array becomes state so you can push new shows. Module 4 is display only.

---

## Check yourself

> The screen is `array.map` to components. One array. `key` is identity for React, usually a real `id`. Hardcoded copies next to the map are a second source of truth.

Next: [02 — Showing and hiding](./02-showing-and-hiding.md).
