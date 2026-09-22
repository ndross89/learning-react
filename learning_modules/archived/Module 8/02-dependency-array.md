# 02 — The dependency array

**Goal:** Predict how many times the effect runs.

---

## Three shapes

```jsx
useEffect(() => {
  // ...
}, [])
```

**Empty array:** run after the first paint only (“on mount”). Strict Mode in development will run setup → cleanup → setup once extra to help you find missing cleanup. That is why fetches in dev may fire twice. Your cleanup should make that safe (next lesson).

```jsx
useEffect(() => {
  // ...
}, [query])
```

**Named deps:** run after first paint, and again whenever `query` changes (by `Object.is`). Include every reactive value the setup reads (props, state, functions declared in the component that close over them). The eslint rule `react-hooks/exhaustive-deps` will nag you. Listen to it unless you can explain why not.

```jsx
useEffect(() => {
  // ...
})
```

**No array:** run after *every* render. Almost never what you want. Easy to create loops: effect sets state → render → effect → …

---

## Stale values

If the effect uses `query` but you omit it from the array, the effect still sees the `query` from the render that created it — the first one, if the array was `[]`. The search box would move and the fetch would not. Put `query` in the array, or do not read `query` inside.

---

## Check yourself

> `[]` mount (plus Strict Mode double-check). `[query]` when the outside world should follow `query`. No array means every render. List what you read.

Next: [03 — Fetching](./03-fetching.md).
