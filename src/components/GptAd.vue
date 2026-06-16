<template>
  <aside class="gpt-ad" aria-label="Advertisement">
    <div :id="elementId" class="gpt-ad__slot"></div>
  </aside>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { mountGptAd } from '@/utils/gptAds'

const props = defineProps({
  unit: {
    type: [String, Number],
    default: 'banner1',
  },
})

const adIndex = window.__gptAdIndex = (window.__gptAdIndex || 0) + 1
const elementId = computed(() => `div-gpt-ad-burglin-${String(props.unit).replace(/[^a-z0-9]/gi, '-')}-${adIndex}`)

onMounted(() => {
  mountGptAd(elementId.value, props.unit)
})
</script>

<style scoped>
.gpt-ad {
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

.gpt-ad__slot {
  min-width: 300px;
  min-height: 250px;
}
</style>
