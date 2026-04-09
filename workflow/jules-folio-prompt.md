# Jules Task: Build Folio Portfolio Template in Framer

Build a minimalist creative portfolio as a Framer project. This template should showcase Framer's motion and interaction capabilities — scroll-driven reveals, shared layout transitions, and gesture-driven UI — not just a static grid of images.

---

## Platform: Framer

You are building inside **Framer** (framer.com). Key constraints:

- **Code components** use React + TypeScript, bundled by Framer's compiler
- Only `framer` and `framer-motion` are available as imports (no npm)
- Use `addPropertyControls` from `"framer"` so users can edit content in Framer's visual editor
- Use **CSS modules** or inline styles (no Tailwind, no styled-components)
- Responsive design via Framer's **responsive variants** (Desktop / Tablet / Mobile), not CSS media queries
- Assets: use placeholder images from `https://images.unsplash.com` with relevant queries

## What Makes This a Great Framer Template

Don't just build a static page. Lean into what Framer does better than raw code:

### Motion (framer-motion)
- **Scroll-driven animations**: Use `useScroll()` + `useTransform()` for parallax, progressive reveals, scroll-linked drawing
- **Layout animations**: Use `layoutId` for shared element transitions (e.g., project thumbnail → detail view morph)
- **Spring physics**: Use `type: "spring"` for organic motion — except where the spec calls for mechanical/snappy motion
- **Gesture interactions**: `whileHover`, `whileTap` for tactile feedback on project cards
- **`AnimatePresence`**: For mount/unmount transitions (project detail expand, dark mode crossfade, mobile menu)
- **SVG path animation**: Use `pathLength` for the timeline draw-in effect

### Property Controls
Every component must have `addPropertyControls()` so template users can customize:
- Text content (name, bio, project titles)
- Colors (accent, background, text)
- Toggle dark mode default
- Image URLs for projects and portrait
- Enum selectors for layout variants

### Component Composition
- Build small, reusable pieces (SectionLabel, ProjectCard, TimelineEntry) that compose into sections
- Each section is a standalone code component droppable onto the Framer canvas
- Use Framer's `RenderTarget.canvas()` to detect preview vs. live mode

---

## Template: Folio Portfolio

**Mood:** Clean, editorial, typographically bold. Black-and-white with Swiss Red as a functional accent. Confident negative space.

### Color Palette
| Token | Value (Light) | Value (Dark) | Usage |
|-------|---------------|--------------|-------|
| background | `#fafafa` | `#111111` | Page background |
| surface | `#ffffff` | `#1a1a1a` | Cards, elevated areas |
| text | `#171717` | `#e5e5e5` | Body text |
| muted | `#a3a3a3` | `#666666` | Secondary text |
| accent | `#FF3000` | `#FF3000` | CTAs, hover states, section numbers |
| border | `#171717` | `#333333` | Visible structural borders |

### Typography
- **Headings**: Playfair Display, weight 700, scale: 72 / 48 / 32 / 24px
- **Body**: Inter, weight 400, 17px, line-height 1.7
- **Design principle**: Massive headlines (72px+ on desktop), extreme scale contrast between heading and body

### Spacing
- Section gap: 160px
- Content max-width: 1100px
- Grid gap: 20px
- Border radius: 0px (sharp rectangles) except images: 8px

### Signature Elements
- Numbered section labels ("01. Work", "02. About") in accent color
- Strict left alignment, ragged-right text
- Asymmetric column ratios (40/60) creating visual tension
- Color-inversion hover states (not opacity fades)
- No drop shadows — depth from borders and color inversions

---

## Sections to Build

### 1. Navbar
Fixed top, transparent — overlays content. Name/logo left, links right (Work, About, Contact), dark mode toggle.

**Framer Motion:**
- Dark mode toggle: `AnimatePresence` crossfade between sun/moon icon with `layoutId="theme-icon"` morph
- Mobile hamburger: `AnimatePresence` for menu slide-in from right
- On scroll past hero: name shrinks via `useTransform(scrollY, [0, 300], [1, 0.85])` scale

**Property Controls:** name, nav links array, default theme (light/dark)

### 2. Hero / Intro
Full-viewport, centered. Massive display name (Playfair Display, 72px+), one-line tagline, scroll indicator at bottom.

