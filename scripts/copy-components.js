#!/usr/bin/env node

/**
 * Framer Template Component Copy Helper
 *
 * This script helps copy Framer template components to the clipboard
 * for easy pasting into Framer's Code Component editor.
 *
 * Usage:
 *   node scripts/copy-components.js list
 *   node scripts/copy-components.js nexus-saas
 *   node scripts/copy-components.js nexus-saas Navbar
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const TEMPLATES_DIR = join(__dirname, '..', 'templates')

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset)
}

function getComponentFiles(templateId) {
  const componentsDir = join(TEMPLATES_DIR, templateId, 'components')
  const files = []

  function scanDir(dir, basePrefix = '') {
    try {
      const entries = readdirSync(dir)
      for (const entry of entries) {
        const fullPath = join(dir, entry)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          scanDir(fullPath, basePrefix + entry + '/')
        } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
          const extIndex = entry.lastIndexOf('.')
          files.push({
            path: fullPath,
            relative: basePrefix + entry,
            name: entry.slice(0, extIndex),
          })
        }
      }
    } catch (error) {
      // Skip directories that don't exist
    }
  }

  // Scan shared first
  const sharedDir = join(componentsDir, 'shared')
  if (statSync(sharedDir)?.isDirectory()) {
    scanDir(sharedDir, 'shared/')
  }

  // Scan other components
  try {
    const entries = readdirSync(componentsDir)
    for (const entry of entries) {
      if (entry === 'shared') continue
      const fullPath = join(componentsDir, entry)
      if (statSync(fullPath).isDirectory()) {
        scanDir(fullPath, entry + '/')
      } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
        const extIndex = entry.lastIndexOf('.')
        files.push({
          path: fullPath,
          relative: entry,
          name: entry.slice(0, extIndex),
        })
      }
    }
  } catch (error) {
    // Skip
  }

  return files
}

function copyToClipboard(text) {
  const proc = require('child_process').spawn('pbcopy')
  proc.stdin.write(text)
  proc.stdin.end()

  return new Promise((resolve) => {
    proc.on('close', resolve)
  })
}

function listTemplates() {
  log('\n📁 Available Templates:\n', 'cyan')

  try {
    const templates = readdirSync(TEMPLATES_DIR)
    for (const template of templates) {
      const templatePath = join(TEMPLATES_DIR, template)
      if (statSync(templatePath).isDirectory()) {
        const componentsDir = join(templatePath, 'components')
        if (statSync(componentsDir)?.isDirectory()) {
          const files = getComponentFiles(template)
          log('  ' + template, 'bright')
          log('    ' + files.length + ' components', 'dim')
          log('    ' + files.map(f => f.name).join(', '), 'dim')
          log('')
        }
      }
    }
  } catch (error) {
    log('Error listing templates: ' + error.message, 'red')
  }
}

async function copyComponent(templateId, componentName) {
  const files = getComponentFiles(templateId)

  if (componentName) {
    const component = files.find(f =>
      f.name === componentName ||
      f.relative === componentName + '.tsx' ||
      f.relative === componentName + '.ts'
    )

    if (!component) {
      log('\n❌ Component "' + componentName + '" not found', 'red')
      log('\nAvailable components:\n  ' + files.map(f => f.name).join('\n  '), 'dim')
      return
    }

    const code = readFileSync(component.path, 'utf-8')
    await copyToClipboard(code)
    log('\n✅ Copied "' + componentName + '" to clipboard!', 'green')
    log('   Paste in Framer Code Component editor', 'dim')
  } else {
    log('\n📦 Components in ' + templateId + ':\n', 'cyan')

    files.forEach((file, index) => {
      const num = (index + 1).toString().padStart(2, ' ')
      const name = file.name.padEnd(25)
      log('  ' + num + ') ' + name + ' ' + file.relative, 'bright')
    })

    log('\n💡 Use: node scripts/copy-components.js nexus-saas Navbar', 'dim')
  }
}

async function copyAllForTemplate(templateId) {
  const files = getComponentFiles(templateId)

  log('\n📋 Copying order for ' + templateId + ':', 'cyan')
  log('(Copy in this order to respect dependencies)\n', 'dim')

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const num = (i + 1).toString().padStart(2, ' ')

    log(num + ') ' + file.name.padEnd(25) + ' ' + file.relative, 'bright')

    const code = readFileSync(file.path, 'utf-8')
    await copyToClipboard(code)

    if (i < files.length - 1) {
      log('   ✅ Copied! Paste in Framer, then press Enter to continue...', 'green')
      await waitForEnter()
    } else {
      log('   ✅ Last component copied!', 'green')
    }
  }

  log('\n✨ All ' + files.length + ' components copied!', 'green')
}

function waitForEnter() {
  return new Promise((resolve) => {
    process.stdin.once('data', () => resolve())
  })
}

// Main CLI
const args = process.argv.slice(2)

if (args.length === 0) {
  log('\n📦 Framer Template Component Copy Helper\n', 'cyan')
  log('Usage:', 'bright')
  log('  node scripts/copy-components.js list              List all templates', 'dim')
  log('  node scripts/copy-components.js <template>         Show components', 'dim')
  log('  node scripts/copy-components.js <template> <name>   Copy component', 'dim')
  log('  node scripts/copy-components.js copy <template>    Interactive copy all', 'dim')
  log('')
  process.exit(0)
}

const command = args[0]

switch (command) {
  case 'list':
    listTemplates()
    break

  case 'copy':
  case 'install':
    const templateId = args[1]
    if (!templateId) {
      log('❌ Please specify a template', 'red')
      log('   Example: node scripts/copy-components.js copy nexus-saas', 'dim')
      break
    }
    await copyAllForTemplate(templateId)
    break

  default:
    const templateDir = join(TEMPLATES_DIR, command)
    if (statSync(templateDir)?.isDirectory()) {
      const componentName = args[1]
      await copyComponent(command, componentName)
    } else {
      log('❌ Unknown template: ' + command, 'red')
      log('   Run "node scripts/copy-components.js list" to see available templates', 'dim')
    }
}
