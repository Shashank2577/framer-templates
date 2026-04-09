# Jules Task: Build Folio Portfolio Template

This is the complete, self-contained prompt for a Jules session to build the Folio creative portfolio Framer template.
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

# Folio — Template Spec

**Category:** Creative Portfolio / CV
**Design Reference:** designprompts_dev_all_styles.md — Style #29 "Swiss" (International Typographic Style)
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

--- ASSET PROMPTS JSON ---

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

--- DESIGN SYSTEM REFERENCE ---

## Design System: Swiss International (Style #29)

### Key Design Tokens to Apply

**Color Strategy:** Strict monochrome + Swiss Red accent
- Background: `#FFFFFF` (pure white)
- Foreground: `#000000` (pure black)
- Muted: `#F2F2F2` (light gray)
- Accent: `#FF3000` (Swiss Red — used ONLY functionally: CTAs, highlights, hover states)
- Border: `#000000` (visible structure)

**IMPORTANT:** The asset-prompts.json uses a light minimalist theme (#fafafa background). The Swiss design system's monochrome palette aligns well. ADAPT the Swiss Red accent as a secondary color for interactive elements, while keeping the neutral warm palette from asset-prompts.json as the primary.

**Typography:** Single-font system with extreme scale contrast
- Font: Inter, weights 400-900
- Headings: Black (900) or Bold (700), UPPERCASE, tight tracking
- Body: Regular (400) or Medium (500)
- Scale: MASSIVE headlines (text-7xl to text-9xl desktop), standard body

**IMPORTANT:** The asset-prompts.json specifies Playfair Display for headings. USE Playfair Display as specified — this overrides the Swiss system's font choice. The Swiss system's principles (extreme scale contrast, tight tracking, massive headlines) still apply.

**Signature Elements (MUST IMPLEMENT):**
1. Massive responsive typography (headlines scale from text-6xl mobile to text-9xl+ desktop)
2. Visible grid structure via thick 4px borders and background patterns
3. Numbered section labels (01. Work, 02. About, etc.) with accent color
4. Strict left alignment (flush-left, ragged-right text)
5. Asymmetric column ratios (8:4, 7:5 etc.) creating visual tension
6. Pattern-based textures: grid (24px), dot matrix (16px), diagonal lines, noise
7. Color inversion hover states (not opacity fades)

**Motion:**
- Feel: Instant, mechanical, snappy, precise (NOT elastic/spring)
- Transitions: duration-200 ease-out or duration-150 ease-linear
- Hover: Color inversions, scale 1.0→1.05, rotation for icons
- No spring animations — geometric and purposeful movement

**EXCEPTION:** The template spec calls for letter-by-letter type effect, clip-path reveals, and scroll-drawn timeline. These are spec requirements that OVERRIDE the Swiss system's "snappy" defaults. Implement these specific animations as described in the template spec.

**Borders & Radius:**
- Radius: 0px (strictly rectangular) — EXCEPT where asset-prompts.json specifies border_radius.images: 8px
- Borders: Thick, visible (border-2 or border-4 in black)

**No Shadows:** The Swiss system uses no drop shadows. Depth comes from pattern overlays and color inversions.
