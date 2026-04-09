# AGENTS.md

## Project Overview

Framer template gallery — a collection of remixable website templates built as Framer code components. Each template is a standalone set of React + TypeScript components designed to be imported into Framer projects.

## Tech Stack

- Language: TypeScript + React
- Platform: Framer (framer.com) — code components bundled by Framer's compiler
- Available imports: `framer` (property controls, responsive variants) and `framer-motion` (animation)
- Styling: CSS modules or inline styles (no Tailwind, no styled-components, no npm packages)
- No build system needed — Framer handles compilation

## Code Conventions

- Each template lives in its own directory under `templates/`
- Components use `addPropertyControls()` from the `framer` package for visual editor customization
- All content is passed via props — no hardcoded text or images
- Animations use `framer-motion`: `useScroll`, `useTransform`, `layoutId`, `AnimatePresence`, spring physics
- Responsive design via Framer responsive variants, not CSS media queries
- Shared utilities (theme tokens, reusable components) go in `components/shared/`

## File Organization

```
templates/
  nexus-saas/           # Dark SaaS landing page template
    template-spec.md    # Section-by-section layout blueprint
    asset-prompts.json  # Colors, typography, spacing, image descriptions
    components/         # React code components (one per section)
      shared/           # Theme tokens, reusable pieces
  folio/                # Minimalist portfolio template
    template-spec.md
    asset-prompts.json
    components/
      shared/
workflow/
  jules-nexus-saas-prompt.md   # Full build instructions for Nexus
  jules-folio-prompt.md        # Full build instructions for Folio
gallery/
  cms-schema.json       # Gallery catalog schema
schemas/
  asset-prompts.schema.json
docs/
  framer-setup-guide.md
```

## Important Notes

- The Jules prompt files in `workflow/` contain COMPLETE, self-contained instructions for each template. Read the relevant prompt file as your primary guide.
- Templates must work when pasted into Framer as code components — test that imports resolve to `framer` and `framer-motion` only.
- Use placeholder images from Unsplash. The asset-prompts.json files contain image generation prompts that describe the desired aesthetic.
- Property controls are critical — every piece of text, image URL, and color should be editable in Framer's visual editor.
