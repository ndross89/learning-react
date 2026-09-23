# EQ Resource Hub — Build Brief (Exercise 1 of 2)
**Phase 2 React | React Router v7 · Multi-Page Navigation · Dynamic Routes · useParams**

---

## Watch Before You Build

These resources cover the concepts in this exercise. Watch or read at least one before writing any code. The core concepts are identical between v6 and v7 — the only difference is the import source. Any tutorial that shows `import { ... } from 'react-router-dom'` is using v6. In your project, that line becomes `import { ... } from 'react-router'`. That's the only change.

**Video (recommended first):**
- **Web Dev Simplified — "Learn React Router v6 In 45 Minutes"** on YouTube
  Search: `Web Dev Simplified React Router` — it's the top result from that channel.
  Covers BrowserRouter, Routes, Route, Link, NavLink, and useParams. 45 minutes. Watch this one first.

- **Codevolution — React Router v6 Tutorial Series** on YouTube
  Search: `Codevolution React Router v6` — a multi-part series if you want more depth after the above.

**Written reference (use during the build):**
- LogRocket React Router v7 Guide: https://blog.logrocket.com/react-router-v7-guide/
  Updated January 2026. Covers declarative mode (what this exercise uses) with v7 syntax.
- Robin Wieruch React Router 7 Tutorial: https://www.robinwieruch.de/react-router/
  Short, clean, code-first walkthrough of the exact patterns used in this brief.

---

## Before You Build — Five Mental Models

### 1. React apps are single-page apps (SPAs)

When you load a React app, the browser downloads one HTML file and one JavaScript bundle. There is only ever one actual page load. Every "page" the user sees after that is React swapping out components — no real browser navigation happens.

The problem: the URL never changes. The user can't bookmark a specific view, use the back button, or share a link to a specific page.

React Router solves this by watching the URL and deciding which components to render based on what it sees.

---

### 2. BrowserRouter — the wrapper that watches the URL

`BrowserRouter` is a component you wrap your entire app in. It hooks into the browser's URL bar and tells React when the URL changes. You add it once in `main.jsx` and never touch it again.

```jsx
// main.jsx
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Without `BrowserRouter`, nothing in React Router works.

---

### 3. Routes + Route — the matching layer

`Routes` and `Route` are where you define which component renders for which URL. Think of `Routes` as a switch statement and each `Route` as a case.

```jsx
// App.jsx
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Resources from './pages/Resources';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  );
}
```

When the URL is `/`, `Home` renders. When it's `/resources`, `Resources` renders. Only one route renders at a time.

---

### 4. Link and NavLink — how you navigate without reloading the page

Regular HTML `<a href="/resources">` causes a full browser reload. In React, that throws away all your state and rerenders everything. `Link` and `NavLink` are React Router's replacement — they update the URL without a reload.

```jsx
import { Link, NavLink } from 'react-router';

// Link — basic navigation
<Link to="/resources">View Resources</Link>

// NavLink — same as Link, but adds an "active" class automatically
// when the current URL matches its `to` prop
<NavLink to="/resources">Resources</NavLink>
```

Use `NavLink` in your navbar so you can style the active link differently. Use `Link` anywhere else.

---

### 5. Dynamic routes and useParams

Some routes represent one item from a larger set — a single resource, a single user, a single post. You don't create a separate route for each one. Instead, you define a route with a parameter in the path:

```jsx
<Route path="/resources/:id" element={<ResourceDetail />} />
```

The `:id` is a URL parameter — a placeholder. When the URL is `/resources/3`, `id` is `3`. Inside `ResourceDetail`, you access that value with the `useParams` hook:

```jsx
import { useParams } from 'react-router';

