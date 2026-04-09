# Nexus SaaS Template Setup Guide

This guide explains how to import and use the Nexus SaaS template components in your Framer project.

## 1. Project Setup in Framer

1. Open your Framer project (or create a new one).
2. Ensure your project has the required fonts: **Inter**.
3. Create a new Code Component for each file in the `components` directory.

## 2. Importing Components

To use these components, you need to copy the code from each `.tsx` file into a new Code Component in Framer.

1. In Framer, go to the **Assets** panel.
2. Click the **+** button next to **Code** to create a new component.
3. Name it exactly as the file (e.g., `Navbar`, `Hero`, `Button`).
4. Paste the code from the corresponding `.tsx` file.

**Important Order of Creation:**
Create the shared components first, as the section components depend on them:
1. Create `theme` (save as `theme.ts` or just `theme` in Framer, ensuring exports match).
2. Create `Button`.
3. Create `Container`.
4. Create `SectionHeader`.
5. Create the main section components (`Navbar`, `Hero`, etc.).

*Note: You may need to adjust the import paths in the section components to point to where you placed the shared components in your Framer project.*

## 3. Assembling the Page

1. Switch to the **Pages** view.
2. Open your target page (e.g., Home).
3. Set the page's background color to `#0a0a0f` (the theme background color).
4. Drag and drop the section components from the **Assets** panel onto the canvas in the following order:
   - `Navbar`
   - `Hero`
   - `LogoBar`
   - `FeaturesGrid`
   - `ProductScreenshot`
   - `Testimonials`
   - `Pricing`
   - `FAQ`
   - `CTABanner`
   - `Footer`

## 4. Customizing Content

Each component uses Framer's Property Controls. You can edit the content directly in the visual editor!

1. Select a component on the canvas.
2. Look at the properties panel on the right.
3. You can change text, images, toggles, colors (where exposed), and array items.

### Changing Theme Colors

If you want to change the core colors, you need to edit the `theme.ts` code file directly. Here are the default tokens:

- background: `#0a0a0f`
- surface: `#1a1a2e`
- primary: `#7c3aed` (Purple)
- secondary: `#22c55e` (Green)
- text: `#e4e4e7`
- muted: `#71717a`

## 5. Responsive Design

These components are built to adapt automatically based on the width of their container or screen. They use media queries within their styles to adjust layouts for Desktop (1440px), Tablet (768px), and Mobile (375px/480px).
Ensure your Framer page variants are set up to match or let the components handle the flow naturally.
