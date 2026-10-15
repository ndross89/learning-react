import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { build } from 'vite'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(repoRoot, 'dist')
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const projects = JSON.parse(await readFile(path.join(repoRoot, 'showcase/projects.json'), 'utf8'))
const vercel = JSON.parse(await readFile(path.join(repoRoot, 'vercel.json'), 'utf8'))

if (!Array.isArray(projects) || projects.length === 0) {
  throw new Error('showcase/projects.json must list at least one project.')
}

for (const project of projects) {
  for (const field of ['slug', 'title', 'summary', 'dir']) {
    if (typeof project[field] !== 'string' || project[field].trim() === '') {
      throw new Error(`Each showcase project needs a ${field}.`)
    }
  }

  if (!slugPattern.test(project.slug)) {
    throw new Error(`Slug "${project.slug}" must be lowercase words separated by hyphens.`)
  }

  if (project.spa !== undefined && typeof project.spa !== 'boolean') {
    throw new Error(`${project.slug} spa must be true or false.`)
  }

  if (project.spa) {
    const destination = `/${project.slug}/index.html`
    const rewrites = Array.isArray(vercel.rewrites) ? vercel.rewrites : []
    const hasRewrite = rewrites.some((rule) => rule.destination === destination)
    if (!hasRewrite) {
      throw new Error(`${project.slug} is marked spa but vercel.json has no rewrite to ${destination}.`)
    }
  }
}

await rm(distDir, { recursive: true, force: true })
await mkdir(distDir, { recursive: true })

for (const project of projects) {
  await build({
    configFile: false,
    root: path.join(repoRoot, project.dir),
    base: `/${project.slug}/`,
    envDir: repoRoot,
    publicDir: false,
    plugins: [react()],
    build: {
      outDir: path.join(distDir, project.slug),
      emptyOutDir: true,
    },
  })
}

await cp(path.join(repoRoot, 'public'), distDir, { recursive: true })
await cp(path.join(repoRoot, 'showcase/gallery.css'), path.join(distDir, 'gallery.css'))

const barCss = await readFile(path.join(repoRoot, 'showcase/demo-bar.css'), 'utf8')

for (let index = 0; index < projects.length; index += 1) {
  const project = projects[index]
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const htmlPath = path.join(distDir, project.slug, 'index.html')
  const html = await readFile(htmlPath, 'utf8')
  const bar = `<nav class="showcase-bar" aria-label="Other demos"><a href="/${previous.slug}/">Previous</a><a href="/">All projects</a><p class="showcase-bar__title">${escapeHtml(project.title)}</p><a href="/${next.slug}/">Next</a></nav>`
  const withStyle = html.replace('</head>', `<style>${barCss}</style></head>`)
  if (!withStyle.includes('<div id="root">') || withStyle === html) {
    throw new Error(`Could not inject the demo bar into ${htmlPath}`)
  }
  await writeFile(htmlPath, withStyle.replace('<div id="root">', `${bar}<div id="root">`))
}

await writeFile(path.join(distDir, 'index.html'), renderGallery(projects))

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderGallery(items) {
  const cards = items
    .map(
      (project) => `<li>
        <a class="gallery-card" href="/${project.slug}/">
          <h2>${escapeHtml(project.title)}</h2>
          <p>${escapeHtml(project.summary)}</p>
          <span class="gallery-card__open">Open demo</span>
        </a>
      </li>`,
    )
    .join('\n')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project demos</title>
    <link rel="stylesheet" href="/gallery.css" />
  </head>
  <body>
    <header class="gallery-header">
      <p class="gallery-kicker">Finished work</p>
      <h1>Project demos</h1>
      <p class="gallery-lede">Open a project, then use Previous and Next to move through this set.</p>
    </header>
    <main>
      <ol class="gallery-list">
        ${cards}
      </ol>
    </main>
  </body>
</html>
`
}