function ResourceDetail() {
  const { id } = useParams(); // id is '3' (always a string)
  // use id to find and display the right resource
}
```

Note: `id` from the URL is always a string. If your data uses numbers, you'll need to convert: `Number(id)` or `parseInt(id)`.

---

## The Brief

You're building the **EQ Resource Hub** — a multi-page React app where ApricityEQ publishes EQ learning resources. Users can browse a list of resources and click into a detail view for each one. All data is hardcoded for now — in Exercise 2, you'll replace it with a live Supabase database.

**This is Exercise 1 of 2.** The routing structure you build here carries forward unchanged into Exercise 2. Don't throw this project away when you're done.

---

## Functionality

a. A persistent navigation bar with links to Home and Resources  
b. A Home page with a welcome message and a link to the resources list  
c. A Resources page that lists all resources as cards  
d. Each card links to that resource's detail page  
e. A Resource Detail page that displays the full resource based on the URL  
f. A 404 / Not Found page for any URL that doesn't match a defined route  
g. The active nav link is visually distinct from inactive links

---

## Acceptance Criteria

- [ ] App renders with no console errors
- [ ] Navigating between pages does not cause a full browser reload
- [ ] The URL changes when navigating (e.g., `/resources`, `/resources/2`)
- [ ] The navbar is visible on every page
- [ ] Active nav link is styled differently from inactive links
- [ ] Resources page renders all 5 resources from the hardcoded data file
- [ ] Clicking a resource card navigates to `/resources/:id`
- [ ] Resource Detail page displays the correct resource based on the URL
- [ ] Entering an invalid resource ID shows a "resource not found" message
- [ ] Any undefined URL renders the Not Found page
- [ ] `useParams` is used to read the resource ID from the URL
- [ ] All imports come from `react-router` (not `react-router-dom`)

---

## Data File

Create this file before writing any components. All pages that need resource data import from here.

```js
// src/data/resources.js
export const resources = [
  {
    id: 1,
    title: 'Understanding Self-Awareness',
    category: 'Self-Awareness',
    summary: 'An introduction to recognizing your own emotional patterns and how they shape your responses.',
    body: 'Self-awareness is the foundation of emotional intelligence. It involves noticing your emotional state in real time, understanding what triggers certain reactions, and recognizing how your behavior affects others. Without self-awareness, other EQ skills have no anchor.',
  },
  {
    id: 2,
    title: 'Regulating Emotional Responses',
    category: 'Self-Regulation',
    summary: 'Practical strategies for pausing between an emotional trigger and your response.',
    body: 'Emotional regulation is not about suppressing feelings — it is about creating space between a trigger and a reaction. Techniques like cognitive reappraisal, grounding, and pacing help individuals respond intentionally rather than reactively.',
  },
  {
    id: 3,
    title: 'Building Empathy in the Workplace',
    category: 'Empathy',
    summary: 'How to develop genuine empathy in professional settings where it is often deprioritized.',
    body: 'Empathy in the workplace means understanding a colleague\'s experience from their perspective, not just intellectually but emotionally. It requires active listening, suspending judgment, and communicating in ways that validate without requiring agreement.',
  },
  {
    id: 4,
    title: 'Improving Social Skills',
    category: 'Social Skills',
    summary: 'The social skill set that supports healthier collaboration and communication at work.',
    body: 'Social skills in the EQ framework include clear communication, conflict resolution, influence, and collaboration. These are learnable skills, not innate traits — and improving them consistently improves team performance and relationship quality.',
  },
  {
    id: 5,
    title: 'Psychological Safety at Work',
    category: 'Team Health',
    summary: 'What psychological safety is, why it matters, and how leaders can build it intentionally.',
    body: 'Psychological safety is the shared belief that the team environment is safe for interpersonal risk-taking — speaking up, asking questions, admitting mistakes. Research by Amy Edmondson at Harvard shows it is the strongest predictor of high-performing teams.',
  },
];
```

---

## Build Phases

### Phase 1 — Project Setup + Install + Wrap

Initialize the project, install React Router, and wrap the app in `BrowserRouter`. This is the foundation — nothing else works without it.

This will require:
- `npm create vite@latest eq-resource-hub -- --template react`
- `cd eq-resource-hub && npm install && npm install react-router`
- Clear `App.css` and `index.css` boilerplate
- In `main.jsx`: import `BrowserRouter` from `react-router`, wrap `<App />` in it
- Create your folder structure:
  - `src/data/resources.js` (paste the data file above)
  - `src/pages/Home.jsx` — return a placeholder `<div>Home</div>`
  - `src/pages/Resources.jsx` — return a placeholder `<div>Resources</div>`
  - `src/pages/ResourceDetail.jsx` — return a placeholder `<div>Resource Detail</div>`
  - `src/pages/NotFound.jsx` — return a placeholder `<div>404 - Not Found</div>`
  - `src/components/Navbar.jsx` — return a placeholder `<nav>Navbar</nav>`
  - `src/components/ResourceCard.jsx` — return a placeholder `<div>Resource Card</div>`
- Import `Navbar` into `App.jsx` and render it above everything else
- Confirm the app renders at `localhost:5173` with no errors

---

### Phase 2 — Routes + Navigation

Set up the routing layer in `App.jsx` and build the `Navbar` with working navigation. After this phase, clicking nav links should change the URL and swap the page content.

This will require:

**In App.jsx:**
- Import `Routes` and `Route` from `react-router`
- Import all four page components
- Return `Navbar` above `Routes`, then define four routes:
  - `path="/"` → `Home`
  - `path="/resources"` → `Resources`
  - `path="/resources/:id"` → `ResourceDetail`
  - `path="*"` → `NotFound` (the `*` catches any URL that didn't match above)

**In Navbar.jsx:**
- Import `NavLink` from `react-router`
- Return a `<nav>` with two `NavLink` elements: one for `/` (Home) and one for `/resources` (Resources)
- Style the active state — `NavLink` automatically adds an `"active"` class when its route is current; add a CSS rule for `a.active` in `index.css` to distinguish it visually

**Test before moving on:** navigate between Home and Resources using the nav links. Confirm the URL changes and the right placeholder appears. Confirm the Not Found page renders for a URL like `/doesnotexist`.

---

### Phase 3 — Resources Page + ResourceCard

Build the resources list. Import the data file, map over it, and render each resource as a `ResourceCard` that links to its detail page.

This will require:

**In Resources.jsx:**
- Import `resources` from `../data/resources`
- Map over the array, rendering `<ResourceCard key={resource.id} resource={resource} />` for each

**In ResourceCard.jsx:**
- Accept a `resource` prop (the full object)
- Display `resource.title`, `resource.category`, and `resource.summary`
- Import `Link` from `react-router` and wrap the card (or its title) in `<Link to={`/resources/${resource.id}`}>` so clicking navigates to the detail page
- Add minimal CSS to make each card visually distinct

**Test before moving on:** the Resources page should show 5 cards. Clicking a card should navigate to `/resources/1`, `/resources/2`, etc. The `ResourceDetail` placeholder should appear (the data display comes in Phase 4).

---

### Phase 4 — Resource Detail Page + useParams

Build the detail page. Use `useParams` to read the ID from the URL, find the matching resource in the data, and display its full content.

This will require:

**In ResourceDetail.jsx:**
- Import `useParams` from `react-router`
- Import `resources` from `../data/resources`
- Call `useParams()` to get `id` from the URL
- Find the matching resource: `resources.find(r => r.id === Number(id))`
- If no match is found (invalid ID), render a message: `"Resource not found."`
- If a match is found, render the resource's `title`, `category`, `body`
- Import `Link` and add a `<Link to="/resources">← Back to Resources</Link>` at the top

**Test before moving on:** navigate to a resource card from the list. The detail page should show the full content. Manually change the URL to `/resources/99` — the "Resource not found" message should appear.

---

## Reference — Complete Syntax Guide

Since this is all net-new, the full patterns are here. Try each phase without looking first. Use these to confirm or unblock.

### BrowserRouter in main.jsx
```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Routes setup in App.jsx
```jsx
import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
```

