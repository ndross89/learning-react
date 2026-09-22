# Module 9 — Component Architecture and Lifting State

**Status:** upcoming  
**Time:** ~3–4 days  
**Build:** Split Watchlist into pieces. State lives in a parent. Children get props and callbacks.

You already split `Card` and `NewCard`. This module is when **siblings need the same data** — the color toggle never needed that; search + list + form do.

Source: [docs/react-learning-roadmap.md](../../docs/react-learning-roadmap.md)

Official: [Thinking in React](https://react.dev/learn/thinking-in-react), [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components).

---

## What you will be able to explain

1. A component boundary: you can name it, and it has its own reason to change.
2. Data down, events up.
3. Lift state to the closest common parent; pass a callback so a child can request a change.

---

## How to study this module

| Order | Lesson | Idea |
| --- | --- | --- |
| 1 | [01 — Splitting](./01-splitting-components.md) | What becomes a file. |
| 2 | [02 — Lifting state](./02-lifting-state.md) | Parent owns `shows` and `query`. |
| 3 | [03 — Practice](./03-practice.md) | `ShowList`, `ShowCard`, `AddShowForm`, `FilterBar`. |
