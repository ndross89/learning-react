# 03 — Practice: Add to Watchlist

Continue the Watchlist in `src/`. Search from Module 6 should still work.

---

## Build

1. `shows` is `useState`, initialized from your hardcoded array.
2. A `<form>` with:
   - Title (text, required for submit)
   - Genre (text)
   - Already watched (checkbox)
   - Submit button
3. `onSubmit`: `preventDefault`, ignore empty title, append a show with a new `id`, reset fields.
4. New cards render through the existing `.map()`. If a search query is active, the new show appears only when it matches (that is correct).

Keep the form in `App` for now. Splitting `AddShowForm` is Module 9.

---

## Debugging

- Page reloads on submit → missing `preventDefault`.
- Form clears but list does not grow → you mutated with `.push`, or you still map a `const` copy instead of state.
- Checkbox does not toggle → you used `.value` instead of `.checked`, or `value={watched}` instead of `checked={watched}`.
- React warning about nested buttons → a `type="submit"` vs `type="button"` mix-up, or a button outside the form that should not be there.

---

## Acceptance

- [ ] Submit does not reload the page.
- [ ] New show appears in the list with title, genre, and the correct watched badge.
- [ ] Empty title does not add a blank card.
- [ ] Form fields reset after a successful add.
- [ ] `crypto.randomUUID()` (or similar unique id), not a duplicate of an existing id.
- [ ] Search still filters the full state array.
- [ ] Every field is labeled.

---

## Done when

You can add three shows in a row without refreshing and search still works. Next: [Module 8](../Module%208/README.md).
