# 03 — Practice: Watchlist with routes and Supabase

Mini-project. New packages: `react-router`, `@supabase/supabase-js`. You will also create a Supabase project (hosted or `supabase start` locally).

---

## Build

**Page `/`**

- Fetch all `shows` on mount.
- Loading and error states.
- `FilterBar` can still filter the fetched array in render (no extra request required).
- `AddShowForm` inserts a row, then refreshes the list or appends the returned row.
- Each card `Link`s to `/shows/:id`.

**Page `/shows/:id`**

- `useParams()` → fetch that row.
- Show title, genre, watched. Loading / not-found / error.
- `Link` back to `/`.

**Config**

- `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- `.env` locally, gitignored.
- RLS on; insert/select policies that match what the UI does.

---

## Debugging

- Empty list, no error: RLS blocking `select`. Check policies.
- Insert fails: RLS blocking `insert`, or missing columns.
- Detail page blank: `id` type mismatch (uuid vs integer), or `.single()` when 0 rows.
- `undefined` URL: env vars not prefixed with `VITE_`, or dev server not restarted after editing `.env`.
- Full page reload on nav: you used `<a>` instead of `<Link>`.

---

## Acceptance

- [ ] Two routes work via `Link` (browser back/forward too).
- [ ] List data comes from Supabase, not a hardcoded array (seed the table with a few rows).
- [ ] Detail shows the row for `:id`.
- [ ] Form insert persists (reload the list page; the row is still there).
- [ ] Anon key only; no service role in `src/`.
- [ ] Loading and error UI on both pages.
- [ ] `.env.example` exists; real `.env` is untracked.

---

## Test strategy (manual)

1. Cold load `/` — loading then rows.
2. Search filters without a new insert.
3. Add a show — appears in the list and in the dashboard table.
4. Open detail — fields match.
5. Unknown id — not-found, not a crash.
6. Disconnect network (DevTools) — error UI.

Automated tests are not required for this module. If you add them later, mock the Supabase client; do not hit production from CI.

---

## Done when

The checklist is true. This map is complete. Future topics (context, `useReducer`, testing library, auth) are off this 10-module path on purpose.
