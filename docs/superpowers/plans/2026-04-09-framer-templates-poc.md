# Framer Template Gallery — POC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 2 complete Framer templates (SaaS + Portfolio) with JSON asset prompts and a minimal gallery page to validate the end-to-end workflow before scaling to 15.

**Architecture:** Claude Opus creates detailed template specs and JSON prompt files for each template. Each spec is handed off to a Jules session that builds the Framer project (React code components + assets). A gallery Framer project ties them together with preview pages and "Personalize" remix links.

**Tech Stack:** Framer (website builder + CMS + hosting), 21st.dev (component library), React (Framer code components), JSON (asset prompt specs)

---

## File Structure

```
framer-templates/
├── templates/
│   ├── nexus-saas/
│   │   ├── template-spec.md          # Design blueprint for Jules
│   │   ├── asset-prompts.json        # Visual recipe (build spec + user artifact)
│   │   └── README.md                 # Remix link, preview URL, build notes
│   └── folio/
│       ├── template-spec.md
│       ├── asset-prompts.json
│       └── README.md
├── gallery/
│   └── cms-schema.json               # Framer CMS collection definition
├── workflow/
│   ├── jules-prompt-template.md      # Reusable prompt for spinning up Jules sessions
│   └── framer-setup-guide.md         # How to import code components into Framer
├── schemas/
│   └── asset-prompts.schema.json     # JSON Schema for validating asset-prompts files
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-04-09-framer-templates-design.md
        └── plans/
            └── 2026-04-09-framer-templates-poc.md  (this file)
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `templates/nexus-saas/.gitkeep`
- Create: `templates/folio/.gitkeep`
- Create: `gallery/.gitkeep`
- Create: `workflow/.gitkeep`
- Create: `schemas/.gitkeep`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git repo and create directory structure**

```bash
cd /Users/shashanksaxena/Documents/Personal/Code/framer-templates
git init
mkdir -p templates/nexus-saas templates/folio gallery workflow schemas
touch templates/nexus-saas/.gitkeep templates/folio/.gitkeep gallery/.gitkeep workflow/.gitkeep schemas/.gitkeep
```

- [ ] **Step 2: Create .gitignore**

```gitignore
# Framer
.framer/

# Superpowers brainstorm sessions
.superpowers/

# OMC
.omc/

# OS
.DS_Store
Thumbs.db

# Node (if any tooling is added later)
node_modules/
```

- [ ] **Step 3: Commit scaffolding**

```bash
git add .
git commit -m "chore: scaffold framer-templates project structure"
```

---

### Task 2: JSON Asset Prompts Schema

**Files:**
- Create: `schemas/asset-prompts.schema.json`

This schema validates all `asset-prompts.json` files to ensure consistency across templates.

- [ ] **Step 1: Write the JSON Schema**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Framer Template Asset Prompts",
  "description": "Visual recipe for a Framer template — used as build spec and user-facing artifact",
  "type": "object",
  "required": ["template", "theme", "assets"],
  "properties": {
    "template": {
      "type": "string",
      "description": "Template slug (kebab-case)",
      "pattern": "^[a-z0-9-]+$"
    },
    "theme": {
      "type": "object",
      "required": ["colors", "typography", "spacing", "border_radius", "image_style"],
      "properties": {
        "colors": {
          "type": "object",
          "required": ["primary", "secondary", "background", "surface", "text", "muted"],
          "properties": {
            "primary": { "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" },
            "secondary": { "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" },
            "background": { "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" },
            "surface": { "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" },
            "text": { "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" },
            "muted": { "type": "string", "pattern": "^#[0-9a-fA-F]{6}$" }
          }
        },
        "typography": {
          "type": "object",
          "required": ["heading", "body"],
          "properties": {
            "heading": {
              "type": "object",
              "required": ["family", "weight", "scale"],
              "properties": {
                "family": { "type": "string" },
                "weight": { "type": "integer", "minimum": 100, "maximum": 900 },
                "scale": {
                  "type": "array",
                  "items": { "type": "integer", "minimum": 10, "maximum": 200 },
                  "minItems": 4,
                  "maxItems": 4
                }
              }
            },
            "body": {
              "type": "object",
              "required": ["family", "weight", "size", "lineHeight"],
              "properties": {
                "family": { "type": "string" },
                "weight": { "type": "integer", "minimum": 100, "maximum": 900 },
                "size": { "type": "integer", "minimum": 10, "maximum": 32 },
                "lineHeight": { "type": "number", "minimum": 1.0, "maximum": 2.5 }
                }
            }
          }
        },
        "spacing": {
          "type": "object",
          "required": ["section_gap", "content_max_width", "grid_gap"],
          "properties": {
            "section_gap": { "type": "integer" },
            "content_max_width": { "type": "integer" },
            "grid_gap": { "type": "integer" }
          }
        },
        "border_radius": {
          "type": "object",
          "required": ["cards", "buttons", "images"],
          "properties": {
            "cards": { "type": "integer" },
            "buttons": { "type": "integer" },
            "images": { "type": "integer" }
          }
        },
        "image_style": {
          "type": "object",
          "required": ["treatment", "aesthetic", "palette_mood"],
          "properties": {
            "treatment": { "type": "string" },
            "aesthetic": { "type": "string" },
            "palette_mood": { "type": "string" }
          }
        }
      }
    },
    "assets": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "type", "dimensions", "prompt"],
        "properties": {
          "id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
          "type": { "type": "string", "enum": ["illustration", "photo", "icon", "pattern", "logo"] },
          "dimensions": { "type": "string", "pattern": "^[0-9]+x[0-9]+$" },
          "prompt": { "type": "string", "minLength": 20 }
        }
      },
      "minItems": 1
    }
  }
}
```

