# Nexus SaaS Template Setup Guide

This guide explains how to import and use the Nexus SaaS template components in your Framer project.

## Quick Start (Recommended)

**Use the copy helper script** to quickly copy component code to your clipboard:

```bash
# From the project root
npm run copy:nexus        # List all components
npm run copy:nexus Navbar # Copy specific component
npm run copy:install      # Interactive copy all components
```

Then paste each component into Framer's Code Component editor.

## Option 1: Framer Plugin (Easiest)

1. Build the Template Installer plugin:
   ```bash
   npm run plugin:build
   ```

2. In Framer, go to **Plugins** → **Install Plugin**
3. Select the `plugin/dist` folder

4. Click the plugin icon, select "Nexus SaaS", and click **Install**
5. All components appear in your Assets panel automatically!

## Option 2: Manual Import

### 1. Project Setup in Framer

1. Open your Framer project (or create a new one).
2. Ensure your project has the required fonts: **Inter**.
3. Create a new Code Component for each file in the `components` directory.

### 2. Importing Components

To use these components, copy the code from each `.tsx` file into a new Code Component in Framer.

**Using the helper script:**
```bash
cd scripts
node copy-components.js nexus-saas          # List components
node copy-components.js nexus-saas Navbar  # Copy specific component
```

**Or manually:**
1. In Framer, go to the **Assets** panel.
2. Click the **+** button next to **Code** to create a new component.
3. Name it exactly as the file (e.g., `Navbar`, `Hero`, `Button`).
4. Paste the code from the corresponding `.tsx` file.

**Important Order of Creation:**
Create the shared components first, as the section components depend on them:
1. `theme` (save as `theme.ts` or `theme`)
2. `Button`
3. `Container`
4. `SectionHeader`
5. Main sections: `Navbar`, `Hero`, `LogoBar`, `FeaturesGrid`, `ProductScreenshot`, `Testimonials`, `Pricing`, `FAQ`, `CTABanner`, `Footer`

### 3. Assembling the Page

1. Switch to the **Pages** view.
2. Open your target page (e.g., Home).
3. Set the page's background color to `#0a0a0f`
4. Drag and drop sections from the **Assets** panel onto the canvas in order:
   - `Navbar` → `Hero` → `LogoBar` → `FeaturesGrid` → `ProductScreenshot` → `Testimonials` → `Pricing` → `FAQ` → `CTABanner` → `Footer`

## 4. Customizing Content

Each component uses Framer's Property Controls. Edit content directly in the visual editor!

1. Select a component on the canvas.
2. Look at the properties panel on the right.
3. Change text, images, toggles, colors, and array items.

### Changing Theme Colors

Edit the `theme.ts` code file directly. Default tokens:
- background: `#0a0a0f`
- surface: `#1a1a2e`
- primary: `#7c3aed` (Purple)
- secondary: `#22c55e` (Green)
- text: `#e4e4e7`
- muted: `#71717a`

## 5. Responsive Design

Components adapt automatically using media queries:
- Desktop: 1440px
- Tablet: 768px
- Mobile: 375px/480px

## Troubleshooting

**Components not showing up?**
- Check that shared components (`theme`, `Button`, `Container`, `SectionHeader`) are created first
- Verify import paths match your Framer project structure

**Styling looks wrong?**
- Ensure Inter font is available in your Framer project
- Check that page background color is set to `#0a0a0f`

**Need help?**
- Use `npm run list` to see all available components
- Check the preview.html file in this template directory for visual reference
