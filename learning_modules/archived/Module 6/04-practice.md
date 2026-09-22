# 04 — Practice: Watchlist search

Continue in `src/` on the Module 4 Watchlist. If that list is missing, do Module 4’s practice first.

---

## Build

1. Add `query` state in `App` (or the parent that maps the list). Initial value `''`.
2. Add a text input **above** the list: `type="text"`, `value={query}`, `onChange` sets `query` from `event.target.value`. Give it an accessible name (`label` element, or `aria-label="Search shows"`).
3. Derive `visibleShows` with `.filter()` on title (genre too if you want). Map `visibleShows`, not the raw array.
4. When nothing matches, show a short “No shows match” message (`visibleShows.length === 0 && ...`).

Do not use `useEffect`. Do not `useState` for the filtered array.

---

## Debugging

- Type in the box: Components tab → the parent’s `query` should change every keystroke.
- If the input is stuck, you probably set `value` without `onChange`, or `onChange` without `setQuery`.
- If the list never shrinks, you are still mapping `shows` instead of `visibleShows`, or the filter compares the wrong field.
- Console: uncontrolled → controlled warning means `value` started as `undefined`. Use `''`.

---

## Acceptance

- [ ] Input is controlled (`value` + `onChange`).
- [ ] `type="text"` (not `typeof`).
- [ ] Filtering happens during render.
- [ ] Empty query shows all shows.
- [ ] Search is case-insensitive.
- [ ] Empty results have an explicit message.
- [ ] `ShowCard` still does not own `query`.

---

## Done when

Typing filters the list live and the checklist is true. Next: [Module 7](../Module%207/README.md).
