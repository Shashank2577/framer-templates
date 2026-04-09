# Jules Session: Build Framer Template

## Your Task

Build a complete Framer-compatible website template from the attached design spec.

## Inputs

You have been given:
1. **template-spec.md** — section-by-section layout blueprint
2. **asset-prompts.json** — complete visual properties (colors, typography, spacing, image styles)

## What To Build

### React Code Components

Framer supports React code components. For each section in the spec, create a React component:

- Use the exact colors, fonts, and spacing from `asset-prompts.json`
- Use CSS-in-JS (inline styles or styled-components) — Framer handles both
- Each component should be self-contained with responsive breakpoints:
  - Desktop: 1440px
  - Tablet: 768px
  - Mobile: 375px
- Export each component as a default export
- Use Framer Motion for animations (scroll-triggered reveals, hover states)

### File Structure

```
components/
  Hero.tsx
  LogoBar.tsx
  Features.tsx
  [Section].tsx        # One file per section from the spec
  shared/
    theme.ts           # Export colors, fonts, spacing from asset-prompts.json
    Container.tsx       # Reusable max-width container
```

### Component Requirements

1. **Props**: Each component should accept content props (text, images) so the template is content-editable in Framer
2. **Framer Property Controls**: Add `addPropertyControls()` from the `framer` package so users can edit content in Framer's UI
3. **Responsive**: Use CSS media queries or Framer's responsive utilities
4. **Animations**: Use `framer-motion` for scroll-triggered entrance animations and hover states

### Assets

For each asset in `asset-prompts.json`:
- If type is `icon`: create as an SVG React component
- If type is `illustration` or `photo`: use the prompt to generate with an AI image tool, or use a placeholder from Unsplash that matches the described aesthetic
- If type is `pattern`: create as a CSS background or SVG
- If type is `logo`: create as SVG placeholder text

### Deliverables

1. All React component files in a `components/` directory
2. A `preview.html` that renders all sections in order (for screenshot/preview)
3. A `SETUP.md` explaining how to import each component into Framer
4. Screenshots of the assembled template at desktop and mobile widths

### Quality Checklist

- [ ] All colors match asset-prompts.json exactly
- [ ] Typography matches (family, weight, size scale)
- [ ] Spacing matches (section gaps, max width, grid gaps)
- [ ] Responsive at all 3 breakpoints
- [ ] Animations are subtle and performant
- [ ] All components have Framer property controls
- [ ] No hardcoded content — everything via props