### NavLink in Navbar.jsx
```jsx
import { NavLink } from 'react-router';

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/resources">Resources</NavLink>
    </nav>
  );
}

export default Navbar;
```

### Active NavLink CSS (in index.css)
```css
nav a.active {
  font-weight: bold;
  text-decoration: underline;
}
```

### Link inside ResourceCard.jsx
```jsx
import { Link } from 'react-router';

function ResourceCard({ resource }) {
  return (
    <div className="resource-card">
      <Link to={`/resources/${resource.id}`}>
        <h3>{resource.title}</h3>
      </Link>
      <p>{resource.category}</p>
      <p>{resource.summary}</p>
    </div>
  );
}

export default ResourceCard;
```

### useParams in ResourceDetail.jsx
```jsx
import { useParams, Link } from 'react-router';
import { resources } from '../data/resources';

function ResourceDetail() {
  const { id } = useParams();
  const resource = resources.find(r => r.id === Number(id));

  if (!resource) {
    return <p>Resource not found.</p>;
  }

  return (
    <div>
      <Link to="/resources">← Back to Resources</Link>
      <h2>{resource.title}</h2>
      <p>{resource.category}</p>
      <p>{resource.body}</p>
    </div>
  );
}

export default ResourceDetail;
```

---

## Flag As You Go

After each phase, take 2 minutes and note:

- Did you finish without touching the reference list? ✅ Carry it forward.
- Did you need to look something up? Note which item specifically.
- Did a phase take significantly longer than expected? Flag it.

**Keep this project.** Exercise 2 (Supabase) builds directly on top of it. You will not start a new project — you will extend this one.
