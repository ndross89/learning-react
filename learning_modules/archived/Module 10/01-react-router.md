# 01 — React Router

**Goal:** The URL is part of your app’s state: it chooses which page component to render.

Install when you start this lesson (project command):

```bash
npm install react-router
```

Current React Router still teaches the mental model you need: a router wraps the app, `Route`s declare path → component, `Link` changes the URL without a full reload.

Docs: [React Router](https://reactrouter.com/).

---

## Wrap the tree

In `main.jsx` (or `App.jsx`), wrap with the browser router:

```jsx
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

Then in `App`:

```jsx
import { Routes, Route, Link } from 'react-router'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Watchlist</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShowListPage />} />
        <Route path="/shows/:id" element={<ShowDetailPage />} />
      </Routes>
    </>
  )
}
```

`<a href>` would reload the document and wipe React state. `<Link to="...">` is the in-app navigation.

`useNavigate()` is for navigation from code (after a successful insert: `navigate('/')`).

---

## Dynamic routes

`path="/shows/:id"` — `:id` is a parameter. In the page:

```jsx
import { useParams } from 'react-router'

function ShowDetailPage() {
  const { id } = useParams()
  // fetch or find the show with this id
}
```

`id` is a **string** (it came from the URL). If your Supabase column is a number, compare carefully (`String(show.id) === id` or look up by string uuid).

Each `ShowCard` links to `/shows/${show.id}`.

---

## What stays in the parent

`App` now owns **routing**, not necessarily all Watchlist state. List page and detail page can each fetch, or you can lift data — for Module 10, fetching per page from Supabase is simpler than a giant shared cache.

---

## Check yourself

> `Link` changes the URL. `Routes` pick a component. `useParams` reads `:id`. Detail pages receive that id as a string.

Next: [02 — Supabase](./02-supabase.md).
