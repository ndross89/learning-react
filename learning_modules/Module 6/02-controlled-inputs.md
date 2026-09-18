# 02 — Controlled inputs

**Goal:** Make an input whose displayed text is always a piece of React state.

Official: [Controlling an input with a state variable](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

---

## Uncontrolled (what `first-project` had)

```jsx
<input type="text" placeholder="enter name" />
```

The browser owns the text. React does not know it unless you go read the DOM. Fine for a throwaway field; not how this learning path will handle forms and filters.

---

## Controlled

React state is the source of truth. The input **displays** that string. Every keystroke **updates** that string.

```jsx
const [query, setQuery] = useState('')

<input
  type="text"
  value={query}
  onChange={(event) => setQuery(event.target.value)}
  placeholder="Search titles"
/>
```

Loop: type “Sev” → `onChange` → `setQuery('Sev')` → re-render → `value="Sev"` on the input. The UI is a function of `query`.

Both `value` and `onChange` are required for a mutable controlled field. `value` without `onChange` is read-only (React will warn). `onChange` without `value` is still uncontrolled.

Initialize text state to `''`, not `null` or `undefined`. Switching from `undefined` to a string later makes React complain that an input changed from uncontrolled to controlled.

---

## Where the state lives

For Watchlist search, `query` belongs in the parent that owns the list (`App` for now). `ShowCard` does not need to know about the input. Module 9 will split `FilterBar` out and pass `query` / `onQueryChange` as props. Same state, new home.

---

## Check yourself

> Controlled means `value={state}` and `onChange` that `set`s that state from `event.target.value`. Empty string as the initial value. React owns the text.

Next: [03 — Derived lists](./03-derived-lists.md).
