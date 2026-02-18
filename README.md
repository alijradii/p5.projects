# p5.js Projects

Collection of p5.js creative coding sketches. Built with Bun, Vite, and TypeScript.

## Quick Start

```bash
bun install
bun dev
```

## Adding a New Project

Create a directory anywhere in the repo with an `index.html` and a `sketch.ts`:

```
my-project/
├── index.html
└── sketch.ts
```

Nested directories map directly to URL paths:

```
autonomous-agents/steering/seek/
├── index.html
└── sketch.ts
```

This becomes available at `/autonomous-agents/steering/seek/` and automatically appears in the root navigation. No config changes needed — just restart the dev server.

### Minimal index.html Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Sketch</title>
  <style>html, body { margin: 0; overflow: hidden; background: #0a0a0a; } canvas { display: block; }</style>
</head>
<body>
  <script type="module" src="./sketch.ts"></script>
</body>
</html>
```

### Minimal sketch.ts Template

```typescript
import p5 from 'p5'
import { fullscreenCanvas, handleResize } from '@shared/p5-utils'

new p5((p: p5) => {
  p.setup = () => {
    fullscreenCanvas(p)
  }

  p.draw = () => {
    p.background(10)
  }

  p.windowResized = () => handleResize(p)
})
```

## Shared Utilities

Import from `@shared/*` in any project:

```typescript
import { randomFromPalette, PALETTES } from '@shared/p5-utils'
```

## Build & Deploy

```bash
bun run build
```

Output goes to `dist/`. Copy to your server:

```bash
rsync -avz dist/ user@server:/var/www/p5js/
```

See `nginx.conf` for the server configuration.
