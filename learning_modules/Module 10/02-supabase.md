# 02 — Supabase in React

**Goal:** One browser client, env-based URL + anon key, `select` on the list page, `insert` from the form, `select` one row on the detail page.

Official: [Supabase JS](https://supabase.com/docs/reference/javascript/introduction).

---

## Env vars (Vite)

Create `.env.example` (committed) and `.env` (not committed):

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Read them as `import.meta.env.VITE_SUPABASE_URL`. Only `VITE_` prefixed variables are exposed to the client. The anon key is meant to be public **with RLS in front of it**. The service role key is not.

Document the keys in `docs/setup.md` / `docs/configuration.md` when you add them. Do not paste real keys into lessons or git.

---

## Client module

```jsx
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

One client for the app. Install: `npm install @supabase/supabase-js`.

---

## Table shape (suggested)

Table `shows`:

| column | type |
| --- | --- |
| `id` | uuid, default `gen_random_uuid()` |
| `title` | text, not null |
| `genre` | text |
| `watched` | boolean, default `false` |

Enable **RLS**. For this learning mini-project, policies that allow `select` and `insert` for `anon` (or `authenticated` if you add auth) must exist or the client calls will fail. Do not turn RLS off as a shortcut — if you ever must, write the justification in `docs/data-handling.md` first (repo rule). Prefer policies.

---

## Read in useEffect (list page)

Same pattern as TVmaze, different transport:

```jsx
const { data, error } = await supabase
  .from('shows')
  .select('id, title, genre, watched')
  .order('title')

if (error) throw error
setShows(data)
```

Detail page: `.select(...).eq('id', id).single()`.

---

## Insert from the form

```jsx
const { data, error } = await supabase
  .from('shows')
  .insert({ title, genre, watched })
  .select()
  .single()
```

On success, either navigate to `/shows/${data.id}` or go home and let the list refetch. Do not only `setShows` locally if another page should see the row — refetch or append the returned row.

---

## Check yourself

> Anon key + RLS. `VITE_` env. `from('shows').select` / `insert`. Errors are real; show them. Service role never ships in the bundle.

Next: [03 — Practice](./03-practice.md).
