# 02 — Updating lists

**Goal:** Make `shows` state, and add an item by replacing the array (never mutate).

Official: [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state).

---

## From const to state

Module 4’s `const shows = [...]` cannot grow. Lift it into state:

```jsx
const [shows, setShows] = useState(initialShows)
```

`initialShows` can still live in `src/data/shows.js`. `useState(initialShows)` uses that array only on the first render.

---

## Add without mutating

```jsx
const newShow = {
  id: crypto.randomUUID(),
  title: title.trim(),
  genre: genre.trim(),
  watched,
}

setShows((prev) => [...prev, newShow])
```

`[...prev, newShow]` is a **new** array. `prev.push(newShow)` mutates the old one; React may skip the re-render because the reference did not change.

`crypto.randomUUID()` is fine in the browser for local ids. Module 10 will use ids from Supabase.

Do not use `shows.length + 1` as an id if you will delete later (Module 9 stretch). UUIDs do not collide.

---

## Validate before adding

Skip empty titles:

```jsx
if (!title.trim()) return
```

Call that after `preventDefault`. Then `setShows`, then reset:

```jsx
setTitle('')
setGenre('')
setWatched(false)
```

The list update and the form reset are two state updates in one event. React batches them; you get one re-render with both applied.

---

## Filter still derived

`query` still filters `shows` during render. A newly added show appears if it matches the current query (or immediately if the box is empty). You do not need a third state.

---

## Check yourself

> Arrays in state are replaced, not pushed in place. New object, new id, spread into a new array. Then clear the form state.

Next: [03 — Practice](./03-practice.md).
