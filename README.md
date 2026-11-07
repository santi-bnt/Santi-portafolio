# Santiago Benavent — Engineering Portfolio

Portfolio for internship and research applications in software, robotics,
embedded systems, AI, and hardware integration.

Project summaries link to source repositories under
[santi-bnt](https://github.com/santi-bnt) and distinguish implemented work,
reported tests, work in progress, and planned features.

## Stack

- Next.js App Router, React, and strict TypeScript
- Tailwind CSS and a compact CSS design system
- Static home and project pages with local typed content
- System, light, and dark themes
- CSS transitions, IntersectionObserver reveals, and desktop project storytelling
- ESLint and Playwright

No database, runtime GitHub API, or environment variables are required.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Node 24 is recommended; see `.nvmrc`.
Use `npm ci` for subsequent reproducible installs. On Windows, use `npm.cmd`
if PowerShell blocks the `npm.ps1` shim.

## Build and checks

```sh
npm run build
npm run lint
npm run typecheck
npm test
```

Build before running browser tests. Tests start a production server on port 3099
and use Microsoft Edge by default. To use Chromium instead:

```sh
npx playwright install chromium
PLAYWRIGHT_CHANNEL=chromium npm test
```

In PowerShell, set `$env:PLAYWRIGHT_CHANNEL = 'chromium'` before `npm.cmd test`.
Use `npm run start` to serve the production build locally.

See [verification](docs/verification.md) for coverage and limitations.

## Project structure

```text
app/                         Pages, metadata, styles, and shared layout
  projects/[slug]/page.tsx    Statically generated project detail routes
components/                  Navigation, project cards, stories, and profile sections
data/projects.ts             Project content, technologies, status, and evidence
data/profile.ts              Profile, skills, and optional credentials/contact links
public/images/               Project images and attributed illustrations
tests/                       Browser behavior and responsive checks
docs/                        Content sources, motion behavior, and verification
```

Cards and project detail pages share the same project records. Project order
comes from the data array; filters affect the displayed projects.

## Updating content

1. Review the project's README, documentation, and relevant source.
2. Add or update its typed record in `data/projects.ts`.
3. Keep implementation and validation states separate. Add demo or website
   links only after checking the actual destination.
4. Add image dimensions, alt text, captions, and source attribution.
5. Run build, lint, typecheck, and browser checks.

Profile and skills live in `data/profile.ts`. Optional email, general resume,
certifications, and honors remain hidden until populated with verified content.
Use a general resume for the resume link.

See [content sources](docs/content-audit.md),
[image provenance](public/images/README.md), and
[motion and accessibility](docs/visual-motion.md).

## Vercel

1. Import this GitHub repository.
2. Select the **Next.js** framework preset.
3. Use the repository root and default build/output settings.
4. Deploy. No environment variables are required.

If the project was imported with the **Other** preset, change it to **Next.js**
and redeploy. Production deployments can follow pushes to `main`.