Save to `schemas/asset-prompts.schema.json`.

- [ ] **Step 2: Commit schema**

```bash
git add schemas/asset-prompts.schema.json
git commit -m "feat: add JSON schema for asset-prompts validation"
```

---

### Task 3: Jules Prompt Template

**Files:**
- Create: `workflow/jules-prompt-template.md`
- Create: `workflow/framer-setup-guide.md`

The reusable prompt that gets sent to each Jules session. Jules receives this + the template-specific spec + JSON.

- [ ] **Step 1: Write the Jules prompt template**

```markdown
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
```

Save to `workflow/jules-prompt-template.md`.

- [ ] **Step 2: Write the Framer setup guide**

```markdown
# Framer Setup Guide

How to import Jules-built components into a Framer project.

## Prerequisites

- Framer account (free tier works)
- Jules output: `components/` directory with React files

## Step-by-Step

### 1. Create a New Framer Project

- Go to framer.com → New Project
- Choose "Blank" as the starting point
- Set canvas width to 1440px (desktop)

### 2. Import Code Components

For each `.tsx` file from Jules:

1. In Framer, click **Assets** panel (left sidebar)
2. Click **+** → **Code** → **New File**
3. Name it to match the component (e.g., `Hero.tsx`)
4. Paste the entire component code
5. Click **Save** — the component appears in your Assets panel

### 3. Import Shared Theme

1. Create a code file named `theme.ts`
2. Paste the theme file from Jules output
3. All components import from this file — Framer resolves internal imports

### 4. Assemble the Page

1. Create a new **Page** in Framer
2. Drag components from Assets onto the canvas in the order from the template spec
3. Each component's property controls appear in the right panel — edit content there

### 5. Add Animations

Framer Motion animations are baked into the components. For additional Framer-native animations:

1. Select any element on the canvas
2. Open **Animations** in the right panel
3. Add entrance, scroll, or hover animations

### 6. Set Responsive Breakpoints

1. Click the breakpoint icons at the top of the canvas
2. Components auto-respond via CSS media queries
3. Fine-tune any overrides per breakpoint in Framer's UI

### 7. Publish with Remix Enabled

1. Click **Publish** (top right)
2. In publish settings, enable **Allow Remix**
3. Copy the remix URL — this is the "Personalize" link for the gallery

### 8. Get the Remix URL

The remix URL format: `https://framer.com/projects/<project-id>/duplicate`

Add this URL to the gallery CMS entry for this template.
```

Save to `workflow/framer-setup-guide.md`.

- [ ] **Step 3: Commit workflow docs**

```bash
git add workflow/jules-prompt-template.md workflow/framer-setup-guide.md
git commit -m "feat: add Jules prompt template and Framer setup guide"
```

---

### Task 4: Nexus SaaS Template Spec

**Files:**
- Create: `templates/nexus-saas/template-spec.md`

- [ ] **Step 1: Write the template spec**

```markdown
# Nexus SaaS — Template Spec

**Category:** SaaS / Product Landing Page
**Design Reference:** (to be assigned from design library)
**Target:** Modern SaaS product with dark theme, vibrant accent colors

---

## Page Structure

### Section 1: Navigation Bar
- **Layout:** Fixed top, full-width, transparent background that fills on scroll
- **Content:** Logo (left), nav links center-aligned (Features, Pricing, FAQ), CTA button (right)
- **Behavior:** Blur backdrop on scroll, mobile hamburger menu at 768px
- **Height:** 72px desktop, 64px mobile

