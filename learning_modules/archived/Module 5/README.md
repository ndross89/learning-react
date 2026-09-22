# Module 5 — useState

**Status:** recap  
**Time:** ~half day (optional extra toggle: +a few hours)  
**Build:** none required. Skip the old counter and summary/detail card.

You already have the loop in `Card.jsx`: click → `setBackgroundColor` → `Card` runs again → ternary picks a different class → React updates the DOM. This module names that loop, then tightens naming and updaters.

Source: [docs/react-learning-roadmap.md](../../docs/react-learning-roadmap.md)

Official: [State: A Component's Memory](https://react.dev/learn/state-a-components-memory), [`useState`](https://react.dev/reference/react/useState).

---

## What you will be able to explain

1. State is data that, when you set it, queues a re-render of that component.
2. Each component instance has its own state (James vs Mary).
3. Name booleans like booleans; use `setX(prev => !prev)` when the next value depends on the previous one.

Lessons: [01 — The render loop you already wrote](./01-the-render-loop.md) → [02 — Naming and updaters](./02-naming-and-updaters.md).

Next new skill: [Module 6](../Module%206/README.md).
