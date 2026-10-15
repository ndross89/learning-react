# Project demos

The public site is a gallery of finished projects. `npm run dev` still runs the app in `src/` and does not publish it.

A project is on the site only when it is listed in `showcase/projects.json`.

## Preview the gallery

From the repo root:

```bash
npm run build:showcase
npm run preview:showcase
```

Open the URL Vite prints. The gallery is at `/`. Each demo is at `/<slug>/`.

## Add a project

1. Copy the finished app into `completed_projects/<slug>/`.
2. Include `index.html` and `main.jsx`. `index.html` should load `./main.jsx`, and `main.jsx` should render `App`.
3. Add an entry to `showcase/projects.json`:

```json
{
  "slug": "my-project",
  "title": "My Project",
  "summary": "One sentence about what it does.",
  "dir": "completed_projects/my-project"
}
```

The slug is the URL path. Use lowercase words separated by hyphens.

4. If the app uses `BrowserRouter` with paths such as `/menu`, set `"spa": true` and add a rewrite in `vercel.json`:

```json
{ "source": "/my-project/(.*)", "destination": "/my-project/index.html" }
```

Also set the router basename from `import.meta.env.BASE_URL`, with no trailing slash, so those paths stay under `/my-project/`.

5. Push to the branch Vercel deploys. Vercel runs `npm run build:showcase`.

Remove a project by deleting its object from `showcase/projects.json`. The folder can stay in the repo.

## Update a published copy

Edits in `src/` do not change a demo. Update the copy in `completed_projects/<slug>/`, then push.

## Vercel

`vercel.json` sets the build command to `npm run build:showcase` and the output directory to `dist`. The click-by-click setup, including the Supabase table and keys, is in [vercel-showcase-setup.md](vercel-showcase-setup.md).

### EQ Resource Hub

The hub reads two environment variables. Add them in the Vercel project settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Use the publishable key, not the secret key and not the database password. Until both are set, the hub shows a short configuration message. The same names are listed in `.env.example`.

Team Insight Feed loads sample posts from JSONPlaceholder when someone opens that demo. It does not need a key.