### Section 2: Hero
- **Layout:** Two-column on desktop (60/40 split), stacked on mobile
- **Left column:** Overline tag ("NEW: Feature X"), H1 headline (max 8 words), body paragraph (2-3 lines), two buttons (primary CTA + secondary ghost button)
- **Right column:** Hero illustration/product screenshot with subtle float animation
- **Height:** 100vh minus nav height
- **Background:** Gradient from background color to slightly lighter surface color

### Section 3: Logo Bar
- **Layout:** Single row, horizontally centered, grayscale logos
- **Content:** 5-6 company logos with "Trusted by" label above
- **Spacing:** Even distribution with 48px gaps
- **Behavior:** Logos subtly brighten on hover

### Section 4: Features Grid
- **Layout:** 3-column grid on desktop, 2-column tablet, 1-column mobile
- **Per card:** Icon (64x64), H3 title, body paragraph (2 lines)
- **Card style:** Surface background, subtle border, 12px radius
- **Section header:** H2 centered above grid with subtitle
- **Count:** 6 feature cards (2 rows of 3)

### Section 5: Product Screenshot
- **Layout:** Full-width container with centered screenshot
- **Content:** Browser-frame mockup containing product UI screenshot
- **Effects:** Subtle shadow, slight perspective tilt (3D effect)
- **Caption:** H2 above, subtitle below the screenshot

### Section 6: Testimonials
- **Layout:** 3-column on desktop, carousel on mobile
- **Per card:** Avatar (48x48 circle), quote text (italicized), name, role/company
- **Card style:** Surface background, left-aligned purple accent border
- **Section header:** H2 centered above

### Section 7: Pricing
- **Layout:** 3 columns (Basic / Pro / Enterprise), Pro highlighted
- **Per tier:** Tier name, price with billing period, feature list (checkmarks), CTA button
- **Highlight:** Pro tier has primary color border, "Most Popular" badge, slightly elevated
- **Toggle:** Monthly/Annual toggle above the cards (annual shows savings)

### Section 8: FAQ
- **Layout:** Single column, max-width 720px centered
- **Style:** Accordion — question as trigger, answer expands/collapses
- **Content:** 6 FAQ items
- **Animation:** Smooth height transition on expand/collapse

### Section 9: CTA Banner
- **Layout:** Full-width colored background (primary gradient)
- **Content:** H2 headline, subtitle, single CTA button (white on primary)
- **Style:** Rounded container within the page max-width

### Section 10: Footer
- **Layout:** 4-column grid (Company, Product, Resources, Legal) + bottom bar
- **Bottom bar:** Copyright, social icons (GitHub, Twitter/X, LinkedIn, Discord)
- **Style:** Slightly darker than page background

---

## Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| Desktop | 1440px | Full layout as described |
| Tablet | 768px | Hero stacks, features 2-col, pricing scrolls horizontally |
| Mobile | 375px | Everything single-column, hamburger nav, testimonials carousel |

## Interactions & Animations

