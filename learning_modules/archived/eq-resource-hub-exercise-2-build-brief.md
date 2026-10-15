# EQ Resource Hub — Build Brief (Exercise 2 of 2)
**Phase 2 React | Supabase · Real Database · Read · Write · Environment Variables · useNavigate**

You are extending the Exercise 1 app. The pages, routes, and components stay. The data source changes: the hardcoded array in `src/data/resources.js` is replaced by a `resources` table on Supabase.

Supabase is new in this exercise. Each phase tells you the steps to write. It does not hand you the component. Full examples for the Supabase calls are at the bottom, under **If You Get Stuck**. When a video or an older article disagrees with this brief, follow this brief.

Keep [docs/supabase-howto.md](../../docs/supabase-howto.md) open while you build. It is the longer reference for the same client, the same dashboard, and the errors you are likely to hit.

---

## Watch Before You Build

Watch at least one of these before writing any code. They use the same JavaScript client this exercise uses.

**Video (recommended first):**
- **PedroTech — "React Supabase CRUD Tutorial"** on YouTube
  Search: `PedroTech React Supabase CRUD` — published December 2024, ~32 minutes.
  Uses React + Vite + Supabase. Covers connecting the client, reading, and inserting. Closest match to what you're building.

- **Traversy Media — Supabase Crash Course** on YouTube
  Search: `Traversy Media Supabase` — free, beginner-friendly quick start.

- **Fireship — "Supabase in 100 Seconds"** on YouTube
  Search: `Fireship Supabase 100 seconds` — a 2-minute picture of what Supabase is. Watch this first if you want the idea before the longer video.

Older videos say "copy the anon key" and sometimes "turn off Row Level Security." The current dashboard uses a **publishable key**, and this exercise **leaves Row Level Security on** and adds two policies. The ideas in the videos still apply. The button names and the key name follow this brief.

**Written reference (use during the build):**
- This repo: [docs/supabase-howto.md](../../docs/supabase-howto.md)
- Supabase JavaScript client: https://supabase.com/docs/reference/javascript/introduction
- Supabase React quickstart: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

---

## Words This Exercise Uses

| Word | What it means here |
| --- | --- |
| **Table** | One spreadsheet in the database. Yours is named `resources`. |
| **Column** | One field. `title`, `category`, `summary`, `body`. Every row has the same columns. |
| **Row** | One resource. Submitting the form adds a row. It stays after you refresh. |
| **Dashboard** | The Supabase website, where you create the table and copy keys. |
| **Client** | The object from `@supabase/supabase-js`. Your React code calls it. It sends the request. |
| **Publishable key** | Identifies your app. Starts with `sb_publishable_`. This is the key that goes in the React app. Older tutorials call the same idea the anon key. |
| **Secret key** | Starts with `sb_secret_`. Bypasses every lock. It never goes in this React app. |
| **Database password** | The password you set when creating the project. It opens Postgres itself. The React app never reads it. |
| **Row Level Security (RLS)** | Rules Postgres checks on every read and write. A rule is a **policy**. |
| **`anon`** | The database role used when nobody is signed in. Your publishable key acts as `anon`. |

---

## Before You Build — Six Mental Models

Read this section once. Each phase repeats the part you need, at the moment you use it.

### 1. What Supabase is

Supabase hosts a PostgreSQL database and gives you a JavaScript library that reads and writes it from the browser. You are not writing a server. `Resources.jsx` will ask Supabase for rows. `SubmitResources.jsx` will ask Supabase to insert a row.

The data lives on Supabase's servers. Refreshing the page, closing the laptop, or opening the site on another machine still shows the same rows.

### 2. What your table looks like

| id | title | category | summary | body | created_at |
| --- | --- | --- | --- | --- | --- |
| 1 | Understanding Self-Awareness | Self-Awareness | ... | ... | 2026-09-23 |
| 2 | Regulating Emotional Responses | Self-Regulation | ... | ... | 2026-09-23 |

`id` and `created_at` are filled in by the database. The form never sends them. The column names in JavaScript are exactly these names: `resource.title`, `resource.created_at`.

### 3. The client, and why the key lives outside the code

You create one client and import it wherever you query:

```js
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(url, key)
```

`url` and `key` come from environment variables, not from a string typed into a `.js` file. Vite only exposes variables whose names start with `VITE_`, and it reads them once, when the dev server starts.

The publishable key will be visible in the browser. That is expected. The lock is Row Level Security, not hiding this key. The secret key and the database password stay out of the project.

