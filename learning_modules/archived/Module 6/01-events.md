# 01 — Events

**Goal:** Pass a function into `onClick` / `onChange`, and know where the event object comes from.

Official: [Responding to Events](https://react.dev/learn/responding-to-events).

---

## You already have `onClick`

```jsx
<button className="button" onClick={() => setBackgroundColor(!backgroundColor)}>
```

That arrow is a function. React calls it when the user clicks. Inside, you set state.

**Wrong** (runs during render, not on click):

```jsx
<button onClick={setBackgroundColor(!backgroundColor)}>
```

`!backgroundColor` is evaluated immediately, `setBackgroundColor` runs while `Card` is rendering, and `onClick` receives `undefined` (the setter returns nothing). You avoided this. Keep avoiding it.

When the handler needs **no extra arguments**, you can pass the function itself:

```jsx
<button type="button" onClick={handleToggle}>
```

`handleToggle` is not called in the JSX. React calls it with the event. Use `type="button"` on buttons inside forms later so they do not submit (Module 7).

---

## `onChange` and the event

For inputs, React uses `onChange` (fires on every keystroke, unlike some older DOM quirks you might remember).

```jsx
function handleChange(event) {
  setQuery(event.target.value)
}

<input type="text" value={query} onChange={handleChange} />
```

Or inline: `onChange={(event) => setQuery(event.target.value)}`.

`event.target` is the DOM node. `.value` is the string currently in the field. You will also meet `event.target.checked` for checkboxes in Module 7.

Naming: `event`, `e`, or `evt` — pick one and stay consistent. This repo’s lessons use `event`.

---

## Synthetic events

React wraps the native event. For Module 6 you can treat it like a normal event: `preventDefault` (Module 7), `target.value`. You do not need to memorize the wrapper.

---

## Check yourself

> JSX event props want a function. If you put `()` after the name, you called it during render. Input changes give you `event.target.value`.

Next: [02 — Controlled inputs](./02-controlled-inputs.md).
