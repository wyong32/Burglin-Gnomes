import { seoConfig } from './config.js'

/**
 * 开发环境用当前 origin，生产用固定 canonical 域名（避免收录 localhost）。
 */
export function getCanonicalOrigin() {
  if (typeof window === 'undefined') {
    return seoConfig.fullDomain.replace(/\/+$/, '')
  }
  if (import.meta.env.DEV) {
    return `${window.location.protocol}//${window.location.host}`
  }
  return seoConfig.fullDomain.replace(/\/+$/, '')
}

export function toAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return ''
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const origin = getCanonicalOrigin()
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  if (!base) return `${origin}${path}`
  return `${origin}/${base.replace(/^\/+/, '')}${path}`.replace(/([^:])\/{2,}/g, '$1/')
}

export function resolveCanonicalUrl(routePath) {
  const origin = getCanonicalOrigin()
  const rawBase = import.meta.env.BASE_URL || '/'
  const baseSeg = rawBase === '/' ? '' : `/${String(rawBase).replace(/^\/+|\/+$/g, '')}`
  const p = routePath.startsWith('/') ? routePath : `/${routePath}`
  return `${origin}${baseSeg}${p}`.replace(/([^:])\/{2,}/g, '$1/')
}

function setMeta(attribute, name, content) {
  if (content === undefined || content === null || content === '') return
  let el = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkRel(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applyDocumentSeo({ path, title, description, keywords, ogImage, ogType, jsonLd }) {
  if (typeof document === 'undefined') return

  const canonicalUrl = resolveCanonicalUrl(path)
  const resolvedTitle = title || seoConfig.defaults.title

  document.title = resolvedTitle

  setMeta('name', 'description', description || seoConfig.defaults.description)
  if (keywords) setMeta('name', 'keywords', keywords)
  setMeta('name', 'author', seoConfig.defaults.author)
  setMeta('name', 'robots', 'index, follow')
  setMeta('name', 'googlebot', 'index, follow')

  const absImage = toAbsoluteUrl(ogImage || seoConfig.defaultOgImage)

  setMeta('property', 'og:title', resolvedTitle)
  setMeta('property', 'og:description', description || seoConfig.defaults.description)
  setMeta('property', 'og:image', absImage)
  setMeta('property', 'og:image:alt', `${seoConfig.siteName} — share image`)
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('property', 'og:type', ogType || seoConfig.defaults.type || 'website')
  setMeta('property', 'og:site_name', seoConfig.siteName)
  setMeta('property', 'og:locale', 'en_US')

  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', resolvedTitle)
  setMeta('name', 'twitter:description', description || seoConfig.defaults.description)
  setMeta('name', 'twitter:image', absImage)
  setMeta('name', 'twitter:url', canonicalUrl)

  setLinkRel('canonical', canonicalUrl)

  const ld =
    jsonLd ||
    buildDefaultWebPageJsonLd({
      name: resolvedTitle,
      description: description || seoConfig.defaults.description,
      url: canonicalUrl,
    })
  injectJsonLd(ld)
}

export function buildHomeGraphJsonLd({ name, description, url }) {
  const siteUrl = seoConfig.fullDomain.replace(/\/+$/, '')
  const logoUrl = toAbsoluteUrl(seoConfig.defaultOgImage)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: seoConfig.siteName,
        url: siteUrl,
        inLanguage: 'en',
        publisher: {
          '@type': 'Organization',
          name: seoConfig.siteName,
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: logoUrl,
          },
        },
        about: { '@id': `${siteUrl}/#game` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: 'en',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#game` },
      },
      {
        '@type': 'VideoGame',
        '@id': `${siteUrl}/#game`,
        name: "Burglin' Gnomes",
        applicationCategory: 'Game',
        operatingSystem: 'Windows',
        gamePlatform: 'PC',
        datePublished: '2026-06-10',
        author: { '@type': 'Organization', name: 'Fobri' },
        publisher: { '@type': 'Organization', name: 'Fobri' },
      },
    ],
  }
}

export function buildDefaultWebPageJsonLd({ name, description, url }) {
  const siteUrl = seoConfig.fullDomain.replace(/\/+$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(seoConfig.defaultOgImage),
      },
    },
  }
}

export function buildArticleJsonLd({ headline, description, url, datePublished, imageUrl }) {
  const img = imageUrl ? toAbsoluteUrl(imageUrl) : toAbsoluteUrl(seoConfig.defaultOgImage)
  const siteUrl = seoConfig.fullDomain.replace(/\/+$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    inLanguage: 'en',
    datePublished: datePublished || undefined,
    dateModified: datePublished || undefined,
    image: img,
    author: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(seoConfig.defaultOgImage),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

export function injectJsonLd(data) {
  const existing = document.querySelector('script[data-seo-ld="1"]')
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-ld', '1')
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}
