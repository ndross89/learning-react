# 03 — Practice: Watchlist, static

Work in `src/`. This is the start of the Watchlist through-line (Modules 4–10). Leave `completed_projects/first-project` as a snapshot.

No `useState` required. No filter. No form.

---

## Build

1. Define an array of **at least five** shows. Each object needs:
   - `id` (number or string, unique)
   - `title` (string)
   - `genre` (string)
   - `watched` (boolean)
2. Create `src/components/ShowCard.jsx`. It receives those fields as props (destructure them). It displays title, genre, and **conditionally** a “Watched” badge with `&&` (or a watched / unwatched pair with a ternary — your choice, but you must use conditional **elements**, not only a class on the whole card).
3. In `App.jsx`, `.map()` the array to `<ShowCard key={show.id} ... />`. No extra hardcoded `<ShowCard />` beside the map.
4. Enough CSS that you can tell cards apart. You can reuse the grid idea from `first-project`. Prefer class names over inventing a design system.

---

## Debugging while you build

- Components tab: you should see `App` → several `ShowCard`s. Select one and read props, including `watched`.
- Console: no missing-`key` warning.
- Flip one object’s `watched` in the array, save, confirm only that card’s badge changes. (You are changing data and letting the tree re-render — Module 1’s loop without `useState`.)

---

## Acceptance (all must be true)

- [ ] One array is the only source of show data.
- [ ] Every card comes from `.map()`.
- [ ] Each child has `key={id}` from the data, not the index.
- [ ] `ShowCard` is its own file and reads props (does not close over the array).
- [ ] Watched vs not is visible because an **element** appears or not (or two different elements), not only because a background color changed.
- [ ] `App` does not wrap a single root in a pointless fragment.

---

## Done when

The list looks like a watchlist and the checklist above is true. Then skim [Module 5](../Module%205/README.md) and start [Module 6](../Module%206/README.md) for the search box.

If you want a tiny stretch before Module 5: add `isFavorite` to the data and a second badge. Still no state.
