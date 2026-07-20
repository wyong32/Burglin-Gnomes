<template>
  <section class="area-detail-section page-section detail-page">
    <div class="container">
      <div v-if="area" class="area-detail-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">{{ area.type }}</span>
            <h1>{{ area.tdk.title }}</h1>
            <p>{{ area.summary }} {{ area.routeUse }}</p>
          </div>
          <figure class="hero-art">
            <img :src="area.image" :alt="area.name" />
          </figure>
        </div>

        <!-- <GptAd unit="banner1" /> -->

        <AffiliateAd />

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            :title="area.name"
            aria-label="Area detail sections"
            :sections="areaSidebarSections"
          />

          <div class="guide-main">
            <section id="overview" class="guide-block">
              <h2>{{ area.name }} route overview</h2>
              <div class="data-table">
                <div class="table-row area-fact-row">
                  <strong>Area type</strong>
                  <span>{{ area.type }}</span>
                </div>
                <div class="table-row area-fact-row">
                  <strong>Main use</strong>
                  <span>{{ area.routeUse }}</span>
                </div>
                <div class="table-row area-fact-row">
                  <strong>Priority</strong>
                  <span>{{ priorityText }}</span>
                </div>
              </div>
            </section>
            
            <!-- <GptAd unit="banner2" /> -->
            
            <AffiliateAd />

            <section id="items" class="guide-block">
              <h2>Items and weapons found in {{ area.name }}</h2>
              <p>
                Use this list to decide whether the area is worth routing after the first three
                tasks are safe. Weapons are kept inside Items so every detail page can connect
                back to recipes and locations.
              </p>
              <div class="recipe-tile-grid area-item-grid">
                <a v-for="item in areaItems" :key="item.slug" class="recipe-tile" :href="`/items/${item.slug}`">
                  <img :src="item.image" :alt="item.name" />
                  <small>{{ item.category }}</small>
                  <strong>{{ item.name }}</strong>
                  <span class="recipe-tile__pill">{{ item.type }}</span>
                </a>
              </div>
            </section>

            <!-- <GptAd unit="banner3" /> -->

            <AffiliateAd />

            <section id="recipes" class="guide-block">
              <h2>Recipes connected to {{ area.name }}</h2>
              <p>
                Recipes appear here when this area is the crafting station, the output is used
                here, or the materials are commonly routed from this area.
              </p>
              <div class="link-list">
                <a v-for="recipe in areaRecipes" :key="recipe.slug" class="link-list__item" :href="`/crafting/${recipe.slug}`">
                  <span>
                    <strong>{{ recipe.name }}</strong>
                    <span>{{ recipe.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ') }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <!-- <GptAd unit="banner1" /> -->

            <AffiliateAd />

            <section id="tasks" class="guide-block">
              <h2>Tasks and danger checks in {{ area.name }}</h2>
              <div class="area-split">
                <article class="note-panel">
                  <h3>Tasks that can point here</h3>
                  <ul>
                    <li v-for="task in area.tasks" :key="task">{{ task }}</li>
                  </ul>
                </article>
                <article class="note-panel">
                  <h3>Dangers to clear before looting</h3>
                  <ul>
                    <li v-for="danger in area.dangers" :key="danger">{{ danger }}</li>
                  </ul>
                </article>
              </div>
            </section>

            <!-- <GptAd unit="banner2" /> -->

            <AffiliateAd />

            <section v-if="area.deepDiveSections?.length" id="field-guide" class="guide-block">
              <h2>{{ area.name }} field guide</h2>
              <article v-for="section in area.deepDiveSections" :key="section.heading" class="note-panel">
                <h3>{{ section.heading }}</h3>
                <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
                <ul v-if="section.bullets?.length">
                  <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
                </ul>
              </article>
            </section>

            <section id="notes" class="guide-block">
              <h2>How to route {{ area.name }}</h2>
              <article v-for="section in area.sections" :key="section.heading" class="note-panel">
                <h3>{{ section.heading }}</h3>
                <p>{{ section.body }}</p>
              </article>
            </section>
            
          </div>
        </div>
      </div>

      <div v-else class="page-content">
        <div class="guide-card">
          <h1>Areas | Burglin' Gnomes</h1>
          <p>That area page does not exist yet. Return to the base guide and choose a known route area.</p>
          <a href="/base-building">Back to base and areas</a>
        </div>
      </div>

      <!-- <GptAd unit="banner3" /> -->

      <AffiliateAd />
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
const areas = areasData.find((section) => section.key === 'areas').items
const items = itemsData.find((section) => section.key === 'items').items
const recipes = craftingData.find((section) => section.key === 'recipes').items

const area = computed(() => areas.find((entry) => entry.slug === route.params.slug))

const areaSidebarSections = computed(() =>
  [
    { id: 'overview', label: 'Route overview', href: '#overview' },
    { id: 'items', label: 'Items and weapons', href: '#items' },
    { id: 'recipes', label: 'Crafting links', href: '#recipes' },
    { id: 'tasks', label: 'Tasks and danger', href: '#tasks' },
    area.value?.deepDiveSections?.length && { id: 'field-guide', label: 'Field guide', href: '#field-guide' },
    { id: 'notes', label: 'Route notes', href: '#notes' },
  ].filter(Boolean),
)
const areaItems = computed(() =>
  items
    .filter((item) => item.areas?.includes(route.params.slug))
    .sort((a, b) => {
      if (a.category === 'Weapons' && b.category !== 'Weapons') return -1
      if (a.category !== 'Weapons' && b.category === 'Weapons') return 1
      return a.name.localeCompare(b.name)
    }),
)

const areaRecipes = computed(() => {
  const slug = route.params.slug
  const itemSlugs = new Set(areaItems.value.map((item) => item.slug))
  return recipes.filter((recipe) => {
    if (recipe.areas?.includes(slug)) return true
    if (recipe.outputItem && itemSlugs.has(recipe.outputItem)) return true
    return recipe.materials?.some((material) => itemSlugs.has(material.item))
  })
})

const priorityText = computed(() => {
  if (!area.value) return ''
  if (['Gnome World', 'The Well', 'Human House'].includes(area.value.name)) return 'Core route area'
  if (areaItems.value.some((item) => item.category === 'Weapons')) return 'High when the task list or weapon need points here'
  return 'Route dependent'
})
</script>

<style scoped>
.area-fact-row {
  grid-template-columns: 180px minmax(0, 1fr);
}

.area-split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.note-panel ul {
  display: grid;
  gap: 8px;
  padding-left: 18px;
}

.note-panel li {
  color: var(--color-text);
  font-weight: 800;
  list-style: disc;
}

@media (max-width: 768px) {
  .area-split {
    grid-template-columns: 1fr;
  }
}
</style>
