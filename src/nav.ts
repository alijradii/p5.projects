import { projects } from 'virtual:project-list'

function toTitle(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function renderBreadcrumb(path: string): string {
  const parts = path.split('/')
  return parts
    .map((part, i) => {
      const isLast = i === parts.length - 1
      return `<span${isLast ? ' style="color:#888"' : ''}>${toTitle(part)}</span>`
    })
    .join('<span class="sep">/</span>')
}

const app = document.getElementById('app')!

app.innerHTML = `
  <h1><span>p5</span>.js Projects</h1>
  <p class="subtitle">Creative coding experiments</p>
  <div class="project-list">
    ${projects
      .map(
        project => `
      <a href="/${project}/" class="project-link">
        <div class="project-name">${toTitle(project.split('/').pop()!)}</div>
        <div class="breadcrumb">${renderBreadcrumb(project)}</div>
      </a>`,
      )
      .join('')}
  </div>
`
