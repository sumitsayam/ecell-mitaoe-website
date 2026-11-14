# Testing & Verification Requirements — E-Cell MITAOE

1. **Production Build Preflight:** `npm run build` must succeed with 0 errors and all static pages generated.
2. **Server Route Testing:** `node scripts/test-server.js` verifies HTTP 200 on all public and management portal routes.
3. **Static Asset Verification:** `node scripts/test-assets.js` ensures all bundled image assets return HTTP 200 with valid content types and headers.
4. **Never Falsify Test Results:** Tests must be executed against running server processes with real assertion checks.
