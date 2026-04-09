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
