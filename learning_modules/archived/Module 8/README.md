# Module 8 — useEffect

**Status:** upcoming  
**Time:** ~3–4 days  
**Build:** Fetch shows from TVmaze. Keep the Watchlist form for local adds if you want; the fetch practice can live on the same page (search box drives the API) or you can temporarily let the API own the list. The lessons say which.

This one needs space. The concept is small. Using it in the wrong place is the usual failure.

Read first: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect). Filtering and “when query changes, compute visibleShows” stay in render. Effects are for **synchronizing with something outside React**.

Source: [docs/react-learning-roadmap.md](../../docs/react-learning-roadmap.md)

---

## What you will be able to explain

1. What `useEffect` is for (after paint, sync with the world).
2. The dependency array.
3. Fetch → loading / error / data in state, plus cleanup (`AbortController`).

---

## How to study this module

| Order | Lesson | Idea |
| --- | --- | --- |
| 1 | [01 — What `useEffect` does](./01-what-useEffect-does.md) | After paint, not during render. |
| 2 | [02 — The dependency array](./02-dependency-array.md) | `[]`, `[query]`, omitted. |
| 3 | [03 — Fetching](./03-fetching.md) | Loading, errors, abort. |
| 4 | [04 — Practice](./04-practice.md) | TVmaze mount fetch, then query-driven fetch. |
