# 04 — Practice: Fetch from TVmaze

Two builds. Do them in order in `src/`. It is OK if local “add show” from Module 7 is temporarily sidelined while the list is API-owned. You can keep the form adding to the fetched array (`setShows(prev => [...prev, newShow])`) if you want both.

---

## Build 1 — fetch on mount

1. On mount (`[]` deps), fetch `https://api.tvmaze.com/search/shows?q=girls` (or another seed word).
2. Map each `item.show` to `{ id, title, genre, watched }`. Use `show.id`, `show.name`, `show.genres[0] ?? 'Unknown'`, and `watched: show.status === 'Ended'` (or always `false` — pick one and stay consistent).
3. Loading state, then cards. If the request fails, show an error string, not a blank page.

**Check:** DevTools Network tab shows the request. Strict Mode may show two in development; abort should prevent the “stale setState” warning on unmount.

---

## Build 2 — query is a dependency

1. Reuse the Module 6 search box as `query`.
2. Effect depends on `[query]` (or a trimmed/debounced value — debounce is optional stretch).
3. Do not fetch when the query is empty (or shorter than 2 chars). Show a hint instead.
4. Abort in-flight requests on cleanup.
5. Loading indicator when the query changes.

Optional stretch: wait 300ms after the last keystroke before fetching (debounce `query` in state, or skip if it feels like a side quest).

---

## Debugging

- Infinite loop: effect sets state that is in its own dependency array without a guard.
- Old results flash in: missing abort, or you never set loading.
- CORS errors: TVmaze allows browser calls; if you used a random API that does not, switch back to TVmaze.
- `watched` badge never shows: your mapping always sets `false`. That is fine; use `show.status` or a field you can see in the JSON.

---

## Acceptance

### Build 1

- [ ] Fetch runs from `useEffect`, not from the top of `App`.
- [ ] Loading UI exists.
- [ ] Error UI exists.
- [ ] Cards render from mapped API data with stable `key={id}`.

### Build 2

- [ ] Changing the search box refetches.
- [ ] Empty / too-short query does not hit the API.
- [ ] Cleanup aborts the previous request.
- [ ] Filter-in-render from Module 6 is **not** duplicating the API filter (the server already searched). Do not also `.filter` unless you have a second local constraint (e.g. “watched only”).

---

## Done when

Both acceptance lists are true. Next: [Module 9](../Module%209/README.md).
