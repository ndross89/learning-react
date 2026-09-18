# 03 — Derived lists

**Goal:** Filter in the component body. Do not put the filtered array in `useState`. Do not filter in `useEffect`.

Official: [Rendering Lists](https://react.dev/learn/rendering-lists) (map + filter), [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).

---

## Compute during render

```jsx
const [query, setQuery] = useState('')

const q = query.trim().toLowerCase()
const visibleShows = shows.filter((show) =>
  show.title.toLowerCase().includes(q)
)

return (
  <>
    <input
      type="text"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
    {visibleShows.map((show) => (
      <ShowCard key={show.id} {...show} />
    ))}
  </>
)
```

Every render, `visibleShows` is born from `shows` + `query` and thrown away. There is nothing to “keep in sync.”

`{...show}` passes `id`, `title`, `genre`, `watched` as props if those are the keys. You can still pass them one by one if that is clearer. `key` stays on the element, not inside the spread as something `ShowCard` reads.

---

## What not to do

```jsx
const [filtered, setFiltered] = useState(shows)

useEffect(() => {
  setFiltered(shows.filter(/* ... */))
}, [query, shows])
```

That is a second copy of the list, an extra render, and a use of `useEffect` you do not need. Save effects for Module 8 (network, timers).

---

## Empty query

`''.includes` / `title.includes('')` is `true` for every string, so an empty query shows everyone. That is a good default. `trim()` so a box full of spaces still means “show all” if you want that — decide and stick to it.

Case: compare both sides with `.toLowerCase()` so “bear” matches “The Bear”.

---

## Check yourself

> The list on screen is `shows.filter(...).map(...)`. `query` is state. The filtered array is not. No effect.

Next: [04 — Practice](./04-practice.md).
