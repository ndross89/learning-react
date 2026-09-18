# 02 — JSX habits

**Goal:** Know the JSX rules you already used, and the three that bit you in `Card.jsx`.

Official: [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx).

---

## Rules you already have

**`className` instead of `class`.** `class` is a reserved word in JavaScript. You wrote `className="container"`, `className="button"`, and a ternary that picks `alt-card` vs `card`. That is the correct attribute.

**`{ }` for expressions.** `My {label} Card`, `Created by {name}`, `Added {date}`. Whatever is inside `{ }` is JavaScript. Strings, numbers, elements, `null`. Not `if` statements — those are statements, not expressions. Ternary and `&&` are expressions, which is why they show up in JSX (Module 4).

**Capital letter = your component.** `<Card />` is the function you imported. `<div>` is a DOM tag. `<card />` would be an unknown HTML element, not your component.

**One parent per return.** You used a fragment `<>...</>` so you could return a wrapper without an extra DOM node. That is a real rule. The habit to tighten: **do not wrap a single element in a fragment.**

```jsx
// You wrote (App and Card both do this shape):
return (
  <>
    <div className="container">{/* ... */}</div>
  </>
)

// The fragment does nothing here. Return the div.
return (
  <div className="container">{/* ... */}</div>
)
```

Fragments earn their keep when you need **two or more siblings** and you do not want a wrapper `div` (for example a list item plus a sibling, or `<dt>` + `<dd>`).

**Self-closing tags** for elements with no children: `<Card ... />`, `<br />`. You wrote `<input ...></input>`. Valid, but the usual JSX form is `<input ... />`.

---

## `type` vs `typeof`

```jsx
<input typeof="text" placeholder="enter name"></input>
```

`typeof` is a JavaScript **operator** (`typeof name === 'string'`). It is not an HTML attribute. The browser ignores unknown attributes like this; the input still appears, which is why it did not crash.

The attribute you wanted:

```jsx
<input type="text" placeholder="enter name" />
```

`type` tells the browser what kind of control to draw (`text`, `checkbox`, `email`, `submit`). You will use it constantly in Modules 6–7.

---

## An input with no React data

That field has no `value` and no `onChange`. React rendered a DOM input and then stepped away. Whatever the user types lives only in the DOM, the same way vanilla JS would. That is an **uncontrolled** input.

You do not need to fix it in the snapshot. Module 6 is the lesson: React owns the string in `useState`, the input displays that string, `onChange` writes back with `event.target.value`.

Until then, a dead input is a reminder, not a feature. Watchlist will not include an input until Module 6.

---

## Check yourself

> JSX looks like HTML but `className`, `{ }`, and capital tags are JavaScript rules. `typeof` is not `type`. A fragment around a single child is noise. An `<input>` without `value`/`onChange` is not connected to React state.

Next: [03 — Practice checkpoint](./03-practice.md).