### 4. Every query returns `{ data, error }`

A Supabase call does not throw when the database rejects the request. It returns an object:

```js
const { data, error } = await supabase.from('resources').select('*')
```

- `data` is the rows (an array for a list, one object for a single row).
- `error` is `null` when the call succeeded.

Check `error` before you use `data`. A list call can also "succeed" with `data: []` when Row Level Security hid every row. An empty list is not the same thing as an error.

The chain is the query. `from('resources')` picks the table. `select('*')` asks for every column. `await` runs it.

### 5. `useEffect` runs again when something in the dependency array changes

On the list page, the fetch runs once, when the page appears. The dependency array is `[]`.

On the detail page, the URL can change from `/resources/1` to `/resources/2` while the same component stays on screen. An effect with `[]` would keep showing the first resource. Put `id` in the array so the fetch runs again:

```js
useEffect(() => {
  // fetch the row for this id
}, [id])
```

At the start of that fetch, set loading back to `true` and clear the previous error. Otherwise the old resource stays on screen while the new one loads.

### 6. `useNavigate` changes the page from inside a function

`Link` and `NavLink` navigate when someone clicks them. After a successful form submit there is no link to click. `useNavigate` returns a function you call yourself:

```js
const navigate = useNavigate()
navigate('/resources')
```

Import it from `react-router`, the same package as `Link`, `NavLink`, and `useParams`.

---

## What Changes in This Exercise

These are the only changes from Exercise 1.

**New files:**
- `.env.local` — the real project URL and publishable key. Git already ignores it.
- `src/lib/supabaseClient.js` — creates and exports the client.
- `src/pages/SubmitResources.jsx` — the form that inserts a row.

**Modified files:**
- `src/App.jsx` — one new route: `/submit` → `SubmitResources`.
- `src/components/NavBar.jsx` — one new `NavLink`.
- `src/pages/Resources.jsx` — fetch the list from Supabase.
- `src/pages/ResourceDetails.jsx` — fetch one row from Supabase.

**Leave these alone:**
- `BrowserRouter` in `main.jsx`, `Home`, `NotFound`, `ResourceCard`.
- `src/data/resources.js` can stay. `ResourceCard` still imports `categoryTone` from it. Pages stop importing the `resources` array.

The file names above match this project. Exercise 1 created `NavBar.jsx` and `ResourceDetails.jsx`. Use those files. Do not create a second `Navbar.jsx` or `ResourceDetail.jsx`.

---

## Acceptance Criteria

- [ ] `.env.local` exists at the project root with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- [ ] `.env.local` is not committed (`.gitignore` already ignores `.env.*`)
- [ ] `src/lib/supabaseClient.js` creates and exports the client from those two variables
- [ ] The `resources` table has the five seeded rows
- [ ] Row Level Security stays on, with a select policy and an insert policy for `anon`
- [ ] `Resources.jsx` loads every row from Supabase and does not import the local `resources` array
- [ ] `Resources.jsx` shows a loading state while the request is in flight
- [ ] `Resources.jsx` shows an error message if the request fails
- [ ] `ResourceDetails.jsx` loads one row by the id in the URL
- [ ] `ResourceDetails.jsx` loads again when that id changes (dependency array is `[id]`)
- [ ] An unknown id renders a not-found message
- [ ] `/submit` exists and is reachable from the navbar
- [ ] The form has title, category, summary, and body
- [ ] Submitting with any field empty does not insert a row
- [ ] A valid submit inserts one row
- [ ] After a successful submit, the app navigates to `/resources`
- [ ] The new resource shows up in the list
- [ ] A failed insert renders an error message

---

## Build Phases

Finish each phase and run its check before starting the next one.

### Phase 1 — Create the project, the table, the rows, and the policies

This phase is only the Supabase dashboard. No React code yet.

You are creating the spreadsheet, putting the five existing resources into it, and writing the two rules that let the browser read rows and add rows.

#### Step 1 — Create the project

1. Go to https://supabase.com and create a free account.
2. Click **New project**.
3. Name it `eq-resource-hub`.
4. Generate a database password and store it in a password manager. You will not paste this password into the React app.
5. Pick the region closest to you. The region cannot be changed later.
6. Wait until the project finishes setting up. This often takes about a minute.

#### Step 2 — Create the `resources` table