| Element | Trigger | Animation |
|---------|---------|-----------|
| All sections | Scroll into view | Fade up + slight translate Y (20px), 0.6s ease-out |
| Feature cards | Hover | Slight lift (translateY -4px) + shadow increase |
| Pricing cards | Hover | Scale 1.02 + shadow increase |
| Hero illustration | Load | Gentle float (translateY oscillation, 3s loop) |
| Logo bar logos | Hover | Grayscale → full color transition |
| FAQ items | Click | Smooth height expand/collapse with chevron rotation |
| Nav | Scroll past hero | Background fills from transparent to surface color |
```

Save to `templates/nexus-saas/template-spec.md`.

- [ ] **Step 2: Commit**

```bash
git add templates/nexus-saas/template-spec.md
git commit -m "feat: add Nexus SaaS template spec"
```

---

### Task 5: Nexus SaaS Asset Prompts JSON

**Files:**
- Create: `templates/nexus-saas/asset-prompts.json`

- [ ] **Step 1: Write the asset prompts JSON**

```json
{
  "template": "nexus-saas",
  "theme": {
    "colors": {
      "primary": "#7c3aed",
      "secondary": "#22c55e",
      "background": "#0a0a0f",
      "surface": "#1a1a2e",
      "text": "#e4e4e7",
      "muted": "#71717a"
    },
    "typography": {
      "heading": {
        "family": "Inter",
        "weight": 700,
        "scale": [56, 40, 28, 20]
      },
      "body": {
        "family": "Inter",
        "weight": 400,
        "size": 16,
        "lineHeight": 1.6
      }
    },
    "spacing": {
      "section_gap": 120,
      "content_max_width": 1200,
      "grid_gap": 24
    },
    "border_radius": {
      "cards": 12,
      "buttons": 8,
      "images": 16
    },
    "image_style": {
      "treatment": "dark-overlay-gradient",
      "aesthetic": "minimal-3d-illustration",
      "palette_mood": "dark-tech-vibrant-purple-green"
    }
  },
  "assets": [
    {
      "id": "hero-illustration",
      "type": "illustration",
      "dimensions": "800x600",
      "prompt": "Minimal 3D isometric illustration of a floating SaaS dashboard interface with glowing purple (#7c3aed) accent elements, dark background (#0a0a0f), soft volumetric lighting, frosted glass card elements, clean geometric shapes, no text"
    },
    {
      "id": "product-screenshot",
      "type": "illustration",
      "dimensions": "1200x800",
      "prompt": "Clean SaaS dashboard UI mockup showing analytics charts and data tables, dark theme with purple (#7c3aed) accent colors, modern flat design, inside a browser chrome frame, professional and polished"
    },
    {
      "id": "feature-icon-speed",
      "type": "icon",
      "dimensions": "64x64",
      "prompt": "Minimal line icon of a lightning bolt, 2px stroke weight, purple (#7c3aed) on transparent background, rounded line caps, simple geometric style"
    },
    {
      "id": "feature-icon-security",
      "type": "icon",
      "dimensions": "64x64",
      "prompt": "Minimal line icon of a shield with checkmark, 2px stroke weight, purple (#7c3aed) on transparent background, rounded line caps, simple geometric style"
    },
    {
      "id": "feature-icon-analytics",
      "type": "icon",
      "dimensions": "64x64",
      "prompt": "Minimal line icon of a bar chart with upward trend arrow, 2px stroke weight, purple (#7c3aed) on transparent background, rounded line caps, simple geometric style"
    },
    {
      "id": "feature-icon-integration",
      "type": "icon",
      "dimensions": "64x64",
      "prompt": "Minimal line icon of two puzzle pieces connecting, 2px stroke weight, purple (#7c3aed) on transparent background, rounded line caps, simple geometric style"
    },
    {
      "id": "feature-icon-collaboration",
      "type": "icon",
      "dimensions": "64x64",
      "prompt": "Minimal line icon of two overlapping speech bubbles, 2px stroke weight, purple (#7c3aed) on transparent background, rounded line caps, simple geometric style"
    },
    {
      "id": "feature-icon-automation",
      "type": "icon",
      "dimensions": "64x64",
      "prompt": "Minimal line icon of a circular arrow with gear inside, 2px stroke weight, purple (#7c3aed) on transparent background, rounded line caps, simple geometric style"
    },
    {
      "id": "testimonial-avatar-1",
      "type": "photo",
      "dimensions": "96x96",
      "prompt": "Professional headshot of a woman in her 30s, neutral background, warm lighting, business casual, friendly smile, high quality portrait"
    },
    {
      "id": "testimonial-avatar-2",
      "type": "photo",
      "dimensions": "96x96",
      "prompt": "Professional headshot of a man in his 40s, neutral background, warm lighting, business casual, confident expression, high quality portrait"
    },
    {
      "id": "testimonial-avatar-3",
      "type": "photo",
      "dimensions": "96x96",
      "prompt": "Professional headshot of a woman in her 20s, neutral background, warm lighting, creative industry style, genuine smile, high quality portrait"
    },
    {
      "id": "cta-background-pattern",
      "type": "pattern",
      "dimensions": "1440x400",
      "prompt": "Subtle geometric dot grid pattern, purple (#7c3aed) dots at 10% opacity on dark background, evenly spaced, minimal and clean, tileable"
    }
  ]
}
```

Save to `templates/nexus-saas/asset-prompts.json`.

- [ ] **Step 2: Validate JSON against schema**

```bash
# If npx is available:
npx ajv-cli validate -s schemas/asset-prompts.schema.json -d templates/nexus-saas/asset-prompts.json
# Otherwise, use Python:
python3 -c "
import json
data = json.load(open('templates/nexus-saas/asset-prompts.json'))
assert data['template'] == 'nexus-saas'
assert len(data['theme']['colors']) == 6
assert len(data['assets']) > 0
print('Validation passed')
"
```

Expected: Validation passes.

- [ ] **Step 3: Commit**

```bash
git add templates/nexus-saas/asset-prompts.json
git commit -m "feat: add Nexus SaaS asset prompts JSON"
```

---

### Task 6: Folio Portfolio Template Spec

**Files:**
- Create: `templates/folio/template-spec.md`

- [ ] **Step 1: Write the template spec**

```markdown
# Folio — Template Spec

