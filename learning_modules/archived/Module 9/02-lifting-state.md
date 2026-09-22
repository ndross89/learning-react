# 02 — Lifting state

**Goal:** Put shared state in the closest parent that is above every component that needs it.

---

## The case your toggle did not need

`isAlt` on `Card` is private. No sibling reads it. Local state was correct.

`query` is different: `FilterBar` writes it, `ShowList` reads it (to know… actually the parent filters, then passes the already-visible array). `shows` is different: `AddShowForm` appends, `ShowList` displays.

Those pieces are **siblings**. Neither can see the other’s `useState`. The parent holds `shows` and `query` and passes values down.

```
Watchlist          ← useState(shows), useState(query)
├── FilterBar      ← query, onQueryChange
├── AddShowForm    ← onAdd(showDraft)
└── ShowList       ← shows (already filtered)
    └── ShowCard   ← one show
```

---

## Callback props

Children do not call `setQuery` by importing it. The parent defines a function and passes it:

```jsx
function Watchlist() {
  const [query, setQuery] = useState('')

  return (
    <FilterBar
      query={query}
      onQueryChange={setQuery}
    />
  )
}

function FilterBar({ query, onQueryChange }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
    />
  )
}
```

`FilterBar` still has a controlled input. The state just lives one level up. You can pass `setQuery` directly (`onQueryChange={setQuery}`) because the setter already accepts the next string. For adds, wrap it:

```jsx
function handleAdd(draft) {
  setShows((prev) => [...prev, { ...draft, id: crypto.randomUUID() }])
}

<AddShowForm onAdd={handleAdd} />
```

`AddShowForm` owns **draft field** state (the in-progress title). It does not own the list. On submit it calls `onAdd` with a plain object and clears its own fields.

---

## Closest parent, not the root of the universe

If only the list and the filter need `query`, `Watchlist` is enough. You do not put `query` in `main.jsx`. Lift as far as you must, not as far as you can. (Context exists later; you do not need it here.)

---

## Check yourself

> Shared data lives in the common parent. Children get values and callbacks. Form draft state can stay in the form; the list stays in the parent.

Next: [03 — Practice](./03-practice.md).