1. In the left sidebar, open **Table Editor**.
2. Click **New table**.
3. Name: `resources`. Lowercase, no spaces.
4. Leave **Enable Row Level Security** on.

   RLS is the lock from mental model 3. A table with the lock on and no policies yet will not show rows to the app. You add the policies in Step 4. Leave the lock on.

5. `id` and `created_at` are already listed. Leave both. You will not set them from the form.
6. Add four columns. For each one, set the type to **text** and uncheck **Nullable** (a required field — the database rejects a row that omits it):
   - `title`
   - `category`
   - `summary`
   - `body`
7. Save.

Open the table. You should see the six columns and zero rows.

#### Step 3 — Insert the five resources

The SQL Editor runs a command against the database. This insert writes the same five resources Exercise 1 had in `src/data/resources.js`. It does not set `id` or `created_at`. The database fills those in.

1. Left sidebar → **SQL Editor** → **New query**.
2. Paste this, then click **Run**:

```sql
insert into public.resources (title, category, summary, body)
values
  (
    'Understanding Self-Awareness',
    'Self-Awareness',
    'An introduction to recognizing your own emotional patterns and how they shape your responses.',
    'Self-awareness is the foundation of emotional intelligence. It involves noticing your emotional state in real time, understanding what triggers certain reactions, and recognizing how your behavior affects others. Without self-awareness, other EQ skills have no anchor.'
  ),
  (
    'Regulating Emotional Responses',
    'Self-Regulation',
    'Practical strategies for pausing between an emotional trigger and your response.',
    'Emotional regulation is not about suppressing feelings. It is about creating space between a trigger and a reaction. Techniques like cognitive reappraisal, grounding, and pacing help individuals respond intentionally rather than reactively.'
  ),
  (
    'Building Empathy in the Workplace',
    'Empathy',
    'How to develop genuine empathy in professional settings where it is often deprioritized.',
    'Empathy in the workplace means understanding a colleague''s experience from their perspective, not just intellectually but emotionally. It requires active listening, suspending judgment, and communicating in ways that validate without requiring agreement.'
  ),
  (
    'Improving Social Skills',
    'Social Skills',
    'The social skill set that supports healthier collaboration and communication at work.',
    'Social skills in the EQ framework include clear communication, conflict resolution, influence, and collaboration. These are learnable skills, not innate traits — and improving them consistently improves team performance and relationship quality.'
  ),
  (
    'Psychological Safety at Work',
    'Team Health',
    'What psychological safety is, why it matters, and how leaders can build it intentionally.',
    'Psychological safety is the shared belief that the team environment is safe for interpersonal risk-taking — speaking up, asking questions, admitting mistakes. Research by Amy Edmondson at Harvard shows it is the strongest predictor of high-performing teams.'
  );
```

The doubled quote in `colleague''s` is how SQL writes one apostrophe inside a string. Leave it doubled.

3. Open **Table Editor → resources**. Confirm five rows. Each row has an `id` you did not type.

#### Step 4 — Allow anonymous read and insert

Two checks happen on every request:

1. **Grant** — is the `anon` role allowed to touch this table at all?
2. **Policy** — which rows? With RLS on and no policy, a read returns an empty list and an insert is rejected.

This app has no accounts. The publishable key acts as `anon`. Add a grant, one select policy, and one insert policy. That is enough for the list page, the detail page, and the form. Anyone with the publishable key can read and insert. That fits a public learning library. It is the wrong setup for private data.

In the SQL Editor, run this as a new query:

```sql
grant select, insert on public.resources to anon, authenticated;

create policy "anon can read resources"
on public.resources
for select
to anon
using (true);

create policy "anon can insert resources"
on public.resources
for insert
to anon
with check (true);
```

`using (true)` means every existing row is visible. `with check (true)` means every new row is allowed. You do not add update or delete policies. This exercise never updates or deletes a row.

To confirm: **Table Editor → resources →** the policies / RLS area for the table should show RLS enabled and the two policies. The exact label varies. The SQL above is the source of truth. If you run it a second time and it says the policy already exists, the first run worked.

#### Step 5 — Copy the URL and the publishable key

1. Open the project and click **Connect**.
2. Choose a client-side app.
3. Copy two values:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **Publishable key** — starts with `sb_publishable_`
4. Leave these on the clipboard or in a scratch note for Phase 2.

If Connect does not show a publishable key, open **Project Settings → API Keys** and create one. There is no **Settings → API** screen in the current dashboard.

Copy the publishable key only. Leave the secret key (`sb_secret_...`) and the database password where they are.

