# Page Scaffolding Guide

## Overview

The E-Cell MITAOE architecture uses a feature-driven module system. To add a new page with a dedicated content entry, feature view, and route, run:

```bash
npm run new:page <name>
```

### Example
```bash
npm run new:page incubators
```

### What this command generates:
1. **Content Stub** (`src/content/incubators.ts`):
   - Typed TypeScript interface and mock items ready for future CMS/Sanity integration.
2. **Feature Module** (`src/features/incubators/index.ts`):
   - Encapsulated presentation component consuming the content entry.
3. **App Route** (`src/app/incubators/page.tsx`):
   - Server Component with metadata and standard layout composition.

---

## Architecture Rules for New Pages:
- Do not import directly across feature internals; export through `index.ts`.
- Place shared presentation components in `src/components/ui/`.
- Use design tokens from `src/app/globals.css`.

