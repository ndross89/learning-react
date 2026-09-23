# Team Insight Feed — Build Brief
**Phase 2 React | useEffect · Loading State · Error State · Data Fetching**

---

## Before You Build — Three New Mental Models

Read this section before you touch any code. These are the concepts you haven't used in React yet. Understanding the *why* before the *how* will make the phases easier to follow.

---

### 1. useEffect

In vanilla JS, you might fetch data at the top of a script or inside a `DOMContentLoaded` listener. In React, that pattern doesn't work cleanly because the component renders first, *then* you want side effects to run.

`useEffect` is React's way of saying: *"After this component renders, do this thing."*

The second argument — the dependency array — controls when it runs:

```jsx
useEffect(() => {
  // This runs once, after the first render
}, []); // <- empty array = "only run on mount"
```

If you leave the array out entirely, it runs after every render. If you put a variable in the array, it runs every time that variable changes. For a one-time fetch, you always want the empty array.

---

### 2. Loading State

When your component first renders, there's no data yet — the fetch hasn't finished. If you try to map over an empty array, you'll get a blank screen with no explanation. That's confusing for a user.

Loading state is a boolean that starts as `true`. While it's `true`, you render a message instead of the data. Once the fetch finishes (success or failure), you set it to `false` and render the real content.

```
Component mounts → useEffect fires → fetch starts
→ loading = true (show "Loading...")
→ fetch resolves → loading = false → show data
```

---

### 3. Error State

Fetches can fail. If they do silently, your app just shows nothing. Error state is a string (or null) that captures the failure message. If it's not null, you render the error instead of the data.

The pattern for handling both:
```
try  → set the data
catch → set the error message
finally → set loading to false (runs whether it succeeded or failed)
```

---

## The Brief

You're building a **Team Insight Feed** for ApricityEQ — a manager-facing view that loads posts from an external API and lets the manager filter by team member. The app fetches from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts), a free public API that returns 100 fake posts with a `userId`, `title`, and `body`. No API key required.

---

## Functionality

a. On page load, the app fetches all posts from the API  
b. While the fetch is in flight, a loading message renders  
c. If the fetch fails, an error message renders instead  
d. Once loaded, each post renders as an `InsightCard` component  
e. `InsightCard` receives and displays the post's `title` and `body`  
f. A dropdown lets the manager filter posts by `userId` (1–10) or view all  
g. Filtering does not trigger a new fetch — it filters the already-loaded data

---

## Acceptance Criteria

- [ ] App renders with no console errors
- [ ] A loading message is visible briefly on page load before data appears
- [ ] Data renders after the fetch resolves
- [ ] Each post renders inside an `InsightCard` component
- [ ] `InsightCard` receives `title` and `body` as props
- [ ] The dropdown updates the visible posts without re-fetching
- [ ] Selecting "All Users" shows all posts
- [ ] `useEffect` has an empty dependency array
- [ ] The fetch uses `async/await` inside a function defined inside `useEffect`
- [ ] A `finally` block sets `loading` to `false` whether the fetch succeeds or fails

---

## Build Phases

### Phase 1 — Shell + File Structure

Set up the project, create the `InsightCard` component file with a placeholder return, and confirm everything renders before writing any logic.

This will require:
- `npm create vite@latest team-insight-feed -- --template react`, then `cd team-insight-feed && npm install && npm run dev`
- Clear `App.css` and `index.css` boilerplate
- Create `src/components/InsightCard.jsx` — return a placeholder `<div>Insight Card</div>`
- Import `InsightCard` into `App.jsx` and render it
- Confirm it appears at `localhost:5173` with no errors

---

### Phase 2 — State Setup + useEffect Fetch

This is the core new phase. You'll set up four pieces of state and write the fetch inside a `useEffect`. You won't render the data yet — you'll confirm the fetch is working via `console.log` first.

This will require:
- Four `useState` declarations in `App`:
  ```
  posts        → [] (the fetched data)
  loading      → true (starts true — fetch hasn't finished yet)
  error        → null (no error yet)
  filterUserId → 'all' (dropdown default)
  ```
