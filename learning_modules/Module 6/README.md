# Module 6 — Events and Controlled Inputs

**Status:** next (first full new skill)  
**Time:** ~2 days  
**Build:** Watchlist search in `src/`. Finish Module 4’s static list first.

The unused `<input>` on your first `Card` was the right instinct with none of the wiring. This module is that wiring.

Source: [docs/react-learning-roadmap.md](../../docs/react-learning-roadmap.md)

---

## What you will be able to explain

1. React event props take a **function**. `onClick={fn}` vs `onClick={fn()}` is the classic bug.
2. A controlled input: `value` from state, `onChange` writes `event.target.value` back.
3. The visible list is **derived**: `shows.filter(...)` from `query`. No second state copy. No `useEffect`.

---

## How to study this module

| Order | Lesson | Idea |
| --- | --- | --- |
| 1 | [01 — Events](./01-events.md) | `onClick` / `onChange`, pass vs call. |
| 2 | [02 — Controlled inputs](./02-controlled-inputs.md) | React owns the string. |
| 3 | [03 — Derived lists](./03-derived-lists.md) | Filter in render. |
| 4 | [04 — Practice](./04-practice.md) | Search the Watchlist. |
