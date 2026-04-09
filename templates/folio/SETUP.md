# Folio Template - Framer Setup

## Overview
Folio is a minimalist creative portfolio template designed exclusively for Framer. It utilizes `framer-motion` for scroll-driven reveals, shared layout transitions, and organic spring physics.

## Prerequisites
- A Framer account (framer.com)
- A new or existing Framer project

## Installation

1. Open your Framer project.
2. In the Assets panel (left sidebar), click the **+** next to "Code" to create a new Code Component.
3. For each file in the `components/` folder of this template:
   - Create a new code file in Framer with the same name (e.g., `Hero.tsx`).
   - Copy the contents of the local file and paste it into the Framer code editor.
4. Ensure you maintain the file structure, specifically the `shared/` folder.
   - Example: Create `shared/theme.ts` in Framer and paste the contents.

### Required Structure in Framer:
```
- shared/
  - theme.ts
  - ThemeProvider.tsx
  - SectionLabel.tsx
  - Button.tsx
  - Container.tsx
- Navbar.tsx
- Hero.tsx
- ProjectGrid.tsx
- ProjectDetail.tsx
- About.tsx
- Timeline.tsx
- Contact.tsx
- Footer.tsx
```

## Usage

Once all components are pasted into Framer:
1. Wrap your main page content in the `ThemeProvider` if you wish to use the global dark mode toggle.
2. Drag and drop individual sections (Hero, ProjectGrid, About, etc.) onto your canvas.
3. Select any component on the canvas to edit its content via the **Property Controls** panel on the right.
4. Customize text, upload your own images, tweak colors, and adjust layout properties visually.

## Note on Dependencies
These components strictly rely on `framer` and `framer-motion`, which are built into Framer. No external npm packages are required.
