import { seoConfig } from './config.js'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function meta(name, content, attribute = 'name') {
  if (!content) return ''
  return `<meta ${attribute}="${escapeHtml(name)}" content="${escapeHtml(content)}">`
}

export function renderHead(document) {
  const jsonLd = JSON.stringify(document.jsonLd).replaceAll('<', '\\u003c')
  return [
    `<title>${escapeHtml(document.title)}</title>`,
    meta('description', document.description),
    meta('keywords', document.keywords),
    meta('author', document.author),
    meta('robots', document.robots),
    meta('googlebot', document.robots),
    `<link rel="canonical" href="${escapeHtml(document.canonicalUrl)}">`,
    meta('og:title', document.title, 'property'),
    meta('og:description', document.description, 'property'),
    meta('og:image', document.ogImage, 'property'),
    meta('og:image:alt', `${seoConfig.siteName} — share image`, 'property'),
    meta('og:url', document.canonicalUrl, 'property'),
    meta('og:type', document.ogType, 'property'),
    meta('og:site_name', seoConfig.siteName, 'property'),
    meta('og:locale', 'en_US', 'property'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', document.title),
    meta('twitter:description', document.description),
    meta('twitter:image', document.ogImage),
    meta('twitter:url', document.canonicalUrl),
    `<script type="application/ld+json" data-seo-ld="1">${jsonLd}</script>`,
  ]
    .filter(Boolean)
    .join('\n  ')
}
