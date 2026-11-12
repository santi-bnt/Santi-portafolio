# Portfolio verification

## Commands

Run from the repository root:

```sh
npm ci
npm run build
npm run lint
npm run typecheck
npm test
```

Build before the browser suite. Playwright starts a production server on port
3099 and uses Edge by default; see the root README for Chromium configuration.

## Browser coverage

The suite currently contains 22 tests covering:

- Home page at 375, 768, and 1440 pixels, in light and dark modes
- Project routes, source links, image loading, and horizontal overflow
- Project filters, keyboard navigation, theme persistence, and 404 behavior
- Startup intro, desktop storytelling, mobile simplification, and route transitions
- Reduced-motion and no-JavaScript fallbacks
- Layout-shift checks in the tested entrance sequence
- MATT's conceptual SVG scan and its reduced-motion fallback
- Image captions, reference material, and project-status boundaries
- satzivo's Software filter, public application/source links, and detail route

Screenshots and traces are stored in ignored `test-results/`.

## Scope

These checks validate the portfolio. They do not build, flash, calibrate, or
physically validate the linked projects. Source documentation and attributed
test reports remain distinct from tests run in this repository.

Passing local checks does not verify deployment domains, external link
availability over time, or a Lighthouse score.
