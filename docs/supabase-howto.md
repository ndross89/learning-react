# How to use Supabase

A reference for any Vite + React app. The examples use a table named `items`. Swap that name for whatever table you create (`resources`, `notes`, `profiles`).

Official docs this follows:

- [React quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [API keys](https://supabase.com/docs/guides/api/api-keys)
- [JavaScript client](https://supabase.com/docs/reference/javascript/introduction)
- [Postgres Changes](https://supabase.com/docs/guides/realtime/postgres-changes)

Older tutorials, including ones that say "copy the anon key" or "turn off Row Level Security," were written before the current dashboard. Use the steps below when they disagree.

---

## 1. What Supabase is

Supabase is a hosted backend. The part you will use first is a **PostgreSQL database**: organized storage that lives on Supabase's servers, not in a file inside your React project.

A database holds **tables**. A table is like a spreadsheet.

| Term | Meaning |
| --- | --- |
| **Table** | One spreadsheet. You name it once (`items`). |
| **Column** | One field. `title`, `body`, `created_at`. Every row has the same columns. |
| **Row** | One record. Inserting adds a row. It stays there after you refresh the page or close the laptop. |
| **Primary key** | The column that identifies one row. Supabase adds `id` for you. You do not invent it in the form. |
| **Dashboard** | The website at [supabase.com/dashboard](https://supabase.com/dashboard) where you create tables and copy keys. |
| **Client** | The JavaScript library `@supabase/supabase-js`. Your React code calls it. It sends HTTP requests to your project. |

You are not writing a server. You are calling Supabase from the browser. That is safe only if you lock the tables down (section 7). The key you put in the React app is public. Anyone can read it out of the built page. The lock is **Row Level Security**, not secrecy of that key.

---

## 2. Three different secrets

These get mixed up constantly. They are not interchangeable.

| Secret | What it is | Where it goes |
| --- | --- | --- |
| **Database password** | The password you set while creating the project. It opens Postgres itself (the dashboard's SQL connection, `psql`, the CLI). | A password manager. The React app never reads it. Do not put it in a file in the repo. |
| **Publishable key** | Identifies your *app*. Starts with `sb_publishable_`. Older tutorials call this the **anon** or **public** key. Those older keys are long JWTs that start with `eyJ`. Both still work. Supabase is deprecating the `eyJ` anon key by the end of 2026. | `.env.local` in the project, with a `VITE_` name. Safe to expose *because* Row Level Security limits it. |
| **Secret key** | Starts with `sb_secret_`. The old name is `service_role`. It bypasses Row Level Security and can read and write every row. | A server you control. Never in React. Never in a variable whose name starts with `VITE_`. Never in git. |

With no one signed in, the publishable key acts as the database role `anon` (anonymous). After a user signs in, the same key acts as the role `authenticated`, and Supabase knows *which* user via their session. The key answers "which app is this?" Auth answers "which person is this?"

---

## 3. Environment variables

An **environment variable** is a named value that lives outside your source code. The app reads it when it starts. You use one so the project URL and key are not typed into a `.js` file that you might push to GitHub.

### Where the file lives

Create it at the **project root**: the folder that contains `package.json`. Not inside `src/`.

This repo already ignores secrets. `.gitignore` contains `.env` and `.env.*`, and it does *not* ignore `.env.example`. You do not need to add `.env` again. If you start a different project, add those lines yourself before the first commit.

Use three files:

| File | Committed to git? | What you put in it |
| --- | --- | --- |
| `.env.example` | Yes | The *names* only, with fake values. A reminder for the next person (or future you). |
| `.env.local` | No | The real URL and publishable key for this machine. |
| `.env` | No, in this repo | Also works. Prefer `.env.local` for secrets. Vite loads `.env.local` on top of `.env` and the local file wins. |

Copy the example, then edit the copy:

```bash
cp .env.example .env.local
```

`.env.local` is not JavaScript. No `const`, no `export`, no quotes unless a value itself contains a space. No spaces around `=`. One name per line. The names are case-sensitive.

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

`your-project-ref` is the short id in the dashboard URL, not a name you invent.

### Why the name starts with `VITE_`

Vite is the tool that serves this React app. It will only hand the browser variables whose names start with `VITE_`. That is deliberate. A variable without that prefix stays on your machine and never enters the JavaScript bundle. If you name the key `SUPABASE_PUBLISHABLE_KEY`, this line is `undefined` even though the file looks correct:

```js
import.meta.env.SUPABASE_PUBLISHABLE_KEY
```

`import.meta.env` is the object Vite fills with those `VITE_` values. You read them by the full name:

```js
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
```

A tutorial that says `VITE_SUPABASE_ANON_KEY` is using the old name. Point it at the publishable key, or keep the old variable name and read that name in code. `createClient` accepts either key format. Prefer `VITE_SUPABASE_PUBLISHABLE_KEY` on a new project.

### Restart after every change

Vite reads env files **once, at startup**. Saving `.env.local` while `npm run dev` is already running does nothing.

1. Click the terminal where the dev server is running.
2. Press `Ctrl+C` to stop it.
3. Start it again:

```bash
npm run dev
```

### How to tell it worked

In the client file, temporarily log the URL (the URL is not the secret; still remove the log when you are done):

```js
console.log(import.meta.env.VITE_SUPABASE_URL)
```

Open the browser devtools console (right-click the page → Inspect → Console). You should see `https://something.supabase.co`.

`undefined` means one of these:

- The file is not at the project root.
- The file is named wrong (`.env.txt`, `env.local`, `.env.local.txt`).
- The variable name does not start with `VITE_`, or it does not match the name in `import.meta.env` exactly.
- The dev server was not restarted after the file was created.

---

## 4. Create a Supabase project

Do this in the dashboard before writing app code.

1. Go to [supabase.com](https://supabase.com) and create an account. GitHub sign-in is the usual path.
2. Create an organization if it asks. A personal name is fine. Start on the Free plan. Current limits are on the [pricing page](https://supabase.com/pricing).
3. Click **New project**. Name it after the product, not after a tutorial.
4. Generate a database password and store it in a password manager.
5. Choose the region closest to the people who will use the app. You cannot change it later.
6. Wait until the project finishes setting up. This often takes about a minute.

### Copy the URL and publishable key

Open the project and click **Connect**. Pick a client-side app. Copy:

- **Project URL** — looks like `https://abcdefgh.supabase.co`
- **Publishable key** — starts with `sb_publishable_`

Paste them into `.env.local` as shown in section 3. Do not paste them into a `.js` file.

If Connect does not show a publishable key, open **Project Settings → API Keys** and create one. Legacy anon and service_role keys live on that same page. There is no separate "Settings → API" screen anymore. Creating a publishable key does not disable an old anon key.

---

## 5. Install the client and create it once

From the project root:

```bash
npm install @supabase/supabase-js
```

Create `src/lib/supabaseClient.js`:

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Check .env.local at the project root, then restart the dev server.'
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
```

`createClient` returns one object that knows your URL and key. Export it. Everywhere else, import that same object:

```js
import { supabase } from '../lib/supabaseClient'
```

The relative path depends on the file. From `src/pages/Something.jsx`, `../lib/supabaseClient` is correct. Do not call `createClient` a second time. A second client is a second login session.

Restart the dev server, load the app, and confirm the console shows the URL (section 3). Then remove the `console.log`.

Nothing in the UI has to change yet. At this point the app *can* talk to Supabase. It will not succeed until a table exists and a policy allows the request.

---

## 6. Create a table

### In the Table Editor

1. Left sidebar → **Table Editor** → **New table**.
2. Name it with lowercase letters and underscores: `items`, not `Items` or `my items`.
3. Leave **Enable Row Level Security** on. Older guides tell you to turn it off so the first request works. Leave it on, and add a policy in section 7 instead. A table with RLS on and no policy returns no rows and refuses writes. That is the lock working.
4. `id` and `created_at` are added for you. Leave them. You never set `id` from a form. `created_at` records when the row was inserted.
5. Add your own columns. For each one, pick a type and uncheck **Nullable** if the field is required (the database should reject a row that omits it).

Common types:

| Type | Use for |
| --- | --- |
| `text` | Any string: title, body, category |
| `bool` | True or false |
| `int4` / `int8` | Whole numbers |
| `timestamptz` | A date and time with timezone |
| `uuid` | An id. The default `id` column is already this or an integer, depending on the editor |

Column names: lowercase with underscores (`created_at`). Avoid spaces and camelCase (`createdAt`). The name you choose is the exact property you will use in JavaScript: `row.created_at`, not `row.createdAt`, unless you actually created a column with that casing.

Save. Open the table and confirm the columns. It will have zero rows until you insert some.

### Or with SQL

**SQL Editor** in the sidebar runs commands against the database. This creates the same kind of table. Add your columns under the two defaults.

```sql
create table public.items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
  -- title text not null,
  -- body text not null
);
```

`public` is the schema (a folder of tables) that the browser API exposes. `not null` is the SQL form of unchecking Nullable. `default gen_random_uuid()` means Postgres fills `id` when you omit it.

If you create the table in the SQL Editor, you still need the grants and policies in section 7. The Table Editor usually grants access for you. The SQL Editor does not.

### Seed rows from the SQL Editor

Useful when you want data before the form exists. List every column you are setting. Skip `id` and `created_at` so the defaults run.

```sql
insert into public.items (title, body)
values
  ('First row', 'Written from the SQL Editor'),
  ('Second row', 'Also written from the SQL Editor');
```

Go back to the Table Editor and confirm the rows are there.

### If the API cannot see the table

Some projects are created with the Data API off, or with "expose new tables" off. Then the client says it cannot find the table even though the Table Editor shows it.

Open **Integrations → Data API**, turn the API on, and expose `public.items`. Or enable **Automatically expose new tables**.

---

## 7. Row Level Security

**Row Level Security (RLS)** is a set of rules Postgres checks on every read and write. A rule is a **policy**. You need one policy per action you want to allow: select (read), insert, update, delete.

Two checks happen, in order:

1. **Grant** — is this role allowed to touch the table at all? If not, the error code is `42501`.
2. **Policy** — which rows? If no policy matches, the request does not throw. A read returns `data: []`. A write returns an error like `new row violates row-level security policy`.

`using (...)` controls which existing rows a read, update, or delete can see. `with check (...)` controls which new values an insert or update may store. `using (true)` means "every row."

Pick one of the two patterns. Do not disable RLS.

### Pattern A — no accounts yet

Anyone who has the publishable key can do the actions you list. That includes a stranger who copied the key out of your app. Use this for public data in a learning project. Do not use it for anything private.

```sql
grant select, insert, update, delete on public.items to anon, authenticated;

alter table public.items enable row level security;

create policy "anon can read items"
on public.items for select to anon
using (true);

create policy "anon can insert items"
on public.items for insert to anon
with check (true);

create policy "anon can update items"
on public.items for update to anon
using (true) with check (true);

create policy "anon can delete items"
on public.items for delete to anon
using (true);
```

Drop any of those policies you do not want. A public read-only table only needs the `select` policy and `grant select`.

### Pattern B — each user owns their rows

Add a column that stores who the row belongs to, then require a signed-in user (section 10) before any of the calls in sections 8–9 will succeed.

```sql
alter table public.items
  add column user_id uuid not null default auth.uid()
  references auth.users (id) on delete cascade;

grant select, insert, update, delete on public.items to authenticated;

alter table public.items enable row level security;

create policy "read own items"
on public.items for select to authenticated
using ((select auth.uid()) = user_id);

create policy "insert own items"
on public.items for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "update own items"
on public.items for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "delete own items"
on public.items for delete to authenticated
using ((select auth.uid()) = user_id);
```

`auth.uid()` is the signed-in user's id. The `default` fills `user_id` on insert, so the JavaScript payload does not have to send it. `(select auth.uid())` is the form Supabase recommends inside policies. It is the same comparison, evaluated once per query.

A delete also needs a select policy. Postgres only deletes rows the role is allowed to see.

---

## 8. Read rows

Every call returns `{ data, error }`. On success, `error` is `null`. Check `error` before you use `data`.

`from('items')` names the table. `select('*')` means all columns. `select('id, title')` asks for only those columns. `select()` with no arguments is the same as `select('*')`.

### All rows

```js
const { data, error } = await supabase.from('items').select('*')

if (error) throw error
setItems(data)
```

`data` is an array. It is `[]` when the table is empty **or** when RLS hid every row. Those two situations look the same. An empty list is not an error.

Sort and limit by chaining. The chain is the query. `await` runs it.

```js
const { data, error } = await supabase
  .from('items')
  .select('id, title, created_at')
  .order('created_at', { ascending: false })
```

### Call it from React

The component renders before the request finishes, so you need three pieces of state: the rows, a loading flag, and an error message.

`useEffect` runs the function after the component is on the screen. The empty array `[]` at the end means "run this once, when the component first appears."

```js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function ItemList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      const { data, error } = await supabase.from('items').select('*')
      if (ignore) return
      if (error) setError(error.message)
      else setItems(data)
      setLoading(false)
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  if (loading) return <p>Loading…</p>
  if (error) return <p>{error}</p>

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
```

`ignore` avoids saving a response after the component has gone away (the user navigated off the page mid-request).

`key={item.id}` belongs on the element you create inside `.map`. React uses it to tell rows apart.

### One row

`.eq('id', id)` keeps rows whose `id` column equals `id`. `.maybeSingle()` returns one object, or `null` if nothing matched.

```js
const { data, error } = await supabase
  .from('items')
  .select('*')
  .eq('id', id)
  .maybeSingle()

if (error) throw error
if (!data) {
  // no such row
}
```

`.single()` is stricter. Zero rows or more than one row sets `error` with code `PGRST116`. Use `.single()` when a missing row is a bug. Use `.maybeSingle()` when a missing row is a normal "not found."

### When the id changes without leaving the page

React Router can change `/items/1` to `/items/2` and reuse the same component. A `useEffect` with `[]` will not run again, so the screen keeps showing the first row.

Put the value in the dependency array. React re-runs the effect when that value changes. Reset loading and error at the start of the run so the old row does not flash as if it were the new one.

```js
useEffect(() => {
  let ignore = false

  async function load() {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (ignore) return
    if (error) setError(error.message)
    else if (!data) setError('Not found.')
    else setItems(data) // or setItem(data) if state holds one object

    setLoading(false)
  }

  load()
  return () => {
    ignore = true
  }
}, [id])
```

The array lists every value from outside the effect that the effect uses. Here that is `id`.

---

## 9. Insert, update, delete

Column names in the object must match the table. Extra names, or a `not null` column you forgot, come back as `error`.

By default, insert, update, and delete return **no row**. `data` is `null` even when the write worked. Chain `.select()` when you need the saved row back. Chain `.single()` after that when you expect exactly one.

### Insert

```js
const { data, error } = await supabase
  .from('items')
  .insert({ title, body })
  .select()
  .single()

if (error) throw error
```

`insert` accepts one object or an array of objects. If you do not need the new row:

```js
const { error } = await supabase.from('items').insert({ title, body })
if (error) throw error
```

On pattern B, do not send `user_id` unless it equals the signed-in user. The column default sets it.

A form should ignore a submit while one is already in flight, and it should not navigate or clear the form when `error` is set.

```jsx
const [saving, setSaving] = useState(false)
const [error, setError] = useState(null)

async function handleSubmit(event) {
  event.preventDefault()
  if (!title.trim() || !body.trim()) return

  setSaving(true)
  setError(null)
  const { error } = await supabase.from('items').insert({ title, body })
  setSaving(false)

  if (error) {
    setError(error.message)
    return
  }

  setTitle('')
  setBody('')
}

// <button type="submit" disabled={saving}>
//   {saving ? 'Saving…' : 'Save'}
// </button>
```

`disabled={saving}` stops a double click from inserting two rows.

### Update

`.eq('id', id)` is required. Without a filter, the update hits every row the policy allows.

```js
const { data, error } = await supabase
  .from('items')
  .update({ title: nextTitle })
  .eq('id', id)
  .select()
  .single()

if (error) throw error
```

Replace that one object in state. Do not refetch the whole list unless you want to.

```js
setItems((current) =>
  current.map((item) => (item.id === data.id ? data : item))
)
```

### Delete

```js
const { error } = await supabase.from('items').delete().eq('id', id)
if (error) throw error

setItems((current) => current.filter((item) => item.id !== id))
```

Same rule: always pass a filter. Chain `.select()` if you want the deleted row returned.

### Upsert

`upsert` inserts, or updates if a row with that primary key already exists.

```js
const { data, error } = await supabase
  .from('items')
  .upsert({ id, title })
  .select()
  .single()
```

---

## 10. Filters

Chain these before you `await`. They become the query.

| You want | Call |
| --- | --- |
| All columns | `.select()` or `.select('*')` |
| Some columns | `.select('id, title, created_at')` |
| A parent row and a related table | `.select('id, title, profiles(display_name)')` once a foreign key exists |
| Equal | `.eq('category', 'notes')` |
| Not equal | `.neq('category', 'notes')` |
| Greater / less | `.gt('created_at', isoDate)` / `.lt(...)` |
| Text contains, ignoring case | `.ilike('title', '%hello%')` |
| Value is in a list | `.in('id', [idA, idB])` |
| Is null | `.is('deleted_at', null)` |
| Sort | `.order('created_at', { ascending: false })` |
| A page of 20 | `.range(0, 19)` (indexes are inclusive) |
| Count, no rows | `.select('*', { count: 'exact', head: true })` |

On pattern B, RLS already hides other people's rows. Adding `.eq('user_id', userId)` is optional. It is not what makes the query safe.

---

## 11. Auth

Skip this section if you used pattern A and the app has no accounts.

The client stores the session and sends it on later requests. You do not attach a token yourself.

For a local learning project, open **Authentication → Providers → Email** and turn **Confirm email** off. When it is on, `signUp` returns a user and `session: null` until they open the email. When it is off, `signUp` returns a session immediately, and the next database call runs as that user.

Set **Authentication → URL Configuration → Site URL** to your dev origin, usually `http://localhost:5173`.

```js
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data.session
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
```

The default minimum password length is 6 characters. A shorter one fails here, with an Auth error, not a table error.

Read the session once, then subscribe so the screen updates when someone signs in or out. `getSession()` reads the browser's saved session and is fine for deciding what to render. `getUser()` asks Supabase to verify the user, which is the check to use before you trust that they are who the session claims.

```js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSession() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setReady(true)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setReady(true)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  return { session, ready, user: session?.user ?? null }
}
```

Wait until `ready` is true before you fetch. Otherwise the first fetch runs as `anon`, the policy rejects it, and you show an empty page to someone who is actually signed in.

Events you will see on `onAuthStateChange`: `INITIAL_SESSION`, `SIGNED_IN`, `SIGNED_OUT`, `TOKEN_REFRESHED`, `USER_UPDATED`, `PASSWORD_RECOVERY`.

This is a Vite app running in the browser. Use `supabase.auth` on the client from section 5. Do not add `@supabase/auth-helpers-react` (retired). `@supabase/ssr` is for apps that render on a server.

Confirm a new user under **Authentication → Users** in the dashboard.

---

## 12. Realtime

Realtime pushes inserts, updates, and deletes to the browser so you do not have to refresh. The user only receives rows their select policy allows.

Turn it on for the table: **Database → Publications → `supabase_realtime`**, or run:

```sql
alter publication supabase_realtime add table public.items;
```

```js
useEffect(() => {
  const channel = supabase
    .channel('items-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'items' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setItems((current) => [payload.new, ...current])
        }
        if (payload.eventType === 'UPDATE') {
          setItems((current) =>
            current.map((item) =>
              item.id === payload.new.id ? payload.new : item
            )
          )
        }
        if (payload.eventType === 'DELETE') {
          setItems((current) =>
            current.filter((item) => item.id !== payload.old.id)
          )
        }
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

The channel name can be anything except `'realtime'`. `event` is `'INSERT'`, `'UPDATE'`, `'DELETE'`, or `'*'`.

On a delete, `payload.old` usually contains only the primary key. Comparing `id` is enough.

If the insert handler *and* this listener both add the new row, it appears twice. Do one of them.

A connection that is not tied to a signed-in user lasts at most 24 hours.

---

## 13. Storage

Storage holds files (images, PDFs). It is not a column in your table. You usually store the file in a **bucket**, then save the returned path in a text column on your row.

Buckets are private unless you mark them public. **Storage → New bucket**.

For a private bucket named `uploads`, where each signed-in user may only touch files inside a folder named with their user id:

```sql
create policy "read own files"
on storage.objects for select to authenticated
using (
  bucket_id = 'uploads'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "upload own files"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'uploads'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
```

Upload from an `<input type="file">`:

```js
const file = event.target.files?.[0]
if (!file) return

const path = `${crypto.randomUUID()}-${file.name}`

const { data, error } = await supabase.storage
  .from('uploads')
  .upload(path, file, { contentType: file.type, upsert: false })

if (error) throw error
```

Put `${session.user.id}/` in front of `path` when the policies above require that folder.

A private file is not a normal link. Ask for a temporary one:

```js
const { data, error } = await supabase.storage
  .from('uploads')
  .createSignedUrl(path, 60 * 10)

if (error) throw error
// data.signedUrl works for 10 minutes
```

`getPublicUrl` only fits a public bucket. It does not check policies, and it does not mean the file exists.

---

## 14. Which dashboard screen to use

| Screen | What you do there |
| --- | --- |
| **Connect** | Copy the project URL and publishable key |
| **Project Settings → API Keys** | Create or rotate keys. See legacy anon and service_role keys |
| **Table Editor** | See and hand-edit rows. Confirm a write from the app arrived |
| **SQL Editor** | Create tables, grants, and policies |
| **Authentication → Users** | See who signed up. Delete a test user |
| **Authentication → Providers** | Turn email confirmation on or off |
| **Database → Publications** | Let Realtime listen to a table |
| **Storage** | Create buckets and upload files by hand |
| **Logs** | Status code of a request that failed in the browser |

The JavaScript client does not create tables or policies. Those stay in the dashboard or in SQL.

---

## 15. When a call fails

| What you see | What it usually means |
| --- | --- |
| `undefined` from `import.meta.env...` | Env file missing, wrong folder, name does not start with `VITE_`, or the dev server was not restarted |
| `supabaseUrl is required` | `createClient` received `undefined`. Same causes as the row above |
| `new row violates row-level security policy` | RLS is on and no insert (or update) policy matched this row |
| `data: []` and `error: null` | The table is empty, or the select policy matched nothing. A signed-out user plus pattern B looks like this |
| `42501` permission denied | The role has no `grant`. A policy does not replace a grant |
| `PGRST116` | `.single()` got zero rows or more than one |
| Could not find the table (`PGRST205`) | Wrong name, or the table is not exposed on the Data API |
| Write succeeds but `data` is `null` | You did not chain `.select()` |
| `Invalid login credentials` | Wrong email or password, or the email was never confirmed |
| Sign-up returns a user and `session: null` | Confirm email is still on |
| Realtime never fires | The table is not in the `supabase_realtime` publication, or the select policy hides the row |
| Storage `403` | No policy on `storage.objects` for that bucket and action |

Log `error.message` and `error.code` while you are learning. Show users a short sentence.

In the browser Network panel, table calls go to:

```text
https://<project-ref>.supabase.co/rest/v1/items
```

`401` means the key is missing or wrong. `200` with `[]` is usually RLS, not a broken client.

---

## 16. First time through

1. Create the project. Store the database password outside the repo.
2. Create `.env.local` at the project root. Restart `npm run dev`. Confirm the URL logs in the browser.
3. Add `src/lib/supabaseClient.js`.
4. Create the table. Insert one row in the SQL Editor or Table Editor and look at it.
5. Add grants and policies (section 7). Leave RLS enabled.
6. Read the rows from React, with loading and error states.
7. Insert from a form. Refresh the Table Editor and confirm the new row.
8. Update and delete one row. Refresh the page and confirm the screen matches the table.
9. If rows are private, add auth and pattern B, then repeat steps 6–8 as a second user. The second user must not see the first user's rows.
10. Add Realtime or Storage after that round trip works.

---

## 17. Local Supabase, later

The dashboard is the right first setup. The CLI runs the same stack on your machine when you want to work offline or keep schema changes in files.

Install on macOS, if `supabase` is not already on your PATH:

```bash
brew install supabase/tap/supabase
```

Then, in a project:

```bash
supabase init
supabase start
supabase status
```

`supabase status` prints a **local** URL and a **local** publishable key. They only talk to the local stack. They do not open the hosted project. Put them in `.env.local` when you want the app pointed at local.

```bash
supabase stop
```

`supabase start` again does not wipe data. `supabase reset` does.

When you outgrow pasting into the SQL Editor, save each change as a migration:

```bash
supabase migration new <name>
```

That creates a file under `supabase/migrations/`. The SQL from sections 6 and 7 is what you put in the first one.

---

## Before you trust it

- `.env.local` is untracked and holds the publishable key, not the secret key.
- The database password is not in the repo.
- RLS is enabled on every table the browser can touch.
- A write you make in the app is visible in the Table Editor after a refresh.
- A failed request shows `error.message` somewhere you can see it during development.
- If the data is per-user, a second account cannot read or change the first account's rows.
