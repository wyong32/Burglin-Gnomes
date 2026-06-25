import { AFFILIATE_BANNER } from '@/config/affiliateAds'

let loadQueue = Promise.resolve()

function getBannerConfig() {
  const isMobile = window.matchMedia(AFFILIATE_BANNER.breakpoint).matches
  return isMobile ? AFFILIATE_BANNER.mobile : AFFILIATE_BANNER.desktop
}

export function getAffiliateBannerSize() {
  const config = getBannerConfig()
  return { width: config.width, height: config.height }
}

export function mountAffiliateAd(containerEl) {
  if (!containerEl) return

  loadQueue = loadQueue.then(
    () =>
      new Promise((resolve) => {
        const config = getBannerConfig()

        window.atOptions = {
          key: config.key,
          format: 'iframe',
          height: config.height,
          width: config.width,
          params: {},
        }

        const script = document.createElement('script')
        script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => resolve()
        containerEl.appendChild(script)
      }),
  )
}
