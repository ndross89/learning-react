# 01 — Controlled forms

**Goal:** Treat a form as several controlled inputs plus one submit handler.

Official: [`<form>`](https://react.dev/reference/react-dom/components/form), [`<input>`](https://react.dev/reference/react-dom/components/input).

---

## Why a `<form>`

A button with `onClick` can add an item. A `<form onSubmit={...}>` also handles Enter in a text field, and it is the accessible pattern. Always:

```jsx
function handleSubmit(event) {
  event.preventDefault()
  // read state, add the show, reset fields
}
```

Without `preventDefault`, the browser posts the page and reloads — your state dies.

Submit buttons: `<button type="submit">` inside the form. Other buttons inside the form: `<button type="button">` so they do not submit.

---

## Several fields

**Option A — one `useState` per field** (clear while learning):

```jsx
const [title, setTitle] = useState('')
const [genre, setGenre] = useState('')
const [watched, setWatched] = useState(false)
```

Text: `value` + `onChange` → `event.target.value`.  
Checkbox: `checked={watched}` + `onChange` → `event.target.checked` (boolean, not `.value`).

**Option B — one object:**

```jsx
const [draft, setDraft] = useState({ title: '', genre: '', watched: false })

function handleTitleChange(event) {
  setDraft((prev) => ({ ...prev, title: event.target.value }))
}
```

You must spread `prev`. `setDraft({ title: event.target.value })` would wipe `genre` and `watched`. Try A first. Switch to B if the field list grows.

---

## Labels

Every input needs a label. Either wrap the input or use `htmlFor` matching `id`:

```jsx
<label htmlFor="show-title">Title</label>
<input id="show-title" type="text" value={title} onChange={...} />
```

`htmlFor` is JSX for the `for` attribute (`for` is reserved in JS), same story as `className`.

---

## Check yourself

> `onSubmit` + `preventDefault`. Text uses `value` / `.value`. Checkbox uses `checked` / `.checked`. Reset means `set` the fields back to their initial values after a successful add.

Next: [02 — Updating lists](./02-updating-lists.md).
