import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { render } from '../.ssr/entry-server.js'
import { getPrerenderRoutes } from '../src/seo/routeManifest.js'
import { renderHead } from '../src/seo/renderHead.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const templatePath = path.join(distDir, 'index.html')

function removeRouteHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(
      /<meta\b[^>]*(?:name|property)=["'](?:description|keywords|author|robots|googlebot|og:[^"']+|twitter:[^"']+)["'][^>]*>\s*/gi,
      '',
    )
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<script\b[^>]*data-seo-ld=["']1["'][^>]*>[\s\S]*?<\/script>\s*/gi, '')
}

function outputPath(routePath) {
  if (routePath === '/') return templatePath
  return path.join(distDir, routePath.replace(/^\/+|\/+$/g, ''), 'index.html')
}

async function generate() {
  if (!fs.existsSync(templatePath)) throw new Error('Client build template is missing: dist/index.html')

  const template = removeRouteHead(fs.readFileSync(templatePath, 'utf8'))
  if (!template.includes('<!--app-head-->')) throw new Error('Missing <!--app-head--> marker')
  if (!template.includes('<div id="app"></div>')) throw new Error('Missing empty #app mount point')

  const routes = getPrerenderRoutes()
  for (const routePath of routes) {
    const { appHtml, seo } = await render(routePath)
    if (!appHtml.includes('<h1')) throw new Error(`Rendered route has no H1: ${routePath}`)

    const document = template
      .replace('<!--app-head-->', renderHead(seo))
      .replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`)
    const targetPath = outputPath(routePath)
    fs.mkdirSync(path.dirname(targetPath), { recursive: true })
    fs.writeFileSync(targetPath, document, 'utf8')
  }

  console.log(`Prerendered ${routes.length} routes.`)
}

generate().catch((error) => {
  console.error(error)
  process.exit(1)
})
