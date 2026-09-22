# Module 4 — Lists, Keys, and Showing/Hiding UI

**Status:** gap + first Watchlist slice  
**Time:** ~1–2 days  
**Build:** static Watchlist in `src/`.

You already mapped `TeamMembers` and passed `key={id}`. Two ideas are still open:

1. **One array is the source of truth** — no leftover hardcoded copies next to the map.
2. **Conditional elements** — `&&` and ternary to put JSX on the page or not, not only to swap a class name.

Source: [docs/react-learning-roadmap.md](../../docs/react-learning-roadmap.md)

---

## What you will be able to explain

1. Why the list is `.map()` over data, not repeated JSX in the parent.
2. What `key` is for (identity across renders), and why `id` beats the array index when the list can change.
3. When to use `&&` vs ternary vs a class-name ternary.

---

## How to study this module

| Order | Lesson | Idea |
| --- | --- | --- |
| 1 | [01 — One array, one list](./01-one-array-one-list.md) | Data in, components out. Keys. |
| 2 | [02 — Showing and hiding](./02-showing-and-hiding.md) | `&&` / ternary for *elements*. |
| 3 | [03 — Practice: Watchlist static](./03-practice.md) | First build of the new through-line. |

Work in `src/`. Leave `completed_projects/first-project` alone.