**Check before Phase 2:** Table Editor shows five rows. RLS is on. The select and insert policies exist. You have the project URL and a key that starts with `sb_publishable_`.

---

### Phase 2 — Connect the app to that project

After this phase the app can talk to Supabase. The pages still show Exercise 1's local data until Phase 3.

#### Step 1 — Install the library

From the project root (the folder that contains `package.json`):

```bash
npm install @supabase/supabase-js
```

#### Step 2 — Create `.env.local`

An environment variable is a named value that lives outside your source code. Vite reads it when the dev server starts.

Create the file at the project root, next to `package.json`. Not inside `src/`. The name is `.env.local`. On macOS the leading dot hides the file; that is the correct name.

`.gitignore` already ignores `.env` and `.env.*`, and it does not ignore `.env.example`. You do not add another ignore line. You do not commit `.env.local`.

The file is not JavaScript. No `const`, no quotes, no spaces around `=`.

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_paste_the_key_here
```

Replace both placeholders with the values from Phase 1. The names are case-sensitive and must start with `VITE_`. Vite will not give the browser a variable that lacks that prefix, so this line would be `undefined`:

```js
import.meta.env.SUPABASE_PUBLISHABLE_KEY
```

A tutorial that says `VITE_SUPABASE_ANON_KEY` is using the old name. This project uses `VITE_SUPABASE_PUBLISHABLE_KEY`. `createClient` accepts either key format.

#### Step 3 — Create the client once

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

What each part does:

- `createClient(url, key)` returns the object that knows which project to call.
- The `if` fails immediately when the file was missing, misnamed, or unread. That is easier to diagnose than a later network error.
- `export` lets every page share this one client. Import it. Do not call `createClient` a second time.

From a file in `src/pages/`, the import is:

```js
import { supabase } from '../lib/supabaseClient'
```

#### Step 4 — Restart the dev server

Vite reads `.env.local` once, at startup. Saving the file while `npm run dev` is already running does nothing.

1. Click the terminal where the dev server is running.
2. Press `Ctrl+C`.
3. Start it again: `npm run dev`.

#### Step 5 — Confirm the URL is visible to the app

Temporarily add this under the two `const` lines in `supabaseClient.js`:

```js
console.log(supabaseUrl)
```

Load the app, open the browser console (right-click the page → Inspect → Console), and confirm it prints `https://something.supabase.co`. Then delete that `console.log`.

`undefined`, or the error thrown by the `if` check, means one of these:

- The file is not at the project root.
- The file is named `.env`, `.env.txt`, or `.env.local.txt` when you meant `.env.local`.
- A variable name does not exactly match `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_KEY`.
- The dev server was not restarted after the file was created.

**Check before Phase 3:** the console shows the project URL, the temporary log is gone, and the existing pages still render.

---

### Phase 3 — Resources page: read every row

Open `src/pages/Resources.jsx`. Keep the page header and the `ResourceCard` grid. Stop importing the `resources` array from `../data/resources`. The cards will render the rows Supabase returns. `ResourceCard` still imports `categoryTone` from that file on its own.

This will require:

- Import `useState` and `useEffect` from `react`
- Import `supabase` from `../lib/supabaseClient`
- Three `useState` declarations:
  - `resources` → `[]` (the rows, once they arrive)
  - `loading` → `true` (the request has not finished yet)
  - `error` → `null` (no error yet)
- A `useEffect` with an empty dependency array `[]`, so it runs once when the page appears
- Inside that `useEffect`, define an `async` function and call it immediately. Same shape as the Team Insight Feed: the effect callback itself stays synchronous, the async function lives inside it, and you call that function on the next line
- Inside the async function, `await` a Supabase read. Build the query in this order:
  1. `supabase.from('resources')` — `'resources'` is the table name from Phase 1. A typo here fails the request.
  2. Chain `.select('*')` — `*` means every column. `ResourceCard` needs `id`, `title`, `category`, and `summary`.
  3. Chain `.order('created_at', { ascending: true })` — oldest row first, so a resource you submit later lands at the bottom. Without `order`, the database does not promise an order.
- The `await` resolves to one object. Destructure it as `{ data, error }`. `data` is the array of rows. `error` is `null` when the call worked. Supabase does not throw on a rejected query. You have to read `error` yourself.
- Wrap the query in `try` / `catch` / `finally`:
  - In `try`: if `error` is set, `throw error`. Otherwise call `setResources(data)`.
  - In `catch`: call `setError` with the error's `message`.
  - In `finally`: call `setLoading(false)`. `finally` runs on success and on failure, so the loading text goes away either way. Set the resources (or the error) before this.
