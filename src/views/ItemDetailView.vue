<template>
  <section class="item-detail-section page-section detail-page">
    <div class="container">
      <div v-if="item" class="item-detail-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">{{ item.category }}</span>
            <h1>{{ item.tdk.title }}</h1>
            <p>{{ item.use }} {{ item.advice }}</p>
          </div>
          <figure class="hero-art">
            <img :src="item.image" :alt="item.name" />
          </figure>
        </div>

        <GptAd unit="banner2" />

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            :title="item.name"
            aria-label="Item detail sections"
            :sections="itemSidebarSections"
          />

          <div class="guide-main">
            <section id="overview" class="guide-block">
              <h2>{{ item.name }} quick facts</h2>
              <div class="data-table">
                <div class="table-row detail-row"><strong>Category</strong><span>{{ item.category }}</span></div>
                <div class="table-row detail-row"><strong>Type</strong><span>{{ item.type }}</span></div>
                <div class="table-row detail-row"><strong>Priority</strong><span>{{ item.priority }}</span></div>
                <div class="table-row detail-row"><strong>How to get it</strong><span>{{ item.source }}</span></div>
                <div v-for="stat in item.stats" :key="stat" class="table-row detail-row">
                  <strong>Property</strong>
                  <span>{{ stat }}</span>
                </div>
              </div>
            </section>

            <section id="locations" class="guide-block">
              <h2>Where to find {{ item.name }}</h2>
              <p>{{ item.advice }}</p>
              <div class="link-list">
                <a v-for="area in itemAreas" :key="area.slug" class="link-list__item" :href="`/areas/${area.slug}`">
                  <span>
                    <strong>{{ area.name }}</strong>
                    <span>{{ area.summary }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
              <div v-if="item.acquisition?.length" class="data-table">
                <div v-for="tip in item.acquisition" :key="tip" class="table-row detail-row">
                  <strong>Route tip</strong>
                  <span>{{ tip }}</span>
                </div>
              </div>
            </section>

            <GptAd unit="banner3" />

            <section id="recipes" class="guide-block">
              <h2>Recipes that craft or use {{ item.name }}</h2>
              <p>{{ item.use }}</p>
              <div class="link-list">
                <a v-for="craft in outputCrafts" :key="craft.slug" class="link-list__item" :href="`/crafting/${craft.slug}`">
                  <span>
                    <strong>Craft {{ craft.name }}</strong>
                    <span>{{ craft.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ') }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
                <a v-for="craft in ingredientCrafts" :key="craft.slug" class="link-list__item" :href="`/crafting/${craft.slug}`">
                  <span>
                    <strong>Used for {{ craft.name }}</strong>
                    <span>{{ craft.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ') }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <GptAd unit="banner1" />

            <section id="related" class="guide-block">
              <h2>Items related to {{ item.name }}</h2>
              <div class="link-list">
                <a v-for="related in relatedItems" :key="related.slug" class="link-list__item" :href="`/items/${related.slug}`">
                  <span>
                    <strong>{{ related.name }}</strong>
                    <span>{{ related.type }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <section v-if="itemGuideLink" id="guide" class="guide-block">
              <h2>Guide for using {{ item.name }}</h2>
              <a class="link-list__item" :href="itemGuideLink.path">
                <span>
                  <strong>{{ itemGuideLink.label }}</strong>
                  <span>{{ itemGuideLink.note }}</span>
                </span>
                <span class="entry-chevron" aria-hidden="true">→</span>
              </a>
            </section>

            <GptAd unit="banner2" />

            <section id="notes" class="guide-block">
              <h2>How to use {{ item.name }} in a run</h2>
              <article v-for="section in item.sections" :key="section.heading" class="note-panel">
                <h3>{{ section.heading }}</h3>
                <p>{{ section.body }}</p>
              </article>
            </section>
          </div>
        </div>
      </div>

      <div v-else class="page-content">
        <div class="guide-card">
          <h1>All Items | Burglin' Gnomes</h1>
          <p>That item page does not exist yet. Browse the full list or tell us what is missing.</p>
          <a href="/items">Back to all items</a>
        </div>
      </div>

      <GptAd unit="banner3" />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageSidebar from '../components/PageSidebar.vue'
import areasData from '../data/areasData'
import craftingData from '../data/craftingData'
import itemsData from '../data/itemsData'

const route = useRoute()
const items = itemsData.find((section) => section.key === 'items').items
const recipes = craftingData.find((section) => section.key === 'recipes').items
const areas = areasData.find((section) => section.key === 'areas').items

const item = computed(() => items.find((entry) => entry.slug === route.params.slug))

const itemSidebarSections = computed(() =>
  [
    { id: 'overview', label: 'Quick facts', href: '#overview' },
    { id: 'locations', label: 'Locations', href: '#locations' },
    { id: 'recipes', label: 'Recipes', href: '#recipes' },
    { id: 'related', label: 'Related items', href: '#related' },
    itemGuideLink.value && { id: 'guide', label: 'Related guide', href: '#guide' },
    { id: 'notes', label: 'Route notes', href: '#notes' },
  ].filter(Boolean),
)
const relatedItems = computed(() => (item.value?.relatedItems || []).map((slug) => items.find((entry) => entry.slug === slug)).filter(Boolean))
const itemAreas = computed(() => (item.value?.areas || []).map((slug) => areas.find((area) => area.slug === slug)).filter(Boolean))
const outputCrafts = computed(() => recipes.filter((recipe) => recipe.outputItem === item.value?.slug || item.value?.relatedCrafts?.includes(recipe.slug)))
const ingredientCrafts = computed(() =>
  recipes.filter((recipe) => recipe.materials?.some((material) => material.item === item.value?.slug) || item.value?.usedIn?.includes(recipe.slug)),
)
const itemGuideLink = computed(() => {
  if (!['Weapons', 'Tools', 'Gear', 'Ammo'].includes(item.value?.category)) return null

  return {
    label: 'Weapons, gear, and gadget crafting directory',
    path: '/guides/burglin-gnomes-official-gear-weapons-directory',
    note: 'Compare equipment slots, weapon use, mobility gear, and route tools before spending materials.',
  }
})
</script>

<style scoped>
.detail-row {
  grid-template-columns: 180px minmax(0, 1fr);
}

.note-panel h3 {
  margin-bottom: 8px;
}
</style>
