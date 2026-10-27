# Folio Portfolio Template Setup Guide

This guide explains how to import and use the Folio Portfolio template components in your Framer project.

## Quick Start (Recommended)

**Use the copy helper script** to quickly copy component code to your clipboard:

```bash
# From the project root
npm run copy:folio         # List all components
npm run copy:folio Navbar  # Copy specific component
npm run copy:install       # Interactive copy all components
```

Then paste each component into Framer's Code Component editor.

## Option 1: Framer Plugin (Easiest)

1. Build the Template Installer plugin:
   ```bash
   npm run plugin:build
   ```

2. In Framer, go to **Plugins** → **Install Plugin**
3. Select the `plugin/dist` folder

4. Click the plugin icon, select "Folio Portfolio", and click **Install**
5. All components appear in your Assets panel automatically!

## Option 2: Manual Import

### 1. Project Setup in Framer

1. Open your Framer project (or create a new one).
2. Add fonts: **Inter** and **Playfair Display**.
3. Create a new Code Component for each file in the `components` directory.

### 2. Importing Components

**Using the helper script:**
```bash
cd scripts
node copy-components.js folio               # List components
node copy-components.js folio ProjectGrid    # Copy specific component
```

**Or manually:**
1. In Framer, go to **Assets** panel.
2. Click the **+** button next to **Code** to create a new component.
3. Name it exactly as the file (e.g., `Navbar`, `Hero`, `Button`).
4. Paste the code from the corresponding `.tsx` file.

**Important Order of Creation:**
Create shared components first, as section components depend on them:
1. `theme`
2. `ThemeProvider`
3. `Button`
4. `Container`
5. `SectionLabel`
6. Main sections: `Navbar`, `Hero`, `ProjectGrid`, `ProjectDetail`, `About`, `Timeline`, `Contact`, `Footer`

### 3. Assembling the Page

1. Switch to **Pages** view.
2. Open your target page.
3. Set page background to `#fafafa` (light mode default).
4. Drag and drop sections in order:
   - `Navbar` → `Hero` → `ProjectGrid` → `ProjectDetail` → `About` → `Timeline` → `Contact` → `Footer`

### 4. Light/Dark Mode

The template includes a `ThemeProvider` component. To enable dark mode:
1. Create the `ThemeProvider` component
2. Add it at the top of your page (it wraps all content)
3. The `Navbar` includes a toggle that switches themes

### 5. Customizing Content

Components use Framer's Property Controls. Edit content in the visual editor!

1. Select a component on the canvas.
2. Edit properties in the panel on the right.
3. Change text, images, categories, and more.

### Theme Colors (in theme.ts)

**Light mode:**
- background: `#fafafa`
- surface: `#ffffff`
- primary: `#171717`
- text: `#171717`

**Dark mode:**
- background: `#0a0a0a`
- surface: `#171717`
- primary: `#fafafa`
- text: `fafafa`

## 6. Responsive Design

Components adapt automatically:
- Desktop: 1440px
- Tablet: 768px
- Mobile: 375px

## Troubleshooting

**Dark mode not working?**
- Ensure `ThemeProvider` component is created and added to your page
- Make sure it wraps all other content

**Components not showing?**
- Create shared components first (`theme`, `Button`, `Container`, `SectionLabel`, `ThemeProvider`)
- Check import paths

**Fonts look wrong?**
- Add **Inter** and **Playfair Display** to your Framer project

**Need help?**
- Use `npm run list` to see all components
- Check preview.html for visual reference