- In the return, keep the header. Under it, three conditions (same idea as the Team Insight Feed):
  - If `loading` is true, render a loading message
  - If `error` is not null, render that message
  - If loading is done and there is no error, map `resources` to `<ResourceCard key={resource.id} resource={resource} />` inside the existing grid

**Check before Phase 4:** the page shows the loading message, then the five cards. Click a card. The detail page still works, because it is still reading the local array. That changes in Phase 4.

If you see no error and no cards, the request succeeded and Row Level Security hid the rows. An empty list is not an error. Re-run the select policy from Phase 1, Step 4.

If the error says the table cannot be found, open **Integrations → Data API** in the dashboard, turn the API on, and expose `public.resources`. Then reload.

---

### Phase 4 — Detail page: read one row, and read again when the id changes

Open `src/pages/ResourceDetails.jsx`. It currently finds a resource with `.find()` on the local array. Remove that import and that `.find()`. Keep `useParams`, keep the `categoryTone` import, and keep the JSX you already have for a found resource and for "Resource not found."

`useParams` still gives you `id`. That value is always a string, such as `"1"`. Pass that string to Supabase. You do not wrap it in `Number()`. Postgres matches it to the numeric `id` column.

This will require:

- Import `useState` and `useEffect` from `react`
- Import `supabase` from `../lib/supabaseClient`
- Three `useState` declarations:
  - `resource` → `null` (one row, or nothing)
  - `loading` → `true`
  - `error` → `null`
- A `useEffect` whose dependency array is `[id]`, not `[]`. Going from `/resources/1` to `/resources/2` reuses this component. With `[]` the effect would run once and keep showing the first resource. With `[id]` it runs again every time the URL id changes.
- Inside the effect, define an `async` function and call it, same as Phase 3
- At the top of that function, before the query, set loading back to `true` and set error back to `null`. That clears the previous resource's state while the next one loads.
- `await` a Supabase read built in this order:
  1. `supabase.from('resources')` — same table as the list page
  2. `.select('*')` — every column, including `body`, which this page renders
  3. `.eq('id', id)` — keep only the row whose `id` column equals the `id` from the URL. `'id'` is the column name. The second argument is your `id` variable.
  4. `.maybeSingle()` — return one object instead of an array. If no row matches, `data` is `null` and `error` stays `null`. That is the not-found case. (`.single()` is stricter: zero rows comes back as an error. Use `.maybeSingle()` so "not found" and "the request failed" stay separate.)
- Destructure `{ data, error }` from the awaited result
- `try` / `catch` / `finally`, same jobs as Phase 3:
  - In `try`: if `error` is set, `throw error`. Otherwise `setResource(data)`. `data` will be `null` when the id does not exist.
  - In `catch`: `setError` with the error's `message`
  - In `finally`: `setLoading(false)`
- Render in this order:
  - If `loading`, a loading message
  - If `error`, that message
  - If `resource` is null, the not-found block you already have
  - Otherwise the article you already have, reading `resource.category`, `resource.title`, and `resource.body`

**Check before Phase 5:** open several cards. Each detail page shows that resource. Use Back and Forward. The title follows the URL. Visit `/resources/99` and confirm the not-found message. If changing the id in the address bar leaves the old resource on screen, `id` is missing from the dependency array.

---

### Phase 5 — Submit page: insert a row, then navigate

Add a page with a form. On a valid submit, insert one row into `resources`, then send the user to `/resources`. The list page mounts again, its effect runs, and the new card is in the list.

**In `App.jsx`:**
- Import `SubmitResources` from `./pages/SubmitResources`
- Add a route with path `/submit` and element `<SubmitResources />`
- Place that route above the `path="*"` route. `*` matches every URL that nothing else claimed, so a route below it never renders.

**In `NavBar.jsx`:**
- `NavLink` is already imported. Add one more, pointing at `/submit`, next to Home and Resources.

**In `src/pages/SubmitResources.jsx`:**

This will require:

- Import `useState` from `react`
- Import `useNavigate` from `react-router` (the same package as `Link` and `useParams`)
- Import `supabase` from `../lib/supabaseClient`
- Call `useNavigate()` and store the function it returns. You will call that function with `'/resources'` after a successful insert. `Link` navigates on a click. This navigates from inside your submit handler.
- Six pieces of state:
  - `title`, `category`, `summary`, `body` — each starts as `''`
  - `submitting` → `false` (true while the insert is in flight)
  - `error` → `null`
