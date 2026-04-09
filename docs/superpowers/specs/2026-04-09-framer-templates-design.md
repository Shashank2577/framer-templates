# Framer Template Gallery — Design Spec

**Date:** 2026-04-09
**Status:** Draft
**Author:** Claude Opus (brainstormed with user)

---

## 1. Overview

A template gallery built entirely in Framer where users can browse, preview, and personalize website templates. Each template ships with a detailed JSON prompt spec so users can regenerate or customize visual assets for their own brand.

### Goals

- Build 15 Framer templates across diverse categories (SaaS, portfolio, agency, e-commerce, etc.)
- Provide a gallery site in Framer with live previews and "Personalize" buttons
- Ship JSON asset prompts per template so users can recreate visuals with their own branding
- Leverage an existing library of ~150 designs as the asset pool

### Non-Goals

- No backend infrastructure (Framer handles hosting and CMS)
- No user authentication or accounts
- No payment/monetization system (can be added later)
- No custom code export — users personalize within Framer

---

## 2. Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                    CREATION PIPELINE                     │
│                                                          │
│  Claude Opus ──► Template Specs + JSON ──► Jules Sessions│
│  (design)         (handoff artifacts)       (build)      │
└─────────────────────────────────┬────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────┐
│                    FRAMER ECOSYSTEM                       │
│                                                          │
│  Gallery Site (Framer)                                   │
│    ├── Framer CMS (template catalog)                     │
│    ├── Template preview pages                            │
│    ├── JSON prompt downloads                             │
│    └── "Personalize" buttons → Framer remix URLs         │
│                                                          │
│  Template Projects (15 separate Framer projects)         │
│    ├── Each published with remix enabled                 │
│    └── Each built from design spec + existing designs    │
└─────────────────────────────────────────────────────────┘
```

### No Backend Required

- Framer hosts the gallery site (custom domain or `.framer.app`)
- Framer CMS manages the template catalog (name, category, preview image, remix link, JSON file)
- Remix links are native Framer URLs (`framer.com/projects/xxx/remix`)
- JSON prompt files served as static downloads or displayed inline

---

## 3. Template Spec Format

Each template produces two artifacts:

### 3.1 `template-spec.md` — Design Blueprint

The blueprint Jules uses to build the Framer project. Contains:

- **Template name and category**
- **Design reference** — which design(s) from the ~150 library to use/adapt
- **Sections in order** — each section with its purpose, content requirements, and layout description
- **Responsive breakpoints** — Desktop (1440px), Tablet (768px), Mobile (375px)
- **Interactions** — scroll animations, hover states, transitions
- **Component references** — specific 21st.dev components to use

Example structure:
```
Template Name: "Nexus SaaS"
Category: SaaS / Product Landing Page
Design Reference: design-042

Sections:
  1. Hero — headline, subhead, CTA button, hero image/illustration
  2. Logo Bar — 5-6 partner/client logos
  3. Features Grid — 3 columns, icon + title + description
  4. Product Screenshot — full-width with annotations
  5. Testimonials — 3 cards, avatar + quote + name
  6. Pricing — 3 tiers, highlight recommended
  7. FAQ — accordion style
  8. CTA Banner — final conversion section
  9. Footer — links, social, newsletter

