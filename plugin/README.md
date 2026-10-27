# Framer Template Installer Plugin

A Framer plugin that installs template components directly from GitHub with one click.

## Features

- 🎨 **One-click installation** — Install all template components at once
- 📦 **Multiple templates** — Support for Nexus SaaS and Folio Portfolio
- 📊 **Progress tracking** — Real-time installation progress
- ✨ **Smart ordering** — Installs shared components first (dependencies)

## Installation

### For Users

1. Clone this repository:
   ```bash
   git clone https://github.com/shashanksaxen/framer-templates.git
   ```

2. Install dependencies:
   ```bash
   cd framer-templates/plugin
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. In Framer, go to **Plugins** → **Install Plugin**
   - Select the plugin directory
   - Or upload the built `dist` folder

### For Development

```bash
npm run dev
```

Then in Framer, link to the local development server.

## Usage

1. Click the **Template Installer** plugin icon in Framer
2. Select a template (Nexus SaaS or Folio Portfolio)
3. Click **Install Selected Template**
4. Components will appear in your Assets panel

## How It Works

The plugin:
1. Reads component code directly from GitHub raw URLs
2. Uses Framer's `createCodeFile()` API to create components
3. Installs shared dependencies first (theme, Button, Container, etc.)
4. Provides real-time feedback on installation progress

## Templates

### Nexus SaaS
- 14 components (10 sections + shared)
- Premium SaaS landing page design
- Dark mode with purple/green accents

### Folio Portfolio
- 14 components (8 sections + shared)
- Swiss/International Typographic Style
- Light/dark mode toggle

## Development

To add a new template:

1. Create the template in `templates/<name>/`
2. Add components to `components/`
3. Update `TEMPLATES` in `src/main.tsx`:
   ```typescript
   "your-template": {
     name: "Your Template",
     description: "Description here",
     components: ["shared/theme", "Component1", ...],
     preview: "templates/your-template/preview.html",
   }
   ```

## License

MIT
