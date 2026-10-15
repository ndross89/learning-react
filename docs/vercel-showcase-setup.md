# Put the demo gallery on Vercel

This publishes the gallery in `showcase/projects.json`. Five demos are static. Only **EQ Resource Hub** needs Supabase.

The site you are building locally with `npm run dev` stays in `src/` and is not what Vercel publishes.

## 1. Put the latest code on GitHub

Vercel builds from GitHub, not from the files open in the editor.

1. Commit the gallery work if you have not already.
2. Push the `main` branch to [github.com/ndross89/learning-react](https://github.com/ndross89/learning-react).

Confirm GitHub shows `showcase/projects.json` and `vercel.json` before you continue.

## 2. Create the Vercel project

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account that owns the repo. The Hobby plan is enough.
2. Choose **Add New → Project**.
3. Import `ndross89/learning-react`.
4. Leave the production branch as `main`.

`vercel.json` already tells Vercel how to build. After import, the project settings should match this:

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Build Command | `npm run build:showcase` |
| Output Directory | `dist` |
| Install Command | `npm install` |

If the import screen shows Vite and a build command of `vite build` or `npm run build`, change it to the table above. `npm run build` publishes the workbench in `src/`, not the gallery.

You can deploy once here. The gallery and the other demos will work. The resource hub will show “Supabase is not configured” until the next two sections are done and you redeploy.

## 3. What you need from Supabase

Only the resource hub reads these. Alder & Oaks, Harbor Tutoring, EQ Check-In Board, Reflection Log, and Team Insight Feed do not use Supabase. Team Insight Feed loads sample posts from JSONPlaceholder.

If you already created the `eq-resource-hub` project while doing that exercise, reuse it. You do not need a second project.

### Copy two values

1. Open the project in the [Supabase dashboard](https://supabase.com/dashboard).
2. Click **Connect**.
3. Choose a client-side app.
4. Copy:
   - **Project URL**, shaped like `https://abcdefgh.supabase.co`
   - **Publishable key**, which starts with `sb_publishable_`

If Connect does not show a publishable key, open **Project Settings → API Keys** and create one.

Leave these where they are. Do not paste them into the React code or commit them:

- The secret key (`sb_secret_...`)
- Any legacy `service_role` key
- The database password

The publishable key is meant for the browser. Anyone who can open the hub can see it in the built page. The policies below are what limit what that key can do.

### Table the hub expects

The hub reads and inserts `public.resources`. The list page sorts by `created_at`. The form sends `title`, `category`, `summary`, and `body`. The database fills in `id` and `created_at`.

In **Table Editor → New table**:

1. Name the table `resources`.
2. Leave **Enable Row Level Security** on.
3. Keep the default `id` and `created_at` columns.
4. Add four required `text` columns: `title`, `category`, `summary`, `body`.
5. Save.

If that table already exists from the exercise, skip this step.

### Let the site read and add rows

This demo has no accounts. The publishable key acts as the `anon` role. With Row Level Security on and no policy, the list page shows “error getting data” or an empty library, and the form cannot insert.

In **SQL Editor → New query**, run:

```sql
grant select, insert on public.resources to anon, authenticated;

create policy "anon can read resources"
on public.resources
for select
to anon
using (true);

create policy "anon can insert resources"
on public.resources
for insert
to anon
with check (true);
```

There is no update or delete policy. The hub never updates or deletes a row.

If the query says a policy already exists, the first run worked. Leave it.

Then confirm **Table Editor → resources** shows Row Level Security enabled and both policies.

### Optional starter rows

Run this in a new SQL Editor query if the table is empty and you want the five original guides:

```sql
insert into public.resources (title, category, summary, body)
values
  (
    'Understanding Self-Awareness',
    'Self-Awareness',
    'An introduction to recognizing your own emotional patterns and how they shape your responses.',
    'Self-awareness is the foundation of emotional intelligence. It involves noticing your emotional state in real time, understanding what triggers certain reactions, and recognizing how your behavior affects others. Without self-awareness, other EQ skills have no anchor.'
  ),
  (
    'Regulating Emotional Responses',
    'Self-Regulation',
    'Practical strategies for pausing between an emotional trigger and your response.',
    'Emotional regulation is not about suppressing feelings. It is about creating space between a trigger and a reaction. Techniques like cognitive reappraisal, grounding, and pacing help individuals respond intentionally rather than reactively.'
  ),
  (
    'Building Empathy in the Workplace',
    'Empathy',
    'How to develop genuine empathy in professional settings where it is often deprioritized.',
    'Empathy in the workplace means understanding a colleague''s experience from their perspective, not just intellectually but emotionally. It requires active listening, suspending judgment, and communicating in ways that validate without requiring agreement.'
  ),
  (
    'Improving Social Skills',
    'Social Skills',
    'The social skill set that supports healthier collaboration and communication at work.',
    'Social skills in the EQ framework include clear communication, conflict resolution, influence, and collaboration. These are learnable skills, not innate traits, and improving them consistently improves team performance and relationship quality.'
  ),
  (
    'Psychological Safety at Work',
    'Team Health',
    'What psychological safety is, why it matters, and how leaders can build it intentionally.',
    'Psychological safety is the shared belief that the team environment is safe for interpersonal risk-taking: speaking up, asking questions, admitting mistakes. Research by Amy Edmondson at Harvard shows it is the strongest predictor of high-performing teams.'
  );
```

The doubled quote in `colleague''s` is one apostrophe inside a SQL string. Leave it doubled.

Open **Table Editor → resources** and confirm the rows are there.

If a later request says the table cannot be found, open **Integrations → Data API**, turn the API on, and expose `public.resources`.

## 4. Add the two values in Vercel

Vite copies `VITE_` variables into the JavaScript **when it builds**. Saving them in Vercel after a deploy does not change the site that is already live. Add them, then redeploy.

1. Open the Vercel project.
2. Go to **Settings → Environment Variables**.
3. Add both names exactly. Values come from the Supabase Connect screen.

| Name | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key |

4. Enable them for **Production**. Enable **Preview** as well if you want pull-request deploys to load the hub.
5. Save.
6. Open **Deployments**, open the latest deployment, and choose **Redeploy**. Leave “use existing build cache” off if that option appears, so the new variables are included.

Do not put these values in `vercel.json` or in a committed `.env` file. Local copies belong in `.env.local`, which git already ignores. The names are listed in `.env.example`.

## 5. Check the live site

Open the URL Vercel shows, shaped like `https://learning-react.vercel.app`.

- `/` lists the six demos.
- Previous and Next on a demo move through that list.
- Refresh `https://<your-domain>/alder-oaks/menu`. The menu should stay on screen.
- Open `/eq-resource-hub/resources`.

On the resources page:

| What you see | What to do |
| --- | --- |
| The resource cards | The hub is connected. |
| “Supabase is not configured” | A variable name is wrong, a value is empty, or this deployment was built before the variables were saved. Redeploy after saving them. |
| “error getting data” | The keys reached the app, and the query failed. Check the table name, that Row Level Security policies from section 3 ran, and that you pasted the publishable key rather than the secret key. |
| An empty library and no error | The select policy is missing, or the table has no rows. Re-run the policies, then the insert in section 3. |

Submit a resource from **Add Resource**. You should land back on the list with the new card, and **Table Editor → resources** should show the new row.

## 6. Later changes

Push to `main`. Vercel rebuilds the gallery.

- Editing `src/` does not change a published demo. Update the copy under `completed_projects/`, then push.
- Add or remove a demo by editing `showcase/projects.json`. The steps are in [showcase.md](showcase.md).
- Changing a Supabase value in Vercel requires another redeploy. A push is one way to trigger that.
