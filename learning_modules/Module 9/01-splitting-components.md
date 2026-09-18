# 01 — Splitting components

**Goal:** Split because of responsibility, not because a file felt long.

---

## A useful test (from Module 1)

> If I can name it, and it has its own reason to change, it is probably its own component.

Watchlist pieces:

| Component | Reason to change |
| --- | --- |
| `ShowCard` | One show’s presentation (badge, title). |
| `ShowList` | How the collection is laid out; maps to cards. |
| `FilterBar` | The search input. |
| `AddShowForm` | Fields and submit. |
| `App` / `Watchlist` | Owns the data and wires the children. |

`NewCard` in `first-project` was a list pretending to be a card. Name the list a list.

---

## What not to split

Do not extract a `TitleText` that only renders `<h2>{title}</h2>` unless you reuse it. Too many wrappers make the tree harder to see in DevTools. Prefer a split when you would otherwise pass a thicket of unrelated props into one blob.

---

## Props should stay small

If `ShowCard` needs `title`, `genre`, `watched`, pass those (or the show object). It does not need `query` or `setShows`. If it needs to notify the parent (“user marked watched”), that is a **callback prop** (`onToggleWatched`), not a copy of the whole setter.

---

## Check yourself

> Split on names and reasons to change. Children receive the data they display and functions they may call. They do not reach into siblings.

Next: [02 — Lifting state](./02-lifting-state.md).
