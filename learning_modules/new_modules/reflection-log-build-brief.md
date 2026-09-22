# Reflection Log — Build Brief

**Phase 2 React | Passing Functions as Props · Lifting State · Component Architecture**

---

## The Brief

You're building a three-component React app where a user logs a quick reflection and sees the list build below. The new challenge: the form and the list live in separate components, but they share the same data. That means state has to live in `App` and get passed down — including a function the child component will call when the user submits.

---

## Functionality

a. A heading identifying the app  
b. A `ReflectionInput` component that handles the form  
c. A text input and submit button inside `ReflectionInput`  
d. Submitting adds the reflection to the log and clears the input  
e. Submitting empty or whitespace-only input does nothing  
f. Each logged reflection renders as its own `ReflectionCard` component  
g. If the log is empty, a placeholder message renders: _"No reflections yet. Add one above."_

---

## Acceptance Criteria

- [ ] App renders with no console errors
- [ ] `ReflectionInput` is its own component in its own file
- [ ] `ReflectionCard` is its own component in its own file
- [ ] All state (`reflections` array) lives in `App` — not in `ReflectionInput`
- [ ] `App` defines the add function and passes it to `ReflectionInput` as a prop
- [ ] `ReflectionInput` calls the prop function on submit — it does not update App's state directly
- [ ] `ReflectionInput` manages only its own local input field state
- [ ] Each reflection renders inside a `ReflectionCard` that receives text as a prop
- [ ] Ternary is used for the empty-state conditional render
- [ ] Empty/whitespace submit does nothing

---

## Build Phases

### Phase 1 — Shell + File Structure

Set up the project, create all three component files with placeholder returns, and confirm the app renders cleanly before writing any logic.

This will require:

- `npm create vite@latest reflection-log -- --template react`, then `cd reflection-log && npm install && npm run dev`
- Clear `App.css` and `index.css` boilerplate
- Create `src/components/ReflectionInput.jsx` — return a placeholder `<div>Reflection Input</div>`
- Create `src/components/ReflectionCard.jsx` — return a placeholder `<div>Reflection Card</div>`
- Import both into `App.jsx` and render them inside a single wrapping element
- Confirm all three placeholders are visible at `localhost:5173` with no errors

**Why this phase exists:** getting the architecture visible before adding any logic means errors you hit later are logic errors, not file structure errors. Separate problems, separate phases.

---

### Phase 2 — ReflectionInput: Local State + Prop Function

Build the form inside `ReflectionInput`. This component manages its own input value in local state. It does not know about the reflections list — it just calls a function its parent gave it.

This will require:

- `useState` inside `ReflectionInput` for the current input value (local to this component only)
- A controlled input wired to that state
- In `ReflectionInput`, receive an `onSubmit` prop from the parent component (App)
- A `handleSubmit` function that: guards against empty input, calls `onSubmit(inputValue)`, then clears the local input state
- A button wired to `handleSubmit`
- Back in `App`: pass a temporary handler as the prop — `onSubmit={() => console.log('submitted')}` — to confirm the wiring works before App has real state

Test before moving on: open the console, type something, hit submit. You should see `'submitted'` log. If you do, the prop is wired correctly.

---

### Phase 3 — App State + Full Render

Replace the temporary console.log with real state in `App`. Connect everything and complete the render.

This will require:

- `useState` in `App` for the `reflections` array (initial value: `[]`)
- A `handleAddReflection(text)` function in `App` that spreads the new entry into the reflections array
- Pass `onSubmit={handleAddReflection}` to `ReflectionInput` (replace the console.log handler)
- Map over `reflections` in `App`, rendering `<ReflectionCard key={index} text={entry} />` for each
- Inside `ReflectionCard`: accept the `text` prop and return it inside a styled `<div>`
- Ternary for the conditional render in `App`:  
  empty → placeholder message, not empty → mapped cards

---

## If You Get Stuck — Reference by Phase

### Phase 1

- A component file needs a default export: `export default ReflectionInput;` at the bottom
- Import syntax in App: `import ReflectionInput from './components/ReflectionInput';`
- JSX requires a single root element — wrap both components in a `<div>` or `<>` (fragment)

### Phase 2

- Passing a function as a prop looks like passing any other value:
  ```jsx
  // In App
  <ReflectionInput onSubmit={handleAddReflection} />

  // In ReflectionInput — receive it in props
  function ReflectionInput({ onSubmit }) { ... }

  // Then call it
  onSubmit(inputValue);
  ```
- `ReflectionInput` should NOT import or touch App's state. It only calls the function it received.

### Phase 3

- Ternary in JSX (inside the return block):
  ```jsx
  {
    reflections.length === 0 ? (
      <p>No reflections yet. Add one above.</p>
    ) : (
      reflections.map((entry, index) => <ReflectionCard key={index} text={entry} />)
    )
  }
  ```
- `ReflectionCard` receives props the same way: `function ReflectionCard({ text }) { ... }`

---

## Flag As You Go

After each phase, take 2 minutes and note:

- Did you finish without touching the reference list? ✅ That concept is yours — carry it forward.
- Did you need to look something up? Note which item specifically. That goes on the next project's hint list.
- Did a phase take significantly longer than expected? Flag the phase. That concept gets a targeted drill before the next project.

Your flag notes are the direct input for how the next brief gets built. The hint list should get shorter with every project.
