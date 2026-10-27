import { useEffect } from "react"
import { framer } from "framer-plugin"

// Template definitions with component lists
const TEMPLATES = {
  "nexus-saas": {
    name: "Nexus SaaS",
    description: "Premium SaaS landing page with 10 sections",
    components: [
      "shared/theme",
      "shared/Button",
      "shared/Container",
      "shared/SectionHeader",
      "Navbar",
      "Hero",
      "LogoBar",
      "FeaturesGrid",
      "ProductScreenshot",
      "Testimonials",
      "Pricing",
      "FAQ",
      "CTABanner",
      "Footer",
    ],
    preview: "templates/nexus-saas/preview.html",
  },
  folio: {
    name: "Folio Portfolio",
    description: "Swiss-style creative portfolio with 8 sections",
    components: [
      "shared/theme",
      "shared/Button",
      "shared/Container",
      "shared/SectionLabel",
      "shared/ThemeProvider",
      "Navbar",
      "Hero",
      "ProjectGrid",
      "ProjectDetail",
      "About",
      "Timeline",
      "Contact",
      "Footer",
    ],
    preview: "templates/folio/preview.html",
  },
}

// GitHub raw content URL base
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/shashanksaxen/framer-templates/master"

export default function Plugin() {
  useEffect(() => {
    // Set up plugin window
    framer.showUI({
      position: "top right",
      width: 320,
      height: 480,
    })

    // Listen for messages from the UI
    framer.onmessage = async (event) => {
      const { type, data } = event.data

      switch (type) {
        case "install-template":
          await installTemplate(data.templateId)
          break
        case "get-templates":
          framer.sendMessage({
            type: "templates-list",
            data: { templates: TEMPLATES },
          })
          break
      }
    }

    // Send templates list on load
    framer.sendMessage({
      type: "templates-list",
      data: { templates: TEMPLATES },
    })
  }, [])

  const installTemplate = async (templateId: string) => {
    const template = TEMPLATES[templateId]
    if (!template) {
      framer.sendMessage({
        type: "error",
        data: { message: `Template ${templateId} not found` },
      })
      return
    }

    framer.sendMessage({
      type: "progress",
      data: {
        message: `Installing ${template.name}...`,
        current: 0,
        total: template.components.length,
      },
    })

    let successCount = 0
    let errorCount = 0

    // Install shared components first (they're at the beginning)
    for (let i = 0; i < template.components.length; i++) {
      const componentPath = template.components[i]
      const componentName = componentPath.split("/").pop()!

      try {
        // Fetch component code from GitHub
        const url = `${GITHUB_RAW_BASE}/templates/${templateId}/components/${componentPath}.tsx`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch ${componentPath}`)
        }

        const code = await response.text()

        // Create the code file in Framer
        await framer.createCodeFile(componentName, code)

        successCount++

        framer.sendMessage({
          type: "progress",
          data: {
            message: `Installed ${componentName}`,
            current: i + 1,
            total: template.components.length,
            component: componentName,
          },
        })
      } catch (error) {
        errorCount++
        console.error(`Failed to install ${componentPath}:`, error)

        framer.sendMessage({
          type: "warning",
          data: {
            message: `Failed to install ${componentName}`,
            component: componentName,
          },
        })
      }
    }

    // Send completion message
    framer.sendMessage({
      type: "complete",
      data: {
        message: `Installed ${successCount} components${errorCount > 0 ? ` (${errorCount} failed)` : ""}`,
        successCount,
        errorCount,
        template: template.name,
      },
    })
  }

  return null
}
