# 03 — Fetching

**Goal:** Load remote data into state, with loading, error, and abort.

TVmaze (no API key): [docs](https://www.tvmaze.com/api). Search: `https://api.tvmaze.com/search/shows?q=QUERY`. Each item looks like `{ score, show: { id, name, genres, status, ... } }`. You will map `show` into your card shape.

---

## State for a request

```jsx
const [shows, setShows] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)
```

Three facts: data, in-flight, failure. Derive the UI:

- `isLoading` → “Loading…”
- `error` → the message
- else → the list (which may be empty)

Do not leave the old list on screen without a loading signal if the query changed; users will think the old results are for the new query. Clearing `shows` when a new fetch starts is a reasonable choice.

---

## Fetch inside the effect

```jsx
useEffect(() => {
  const controller = new AbortController()

  async function load() {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`,
        { signal: controller.signal }
      )
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const json = await response.json()
      setShows(json.map((item) => /* map to your shape */))
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  load()
  return () => controller.abort()
}, [query])
```

`encodeURIComponent` so spaces and `&` in the query do not break the URL.

**Empty query:** TVmaze search with `q=` is not useful. Pick a behavior: skip the fetch and set `shows` to `[]`, or only fetch when `query.trim()` has at least 2 characters. Document it in the UI (“Type at least 2 letters”).

---

## Why abort

Fast typing fires many effects. Without abort, a slow old request can finish **after** a newer one and overwrite good data (a race). Cleanup aborts the previous fetch. Ignore `AbortError` so you do not show an error for something you cancelled on purpose.

---

## Check yourself

> Fetch in an effect, not in render. Loading and error are state. Abort on cleanup. Map the JSON into the same card shape you already use.

Next: [04 — Practice](./04-practice.md).