**Category:** Creative Portfolio / CV
**Design Reference:** (to be assigned from design library)
**Target:** Minimalist creative portfolio with light/dark mode, emphasis on visuals over text

---

## Page Structure

### Section 1: Navigation Bar
- **Layout:** Fixed top, full-width, minimal
- **Content:** Name/logo (left), nav links right-aligned (Work, About, Contact), dark mode toggle icon
- **Style:** No background — overlays content, text becomes sticky header on scroll
- **Height:** 64px

### Section 2: Hero / Intro
- **Layout:** Full-viewport, centered content
- **Content:** Large name/title (display font, H1), one-line tagline, subtle scroll indicator arrow at bottom
- **Background:** Clean, single color or very subtle noise texture
- **Animation:** Name types in letter-by-letter, tagline fades in after 0.5s delay

### Section 3: Selected Work (Project Grid)
- **Layout:** Masonry grid — 2 columns desktop, 1 column mobile
- **Per project:** Full-bleed image, project title overlay on hover, category tag
- **Count:** 4-6 projects
- **Behavior:** Click opens project detail (same page scroll or overlay)
- **Animation:** Images reveal on scroll with clip-path wipe effect

### Section 4: Project Detail (Inline Expand)
- **Layout:** Full-width section that expands below the clicked project
- **Content:** Large hero image, project title, role/date, 2-3 paragraph description, additional image gallery (horizontal scroll)
- **Close:** X button or click outside to collapse

### Section 5: About
- **Layout:** Two-column on desktop (40/60 split), stacked mobile
- **Left column:** Portrait photo (rounded corners)
- **Right column:** Short bio (3-4 paragraphs), skills list (inline tags), resume download button
- **Tone:** Personal, conversational

### Section 6: Experience Timeline
- **Layout:** Vertical timeline, alternating left/right on desktop, all-left on mobile
- **Per entry:** Company/role, date range, 1-2 line description
- **Count:** 4-6 entries
- **Animation:** Timeline draws in on scroll, entries fade in sequentially

### Section 7: Contact
- **Layout:** Centered, minimal
- **Content:** H2 heading ("Let's work together"), email link (large, clickable), social icons row (Dribbble, Behance, GitHub, LinkedIn, Twitter/X)
- **Style:** Email displayed as the focal element, large font

### Section 8: Footer
- **Layout:** Single line, centered
- **Content:** Copyright, "Built with Framer" credit, back-to-top button

---

## Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| Desktop | 1440px | Full layout, masonry 2-col, timeline alternating |
| Tablet | 768px | Masonry 2-col maintained, about stacks |
| Mobile | 375px | Single column everything, timeline left-only, hamburger nav |

## Interactions & Animations

