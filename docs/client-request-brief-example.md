# Client Request Brief Example

Use this as a reference check for `Client Request to Blueprint Template`. It shows one client request filled through the main brief sections.

## Client Request

Client: Maple Street Community Center  
Project: Volunteer Shift Board  
Date: Oct 12, 2026

Request:

```markdown
We need a simple volunteer shift board for our Saturday food pantry.
Visitors should see all available shifts when the page opens.
They should be able to filter shifts by role: Intake, Packing, Delivery, or Cleanup.
Each shift card should show the role, time, number of open spots, and a "Sign Up" button.
If a shift has no open spots left, the button should say "Full" and be disabled.
When someone signs up, the open spot count should go down by one and a message should say "Thanks for signing up!"
If all visible shifts are full, show "No open shifts match this filter."
We do not need accounts or a database yet.
```

## Outcome

After this ships, pantry visitors can view available volunteer shifts, filter them by role, and sign up for an open shift.

## Request Triage

| # | Client sentence | Tags | Notes |
| --- | --- | --- | --- |
| 1 | We need a simple volunteer shift board for our Saturday food pantry. | O, F | Names the product and context. |
| 2 | Visitors should see all available shifts when the page opens. | F, B, D | Page-load behavior and starting display. |
| 3 | They should be able to filter shifts by role: Intake, Packing, Delivery, or Cleanup. | F, C, D, B | Filter feature and fixed role options. |
| 4 | Each shift card should show the role, time, number of open spots, and a "Sign Up" button. | C, D | Shift card regions and displayed data. |
| 5 | If a shift has no open spots left, the button should say "Full" and be disabled. | R, C | Full-state rule and button state. |
| 6 | When someone signs up, the open spot count should go down by one and a message should say "Thanks for signing up!" | B, D, R, C | Sign-up behavior and success message. |
| 7 | If all visible shifts are full, show "No open shifts match this filter." | R, C | Empty/blocked visible-list rule. |
| 8 | We do not need accounts or a database yet. | R, G | Scope boundary: local data only. |

## Features

### Feature: View Shifts

Client value: Visitors can immediately see what help is needed.

Included:
- Show all shifts when the page opens.
- Show role, time, open spots, and sign-up state for each shift.

Not included:
- Accounts, persistence, or database saves.

Depends on:
- Fixed shift data.
- `ShiftList` and `ShiftCard` components.

Done when:
- Reloading the page shows the full shift list.

### Feature: Filter By Role

Client value: Visitors can quickly find the type of volunteer work they want.

Included:
- Role filter with All, Intake, Packing, Delivery, and Cleanup.
- Visible shifts update when the filter changes.

Not included:
- Search by text or multiple filters.

Depends on:
- Selected role state.
- Derived visible shifts.

Done when:
- Selecting a role shows only matching shifts.

### Feature: Sign Up For A Shift

Client value: Visitors can claim an open volunteer spot.

Included:
- Sign Up button decreases open spots by one.
- Success message says "Thanks for signing up!"
- Full shifts show a disabled "Full" button.

Not included:
- User identity, duplicate prevention by person, email confirmation, or backend save.

Depends on:
- Shift state stored in the parent.
- Handler that updates one shift by id.

Done when:
- Clicking Sign Up updates the card count and message without breaking other cards.

## Component Map

| Component or region | Job | Interactive? | Props in | State owned here? | Likely file |
| --- | --- | --- | --- | --- | --- |
| App | Own shift data, selected role, and success message | no | none | `shifts`, `selectedRole`, `message` | `src/App.jsx` |
| RoleFilter | Lets visitors choose which role to view | yes | `selectedRole`, `roles`, `onRoleChange` | no | `src/components/RoleFilter.jsx` |
| ShiftList | Renders visible shifts or empty message | no | `visibleShifts`, `onSignUp` | no | `src/components/ShiftList.jsx` |
| ShiftCard | Shows one shift and sign-up button | yes | `shift`, `onSignUp` | no | `src/components/ShiftCard.jsx` |
| Success message | Shows the latest sign-up confirmation | display | `message` | no | inside `src/App.jsx` |
| Empty message | Shows when no visible shifts have open spots | display | derived from visible shifts | no | inside `ShiftList` |

## Data And State

| Type | Value | Start value | Changes when | Used by |
| --- | --- | --- | --- | --- |
| Fixed | Role options | `All`, `Intake`, `Packing`, `Delivery`, `Cleanup` | never | `RoleFilter` |
| Stored state | Shifts | initial shift array | visitor signs up | `App`, `ShiftList`, `ShiftCard` |
| Stored state | Selected role | `All` | visitor changes filter | `App`, `RoleFilter` |
| Stored state | Message | `''` | visitor signs up or changes filter | `App` |
| Derived | Visible shifts | all shifts with open spots | recalculated from shifts and selected role | `ShiftList` |
| Derived | Shift is full | `openSpots === 0` | recalculated per shift | `ShiftCard` |
| Derived | No open shifts match filter | `false` on load if any shift is open | recalculated from visible shifts | `ShiftList` |

## Behavior Map

| Trigger | Source component | Reads | Stored state change | Calls helper/API? | Visible result |
| --- | --- | --- | --- | --- | --- |
| When the page opens | App | initial shift data | `shifts` starts with fixed list, `selectedRole` starts as `All`, `message` starts empty | no | all open shifts render |
| When visitor changes role filter | RoleFilter | selected option | `selectedRole` becomes selected option, `message` becomes empty | `getVisibleShifts` derived filter | list updates |
| When visitor clicks Sign Up | ShiftCard | shift id and current shifts | matching shift's `openSpots` decreases by 1, `message` becomes `Thanks for signing up!` | `decreaseOpenSpot` helper | card count updates and message appears |

