# EQ Emotion Log — Build Brief
**Phase 2 React | Components · Props · useState**

---

## The Brief

You're building a single-page React app that lets a user log their current emotion and watch the log build in real time. No external API — all data lives in component state. The goal is to understand how components, props, and `useState` work together before adding any complexity.

---

## Functionality

a. A heading identifying the app  
b. A text input where the user types an emotion  
c. A submit button that adds the emotion to the log  
d. The input clears after submission  
e. Each logged emotion renders as its own `EmotionCard` component  
f. Submitting an empty input does nothing (guarded)  
g. If the log is empty, a placeholder message renders: *"No emotions logged yet."*

---

## Acceptance Criteria

- [ ] App renders in the browser with no console errors
- [ ] Typing in the input updates only the input (no page reload, no console errors)
- [ ] Clicking submit adds the emotion to the log and clears the input field
- [ ] Submitting an empty input does nothing
- [ ] Each emotion renders inside an `EmotionCard` component — not directly in `App`
- [ ] `EmotionCard` receives the emotion text as a prop and displays it
- [ ] The placeholder renders when the log is empty and disappears once an entry is added

---

## Build Phases

### Phase 1 — Project Shell + First Component

Set up the Vite project, delete boilerplate, and confirm a clean `App` component renders in the browser.

This will require:
- Run `npm create vite@latest eq-emotion-log -- --template react` in terminal, then `cd eq-emotion-log && npm install && npm run dev`
- Delete the contents of `App.css` and `index.css` (keep the files, just clear them)
- Replace all boilerplate in `App.jsx` with a function that returns a single `<h1>EQ Emotion Log</h1>`
- Confirm the page renders at `localhost:5173` with no errors

---

### Phase 2 — Controlled Input + State

Wire a text input and submit button to state. Submitting adds the entry to a log array and clears the field.

This will require:
- Two `useState` declarations in `App`: one for the current input value (`''`), one for the log array (`[]`)
- A controlled input: `value` tied to input state, `onChange` updates it on every keystroke
- A `handleSubmit` function that: guards against empty input, spreads the new entry into the log array, and resets the input to `''`
- A button wired to `handleSubmit` via `onClick`
- Temporarily render the log as a `<ul>` with `.map()` to confirm state is updating — you'll replace this in Phase 3

---

### Phase 3 — EmotionCard Component + Final Render

Extract the emotion display into its own component. Replace the temp list with mapped `EmotionCard` instances.

This will require:
- A new file: `src/components/EmotionCard.jsx`
- `EmotionCard` accepts a single `emotion` prop and returns a styled `<div>` with the text
- Export it with `export default EmotionCard` and import it in `App`
- In `App`: use `.map()` over the log array, rendering `<EmotionCard key={index} emotion={entry} />` for each
- Conditional render: if `log.length === 0`, show the placeholder; otherwise render the mapped cards

---

## If You Get Stuck — Reference by Phase

### Phase 1

- JSX looks like HTML but it's JavaScript. Every component is a function that returns JSX.  
  → [React docs: Your First Component](https://react.dev/learn/your-first-component)
- Vite runs at `localhost:5173` by default after `npm run dev`

### Phase 2

- `useState` syntax:
  ```js
  const [value, setValue] = useState('');
  ```
  → [React docs: useState](https://react.dev/reference/react/useState)

- Controlled input pattern:
  ```jsx
  <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  ```

- Adding to array in state — spread, don't mutate:
  ```js
  setLog([...log, newEntry]);
  ```

- Empty input guard:
  ```js
  if (!inputValue.trim()) return;
  ```

### Phase 3

- Component file pattern:
  ```jsx
  function EmotionCard({ emotion }) {
    return <div>{emotion}</div>;
  }
  export default EmotionCard;
  ```
  Import in App: `import EmotionCard from './components/EmotionCard';`

- `.map()` with key:
  ```jsx
  {log.map((entry, index) => (
    <EmotionCard key={index} emotion={entry} />
  ))}
  ```

- Conditional render:
  ```jsx
  {log.length === 0 ? <p>No emotions logged yet.</p> : log.map(...)}
  ```

---

## Flag As You Go

After each phase, take 2 minutes and note:

- Did you finish without touching the reference list? ✅ That concept is yours — carry it forward.
- Did you need to look something up? Note which item specifically. That goes on the next project's hint list.
- Did a phase take significantly longer than expected? Flag the phase. That concept gets a targeted drill before the next project.

Your flag notes are the direct input for how the next brief gets built. The hint list should get shorter with every project.
