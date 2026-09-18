# The Learning Map

Broken into 10 modules. Each one is a self-contained concept that the next one builds on. No module is more than 2–3 ideas wide.

**You are here:** skim Modules 2–3 and 5, do the short Module 4 practice, then start **Module 6**. Do not rebuild the original UserCard / team-member exercises — you already outgrew them.

Snapshot used for this assessment: [`completed_projects/first-project`](../completed_projects/first-project/). Leave that folder as a snapshot. New practice lives in `src/`.

---

## Assessment of `first-project`

You combined several modules in one sitting. That is a good sign: the pieces are starting to feel like one system instead of isolated syntax.

### What the code demonstrated

| Roadmap idea | Where it showed up | Status |
| --- | --- | --- |
| Functional components returning JSX | `Card`, `NewCard`, `App` | Demonstrated |
| JSX: `className`, `{}` expressions, fragments | `Card.jsx`, `App.jsx` | Demonstrated, with a few habits to tighten |
| Parent renders children through `App.jsx` | `App` → `Card` / `NewCard` | Demonstrated |
| Props in and destructured out | `<Card label date name />` and `({ label, date, name })` | Demonstrated |
| Lists with `.map()` and `key` | `Members.jsx` | Demonstrated |
| `useState` + click → re-render | color toggle in `Card` | Demonstrated |
| `onClick` (handler passed, not called) | `onClick={() => setBackgroundColor(...)}` | Demonstrated |
| State is local to the instance | each card toggles independently | Demonstrated (this is the right behavior for that UI) |
| Splitting files / default vs named exports | `Card` default, `NewCard` named | Demonstrated, names still fuzzy |
| Conditional **class names** (ternary) | `backgroundColor ? 'alt-card' : 'card'` | Demonstrated |
| Conditional **elements** (`&&` show/hide) | — | Not yet |
| Controlled inputs (`value` + `onChange`) | `<input>` is present but unwired | Not yet — **this is the next real skill** |
| Forms, `useEffect`, lifting state, router, Supabase | — | Not yet |

### What to keep from that project

- A component is a function that returns JSX. You used both `function App()` and `const Card = () => {}`. Either is fine.
- Props flow down. `App` and `NewCard` pass data; `Card` only reads it.
- `.map()` + `key={id}` is the list pattern. You already used a real `id` instead of the array index. Keep doing that.
- `useState` is local. Clicking “Change Color” on James does not recolor Mary. That is the React model working.
- You did not write `onClick={setBackgroundColor(!backgroundColor)}` (which would fire during render). The `() =>` wrapper is the correct instinct.

### Gaps to close (do not ignore these)

These are not “you did it wrong.” They are the next lessons, visible in the file.

1. **`typeof="text"` vs `type="text"`.** `typeof` is a JavaScript operator. The HTML attribute is `type`. Easy mix-up; Module 2 calls it out.
2. **The input does not participate in React.** No `value`, no `onChange`. The browser owns that field. Module 6 is about taking it back (controlled inputs).
3. **Two sources of cards.** Three `<Card />`s hardcoded in `App`, three more from `TeamMembers`. The UI should be a function of **one** array. Module 4.
4. **Ternary on `className` is not the same as showing/hiding UI.** You switched styles. You have not yet rendered or omitted an element with `&&`. Module 4.
5. **State names should describe data, not CSS.** `backgroundColor` holds `true`/`false`. `isAlt` / `isHighlighted` matches what `useState` is storing. Module 5.
6. **`NewCard` is a list, not a card.** Naming is architecture. Module 9 will make this official; Module 2 already flags it.
7. **`Date` as a property name.** Use `date`. Capital-D `Date` collides with the built-in `Date` in your head even when it is just a key.

### Practice builds that are retired

Do **not** do these. They were written for a blank `App.jsx`.

- Static UserCard (old Module 2)
- UserCard driven by props, three copies (old Module 3)
- Map five team members with an Inactive badge (old Module 4) — replaced by the Watchlist start
- Counter, then a summary/detail toggle (old Module 5) — you already have a toggle

New through-line starting in Module 4: a **Watchlist** (shows, not team cards). Same skills, new UI, so you are not polishing the same six cards for six more modules.

---

## How to use the modules

Lessons live in [`learning_modules/`](../learning_modules/). Read in order inside a module. Write practice in `src/` (`App.jsx`, new files under `src/components/`). When a practice build is done, you can copy it into `completed_projects/` the same way you did with `first-project`.

| Status | Meaning |
| --- | --- |
| Complete | Keep as reference. No new build. |
| Recap | Read so the vocabulary matches what you already wrote. Short or no practice. |
| Gap | One idea you used a neighbor of, but not this. Short practice. |
| Next / upcoming | New material. Full lessons + a Watchlist (or later) build. |

---

## Module 1 — The React Mental Model (~1–2 days)

**Status: complete.** Lessons stay as the reference for declarative vs. imperative, the component tree, JSX → `createElement` / `jsx`, and `index.html` → `main.jsx` → `App.jsx`.

Practice (original): the three sentences. If you skipped writing them, do it once. It still pays off when debugging.

- [Module 1 README](../learning_modules/Module%201/README.md)

---

## Module 2 — First Project Review (~half day)

**Status: recap.** Not “build a static card.” Walk *your* tree, JSX habits, and the `typeof` / fragment / naming nits.

Practice: no new app. Answer the checkpoint from memory. Optional: leave a short note in `completed_projects/first-project` (do not rewrite it into the Watchlist).

- [Module 2 README](../learning_modules/Module%202/README.md)

---

## Module 3 — Props (~half day)

