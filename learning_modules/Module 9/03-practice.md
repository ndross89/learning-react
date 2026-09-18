# 03 — Practice: Split Watchlist

Refactor the app in `src/`. Behavior should stay the same (list, search, add, and fetch if you still have Module 8). This is a structure change.

---

## Build

Create (names can match these):

- `src/components/ShowCard.jsx`
- `src/components/ShowList.jsx`
- `src/components/FilterBar.jsx`
- `src/components/AddShowForm.jsx`
- Parent: `App.jsx` or `src/components/Watchlist.jsx` imported by `App`

Rules:

1. Only the parent holds `shows`, `query`, and fetch/loading/error if present.
2. `FilterBar` receives `query` and `onQueryChange`. No `useState` for the query inside it.
3. `AddShowForm` may hold draft field state. It calls `onAdd` with `{ title, genre, watched }`. It does not call `setShows`.
4. `ShowList` receives an array and maps to `ShowCard`. It does not filter unless you deliberately pass the unfiltered list and a query — prefer filtering in the parent so the list is “dumb.”
5. Optional stretch: `ShowCard` gets `onToggleWatched(id)` and flips `watched` in parent state (map to a new array of objects, do not mutate).

---

## Debugging

- Components tab: click `FilterBar` — you should see props, not `query` state on that node.
- Typing does nothing: you passed `onQueryChange` but the input is still wired to a local `useState` you forgot to delete.
- Add does nothing: `onAdd` not passed, or the form still `setShows` on a variable that does not exist.
- Fetch + add fight: be explicit about whether `shows` is API state, local state, or concatenated. One array in the parent.

---

## Acceptance

- [ ] Four (or five) components as above, each in its own file.
- [ ] Parent owns list + query (+ load/error if applicable).
- [ ] Search still works.
- [ ] Add still works and still resets the form.
- [ ] `ShowCard` does not import `App`.
- [ ] No sibling imports another sibling to “reach in.”

---

## Done when

DevTools tree matches the diagram in lesson 02 and the checklist is true. Next: [Module 10](../Module%2010/README.md).
