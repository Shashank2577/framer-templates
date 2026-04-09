# Jules Task: Build Nexus SaaS Template in Framer

Build a dark-themed SaaS landing page as a Framer project. This template should showcase Framer's strengths — motion, interactivity, and component composition — not just static layout.

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
- **Scroll-driven animations**: Use `useScroll()` + `useTransform()` for parallax, progressive reveals, and scroll-linked opacity/scale
- **Spring physics**: Use `type: "spring"` transitions (not `ease-out`) for organic feel — `stiffness: 100, damping: 20` as baseline
- **Layout animations**: Use `layoutId` for shared element transitions (e.g., pricing toggle morphs between states)
- **Gesture interactions**: `whileHover`, `whileTap`, `whileDrag` for tactile feedback
- **Stagger**: Use `staggerChildren` in parent variants for sequential reveals
- **`AnimatePresence`**: For mount/unmount transitions (FAQ expand, mobile menu)

### Property Controls
Every component must have `addPropertyControls()` so template users can customize:
- Text content (titles, descriptions, button labels)
- Colors (accent color, background)
- Toggle sections on/off
- Image URLs
- Enum selectors for layout variants

### Component Composition
- Build small, reusable pieces (Button, SectionHeader, Card) that compose into sections
- Each section is a standalone code component droppable onto the Framer canvas
- Use Framer's `RenderTarget.canvas()` to detect preview vs. live mode

---

## Template: Nexus SaaS

**Mood:** Dark, premium, tech-forward. Purple-violet energy with green success accents.

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| background | `#0a0a0f` | Page background |
| surface | `#1a1a2e` | Cards, elevated elements |
| primary | `#7c3aed` | CTAs, accents, gradients |
| secondary | `#22c55e` | Success states, highlights |
| text | `#e4e4e7` | Body text |
| muted | `#71717a` | Secondary text |

### Typography
- **Headings**: Inter, weight 700, scale: 56 / 40 / 28 / 20px
- **Body**: Inter, weight 400, 16px, line-height 1.6

### Spacing
- Section gap: 120px
- Content max-width: 1200px
- Grid gap: 24px
- Border radius: 12px cards, 8px buttons, 16px images

---

## Sections to Build

### 1. Navbar
Fixed top, transparent → filled on scroll. Logo left, links center (Features, Pricing, FAQ), CTA button right.

**Framer Motion:**
- `useScroll()` + `useTransform()` to interpolate background opacity and backdrop blur as user scrolls
- `AnimatePresence` for mobile hamburger menu slide-in

**Property Controls:** logo text, nav links array, CTA label, CTA link

### 2. Hero
Two-column (60/40) desktop, stacked mobile. Left: overline badge, H1 (max 8 words), paragraph, two buttons. Right: hero graphic.

**Framer Motion:**
- Hero graphic: `animate={{ y: [0, -10, 0] }}` with `transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }`
- Text elements: staggered entrance with `variants` and `staggerChildren: 0.12`
- Buttons: `whileHover={{ scale: 1.04 }}` with spring transition
- Background: radial gradient glow behind the hero graphic, animated with `useTransform` tied to scroll

**Property Controls:** overline text, headline, body, primary CTA, secondary CTA, hero image URL

### 3. Logo Bar
"Trusted by" label + 5-6 grayscale logos in a row.

**Framer Motion:**
- Logos: `whileHover={{ filter: "grayscale(0)" }}` from default `filter: "grayscale(1)"`
- Infinite scroll marquee using `animate={{ x: [0, -totalWidth] }}` with `repeat: Infinity`

**Property Controls:** label text, logo image URLs array

### 4. Features Grid
Section header (H2 + subtitle) above a 3×2 grid of feature cards. Each card: icon, title, description.

**Framer Motion:**
- Cards enter with `useScroll()` on the section — `useTransform(scrollYProgress, [0, 0.3], [60, 0])` for Y offset, same for opacity
- `whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(124,58,237,0.15)" }}` with spring
- Icons: subtle `whileHover={{ rotate: 5 }}` 

**Property Controls:** section title, subtitle, array of 6 features (icon, title, description)

### 5. Product Screenshot
Full-width browser-frame mockup with perspective tilt.

**Framer Motion:**
- Scroll-driven: `useTransform(scrollYProgress, [0, 1], ["perspective(1200px) rotateX(8deg)", "perspective(1200px) rotateX(0deg)"])` — screenshot flattens as user scrolls to it
- Subtle shadow that deepens on scroll approach

