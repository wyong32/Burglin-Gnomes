<template>
  <aside class="affiliate-ad" aria-label="Advertisement">
    <div ref="slotRef" class="affiliate-ad__slot" :style="slotStyle"></div>
  </aside>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { getAffiliateBannerSize, mountAffiliateAd } from '@/utils/affiliateAds'

const slotRef = ref(null)

const slotStyle = computed(() => {
  const { width, height } = getAffiliateBannerSize()
  return {
    minWidth: `${width}px`,
    minHeight: `${height}px`,
    maxWidth: `${width}px`,
  }
})

onMounted(async () => {
  await nextTick()
  if (slotRef.value) {
    mountAffiliateAd(slotRef.value)
  }
})
</script>

<style scoped>
.affiliate-ad {
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

.affiliate-ad__slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  max-width: 728px;
}

@media (max-width: 767px) {
  .affiliate-ad__slot {
    max-width: 300px;
  }
}
</style>
