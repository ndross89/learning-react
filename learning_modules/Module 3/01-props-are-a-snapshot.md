# 01 — Props are a snapshot from the parent

**Goal:** Say what props are without using the word “attributes” as a cop-out.

Official: [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component).

---

## You already wrote this

Parent:

```jsx
<Card label="First" date="Sept 17th" name="James" />
```

Child:

```jsx
const Card = ({ label, date, name }) => {
```

Those are the same object. JSX attributes are collected into one props object. Destructuring is how you pick the keys you care about. This is also valid:

```jsx
function Card(props) {
  return <h2>My {props.label} Card</h2>
}
```

Destructuring at the parameter is the usual style in this repo.

Flutter rhyme: constructor arguments on a widget. The parent decides the values. The child reads them in `build()`.

---

## Read-only

`Card` may **use** `name`. It may not do `name = 'someone else'` and expect `App` to change. Props are a snapshot for this render. To change what a child shows, the **parent** passes a different value on the next render.

Your color toggle does not violate that. `backgroundColor` is **state**, owned by `Card`, not a prop. `label` / `date` / `name` stay whatever the parent sent.

If you ever feel the urge to “fix” a prop by assigning to it, the data lives in the wrong component. That sentence is the seed of Module 9 (lifting state). You do not need the full pattern yet.

---

## Same component, different values

Three hardcoded cards plus three mapped cards are six uses of one function. That is the point of props: **one implementation, many instances.** Watchlist will do the same with `ShowCard` and a `title` / `genre` / `watched` shape.

---

## Check yourself

> Props are the data a parent passes to a child for this render. The child reads them. It does not mutate them. State is different: the component that called `useState` owns that data.

Optional stretch: in `Card`, could you write `label = label + '!'` to update the heading for everyone? (No. Even if the local binding changed, you would not be updating the parent, and you should not try.)

Next: [Module 4](../Module%204/README.md).