- A `useEffect` with an empty dependency array `[]`
- Inside `useEffect`, define an `async` function called `fetchPosts` and call it immediately — see reference for the exact pattern
- Inside `fetchPosts`: `fetch` the URL, check `response.ok`, parse the JSON, call `setPosts(data)`
- A `catch` block that calls `setError(err.message)`
- A `finally` block that calls `setLoading(false)` — this runs whether the fetch succeeded or failed
- After `setPosts(data)`, add a `console.log(data)` temporarily to confirm the array arrived

**Test before moving on:** open the browser console. You should see an array of 100 post objects logged. If you see them, the fetch is working.

---

### Phase 3 — Conditional Render + InsightCard

Replace the placeholder render with real conditional logic. Three possible states: loading, error, or data. Then build out `InsightCard` to display the post content.

This will require:
- Remove the `console.log` from Phase 2
- In `App`'s return block, write three conditions (see reference for the exact pattern):
  - If `loading` is true → render a loading message
  - If `error` is not null → render the error message
  - If neither → map over `posts` and render `<InsightCard />` for each
- Each `InsightCard` receives `key={post.id}`, `title={post.title}`, and `body={post.body}`
- In `InsightCard.jsx`: accept `title` and `body` as props, return them inside a styled `<div>`
- Add minimal CSS to make each card visually distinct (border, padding, margin — your call)

**Test before moving on:** the loading message should appear briefly, then be replaced by 100 cards.

---

### Phase 4 — Filter Dropdown

Add the dropdown and filter logic. The key concept here: `filteredPosts` is not new state — it's a variable you derive from existing state. You calculate it fresh on every render.

This will require:
- A `<select>` element in `App` wired to `filterUserId` state — controlled input pattern you already know
- Options: one `"All Users"` option with value `"all"`, plus options for `userId` 1–10 (use `.map()` over an array to generate them)
- A `filteredPosts` variable defined *inside* the component but *outside* the return block:
  ```
  If filterUserId is 'all' → filteredPosts = posts
  If not → filteredPosts = posts filtered to matching userId
  ```
- Update the `.map()` in Phase 3 to use `filteredPosts` instead of `posts`
- Note: `post.userId` is a number, but `filterUserId` from the dropdown will be a string — convert one to match the other when filtering

---

## If You Get Stuck — Reference by Phase

### Phase 2

**The useEffect + async fetch pattern (full):**
```jsx
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts.');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);
```

Why the async function is defined *inside* useEffect and then called: `useEffect`'s callback can't be async directly. Defining an async function inside it and immediately calling it is the standard pattern.

Why `finally`: if you put `setLoading(false)` inside `try`, it won't run if the fetch fails. `finally` guarantees it runs either way.

---

### Phase 3

**Three-condition render pattern:**
```jsx
{loading && <p>Loading team insights...</p>}
{error && <p>Error: {error}</p>}
{!loading && !error && posts.map(post => (
  <InsightCard key={post.id} title={post.title} body={post.body} />
))}
```

Why `!loading && !error` on the third condition: you want to make sure the loading and error states are both resolved before trying to render data.

---

### Phase 4

**Generating dropdown options with .map():**
```jsx
<select value={filterUserId} onChange={(e) => setFilterUserId(e.target.value)}>
  <option value="all">All Users</option>
  {[1,2,3,4,5,6,7,8,9,10].map(id => (
    <option key={id} value={id}>User {id}</option>
  ))}
</select>
```

**Derived filteredPosts variable (inside component, above the return):**
```jsx
const filteredPosts = filterUserId === 'all'
  ? posts
  : posts.filter(post => post.userId === Number(filterUserId));
```

Why `Number(filterUserId)`: the dropdown value is always a string. `post.userId` is a number. `'1' === 1` is false in JavaScript, so the filter would return nothing without the conversion.

---

## Flag As You Go

After each phase, take 2 minutes and note:

- Did you finish without touching the reference list? ✅ That concept is yours — carry it forward.
- Did you need to look something up? Note which item specifically. That goes on the next project's hint list.
- Did a phase take significantly longer than expected? Flag the phase. That concept gets a targeted drill before the next project.

Your flag notes are the direct input for how the next brief gets built. The hint list should get shorter with every project.
