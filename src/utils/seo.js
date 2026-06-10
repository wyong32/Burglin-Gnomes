/**
 * @deprecated Prefer router afterEach + applyDocumentSeo from src/seo/documentMeta.js
 */
export {
  applyDocumentSeo as setPageSeo,
  applyDocumentSeo,
  resolveCanonicalUrl,
} from '../seo/documentMeta.js'

export const setRouteSeo = (route) => {
  if (!route.meta?.title && !route.meta?.tdk) return
  const meta = route.meta.tdk || route.meta
  import('../seo/documentMeta.js').then(({ applyDocumentSeo }) => {
    applyDocumentSeo({ ...meta, path: route.path })
  })
}
