# Client Request to Blueprint Template

Use this template to turn a client request into a build brief. The goal is to move from the client's words to the features, components, state, rules, code targets, build order, and checkpoints needed to implement the request.

For a filled reference, see `docs/client-request-brief-example.md`.

Work feature-first, then task-by-task:

- **Feature** means a client-facing capability, such as "submit a resource" or "filter the list."
- **Task** means an implementation step, such as "create the form component," "add state," or "write the submit handler."

Start by grouping the request into features. Then break each feature into components, data, behaviors, rules, and build tasks.

## How To Use This Template

1. Paste the client request into the Client Request section.
2. Tag the request sentence by sentence.
3. Write the outcome.
4. Create one feature card per client-facing capability.
5. Map the features to components, data, behaviors, and rules.
6. Turn the map into ordered build steps.
7. Add checkpoints and gaps to ask before coding beyond the request.

## Client Request

Paste the original request here. Keep the client's wording intact so exact labels, messages, numbers, and rules are easy to find later.

```markdown
Client:
Project:
Date:
Request:

[Paste the full client request here.]
```

## 1. Request Triage

Read the request once without writing. Then number each sentence and tag it.

| Tag | Meaning | Look for |
| --- | --- | --- |
| O | Outcome | "I want," "so that," the main problem, the user goal |
| F | Feature | A capability the finished app must provide |
| C | Component or region | A visible area, button, form, list, card, message, or control |
| D | Data or state | Values, lists, counts, selected items, filters, totals, loading/error values |
| B | Behavior | A user action or automatic event: click, type, submit, page load, fetch, timer |
| R | Rule | Limits, validation, empty states, permissions, formatting, disabled states |
| G | Gap | Anything unclear, missing, or requiring a client decision |

| # | Client sentence | Tags | Notes |
| --- | --- | --- | --- |
| 1 |  |  |  |

Copy exact wording for labels, messages, numbers, and option names. If a sentence has no tag, decide whether it is background context or a gap.

## 2. Outcome

Write one sentence that explains what the user can do after this ships.

```markdown
After this ships, [user] can [main action], [main action], and [main action].
```

Keep it concrete. Avoid broad words like "manage," "improve," or "streamline" unless you also name the actual actions.

## 3. Feature Cards

Create one card for each client-facing capability. If a feature is too large to explain in one card, split it.

```markdown
### Feature: [name]

Client value:
[What this lets the user do.]

Included:
- [Specific behavior or UI requirement]
- [Specific behavior or UI requirement]

Not included:
- [Anything intentionally out of scope]

Depends on:
- [Data, component, API, route, or earlier feature]

Done when:
- [Visible result or acceptance check]
```

Use features to organize scope. Use tasks later to organize the build order.

## 4. Component Map

A component is a visible region with a clear job. A component can display data, collect input, trigger behavior, or combine smaller components.

| Component or region | Job | Interactive? | Props in | State owned here? | Likely file |
| --- | --- | --- | --- | --- | --- |
|  |  | yes/no |  |  |  |

Checks:

- Every button, field, list, card, message, and route has a home.
- Every trigger in the behavior map starts from a named component.
- Shared data should live in the nearest shared parent.
- Display-only values should usually be props or derived values, not separate state.

## 5. Data And State

List what the app needs to know. Keep stored state small. If a value can be calculated from other values, mark it as derived.

| Type | Value | Start value | Changes when | Used by |
| --- | --- | --- | --- | --- |
| Fixed |  |  | never |  |
| Stored state |  |  |  |  |
| Derived |  |  | recalculated from other values |  |

Use these start values when planning the first render. Common start values:

- Empty list: `[]`
- Empty text input: `''`
- No selected item: `null` or `''`, depending on what the UI needs
- Loading before fetch: `true`
- Error before failure: `null`
- Count or total: `0`

## 6. Behavior Map

A behavior starts with a trigger. Each trigger usually becomes an event handler, effect, route loader, or submit function.

| Trigger | Source component | Reads | Stored state change | Calls helper/API? | Visible result |
| --- | --- | --- | --- | --- | --- |
| When the page opens |  |  |  |  |  |
| When [user action] |  |  |  |  |  |

Rules for this section:

- One trigger per row.
- If nothing starts it, it is probably a rule, not a behavior.
- Write stored state changes only. Derived values update from state.
- Include automatic triggers such as page load, fetch completion, timer ticks, and route changes.

## 7. Rules, Validation, And Edge Cases

Rules are conditions the app checks after something happens. They become guards, conditional rendering, helper functions, disabled states, or validation messages.

| Rule | Type | If | Then | Else or reverse | Message or UI state |
| --- | --- | --- | --- | --- | --- |
|  | limit / blocked action / validation / empty state / format / visual / permission / error |  |  |  |  |

Common rule types:

- **Limit:** minimum, maximum, threshold, or capacity.
- **Blocked action:** a button is disabled or a click does nothing.
- **Validation:** blank, duplicate, spaces-only, wrong type, wrong format.
- **Empty state:** no results, no saved items, no submitted data.
- **Format:** date, currency, count, plural text, two decimals.
- **Visual state:** selected, disabled, hidden, loading, success, error.
- **Permission:** user can see or change only allowed data.

