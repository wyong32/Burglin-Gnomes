<template>
  <section class="crafting-detail-section page-section detail-page">
    <div class="container">
      <div v-if="recipe" class="crafting-detail-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">{{ recipe.category }}</span>
            <h1>{{ recipe.tdk.title }}</h1>
            <p>{{ recipe.effect }} {{ recipe.bestUse }}</p>
          </div>
          <figure class="hero-art">
            <img :src="recipe.image" :alt="recipe.name" />
          </figure>
        </div>

        <GptAd unit="banner1" />

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            :title="recipe.name"
            aria-label="Crafting detail sections"
            :sections="recipeSidebarSections"
          />

          <div class="guide-main">
            <section id="materials" class="guide-block">
              <h2>{{ recipe.name }} materials</h2>
              <div class="entry-list">
                <a
                  v-for="material in materials"
                  :key="material.item"
                  class="entry-row"
                  :href="`/items/${material.item}`"
                >
                  <img :src="material.image" :alt="material.name" />
                  <span class="entry-copy">
                    <small>Material</small>
                    <strong>{{ material.quantity }}x {{ material.name }}</strong>
                    <em>{{ material.source }}</em>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>
            

            <section id="output" class="guide-block">
              <h2>{{ recipe.name }} output and use</h2>
              <div v-if="outputItem" class="link-list">
                <a class="link-list__item" :href="`/items/${outputItem.slug}`">
                  <span>
                    <strong>{{ outputItem.name }}</strong>
                    <span>{{ outputItem.use }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
              <p>{{ recipe.bestUse }}</p>
            </section>

            <GptAd unit="banner2" />

            <section id="areas" class="guide-block">
              <h2>Where to craft or route {{ recipe.name }}</h2>
              <div class="link-list">
                <a v-for="area in recipeAreas" :key="area.slug" class="link-list__item" :href="`/areas/${area.slug}`">
                  <span>
                    <strong>{{ area.name }}</strong>
                    <span>{{ area.routeUse }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <section id="mechanics" class="guide-block">
              <h2>When {{ recipe.name }} is worth crafting</h2>
              <div class="data-table">
                <div class="table-row crafting-mechanic-row">
                  <strong>Mechanic</strong>
                  <span>{{ recipe.mechanic }}</span>
                </div>
                <div class="table-row crafting-mechanic-row">
                  <strong>Best scenario</strong>
                  <span>{{ recipe.scenario }}</span>
                </div>
                <div class="table-row crafting-mechanic-row">
                  <strong>Risk note</strong>
                  <span>{{ recipe.warning }}</span>
                </div>
              </div>
            </section>

            <GptAd unit="banner3" />

            <section v-if="recipeGuideLink" id="guide" class="guide-block">
              <h2>Guide for {{ recipe.name }} and similar gear</h2>
              <a class="link-list__item" :href="recipeGuideLink.path">
                <span>
                  <strong>{{ recipeGuideLink.label }}</strong>
                  <span>{{ recipeGuideLink.note }}</span>
                </span>
                <span class="entry-chevron" aria-hidden="true">→</span>
              </a>
            </section>

            <section id="bestiary" class="guide-block">
              <h2>Threats {{ recipe.name }} helps handle</h2>
              <div class="link-list">
                <a v-for="entry in relatedBestiary" :key="entry.slug" class="link-list__item" :href="`/bestiary/${entry.slug}`">
                  <span>
                    <strong>{{ entry.name }}</strong>
                    <span>{{ entry.counter }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <GptAd unit="banner1" />

            <section id="notes" class="guide-block">
              <h2>{{ recipe.name }} route notes</h2>
              <article v-for="section in recipe.sections" :key="section.heading" class="note-panel">
                <h3>{{ section.heading }}</h3>
                <p>{{ section.body }}</p>
              </article>
            </section>
          </div>
        </div>
      </div>

      <div v-else class="page-content">
        <div class="guide-card">
          <h1>Crafting Recipes | Burglin' Gnomes</h1>
          <p>That crafting page does not exist yet. Browse all recipes or send us a correction.</p>
          <a href="/crafting">Back to all recipes</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageSidebar from '../components/PageSidebar.vue'
import areasData from '../data/areasData'
import craftingData from '../data/craftingData'
import enemiesData from '../data/enemiesData'
import itemsData from '../data/itemsData'

const route = useRoute()
const recipes = craftingData.find((section) => section.key === 'recipes').items
const materialData = craftingData.find((section) => section.key === 'materials').items
const items = itemsData.find((section) => section.key === 'items').items
const bestiary = enemiesData.find((section) => section.key === 'entries').items
const areas = areasData.find((section) => section.key === 'areas').items

const recipe = computed(() => recipes.find((entry) => entry.slug === route.params.slug))

const recipeSidebarSections = computed(() =>
  [
    { id: 'materials', label: 'Materials', href: '#materials' },
    { id: 'output', label: 'What you craft', href: '#output' },
    { id: 'areas', label: 'Crafting area', href: '#areas' },
    { id: 'mechanics', label: 'Mechanics', href: '#mechanics' },
    recipeGuideLink.value && { id: 'guide', label: 'Related guide', href: '#guide' },
    { id: 'bestiary', label: 'Helps against', href: '#bestiary' },
    { id: 'notes', label: 'Route notes', href: '#notes' },
  ].filter(Boolean),
)
const outputItem = computed(() => items.find((item) => item.slug === recipe.value?.outputItem))
const recipeAreas = computed(() => (recipe.value?.areas || []).map((slug) => areas.find((area) => area.slug === slug)).filter(Boolean))
const materials = computed(() =>
  (recipe.value?.materials || []).map((material) => ({
    ...material,
    ...items.find((entry) => entry.slug === material.item),
    ...materialData.find((entry) => entry.item === material.item),
  })),
)
const relatedBestiary = computed(() => (recipe.value?.relatedBestiary || []).map((slug) => bestiary.find((entry) => entry.slug === slug)).filter(Boolean))
const recipeGuideLink = computed(() => {
  if (!['Weapons', 'Gear', 'Tools'].includes(recipe.value?.category)) return null

  return {
    label: 'Weapons, gear, and gadget crafting directory',
    path: '/guides/burglin-gnomes-official-gear-weapons-directory',
    note: 'Use the directory when comparing craft cost, equipment slots, utility, and route value.',
  }
})
</script>

<style scoped>
.note-panel h3 {
  margin-bottom: 8px;
}

.crafting-mechanic-row {
  grid-template-columns: 180px minmax(0, 1fr);
}
</style>
