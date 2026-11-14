---
name: frontend-quality-audit
description: Quality assurance, route validation, bundle analysis, and performance preflight checks.
---

# Frontend Quality Audit Skill

Use this skill when auditing build integrity, route health, and console output.

## Checkpoints
- Execute `npm run build` and ensure static pages are generated without compilation warnings.
- Run `node scripts/test-server.js` against the running production server.
- Run `node scripts/test-assets.js` to verify image asset integrity.
- Check accessibility, keyboard navigation, and `prefers-reduced-motion` compliance.