**Framer Motion:**
- **Typewriter effect**: Name characters animate in sequentially using `variants` with `staggerChildren: 0.05` — each letter: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` with spring
- Tagline: delayed fade-in `transition={{ delay: nameLength * 0.05 + 0.3 }}`
- Scroll indicator: `animate={{ y: [0, 8, 0] }}` with `repeat: Infinity, duration: 1.5`
- Background: subtle noise texture via CSS `background-image` with film grain

**Property Controls:** display name, tagline, show scroll indicator toggle

### 3. Selected Work (Project Grid)
Masonry-style 2-column grid. Each project: full-bleed image with hover overlay showing title + category.

**Framer Motion:**
- **Scroll reveal**: Each image uses `useScroll({ target: ref })` + `useTransform` to animate `clipPath` from `inset(100% 0 0 0)` → `inset(0)` as it enters viewport — a wipe-up reveal
- **Hover**: `whileHover` triggers overlay — title slides up from bottom via `y: [20, 0]`, image zooms `scale: 1.05`
- **Click → Detail**: `layoutId={projectId}` on the image so it morphs seamlessly into the detail view

**Property Controls:** array of projects (title, category, image URL, description, role, date)

### 4. Project Detail (Inline Expand)
Expands below clicked project. Large hero image, title, role/date, description, horizontal image gallery.

**Framer Motion:**
- **`AnimatePresence`** wraps the detail — `initial={{ height: 0, opacity: 0 }}` → `animate={{ height: "auto", opacity: 1 }}`
- **`layoutId={projectId}`** on the hero image — shared transition from grid thumbnail
- Gallery: horizontal scroll container with `drag="x"` and `dragConstraints` for swipeable gallery
- Close button: `whileHover={{ rotate: 90 }}` with spring

**Property Controls:** inherits from project data in Section 3

### 5. About
Two-column (40/60 split). Left: portrait photo. Right: bio paragraphs, skills as inline tags, resume download button.

**Framer Motion:**
- Portrait: `useScroll` driven — enters with `scale: [0.92, 1]` and `opacity: [0, 1]` mapped to scroll progress
- Skills tags: stagger in with `staggerChildren: 0.04`, each tag `initial={{ opacity: 0, x: -10 }}`
- Resume button: `whileHover` color inversion (bg ↔ text swap) — not opacity

**Property Controls:** portrait URL, bio text, skills array, resume file URL, resume button label

### 6. Experience Timeline
Vertical timeline, alternating left/right on desktop, left-only on mobile. Each entry: role, company, dates, description.

**Framer Motion:**
- **Timeline line**: SVG `<line>` with `pathLength` animated from 0 → 1 via `useScroll` + `useTransform` — line literally draws in as user scrolls
- Entries: stagger with `staggerChildren: 0.15`, each `initial={{ opacity: 0, x: isLeft ? -30 : 30 }}` → `animate={{ opacity: 1, x: 0 }}` with spring
- Timeline dots: `scale: [0, 1]` with spring as each entry enters

**Property Controls:** array of entries (role, company, start date, end date, description)

### 7. Contact
Centered, minimal. H2 heading, email as the hero element (large, clickable), social icons row.

**Framer Motion:**
- Email: `whileHover={{ scale: 1.03, color: "#FF3000" }}` with spring
- Social icons: `whileHover={{ y: -3 }}` with `staggerChildren` on the row for entrance
- Section entrance: fade up with `useScroll`

**Property Controls:** heading text, email address, social links array (platform, URL)

### 8. Footer
Single centered line. Copyright, "Built with Framer" credit, back-to-top button.

**Framer Motion:**
- Back-to-top button: `whileHover={{ y: -3 }}`, on click smoothly scrolls via `window.scrollTo({ top: 0, behavior: "smooth" })`

**Property Controls:** copyright text, show "Built with Framer" toggle

---

## Dark Mode Implementation

Implement dark mode as a React context (`ThemeProvider`) that swaps the color palette:
- Store preference in `localStorage`
- `AnimatePresence` crossfade on theme switch (300ms)
- All components read colors from the theme context, never hardcoded
- Default to system preference via `prefers-color-scheme` media query

---

## File Structure

```
folio/
  components/
    shared/
      theme.ts            # Light/dark palettes, typography, spacing tokens
      ThemeProvider.tsx    # Dark mode context + toggle logic
      SectionLabel.tsx     # "01. Work" numbered labels
      Button.tsx           # Primary with color-inversion hover
      Container.tsx        # Max-width wrapper
    Navbar.tsx
    Hero.tsx
    ProjectGrid.tsx
    ProjectDetail.tsx
    About.tsx
    Timeline.tsx
    Contact.tsx
    Footer.tsx
  preview.html            # Full-page preview
  SETUP.md                # How to import into Framer
```

## Quality Checklist

- [ ] Every component has `addPropertyControls()` with sensible defaults
- [ ] `layoutId` creates shared transitions between project grid thumbnails and detail view
- [ ] Timeline draws in via SVG `pathLength` animated with `useScroll`
- [ ] Scroll-driven reveals use `useScroll` + `useTransform` (not IntersectionObserver)
- [ ] Dark mode works via context with `AnimatePresence` crossfade
- [ ] Color-inversion hover states on interactive elements (not opacity)
- [ ] `AnimatePresence` wraps all mount/unmount animations
- [ ] Typography follows extreme scale contrast (72px+ headings, 17px body)
- [ ] No drop shadows anywhere — depth from borders and color only
- [ ] Components are self-contained and droppable onto Framer canvas independently

## Asset Prompts

Use these descriptions to source placeholder images:

| ID | Type | Size | Description |
|----|------|------|-------------|
| project-image-1 | photo | 1200×800 | Clean flat-lay mobile app on smartphone, minimal white desk, soft natural light, editorial style |
| project-image-2 | photo | 1200×1600 | Brand identity mockup, business cards and letterhead on textured paper, overhead, warm cream bg |
| project-image-3 | photo | 1200×800 | Web design on laptop in bright studio, clean desk, plant, natural light |
| project-image-4 | photo | 1200×1600 | Premium packaging mockup, 45° angle, studio lit, matte finish, elegant typography |
| about-portrait | photo | 600×800 | Creative professional portrait, off-camera gaze, window light, black clothing, warm tones |
| detail-gallery | photo | 1400×900 | Design process close-ups: typography selection, responsive screens on desk |
| noise-texture | pattern | 400×400 | Subtle monochrome film grain, 5% opacity, tileable |
