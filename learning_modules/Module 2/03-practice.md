# 03 — Practice checkpoint

**No new build.** Close the lessons. Answer from memory, then glance at `first-project` only to check yourself.

---

## 1. The tree

Without opening the files:

1. Who is the parent of the James card?
2. Who is the parent of the Nathan card?
3. Why does clicking James’s button not recolor Mary?

---

## 2. JSX

- Why `className` and not `class`?
- When is a fragment useful? When is it pointless?
- What is wrong with `typeof="text"` on an input?

---

## 3. Ready / not ready

You are ready for [Module 3](../Module%203/README.md) when those answers are easy.

You are **not** asked to rebuild a static UserCard. If you want a stretch, jot (do not commit a rewrite of the snapshot) how you would render *all six* people from one array. That thought is Module 4.

---

## Notes (after you write)

- James: **`App`**. Nathan: **`NewCard`** (which `App` rendered).
- Separate `Card` instances, each with its own `useState`. No shared color state.
- `class` is reserved in JS; React uses `className`.
- Fragment: multiple siblings, no extra DOM node. Pointless around one child.
- `typeof` is a JS operator. The attribute is `type`.