- A `<form>` whose `onSubmit` is an `async` handler. Call `event.preventDefault()` on the first line so the browser does not reload the page. A reload would wipe your error message.
- Four controlled fields. Each one's `value` is its state, and its `onChange` writes `event.target.value` back into that state:
  - Title: text input
  - Category: a `<select>` with an empty first option ("Choose a category") plus these five options — Self-Awareness, Self-Regulation, Empathy, Social Skills, Team Health
  - Summary: textarea
  - Body: textarea
- At the start of the handler, after `preventDefault`, build one object whose keys are the column names: `title`, `category`, `summary`, `body`. `trim()` the three text fields. Leave `id` and `created_at` off the object. The database fills those in.
- If any of the four values is empty, set an error message and `return`. The insert must not run.
- Set `submitting` to `true` and clear `error`
- `await` a Supabase insert:
  1. `supabase.from('resources')` — the same table
  2. `.insert([ ... ])` — pass an array with that one object inside it. The keys in the object must match the column names exactly.
- Destructure `{ error }` from the result. There is no row you need to store. The list page will fetch it.
- `try` / `catch`:
  - In `try`: if `error` is set, `throw error`. Otherwise call your navigate function with `'/resources'`.
  - In `catch`: `setError` with the error's `message`, then set `submitting` back to `false` so the button works again. The usual message here is `new row violates row-level security policy`, which means the insert policy from Phase 1 did not run. On success you leave this page, so you only reset `submitting` in the `catch`.
- Under the fields, render the error message when `error` is not null
- The button is `type="submit"`. Set `disabled` to `submitting`. Its label says "Submitting…" while `submitting` is true, and "Submit resource" otherwise.

**Check before you call the exercise done:**

- `/submit` opens from the navbar
- Submitting with a field left blank shows your message and adds no row in the Table Editor
- A complete submit lands on `/resources` with the new card at the bottom
- That card's detail page shows the body you typed
- Table Editor → `resources` shows the new row

---

## If You Get Stuck — Reference by Phase

The phases above are the instructions. Use this only when a step will not click.

### Phase 2 — client

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
```

### Phase 3 — read every row inside useEffect

```js
useEffect(() => {
  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setResources(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchResources()
}, [])
```

`from` names the table. `select('*')` asks for every column. `order` sorts the array before it reaches `setResources`. `{ data, error }` is the whole result. Throwing `error` is what gets you into `catch`, because Supabase does not throw on its own.

### Phase 4 — one row, re-run when `id` changes

```js
useEffect(() => {
  const fetchResource = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw error
      setResource(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchResource()
}, [id])
```

`.eq('id', id)` is the filter. `.maybeSingle()` turns the array into one object, or `null` when the id is not in the table. `setResource(null)` is what makes your existing not-found branch render.

### Phase 5 — the whole Submit page

`src/pages/SubmitResources.jsx`:

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../lib/supabaseClient'

const categories = [
  'Self-Awareness',
  'Self-Regulation',
  'Empathy',
  'Social Skills',
  'Team Health',
]

function SubmitResources() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()

    const nextResource = {
      title: title.trim(),
      category,
      summary: summary.trim(),
      body: body.trim(),
    }

    if (
      !nextResource.title ||
      !nextResource.category ||
      !nextResource.summary ||
      !nextResource.body
    ) {
      setError('Fill in every field.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase.from('resources').insert([nextResource])
      if (error) throw error
      navigate('/resources')
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section>
      <header className="page-header">
        <p className="eyebrow">Contribute</p>
        <h1>Submit a resource</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Choose a category</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Summary
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </label>

        <label>
          Body
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </label>

        {error && <p>{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit resource'}
        </button>
      </form>
    </section>
  )
}

export default SubmitResources
```

`insert` takes an array with one object. The object's keys are the column names. `id` and `created_at` stay off that object. A failed insert sets `error` and does not navigate.

---

## Flag As You Go

After each phase, take 2 minutes and note:

- Which step did you have to re-read?
- Which error showed up, and which check in that phase explained it?
- Did a phase take significantly longer than expected? Flag it.

When this exercise is complete, you have finished Phase 2. You will have built five React apps covering components, state, lifting state, data fetching, component architecture, routing, and a real backend.