| Element | Trigger | Animation |
|---------|---------|-----------|
| Hero name | Page load | Letter-by-letter type effect, 0.05s per character |
| Hero tagline | Page load + 0.5s | Fade in + translate up (10px) |
| Project images | Scroll into view | Clip-path reveal (bottom to top wipe), 0.8s ease |
| Project hover | Mouse enter | Title overlay slides up from bottom, image slight zoom (1.05) |
| Project detail | Click | Expand with smooth height animation, 0.4s |
| Timeline | Scroll | Line draws downward, entries fade in sequentially (0.15s stagger) |
| About photo | Scroll into view | Slight scale from 0.95 + fade in |
| Dark mode toggle | Click | Colors transition 0.3s, smooth cross-fade |
| Scroll indicator | Idle on hero | Gentle bounce animation (translateY oscillation) |
```

Save to `templates/folio/template-spec.md`.

- [ ] **Step 2: Commit**

```bash
git add templates/folio/template-spec.md
git commit -m "feat: add Folio portfolio template spec"
```

---

### Task 7: Folio Portfolio Asset Prompts JSON

**Files:**
- Create: `templates/folio/asset-prompts.json`

- [ ] **Step 1: Write the asset prompts JSON**

```json
{
  "template": "folio",
  "theme": {
    "colors": {
      "primary": "#171717",
      "secondary": "#e5e5e5",
      "background": "#fafafa",
      "surface": "#ffffff",
      "text": "#171717",
      "muted": "#a3a3a3"
    },
    "typography": {
      "heading": {
        "family": "Playfair Display",
        "weight": 700,
        "scale": [72, 48, 32, 24]
      },
      "body": {
        "family": "Inter",
        "weight": 400,
        "size": 17,
        "lineHeight": 1.7
      }
    },
    "spacing": {
      "section_gap": 160,
      "content_max_width": 1100,
      "grid_gap": 20
    },
    "border_radius": {
      "cards": 0,
      "buttons": 4,
      "images": 8
    },
    "image_style": {
      "treatment": "high-contrast-natural",
      "aesthetic": "editorial-minimal",
      "palette_mood": "neutral-warm-clean"
    }
  },
  "assets": [
    {
      "id": "project-image-1",
      "type": "photo",
      "dimensions": "1200x800",
      "prompt": "Clean flat-lay product photography of a mobile app on a smartphone, minimal white desk setup, soft natural lighting from left, shallow depth of field, editorial style, warm neutral tones"
    },
    {
      "id": "project-image-2",
      "type": "photo",
      "dimensions": "1200x1600",
      "prompt": "Brand identity mockup showing business cards and letterhead on textured paper, overhead angle, soft shadows, minimalist design with black typography, warm cream background"
    },
    {
      "id": "project-image-3",
      "type": "photo",
      "dimensions": "1200x800",
      "prompt": "Web design project displayed on a laptop screen in a bright studio environment, clean desk, plant in background, natural lighting, modern interface visible on screen"
    },
    {
      "id": "project-image-4",
      "type": "photo",
      "dimensions": "1200x1600",
      "prompt": "Packaging design mockup showing a premium product box from a 45-degree angle, studio lighting, minimal background, elegant typography, matte finish texture visible"
    },
    {
      "id": "about-portrait",
      "type": "photo",
      "dimensions": "600x800",
      "prompt": "Creative professional portrait, person looking slightly off-camera, natural window lighting, neutral background, wearing simple black clothing, warm tones, authentic expression, editorial style"
    },
    {
      "id": "project-detail-gallery-1",
      "type": "photo",
      "dimensions": "1400x900",
      "prompt": "Close-up detail shot of a design project showing typography and color palette selection, printed on high-quality paper, shallow depth of field, design studio setting"
    },
    {
      "id": "project-detail-gallery-2",
      "type": "photo",
      "dimensions": "1400x900",
      "prompt": "Multiple screens showing responsive web design at different breakpoints, arranged on a clean desk, overhead angle, consistent design language across devices"
    },
    {
      "id": "scroll-indicator",
      "type": "icon",
      "dimensions": "24x24",
      "prompt": "Minimal thin arrow pointing down, 1.5px stroke, black (#171717) on transparent, simple chevron shape, elegant and understated"
    },
    {
      "id": "dark-mode-toggle",
      "type": "icon",
      "dimensions": "24x24",
      "prompt": "Minimal sun/moon toggle icon, 1.5px stroke, black (#171717) on transparent, half circle design representing day/night transition"
    },
    {
      "id": "noise-texture",
      "type": "pattern",
      "dimensions": "400x400",
      "prompt": "Very subtle film grain noise texture, monochrome, 5% opacity, fine grain, tileable seamless pattern, adds organic warmth to flat backgrounds"
    }
  ]
}
```

Save to `templates/folio/asset-prompts.json`.

- [ ] **Step 2: Validate JSON against schema**

```bash
python3 -c "
import json
data = json.load(open('templates/folio/asset-prompts.json'))
assert data['template'] == 'folio'
assert len(data['theme']['colors']) == 6
assert len(data['assets']) > 0
print('Validation passed')
"
```

Expected: Validation passes.

- [ ] **Step 3: Commit**

```bash
git add templates/folio/asset-prompts.json
git commit -m "feat: add Folio portfolio asset prompts JSON"
```

---

### Task 8: Nexus SaaS README

**Files:**
- Create: `templates/nexus-saas/README.md`

- [ ] **Step 1: Write the README**

```markdown
# Nexus SaaS — Template

**Category:** SaaS / Product Landing Page
**Status:** Spec complete, awaiting build

## Preview

> Preview link will be added after Jules builds the Framer project.

## Remix Link

> Remix link will be added after publishing in Framer.

## Files

| File | Purpose |
|------|---------|
| `template-spec.md` | Section-by-section layout blueprint |
| `asset-prompts.json` | Visual properties — colors, typography, spacing, image prompts |

## Design Highlights

