# Module 10 — React Router + Supabase

**Status:** upcoming  
**Time:** ~5–7 days  
**Build:** two-page Watchlist backed by a Supabase table.

Last module on this map. Bigger on purpose: routing is a new tree of pages; Supabase is a real backend. Do not start this until Module 9’s split feels comfortable.

Source: [docs/react-learning-roadmap.md](../../docs/react-learning-roadmap.md)

---

## What you will be able to explain

1. How a URL picks which component tree to show.
2. Dynamic segments (`:id`) and `useParams`.
3. Browser client talks to Supabase with the **anon** key only (`VITE_` env vars). Reads and inserts go through that client; RLS must allow what you attempt.

---

## How to study this module

| Order | Lesson | Idea |
| --- | --- | --- |
| 1 | [01 — React Router](./01-react-router.md) | Routes, links, params. |
| 2 | [02 — Supabase in React](./02-supabase.md) | Client, fetch, insert, env. |
| 3 | [03 — Practice](./03-practice.md) | List page + detail page + create. |

### Supabase CLI (when you need a local project)

If `supabase` is not installed: `brew install supabase/tap/supabase` (macOS) or see [CLI install](https://github.com/supabase/cli#install-the-cli).

```
supabase start          # local services
supabase status         # URLs and keys for local
supabase stop
```

Never put the **service role** key in Vite code. The browser only gets the anon key. Privileged work would be an Edge Function later — out of scope here.
