import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const projects = JSON.parse(readFileSync(new URL('./showcase/projects.json', import.meta.url), 'utf8'))

function showcasePreviewUrl(url = '') {
  const pathname = url.split('?')[0]
  const match = pathname.match(/^\/([^/]+)(\/.*)$/)
  if (!match) return null

  const [, slug, rest] = match
  const project = projects.find((item) => item.slug === slug && item.spa)
  if (!project) return null

  const last = rest.split('/').filter(Boolean).pop()
  if (last && last.includes('.')) return null

  return `/${slug}/index.html`
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'showcase-spa-preview',
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          const rewritten = showcasePreviewUrl(req.url)
          if (rewritten) req.url = rewritten
          next()
        })
      },
    },
  ],
})