- Dark theme with vibrant purple (#7c3aed) + green (#22c55e) accents
- 10 sections: Nav, Hero, Logo Bar, Features, Product Screenshot, Testimonials, Pricing, FAQ, CTA, Footer
- Responsive at 1440px / 768px / 375px
- Scroll-reveal animations, hover interactions, floating hero illustration

## Customization

Download `asset-prompts.json` and modify:
- **Colors**: Change the 6 hex values under `theme.colors`
- **Fonts**: Swap `family` values under `theme.typography`
- **Image style**: Change `treatment`, `aesthetic`, and `palette_mood` keywords
- **Asset prompts**: Edit the `prompt` field for any asset to match your brand
```

Save to `templates/nexus-saas/README.md`.

- [ ] **Step 2: Commit**

```bash
git add templates/nexus-saas/README.md
git commit -m "docs: add Nexus SaaS template README"
```

---

### Task 9: Folio Portfolio README

**Files:**
- Create: `templates/folio/README.md`

- [ ] **Step 1: Write the README**

```markdown
# Folio — Template

**Category:** Creative Portfolio / CV
**Status:** Spec complete, awaiting build

## Preview

> Preview link will be added after Jules builds the Framer project.

## Remix Link

> Remix link will be added after publishing in Framer.

## Files

| File | Purpose |
|------|---------|
| `template-spec.md` | Section-by-section layout blueprint |
| `asset-prompts.json` | Visual properties — colors, typography, spacing, image prompts |

## Design Highlights

- Light minimalist theme with optional dark mode
- Serif headings (Playfair Display) + sans-serif body (Inter)
- 8 sections: Nav, Hero Intro, Project Grid (masonry), Project Detail, About, Experience Timeline, Contact, Footer
- Responsive at 1440px / 768px / 375px
- Type-in hero animation, clip-path image reveals, scroll-drawn timeline

## Customization

Download `asset-prompts.json` and modify:
- **Colors**: Change the 6 hex values under `theme.colors`
- **Fonts**: Swap `family` values under `theme.typography`
- **Image style**: Change `treatment`, `aesthetic`, and `palette_mood` keywords
- **Asset prompts**: Edit the `prompt` field for any asset to match your brand
```

Save to `templates/folio/README.md`.

- [ ] **Step 2: Commit**

```bash
git add templates/folio/README.md
git commit -m "docs: add Folio portfolio template README"
```

---

### Task 10: Gallery CMS Schema

**Files:**
- Create: `gallery/cms-schema.json`

- [ ] **Step 1: Write the CMS collection definition**

This defines the Framer CMS collection structure for the template catalog.

```json
{
  "collection": "templates",
  "description": "Template catalog for the Framer Template Gallery",
  "fields": [
    {
      "name": "name",
      "type": "text",
      "required": true,
      "description": "Template display name (e.g., 'Nexus SaaS')"
    },
    {
      "name": "slug",
      "type": "text",
      "required": true,
      "description": "URL-safe identifier (e.g., 'nexus-saas')"
    },
    {
      "name": "category",
      "type": "text",
      "required": true,
      "description": "Template category (e.g., 'SaaS / Product Landing Page')"
    },
    {
      "name": "description",
      "type": "richtext",
      "required": true,
      "description": "Short description of the template (2-3 sentences)"
    },
    {
      "name": "preview_image",
      "type": "image",
      "required": true,
      "description": "Desktop screenshot of the template (1440x900 recommended)"
    },
    {
      "name": "mobile_preview_image",
      "type": "image",
      "required": false,
      "description": "Mobile screenshot of the template (375x812 recommended)"
    },
    {
      "name": "remix_url",
      "type": "url",
      "required": true,
      "description": "Framer remix/duplicate URL for the 'Personalize' button"
    },
    {
      "name": "preview_url",
      "type": "url",
      "required": false,
      "description": "Live preview URL (published Framer site)"
    },
    {
      "name": "asset_prompts_json",
      "type": "file",
      "required": true,
      "description": "Downloadable asset-prompts.json file"
    },
    {
      "name": "color_primary",
      "type": "text",
      "required": true,
      "description": "Primary color hex for display on the card"
    },
    {
      "name": "tags",
      "type": "text",
      "required": false,
      "description": "Comma-separated tags for filtering (e.g., 'dark-theme, animated, minimal')"
    },
    {
      "name": "sections_count",
      "type": "number",
      "required": false,
      "description": "Number of sections in the template"
    }
  ]
}
```

Save to `gallery/cms-schema.json`.

- [ ] **Step 2: Commit**

```bash
git add gallery/cms-schema.json
git commit -m "feat: add Framer CMS schema for template gallery"
```

---

### Task 11: Spin Up Jules Sessions

**Files:**
- No new files — this is an orchestration task

This task launches two parallel Jules sessions using the completed specs.

- [ ] **Step 1: Prepare Jules prompt for Nexus SaaS**

Combine the following into a single Jules task:
1. Content of `workflow/jules-prompt-template.md` (the reusable template)
2. Content of `templates/nexus-saas/template-spec.md`
3. Content of `templates/nexus-saas/asset-prompts.json`

The combined prompt tells Jules exactly what to build.

- [ ] **Step 2: Prepare Jules prompt for Folio**

Combine the following into a single Jules task:
1. Content of `workflow/jules-prompt-template.md` (the reusable template)
2. Content of `templates/folio/template-spec.md`
3. Content of `templates/folio/asset-prompts.json`

- [ ] **Step 3: Launch both Jules sessions in parallel**

Use the `/jules` skill or Google Jules web interface to create two tasks:
- **Jules Task A:** "Build Nexus SaaS Framer Template" with the combined prompt from Step 1
- **Jules Task B:** "Build Folio Portfolio Framer Template" with the combined prompt from Step 2

Both sessions run independently and produce their deliverables in separate branches/PRs.

- [ ] **Step 4: Review Jules output**

When Jules completes each task, verify:
- [ ] All React components exist and import the shared theme
- [ ] Colors, typography, spacing match `asset-prompts.json`
- [ ] Framer property controls are present on each component
- [ ] Responsive breakpoints work at 1440/768/375
- [ ] Preview renders correctly
- [ ] Setup instructions are clear

---

### Task 12: Assemble Gallery & Final Integration

**Files:**
- Modify: `templates/nexus-saas/README.md` (add preview + remix links)
- Modify: `templates/folio/README.md` (add preview + remix links)

- [ ] **Step 1: Import Jules components into Framer**

Follow `workflow/framer-setup-guide.md` for each template:
1. Create two new Framer projects (one per template)
2. Import all code components from Jules output
3. Assemble pages by dragging components in order
4. Publish each project with remix enabled
5. Copy the remix URLs

- [ ] **Step 2: Create the gallery Framer project**

In Framer:
1. Create a new project named "Template Gallery"
2. Set up a CMS collection matching `gallery/cms-schema.json`
3. Add the two template entries with their preview screenshots, remix URLs, and JSON files
4. Design the gallery page:
   - Header with site title + description
   - Grid of template cards (CMS-connected)
   - Each card shows: preview image, name, category, "Personalize" button
5. Design the template detail page (CMS template):
   - Large preview image
   - Description, section count, color swatch
   - "Download JSON Prompts" button
   - "Personalize in Framer" button (links to remix URL)
6. Publish the gallery site

- [ ] **Step 3: Update READMEs with live links**

Update both `templates/nexus-saas/README.md` and `templates/folio/README.md`:
- Replace preview placeholder with the published Framer URL
- Replace remix placeholder with the remix/duplicate URL

- [ ] **Step 4: Final commit**

```bash
git add templates/nexus-saas/README.md templates/folio/README.md
git commit -m "feat: add live preview and remix links for POC templates"
```

---

### Task 13: Validate End-to-End User Journey

**Files:**
- No new files — this is a validation task

- [ ] **Step 1: Test gallery browsing**

Open the published gallery URL in an incognito browser:
- [ ] Gallery loads with both templates visible
- [ ] Category tags display correctly
- [ ] Preview images render at correct aspect ratio

- [ ] **Step 2: Test template preview**

Click into each template's detail page:
- [ ] Large preview image displays
- [ ] Description and metadata are correct
- [ ] JSON download link works (file downloads, valid JSON)

- [ ] **Step 3: Test "Personalize" flow**

Click "Personalize in Framer" for each template:
- [ ] Redirects to Framer
- [ ] User gets a copy of the project in their account
- [ ] All components, styles, and assets are present in the remix
- [ ] Content is editable via Framer property controls

- [ ] **Step 4: Test JSON prompt usability**

Open a downloaded `asset-prompts.json`:
- [ ] Valid JSON (parses without errors)
- [ ] Color values are real hex codes
- [ ] Asset prompts are detailed enough to regenerate with an AI image tool
- [ ] Modifying a color value and re-applying would produce a coherent alternate theme

- [ ] **Step 5: Document POC learnings**

Create `workflow/poc-learnings.md` with:
- What worked well in the spec → Jules → Framer pipeline
- What needed manual intervention
- Spec format changes needed before scaling to 15
- Time estimates for the full 15-template build

```bash
git add workflow/poc-learnings.md
git commit -m "docs: document POC learnings for scaling to 15 templates"
```