## Rules, Validation, And Edge Cases

| Rule | Type | If | Then | Else or reverse | Message or UI state |
| --- | --- | --- | --- | --- | --- |
| Full shift button | blocked action / visual | `openSpots` is `0` | button text is `Full` and disabled | button text is `Sign Up` and enabled | disabled button |
| No negative spots | limit | sign-up would make `openSpots` below `0` | keep it at `0` | decrease by one while above `0` | no count below zero |
| Success message | visual | visitor signs up | show `Thanks for signing up!` | clear when filter changes | success text |
| No open shifts match filter | empty state | visible open shift list is empty | show `No open shifts match this filter.` | render matching shift cards | empty message |
| Local-only scope | scope rule | page refreshes | reset to initial shift data | none | no database or account behavior |

## Code Target Map

| Feature | Component/file | State | Props | Handler/effect/helper | Notes |
| --- | --- | --- | --- | --- | --- |
| View Shifts | `src/App.jsx`, `src/components/ShiftList.jsx`, `src/components/ShiftCard.jsx` | `shifts` | `visibleShifts`, `shift` | `getVisibleShifts` | Start with fixed local data. |
| Filter By Role | `src/components/RoleFilter.jsx`, `src/App.jsx` | `selectedRole` | `roles`, `selectedRole`, `onRoleChange` | `handleRoleChange` | Use a controlled `<select>`. |
| Sign Up For A Shift | `src/components/ShiftCard.jsx`, `src/App.jsx` | `shifts`, `message` | `onSignUp` | `handleSignUp`, `decreaseOpenSpot` | Update one shift by id. |

## Build Blueprint

### Task 1: Create the component shell

Feature: View Shifts

Files:
- `src/App.jsx`
- `src/components/RoleFilter.jsx`
- `src/components/ShiftList.jsx`
- `src/components/ShiftCard.jsx`

Write or change:
- Add placeholder components and render them from `App`.

Depends on:
- Existing Vite React app.

Checkpoint:
- Run the app and confirm all placeholders appear with no console errors.

### Task 2: Add fixed data and first render

Feature: View Shifts

Files:
- `src/App.jsx`
- `src/components/ShiftList.jsx`
- `src/components/ShiftCard.jsx`

Write or change:
- Add initial shift data.
- Store shifts in `App`.
- Pass shifts into `ShiftList`.
- Render one `ShiftCard` per shift.

Depends on:
- Task 1.

Checkpoint:
- Reload the page and confirm all shift cards show role, time, open spots, and a button.

### Task 3: Add role filtering

Feature: Filter By Role

Files:
- `src/App.jsx`
- `src/components/RoleFilter.jsx`

Write or change:
- Add `selectedRole` state.
- Add role options.
- Add `handleRoleChange`.
- Derive `visibleShifts` from `shifts` and `selectedRole`.

Depends on:
- Task 2.

Checkpoint:
- Select `Packing` and confirm only Packing shifts show. Select `All` and confirm all open shifts return.

### Task 4: Add sign-up behavior

Feature: Sign Up For A Shift

Files:
- `src/App.jsx`
- `src/components/ShiftCard.jsx`

Write or change:
- Add `handleSignUp`.
- Decrease only the clicked shift's open spots.
- Add message state and show `Thanks for signing up!`.

Depends on:
- Task 2.

Checkpoint:
- Click Sign Up on one card and confirm only that card's count decreases by one.

### Task 5: Add full and empty states

Feature: Sign Up For A Shift

Files:
- `src/components/ShiftCard.jsx`
- `src/components/ShiftList.jsx`

Write or change:
- Disable full shift buttons.
- Change full button text to `Full`.
- Show `No open shifts match this filter.` when the current filter has no open shifts.

Depends on:
- Tasks 3 and 4.

Checkpoint:
- Sign up until a shift reaches zero. Confirm the button is disabled and never goes negative.

## Acceptance Criteria And Tests

### User-facing checks

- [ ] All shifts with open spots show when the page opens.
- [ ] Role filter shows All, Intake, Packing, Delivery, and Cleanup.
- [ ] Selecting a role shows only open shifts for that role.
- [ ] Sign Up decreases the clicked shift's open spot count by one.
- [ ] A full shift shows a disabled `Full` button.
- [ ] Signing up shows `Thanks for signing up!`.
- [ ] A filter with no open shifts shows `No open shifts match this filter.`

### Technical checks

- [ ] App renders with no console errors.
- [ ] `shifts`, `selectedRole`, and `message` state live in `App`.
- [ ] `visibleShifts` and `isFull` are derived, not stored separately.
- [ ] `ShiftCard` receives shift data by props.
- [ ] The sign-up handler updates one shift by id.
- [ ] Existing lint/build checks pass.

## Gaps To Ask The Client

| Gap | Why it matters | Proposed default |
| --- | --- | --- |
| Should shifts stay claimed after refresh? | Determines whether local state is enough or persistence is needed. | No, reset on refresh for this version. |
| Should the success message clear automatically? | Determines timeout behavior or message rules. | Clear when the filter changes or another sign-up happens. |
| Can one visitor sign up for multiple shifts? | Requires account or local duplicate prevention if restricted. | Yes, because there are no accounts yet. |

## Reference Check

This example follows the template in this order:

1. Client request keeps the original wording.
2. Triage tags each sentence before planning.
3. Outcome defines the user-facing goal.
4. Features group client value.
5. Component map names visible regions and state ownership.
6. Data and state separates fixed, stored, and derived values.
7. Behavior map turns triggers into handlers.
8. Rules capture limits, disabled states, messages, and empty states.
9. Code targets connect the brief to files and functions.
10. Build blueprint turns features into ordered tasks with checkpoints.
