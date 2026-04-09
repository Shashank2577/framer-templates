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