**Status: recap.** You already pass and destructure props. This module names the rules: props are read-only, parent owns the data, children receive a snapshot.

Practice: none required. One optional “spot the mutation” question.

- [Module 3 README](../learning_modules/Module%203/README.md)

---

## Module 4 — Lists, Keys, and Showing/Hiding UI (~1–2 days)

**Status: gap + first Watchlist slice.** You can `.map()` and you used `key={id}`. Two ideas are still open:

1. One array is the source of truth (no mixed hardcoded + mapped copies).
2. Conditional **elements** with `&&` and ternary (not only swapping a class name).

Practice build: **Watchlist, static.** Hardcoded array of 5+ shows in `src/`. Render a `ShowCard` for each. Include a `watched` boolean and use it to show or hide a “Watched” badge. No filter, no form, no fetch.

- [Module 4 README](../learning_modules/Module%204/README.md)

---

## Module 5 — useState (~half day to 1 day)

**Status: recap.** You already have the loop: click → setter → function runs again → new JSX → React updates the DOM. Skip the counter and the summary/detail card.

What this module adds: name booleans like booleans, `setX(prev => !prev)`, multiple independent state variables, and “don’t store what you can derive.”

Practice: none required. Optional: add a second piece of state on `ShowCard` (favorite star) *after* Module 4’s list exists — only if you want a second toggle under your belt with better names.

- [Module 5 README](../learning_modules/Module%205/README.md)

---

## Module 6 — Events and Controlled Inputs (~2 days)

**Status: next.** This is the first full new skill.

- React events: `onClick`, `onChange` — pass a function, do not call it in JSX
- `event.target.value`
- Controlled inputs: `value={state}` + `onChange` that sets state
- Derived lists: `shows.filter(...)` from the query; do not keep a second “filtered” copy in state

Practice build: **Watchlist search.** One text input filters the list as you type. The input is controlled. The visible list is computed from `shows` + `query` each render.

This is the skill the unused `<input>` in `Card.jsx` was reaching for.

- [Module 6 README](../learning_modules/Module%206/README.md)

---

## Module 7 — Forms (~2–3 days)

**Status: upcoming.**

- Every field backed by state
- One state object vs. several `useState`s (you will try both, then pick)
- `onSubmit`, `event.preventDefault()`
- Reset the form after a successful add

Practice build: **Add to Watchlist.** Form with title, genre, and a “already watched” checkbox. Submit appends a new show (new `id`) and clears the fields. Still no backend.

- [Module 7 README](../learning_modules/Module%207/README.md)

---

## Module 8 — useEffect (~3–4 days)

**Status: upcoming.** The concept is small; the edge cases are not. Read [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) before you reach for it — filtering in Module 6 must **not** be an effect.

- Run code after paint because something outside React needs syncing (network, timers, subscriptions)
- Dependency array: `[]` mount only, `[value]` when `value` changes, omitted = every render (almost never what you want)
- Fetch + loading + error in state
- Cleanup (`abort` a fetch, clear a timer)

Practice build 1: On mount, fetch from the [TVmaze search API](https://www.tvmaze.com/api) (`https://api.tvmaze.com/search/shows?q=girls` is a fine first URL). Loading state, then results as cards.

Practice build 2: The search box from Module 6 becomes the fetch query (with a reasonable empty-query behavior). The effect re-runs when the query changes. Abort in-flight requests on cleanup.

- [Module 8 README](../learning_modules/Module%208/README.md)

---

## Module 9 — Component Architecture and Lifting State (~3–4 days)

**Status: upcoming.** You already split `Card` and `Members`. This module is the *why*, and the case your color toggle did not need: **two siblings sharing data**.

- What deserves its own component
- Data flows down; events flow up
- Lift state to the closest common parent
- Callback props: child calls a function the parent passed in

Practice build: **Refactor Watchlist** into `ShowList`, `ShowCard`, `AddShowForm`, and `FilterBar`. `App` (or a `Watchlist` parent) owns `shows` and `query`. Each child gets only what it needs.

- [Module 9 README](../learning_modules/Module%209/README.md)

---

## Module 10 — React Router + Supabase (~5–7 days)

**Status: upcoming.** Last module on this map. Bigger on purpose.

- React Router: `<Routes>`, `<Route>`, `<Link>`, `useNavigate`, `useParams`
- Dynamic route for one show
- Supabase JS client in React (anon key only, `VITE_` env vars)
- Read in `useEffect` (or a later data library — not required here)
- Insert from the add form

Practice build (mini-project): two pages. Page 1: watchlist from a Supabase table. Page 2: detail view (`/shows/:id`). Form creates a row and the list updates.

Supabase CLI (when you reach this module): `brew install supabase/tap/supabase` if `supabase` is not on your PATH; `supabase start` for local services; never put the service-role key in the client.

- [Module 10 README](../learning_modules/Module%2010/README.md)

---

## Suggested order from today

1. Write the three Module 1 sentences if you never did (10 minutes).
2. Read Module 2 (review) and Module 3 (props recap).
3. Module 4 lessons + Watchlist static list in `src/`.
4. Skim Module 5. Optional second toggle only if you want it.
5. **Module 6 — start here for new learning.**
6. Continue 7 → 10 on the Watchlist through-line.

---

## Debugging while you practice

- **React Developer Tools → Components:** props, state, which node owns what.
- **Console:** controlled/uncontrolled input warnings, missing `key`, fetch errors.
- **Elements vs Components:** DOM is the output; the tree is what you edit.

A practice build is done when the acceptance list in that module’s practice file is true — not when the CSS looks finished.
