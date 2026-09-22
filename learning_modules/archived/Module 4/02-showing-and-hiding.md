# 02 — Showing and hiding

**Goal:** Conditionally put **elements** on the page, not only swap a CSS class.

Official: [Conditional Rendering](https://react.dev/learn/conditional-rendering).

---

## What you already did (class names)

```jsx
<div className={backgroundColor ? 'alt-card' : 'card'}>
```

That is a ternary that chooses a **string**. Both branches still render a `div`. The DOM node never goes away; its class changes. Fine for themes.

---

## What you have not done (elements)

Sometimes the UI should omit a node entirely: a badge, an error line, a whole card. Two expressions you can put inside `{ }`:

**Logical AND** — “if this is truthy, render the right-hand side.”

```jsx
{show.watched && <span className="badge">Watched</span>}
```

If `watched` is `false`, React renders nothing for that expression (`false` is ignored). If it is `true`, the `span` appears.

**Trap:** `{count && <p>{count} items</p>}` when `count` is `0`. `0` is falsy, so React renders `0` on the page. For numbers, prefer `count > 0 && ...`.

**Ternary** — “this or that.”

```jsx
{show.watched ? <span>Watched</span> : <span>Still in the queue</span>}
```

Use ternary when both branches are real UI. Use `&&` when the else is “render nothing.”

**Early return** (in the component body, not inside JSX) is also valid: `if (!show) return null`. Keep Module 4 to `&&` / ternary in JSX so the idea stays in one place.

---

## Flutter rhyme

`if (watched) Badge(...)` inside `build()`. You do not hide the badge by painting it transparent and leaving it in the tree if you mean “not there.” Same idea.

---

## Check yourself

> Class ternary: same element, different style. `&&`: include an element or skip it. Ternary: pick between two elements. Do not use `&&` with a `0` as the left side unless you want `0` on screen.

Next: [03 — Practice](./03-practice.md).
