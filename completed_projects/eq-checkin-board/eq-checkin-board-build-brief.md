# EQ Check-In Board — Build Brief

**Phase 2 React | Component Architecture · Sibling State Sharing · Derived Data**

---

## Before You Build — The Architectural Concept

Every exercise so far had a linear state flow: `App` holds state, one child receives it. This exercise introduces a fork.

Two sibling components — `SummaryBar` and `CheckInList` — both need the same `entries` array. They can't talk to each other. Neither holds the data. The data lives in `App` and travels down two separate branches simultaneously.

```
App (holds entries state)
├── CheckInForm   → writes to entries (via prop function)
├── SummaryBar    → reads entries (via prop)
└── CheckInList   → reads entries (via prop)
      └── CheckInCard (per entry)
```

When a user submits a check-in, `App` updates `entries`. Because both `SummaryBar` and `CheckInList` receive `entries` as a prop, React re-renders both automatically. You write the state update once in `App` — the UI stays in sync everywhere.

That's the concept. No new syntax. The challenge is building the tree correctly so the data flows where it needs to go.

---

## The Brief

An **EQ Check-In Board** for ApricityEQ that lets a user log an emotional check-in with an emotion label and a short note. The board shows a live summary of all check-ins alongside the full log. All data is local — no fetch, no API.

---

## Functionality

a. A `CheckInForm` with a dropdown for emotion and a text input for a short note  
b. Submitting adds the entry to the board and clears the form  
c. Submitting without selecting an emotion does nothing  
d. A `SummaryBar` that shows total check-ins and the most common emotion  
e. `SummaryBar` shows a placeholder when no entries exist yet  
f. A `CheckInList` that renders all entries as `CheckInCard` components  
g. `CheckInList` shows a placeholder when no entries exist yet  
h. Each `CheckInCard` displays the emotion, note, and timestamp of the entry

**Emotion options for the dropdown:** Joy · Frustration · Anxiety · Calm · Overwhelmed · Neutral

---

## Acceptance Criteria

- [ ] App renders with no console errors
- [ ] `CheckInForm`, `SummaryBar`, `CheckInList`, and `CheckInCard` are each in their own file
- [ ] All `entries` state lives in `App` only
- [ ] `App` passes `entries` as a prop to both `SummaryBar` and `CheckInList`
- [ ] Submitting a check-in updates both `SummaryBar` and `CheckInList` simultaneously without any additional code
- [ ] `CheckInForm` manages only its own local input state
- [ ] `SummaryBar` correctly displays the total entry count
- [ ] `SummaryBar` correctly displays the most common emotion
- [ ] `CheckInCard` displays emotion, note, and timestamp
- [ ] Empty states render in both `SummaryBar` and `CheckInList` before the first entry

---

## Build Phases

### Phase 1 — Shell + File Structure

Create the project, all four component files with placeholder returns, and confirm everything renders before any logic is written.

This will require:

- `npm create vite@latest eq-checkin-board -- --template react`, then `cd eq-checkin-board && npm install && npm run dev`
- Clear `App.css` and `index.css` boilerplate
- Create these four files, each returning a placeholder `<div>`:
  - `src/components/CheckInForm.jsx`
  - `src/components/SummaryBar.jsx`
  - `src/components/CheckInList.jsx`
  - `src/components/CheckInCard.jsx`
- Import all four into `App.jsx` and render them inside a single wrapping element
- Confirm all four placeholders are visible at `localhost:5173` with no errors

---

### Phase 2 — CheckInForm: Local State + Prop Function

Build the form. This is a pattern you've completed twice — a component with local state that calls a function prop on submit. The only new piece is the `<select>` dropdown for emotions.

This will require:

- Two `useState` declarations local to `CheckInForm`: one for `emotion` (initial: `''`), one for `note` (initial: `''`)
- A controlled `<select>` for emotion with one `<option>` per emotion label plus a default disabled option (`"Select an emotion"`)
- A controlled text `<input>` for the note
- An `onAddEntry` prop received from `App`
- A `handleSubmit` function that:
  - Guards against empty emotion selection
  - Calls `onAddEntry` with a new entry object: `{ id: Date.now(), emotion, note, timestamp: new Date().toLocaleTimeString() }`
  - Resets both local state values to `''`
