import { GPT_UNITS } from '@/config/gpt'

const UNIT_PATH = {
  1: GPT_UNITS.banner1,
  2: GPT_UNITS.banner2,
  3: GPT_UNITS.banner3,
  banner1: GPT_UNITS.banner1,
  banner2: GPT_UNITS.banner2,
  banner3: GPT_UNITS.banner3,
}

function getSlotMap() {
  if (!window.__gptSlotMap) window.__gptSlotMap = {}
  return window.__gptSlotMap
}

export function mountGptAd(elementId, unit = 'banner1') {
  const path = UNIT_PATH[unit] ?? UNIT_PATH[Number(unit)]
  if (!path || !elementId || typeof window === 'undefined') return

  window.googletag = window.googletag || { cmd: [] }
  window.googletag.cmd.push(() => {
    const element = document.getElementById(elementId)
    if (!element) return

    const slotMap = getSlotMap()
    let slot = slotMap[elementId]

    if (!slot) {
      const mapping = window.googletag
        .sizeMapping()
        .addSize([1024, 768], [
          [970, 250],
          [300, 250],
        ])
        .addSize([0, 0], [300, 250])
        .build()

      slot = window.googletag
        .defineSlot(path, [
          [970, 250],
          [300, 250],
        ], elementId)
        ?.defineSizeMapping(mapping)
        ?.addService(window.googletag.pubads())

      if (!slot) return
      slotMap[elementId] = slot
    }

    window.googletag.display(elementId)
    window.googletag.pubads().refresh([slot])
  })
}