Every quoted message should appear here and in the component map.

## 8. Code Target Map

Use this section to connect the brief to the files and lines of code you expect to touch.

| Feature | Component/file | State | Props | Handler/effect/helper | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Questions to answer before coding:

- Which file owns the state?
- Which components receive props?
- Which functions need to be created or changed?
- Which helpers should stay pure and testable?
- Which existing files can be reused instead of adding new ones?
- Which route, API call, Supabase query, or local storage call is involved?

## 9. Build Blueprint

Turn the feature cards into ordered tasks. A task should be small enough to test before moving on.

Default order:

1. Create or update the page structure and component files.
2. Add fixed data, constants, and placeholder content.
3. Add stored state in the owner component.
4. Add pure helpers and derived values.
5. Render the first visible version from state and props.
6. Add one handler or effect.
7. Add rules, guards, validation, and empty states for that handler.
8. Repeat for the next handler or feature.
9. Add styling states.
10. Run final checks.

```markdown
### Task [number]: [goal]

Feature:
[Feature this task supports]

Files:
- [file path]

Write or change:
- [component, state value, prop, helper, handler, effect, or style]

Depends on:
- [Earlier task or existing code]

Checkpoint:
- Do [action], expect [visible result or console/test result].
```

## 10. Acceptance Criteria And Tests

Write checks in user language first, then add technical checks.

```markdown
### User-facing checks
- [ ] [User can do the main action]
- [ ] [Correct empty/loading/error state appears]
- [ ] [Validation behaves correctly]
- [ ] [The screen updates after the action]

### Technical checks
- [ ] App renders with no console errors
- [ ] State lives in the right owner component
- [ ] Derived values are not stored twice
- [ ] Handlers update only the state they own
- [ ] Existing tests, lint, and build pass
```

For each feature, include at least:

- One normal path check.
- One empty or starting state check.
- One edge case check.
- One reverse check when a rule can stop being true.

## 11. Gaps To Ask The Client

Ask only questions that change what you would build.

| Gap | Why it matters | Proposed default |
| --- | --- | --- |
|  |  |  |

Common gaps:

- Does the data survive refresh?
- What should show before any data exists?
- What should happen when a user submits blank input?
- Should a blocked action be disabled, hidden, or ignored?
- When does a success or error message clear?
- Which values reset, and which stay?
- Who can see or change this data?

## 12. Final Brief Template

Copy this section for each new client request.

```markdown
# Build Brief: [project or feature name]

## Client Request

Client:
Project:
Date:
Request:

[Paste request here.]

## Outcome

After this ships, [user] can [action], [action], and [action].

## Request Triage

| # | Client sentence | Tags | Notes |
| --- | --- | --- | --- |
| 1 |  |  |  |

## Features

### Feature: [name]

Client value:

Included:
- 

Not included:
- 

Depends on:
- 

Done when:
- 

## Component Map

| Component or region | Job | Interactive? | Props in | State owned here? | Likely file |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Data And State

| Type | Value | Start value | Changes when | Used by |
| --- | --- | --- | --- | --- |
| Fixed |  |  | never |  |
| Stored state |  |  |  |  |
| Derived |  |  | recalculated from other values |  |

## Behavior Map

| Trigger | Source component | Reads | Stored state change | Calls helper/API? | Visible result |
| --- | --- | --- | --- | --- | --- |
| When the page opens |  |  |  |  |  |

## Rules, Validation, And Edge Cases

| Rule | Type | If | Then | Else or reverse | Message or UI state |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Code Target Map

| Feature | Component/file | State | Props | Handler/effect/helper | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Build Blueprint

### Task 1: [goal]

Feature:

Files:
- 

Write or change:
- 

Depends on:
- 

Checkpoint:
- 

## Acceptance Criteria And Tests

### User-facing checks
- [ ] 

### Technical checks
- [ ] App renders with no console errors
- [ ] Existing lint/build checks pass

## Gaps To Ask The Client

| Gap | Why it matters | Proposed default |
| --- | --- | --- |
|  |  |  |
```

## Quick Sorting Guide

Use these questions when something could fit in more than one place.

| Question | If yes | If no |
| --- | --- | --- |
| Can the client recognize this as a capability? | Feature | Task, rule, or detail |
| Is it visible on the screen? | Component or region | Data, rule, or helper |
| Does a user action or automatic event start it? | Behavior | Rule |
| Does the app need to remember it between triggers? | Stored state | Fixed or derived value |
| Can it be calculated from other values? | Derived value | Stored state or fixed value |
| Does it decide what happens under a condition? | Rule | Behavior or display detail |
| Does it name a file, function, or implementation step? | Task | Feature or acceptance criterion |

## Transfer Notes

Add one reusable lesson after each completed client request.

- When several screen values depend on the same stored values, keep one source of truth and redraw the UI from it.