**Property Controls:** screenshot image URL, caption title, caption subtitle

### 6. Testimonials
3-column grid of testimonial cards (avatar, quote, name, role). Carousel on mobile.

**Framer Motion:**
- Cards stagger in from bottom using `variants` + `staggerChildren: 0.15`
- Left accent border animates from height 0 to full using `useScroll`
- `whileHover={{ scale: 1.02 }}` with spring

**Property Controls:** array of testimonials (avatar URL, quote, name, role)

### 7. Pricing
Three-tier pricing (Basic / Pro / Enterprise). Pro tier highlighted with primary border + "Most Popular" badge. Monthly/Annual toggle.

**Framer Motion:**
- **`layoutId="pricing-highlight"`** on the active toggle indicator — morphs between Monthly/Annual positions
- Cards: `whileHover={{ scale: 1.03 }}` with spring
- Pro card entrance: slightly delayed, with `scale: [0.95, 1]` spring entrance
- Price value: `AnimatePresence` + counter transition when toggling monthly/annual

**Property Controls:** toggle labels, array of 3 tiers (name, monthly price, annual price, features list, CTA label, highlighted boolean)

### 8. FAQ
Accordion, max-width 720px centered. 6 items.

**Framer Motion:**
- `AnimatePresence` for expand/collapse with `initial={{ height: 0, opacity: 0 }}` and `animate={{ height: "auto", opacity: 1 }}`
- Chevron: `animate={{ rotate: isOpen ? 180 : 0 }}` with spring
- Items stagger on scroll entry

**Property Controls:** array of FAQ items (question, answer)

### 9. CTA Banner
Full-width gradient background (primary → primary/80), H2 + subtitle + button in centered layout.

**Framer Motion:**
- Background gradient subtly shifts via `useTransform` tied to scroll (hue rotation or position shift)
- Button: `whileHover={{ scale: 1.06 }}` + `whileTap={{ scale: 0.97 }}`

**Property Controls:** headline, subtitle, CTA label, CTA link

### 10. Footer
4-column link grid (Company, Product, Resources, Legal) + bottom bar with copyright and social icons.

**Framer Motion:**
- Social icons: `whileHover={{ y: -2, color: "#7c3aed" }}` with spring
- Columns stagger in on scroll

**Property Controls:** column arrays (title + links), copyright text, social links

---

## File Structure

```
nexus-saas/
  components/
    shared/
      theme.ts          # Color, typography, spacing tokens
      Button.tsx         # Primary/secondary/ghost variants
      SectionHeader.tsx  # H2 + subtitle + optional badge
      Container.tsx      # Max-width wrapper
    Navbar.tsx
    Hero.tsx
    LogoBar.tsx
    FeaturesGrid.tsx
    ProductScreenshot.tsx
    Testimonials.tsx
    Pricing.tsx
    FAQ.tsx
    CTABanner.tsx
    Footer.tsx
  preview.html          # Full-page preview rendering all sections
  SETUP.md              # How to import into Framer
```

## Quality Checklist

- [ ] Every component has `addPropertyControls()` with sensible defaults
- [ ] Scroll-driven animations use `useScroll` + `useTransform` (not IntersectionObserver)
- [ ] Layout transitions use `layoutId` where elements morph between states
- [ ] All transitions use spring physics (not ease/linear) except intentional mechanical effects
- [ ] `AnimatePresence` wraps all mount/unmount animations
- [ ] Responsive via Framer responsive variants, not CSS media queries
- [ ] No hardcoded content — everything editable via property controls
- [ ] Dark theme colors match the palette table exactly
- [ ] Stagger patterns use `variants` with `staggerChildren`, not manual delays
- [ ] Components are self-contained and droppable onto Framer canvas independently

## Asset Prompts

Use these descriptions to source placeholder images:

| ID | Type | Size | Description |
|----|------|------|-------------|
| hero-illustration | illustration | 800×600 | Minimal 3D isometric floating SaaS dashboard, glowing purple accents, dark bg, frosted glass cards |
| product-screenshot | illustration | 1200×800 | Dark SaaS dashboard with analytics charts, purple accents, browser chrome frame |
| feature-icons | SVG | 64×64 | Minimal line icons (2px stroke, purple, rounded caps): lightning bolt, shield+check, bar chart, puzzle pieces, speech bubbles, gear+arrow |
| testimonial-avatars | photo | 96×96 | Professional headshots, neutral bg, warm lighting, business casual |
| cta-background | pattern | 1440×400 | Subtle purple dot grid at 10% opacity on dark bg, tileable |
