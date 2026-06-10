const siteOrigin = 'https://burglin-gnomes.org'

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

const upsertCanonical = (path) => {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', `${siteOrigin}${path}`)
}

export const setPageSeo = ({ title, description, keywords, path }) => {
  document.title = title

  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: description,
  })

  if (keywords) {
    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: keywords,
    })
  }

  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: title,
  })

  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: description,
  })

  if (path) {
    upsertCanonical(path)
  }
}

export const setRouteSeo = (route) => {
  if (!route.meta?.tdk) return

  setPageSeo({
    ...route.meta.tdk,
    path: route.path,
  })
}
