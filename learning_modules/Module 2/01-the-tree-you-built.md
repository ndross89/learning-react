# 01 — The tree you built

**Goal:** Draw the component tree of `first-project` the same way lesson 2 of Module 1 drew a generic app.

---

## The files

| File | Role |
| --- | --- |
| [`App.jsx`](../../completed_projects/first-project/App.jsx) | Root of *this* mini-app. Imports CSS, `Card`, and `NewCard`. |
| [`components/Card.jsx`](../../completed_projects/first-project/components/Card.jsx) | One card. Reads props. Owns the color toggle state. |
| [`components/Members.jsx`](../../completed_projects/first-project/components/Members.jsx) | Holds an array and maps it to `Card`s. Exports `NewCard`. |

In the sandbox, `src/main.jsx` still mounts `src/App.jsx`. This snapshot is the version of `App` you moved aside. The tree shape is what matters.

---

## What `App` renders

```jsx
function App() {
  return (
    <>
      <div className="cards">
        <Card label="First" date="Sept 17th" name="James" />
        <Card label="Second" date="October 17th" name="Mary" />
        <Card label="Third" date="November 17th" name="Jesse" />
        <NewCard />
      </div>
    </>
  )
}
```

`App` is the parent of three `Card`s **and** of `NewCard`. `NewCard` is the parent of three more `Card`s, because its `.map()` returns `<Card key={id} ... />`.

```
App
└── div.cards          ← DOM node, not a component
    ├── Card (James)
    ├── Card (Mary)
    ├── Card (Jesse)
    └── NewCard
        ├── Card (Nathan)
        ├── Card (Angel)
        └── Card (Danny)
```

Parent / child still means **who rendered whom**, not CSS grid. James’s `Card` cannot reach into Angel’s `Card` and flip its color. Each `Card` call is a separate instance with its own `useState`. That is why the toggles are independent — Module 5 will name that “state is local.”

---

## Two ways to get a list of cards

You used both:

1. **Repeat the component in JSX** — three literal `<Card />`s in `App`.
2. **Data → `.map()` → components** — `TeamMembers` in `Members.jsx`.

Both are valid JSX. Only (2) scales. If you add a seventh person, (1) means another line in `App`; (2) means another object in the array. Module 4’s Watchlist starts from (2) only: **one array, one map, no leftover hardcoded copies.**

`NewCard` as a name hides that. It is not “a new card.” It is “the list of cards from `TeamMembers`.” A name like `MemberList` would match the tree. You do not have to rename the snapshot; just notice the mismatch. Module 9 is where naming becomes an architecture rule.

---

## Default export vs named export

```jsx
export default Card          // Card.jsx — import Card from './Card.jsx'
export const NewCard = ...   // Members.jsx — import { NewCard } from './Members.jsx'
```

You already used both correctly. Rule of thumb for this repo: **one main component per file → default export.** Named exports are for extra functions or when a file ships several related pieces. Neither is “more React.”

---

## Check yourself

> `App` rendered three `Card`s and a `NewCard`. `NewCard` rendered three more `Card`s from an array. Each `Card` is its own instance. The extra wrapper fragment around a single `div.cards` does not add a node to the React tree.

Next: [02 — JSX habits](./02-jsx-habits.md).
