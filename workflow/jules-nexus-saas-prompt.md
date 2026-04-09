# Jules Task: Build Nexus SaaS Template

This is the complete, self-contained prompt for a Jules session to build the Nexus SaaS Framer template.
Paste this entire file into Jules. It includes the task instructions, template spec, asset prompts, and design system reference.

---

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

--- TEMPLATE SPEC ---

# Nexus SaaS — Template Spec

**Category:** SaaS / Product Landing Page
**Design Reference:** designprompts_dev_all_styles.md — Style #27 "SaaS" (Minimalist Modern)
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

--- ASSET PROMPTS JSON ---

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

--- DESIGN SYSTEM REFERENCE ---

## Design System: Minimalist Modern (SaaS Style #27)

### Key Design Tokens to Apply

**Color Strategy:** Warm near-monochrome + Electric Blue gradient accent
- Background: `#FAFAFA` (warm off-white)
- Foreground: `#0F172A` (deep slate, not pure black)
- Muted: `#F1F5F9` (slate-100)
- Accent: `#0052FF` → `#4D7CFF` (Electric Blue gradient)
- Card: `#FFFFFF`
- Border: `#E2E8F0`

**IMPORTANT:** The asset-prompts.json uses a DARK theme (#0a0a0f background) which OVERRIDES these light tokens. Use the dark palette from asset-prompts.json as the primary theme, but adopt the design PATTERNS (gradient text, inverted sections, animated hero, section labels) from this design system.

**Typography:** Dual-font system
- Display: Calistoga (serif, warm, characterful) — for H1/H2
- UI/Body: Inter (clean sans-serif)
- Monospace: JetBrains Mono — for section labels, badges

**Signature Elements (MUST IMPLEMENT):**
1. Gradient text highlights on key headline words (bg-clip-text)
2. At least one inverted contrast section (dark bg with light text + dot pattern texture)
3. Animated hero graphic with rotating ring (60s), floating cards (4-5s bob), geometric shapes
4. Gradient icon backgrounds (not translucent fills)
5. Section label badges: pill shape, accent border, monospace uppercase text, animated dot
6. Pulsing indicators in badges (scale/opacity keyframes)
7. Gradient border effects on featured elements (2px stroke technique)

**Motion:**
- Entrance: fadeInUp (opacity 0→1, y 28→0, 0.7s, ease [0.16, 1, 0.3, 1])
- Stagger: 0.1s between children
- Floating: 4-5s ease-in-out infinite y-axis bob (±10px)
- Rotating ring: 60s linear infinite
- Hover: -translate-y-0.5, shadow deepens, brightness-110 on buttons

**Shadows:**
- Standard cards: `0 4px 6px rgba(0,0,0,0.07)`
- Elevated: `0 20px 25px rgba(0,0,0,0.1)`
- Accent-tinted: `0 4px 14px rgba(0,82,255,0.25)`

**Border Radius:** `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for prominent elements

**Textures:**
- Dot pattern: radial-gradient dots at 32px intervals, 3% opacity on dark sections
- Radial glows: blur-[150px] accent circles at 3-6% opacity at section corners