Responsive: Desktop (1440), Tablet (768), Mobile (375)
Interactions: Scroll-triggered fade-ins, hover states on cards
```

### 3.2 `asset-prompts.json` — Visual Recipe

A JSON file describing every visual property of the template. Serves dual purpose:
1. **Build spec** — Jules uses it to apply the right visual treatment
2. **User artifact** — users download it, tweak values, and regenerate assets for their brand

Schema:
```json
{
  "template": "<template-slug>",
  "theme": {
    "colors": {
      "primary": "<hex>",
      "secondary": "<hex>",
      "background": "<hex>",
      "surface": "<hex>",
      "text": "<hex>",
      "muted": "<hex>"
    },
    "typography": {
      "heading": {
        "family": "<font-name>",
        "weight": "<number>",
        "scale": ["<size-h1>", "<size-h2>", "<size-h3>", "<size-h4>"]
      },
      "body": {
        "family": "<font-name>",
        "weight": "<number>",
        "size": "<number>",
        "lineHeight": "<number>"
      }
    },
    "spacing": {
      "section_gap": "<px>",
      "content_max_width": "<px>",
      "grid_gap": "<px>"
    },
    "border_radius": {
      "cards": "<px>",
      "buttons": "<px>",
      "images": "<px>"
    },
    "image_style": {
      "treatment": "<style-keyword>",
      "aesthetic": "<style-keyword>",
      "palette_mood": "<style-keyword>"
    }
  },
  "assets": [
    {
      "id": "<asset-slug>",
      "type": "illustration | photo | icon | pattern",
      "dimensions": "<width>x<height>",
      "prompt": "<detailed generation prompt>"
    }
  ]
}
```

---

## 4. User Journey

```
Browse Gallery → Preview Template → Download JSON Prompts → Click "Personalize" → Opens in Framer → Customize & Publish
```

### 4.1 Gallery Site

- **Home page:** Grid/list of all templates with category filters
- **Template card:** Preview image, template name, category tag
- **Template detail page:** Full preview (screenshot or embedded), description, JSON prompt viewer/download, "Personalize in Framer" button
- **CMS-driven:** All template data managed in Framer CMS so adding new templates requires no code changes

### 4.2 Personalization Flow

1. User clicks "Personalize" on a template
2. Opens Framer remix URL — user gets a full copy in their Framer account
3. User can modify: content, colors, images, layout, animations — everything Framer allows
4. Optionally: user downloads JSON prompts, modifies them, regenerates assets with AI tools, and swaps them into their remixed Framer project

---

## 5. Template Categories (Full 15)

| # | Category | Template Name (Working) |
|---|----------|------------------------|
| 1 | SaaS / Product | Nexus SaaS |
| 2 | Creative Portfolio | Folio |
| 3 | Agency / Studio | Atelier |
| 4 | Blog / Magazine | Inkwell |
| 5 | E-commerce / Store | Storefront |
| 6 | Restaurant / Food | Saveur |
| 7 | Real Estate | Dwelling |
| 8 | Startup / VC | Launchpad |
| 9 | Personal / Resume | Vitae |
| 10 | Event / Conference | Summit |
| 11 | Education / Course | Academe |
| 12 | Health / Fitness | Kinetic |
| 13 | Photography | Aperture |
| 14 | Non-profit / Charity | Beacon |
| 15 | Dashboard / App Showcase | Command |

---

## 6. POC Scope

Build 2 templates end-to-end to validate the workflow before scaling to 15.

### POC Templates

1. **Nexus SaaS** (SaaS Landing Page) — structured, section-heavy, tests grids/pricing/CTAs
2. **Folio** (Creative Portfolio) — visual-heavy, minimal text, tests galleries/case studies

### POC Deliverables

- 2 complete `template-spec.md` files
- 2 complete `asset-prompts.json` files
- 2 Framer projects built by Jules with remix links enabled
- 1 minimal gallery page in Framer showing both templates with "Personalize" buttons
- Workflow documentation for scaling to 15

### POC Success Criteria

- A user can visit the gallery, preview a template, click "Personalize", and get a working copy in their Framer account
- The JSON prompt file is downloadable and contains enough detail to regenerate the visual style
- The spec format is clear enough that Jules can build a template from it without ambiguity

---

## 7. Orchestration Pipeline

### Step 1: Design (Claude Opus)

- Select designs from the ~150 library for each template
- Write `template-spec.md` with section-by-section layout
- Write `asset-prompts.json` with full visual properties
- Use 21st.dev for component references, UI/UX Pro Max for design quality, Pencil for mockups

### Step 2: Build (Jules Sessions — Parallel)

- One Jules session per template (2 for POC, 15 at scale)
- Each session receives: `template-spec.md` + `asset-prompts.json` + design reference
- Jules builds the Framer project, generates/adapts assets, applies 21st.dev components
- Jules publishes the project and generates a remix link

### Step 3: Assembly (Gallery)

- Build the Framer gallery site
- Create CMS collection with fields: name, category, preview_image, remix_url, json_file
- Add template entries
- Wire "Personalize" buttons to remix URLs

### Step 4: Scale (After POC Validation)

- Refine spec format based on POC learnings
- Generate specs for remaining 13 templates
- Spin up 13 parallel Jules sessions
- Add all templates to gallery CMS

---

## 8. Tools & Dependencies

| Tool | Purpose |
|------|---------|
| **Framer** | Build templates + gallery site, host everything, CMS |
| **21st.dev** | Component library for consistent, high-quality UI components |
| **UI/UX Pro Max** | Design quality validation and style guidance |
| **Pencil** | Mockup creation and design iteration |
| **Jules** | Parallel build sessions for Framer projects |
| **Existing Design Library** | ~150 designs as asset pool |

---

## 9. File Structure

```
framer-templates/
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-04-09-framer-templates-design.md  (this file)
├── templates/
│   ├── nexus-saas/
│   │   ├── template-spec.md
│   │   ├── asset-prompts.json
│   │   └── README.md  (remix link, preview, notes)
│   └── folio/
│       ├── template-spec.md
│       ├── asset-prompts.json
│       └── README.md
├── gallery/
│   └── cms-schema.json  (CMS collection definition)
└── workflow/
    └── jules-prompt-template.md  (reusable prompt for Jules sessions)
```

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Jules can't build directly in Framer (no API) | Primary path: Jules builds React components + assets that can be pasted into Framer's code components. Fallback: Jules produces a detailed build guide with all code/assets, and you assemble in Framer manually. Either way, the spec + JSON are the source of truth. |
| Framer remix links change format | Document the URL pattern; abstract behind CMS field |
| Design library designs don't fit template layouts | Spec includes adaptation notes; assets are guidelines, not rigid requirements |
| JSON prompt format too complex for users | Provide a "quick start" section with just colors + fonts; full spec for power users |
