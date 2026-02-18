import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

const IGNORE = new Set([
  'node_modules', 'dist', 'shared', 'src', 'public',
  '.git', '.vite', '.cursor',
])

function discoverProjects(dir: string, prefix = ''): string[] {
  const projects: string[] = []

  for (const entry of readdirSync(dir)) {
    if (IGNORE.has(entry) || entry.startsWith('.')) continue
    const fullPath = join(dir, entry)
    if (!statSync(fullPath).isDirectory()) continue

    const projectPath = prefix ? `${prefix}/${entry}` : entry

    if (existsSync(join(fullPath, 'index.html'))) {
      projects.push(projectPath)
    }

    projects.push(...discoverProjects(fullPath, projectPath))
  }

  return projects
}

function projectListPlugin(): Plugin {
  return {
    name: 'project-list',
    resolveId(id) {
      if (id === 'virtual:project-list') return '\0virtual:project-list'
    },
    load(id) {
      if (id === '\0virtual:project-list') {
        const projects = discoverProjects(process.cwd())
        return `export const projects = ${JSON.stringify(projects)};`
      }
    },
  }
}

const root = process.cwd()
const projects = discoverProjects(root)

export default defineConfig({
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
    },
  },
  plugins: [projectListPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        ...Object.fromEntries(
          projects.map(p => [
            p.replace(/\//g, '-'),
            resolve(root, p, 'index.html'),
          ])
        ),
      },
    },
  },
  preview: {
    port: 3050,
    host: true, // binds 0.0.0.0
    allowedHosts: ['p5js.alijradi.com']
  }
})
