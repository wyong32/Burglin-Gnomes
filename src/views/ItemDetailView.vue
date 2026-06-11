<template>
  <section class="item-detail-section page-section">
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

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Item detail sections">
            <strong>{{ item.name }}</strong>
            <a href="#overview">Quick facts</a>
            <a href="#locations">Locations</a>
            <a href="#recipes">Recipes</a>
            <a href="#related">Related items</a>
            <a href="#notes">Route notes</a>
          </aside>

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
              <div class="link-grid">
                <RouterLink v-for="area in itemAreas" :key="area.slug" class="guide-card" :to="`/areas/${area.slug}`">
                  <strong>{{ area.name }}</strong>
                  <span>{{ area.summary }}</span>
                </RouterLink>
              </div>
              <div v-if="item.acquisition?.length" class="data-table">
                <div v-for="tip in item.acquisition" :key="tip" class="table-row detail-row">
                  <strong>Route tip</strong>
                  <span>{{ tip }}</span>
                </div>
              </div>
            </section>

            <section id="recipes" class="guide-block">
              <h2>Recipes that craft or use {{ item.name }}</h2>
              <p>{{ item.use }}</p>
              <div class="link-grid">
                <RouterLink v-for="craft in outputCrafts" :key="craft.slug" class="guide-card" :to="`/crafting/${craft.slug}`">
                  <strong>Craft {{ craft.name }}</strong>
                  <span>{{ craft.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ') }}</span>
                </RouterLink>
                <RouterLink v-for="craft in ingredientCrafts" :key="craft.slug" class="guide-card" :to="`/crafting/${craft.slug}`">
                  <strong>Used for {{ craft.name }}</strong>
                  <span>{{ craft.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ') }}</span>
                </RouterLink>
              </div>
            </section>

            <section id="related" class="guide-block">
              <h2>Items related to {{ item.name }}</h2>
              <div class="link-grid">
                <RouterLink v-for="related in relatedItems" :key="related.slug" class="guide-card" :to="`/items/${related.slug}`">
                  <strong>{{ related.name }}</strong>
                  <span>{{ related.type }}</span>
                </RouterLink>
              </div>
            </section>

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
          <RouterLink to="/items">Back to all items</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import areasData from '../data/areasData'
import craftingData from '../data/craftingData'
import itemsData from '../data/itemsData'

const route = useRoute()
const items = itemsData.find((section) => section.key === 'items').items
const recipes = craftingData.find((section) => section.key === 'recipes').items
const areas = areasData.find((section) => section.key === 'areas').items

const item = computed(() => items.find((entry) => entry.slug === route.params.slug))
const relatedItems = computed(() => (item.value?.relatedItems || []).map((slug) => items.find((entry) => entry.slug === slug)).filter(Boolean))
const itemAreas = computed(() => (item.value?.areas || []).map((slug) => areas.find((area) => area.slug === slug)).filter(Boolean))
const outputCrafts = computed(() => recipes.filter((recipe) => recipe.outputItem === item.value?.slug || item.value?.relatedCrafts?.includes(recipe.slug)))
const ingredientCrafts = computed(() =>
  recipes.filter((recipe) => recipe.materials?.some((material) => material.item === item.value?.slug) || item.value?.usedIn?.includes(recipe.slug)),
)
</script>

<style scoped>
.detail-row {
  grid-template-columns: 180px minmax(0, 1fr);
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.note-panel h3 {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>
