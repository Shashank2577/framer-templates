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