- A submit button wired to `handleSubmit`
- In `App`: temporarily pass `onAddEntry={() => console.log('entry added')}` to confirm wiring

**Test before moving on:** select an emotion, fill in a note, submit. You should see `'entry added'` in the console. Empty emotion submit should log nothing.

---

### Phase 3 — App State + Data Distribution

This is the architectural centerpiece of the exercise. Replace the temporary handler with real state in `App`, then pass `entries` down both branches of the tree.

This will require:

- One `useState` in `App`: `entries` with initial value `[]`
- A `handleAddEntry(entry)` function in `App` that spreads the new entry into the array
- Replace the console.log prop with `onAddEntry={handleAddEntry}`
- Pass `entries={entries}` to `SummaryBar`
- Pass `entries={entries}` to `CheckInList`

After this phase, submit a check-in and confirm the `entries` array is updating by temporarily adding `console.log(entries)` inside `handleAddEntry`. Once you see the array growing in the console, remove the log and move on.

The key observation here: you wrote `entries` state once in `App`. Both `SummaryBar` and `CheckInList` receive it as a prop. When it updates, both re-render automatically. That's the sibling pattern in action — you don't have to do anything extra to keep them in sync.

---

### Phase 4 — SummaryBar + CheckInList + CheckInCard

Build out both reading branches. Both receive `entries`, but they do different things with it.

**SummaryBar:**

- Receive `entries` as a prop
- Display total count: `entries.length`
- Derive the most common emotion — see reference for the pattern
- Ternary: if `entries.length === 0`, show a placeholder; otherwise show the stats

**CheckInList:**

- Receive `entries` as a prop
- Ternary: if `entries.length === 0`, show a placeholder; otherwise map over `entries` and render `<CheckInCard key={entry.id} entry={entry} />`

**CheckInCard:**

- Receive `entry` as a prop (the whole object)
- Display `entry.emotion`, `entry.note`, and `entry.timestamp`
- Add minimal styling to make entries visually distinct

---

## If You Get Stuck — Reference by Phase

### Phase 2

**Controlled select with a default disabled option:**

```jsx
<select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
  <option value="" disabled>
    Select an emotion
  </option>
  <option value="Joy">Joy</option>
  <option value="Frustration">Frustration</option>
  <option value="Anxiety">Anxiety</option>
  <option value="Calm">Calm</option>
  <option value="Overwhelmed">Overwhelmed</option>
  <option value="Neutral">Neutral</option>
</select>
```

**Building the entry object on submit:**

```js
onAddEntry({
  id: Date.now(),
  emotion,
  note,
  timestamp: new Date().toLocaleTimeString(),
})
```

### Phase 4

**Most common emotion — reduce pattern (you know reduce from vanilla JS; here's the application):**

```js
const frequencyMap = entries.reduce((acc, entry) => {
  acc[entry.emotion] = (acc[entry.emotion] || 0) + 1
  return acc
}, {})

const topEmotion = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a])[0]
```

What this does: `reduce` builds an object where each key is an emotion and each value is how many times it appeared. Then `Object.keys` sorts those keys by their count, descending, and `[0]` grabs the top one.

**Rendering entry data inside CheckInCard:**

```jsx
function CheckInCard({ entry }) {
  return (
    <div>
      <p>{entry.emotion}</p>
      <p>{entry.note}</p>
      <p>{entry.timestamp}</p>
    </div>
  )
}
```

---

## Flag As You Go

After each phase, take 2 minutes and note:

- Did you finish without touching the reference list? ✅ That concept is yours — carry it forward.
- Did you need to look something up? Note which item specifically. That goes on the next project's hint list.
- Did a phase take significantly longer than expected? Flag the phase. That concept gets a targeted drill before the next project.

Your flag notes are the direct input for how the next brief gets built. The hint list should get shorter with every project.
