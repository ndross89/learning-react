# 01 — What useEffect does

**Goal:** Put `useEffect` in the “talk to the world after paint” bucket, not the “compute the UI” bucket.

Official: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects), [`useEffect`](https://react.dev/reference/react/useEffect).

---

## Render must stay pure

A component function should: read props/state, return JSX. It should not fetch, set timers, or write to `document` as it runs. Those are **effects** — they happen because the UI appeared, not *as* the description of the UI.

```jsx
useEffect(() => {
  // this function runs after React commits this render to the DOM
}, [/* dependencies */])
```

Flutter rhyme: you would not put an HTTP call in `build()`. You would kick it off from `initState` / a listener. `useEffect` is the closest first hook for “after this is on screen, do X.”

---

## Not for derived data

```jsx
// No — this is Module 6
useEffect(() => {
  setVisible(shows.filter(/* query */))
}, [shows, query])
```

```jsx
// Yes
const visible = shows.filter(/* query */)
```

If you can calculate it from existing props/state during render, do that.

---

## The three parts

1. **Setup** — the function you pass (start a fetch, add a listener).
2. **Dependencies** — values from the component that the setup reads. When they change, React re-runs the effect.
3. **Cleanup** (optional return) — undo the setup (abort fetch, remove listener). Runs before the next setup and when the component unmounts.

---

## Check yourself

> `useEffect` runs after paint to sync with something React does not own. Filtering a list is not that. Fetching is.

Next: [02 — The dependency array](./02-dependency-array.md).
