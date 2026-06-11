import { onMounted, onUnmounted, ref, unref, watch } from 'vue'

export function useSectionSpy(sectionIds, options = {}) {
  const activeId = ref('')
  const offset = options.offset ?? 96
  let scrollHandler = null

  const syncActive = () => {
    const ids = unref(sectionIds)
    if (!ids?.length) return

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const marker = window.scrollY + offset
    let current = elements[0].id

    for (const element of elements) {
      if (element.offsetTop <= marker) {
        current = element.id
      }
    }

    activeId.value = current
  }

  onMounted(() => {
    scrollHandler = syncActive
    syncActive()
    window.addEventListener('scroll', scrollHandler, { passive: true })

    watch(
      () => unref(sectionIds),
      () => syncActive(),
      { deep: true },
    )
  })

  onUnmounted(() => {
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  return { activeId }
}
