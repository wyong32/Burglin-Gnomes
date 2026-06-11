<template>
  <section class="area-detail-section page-section">
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

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Area detail sections">
            <strong>{{ area.name }}</strong>
            <a href="#overview">Route overview</a>
            <a href="#items">Items and weapons</a>
            <a href="#recipes">Crafting links</a>
            <a href="#tasks">Tasks and danger</a>
            <a href="#notes">Route notes</a>
          </aside>

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

            <section id="items" class="guide-block">
              <h2>Items and weapons found in {{ area.name }}</h2>
              <p>
                Use this list to decide whether the area is worth routing after the first three
                tasks are safe. Weapons are kept inside Items so every detail page can connect
                back to recipes and locations.
              </p>
              <div class="area-card-grid">
                <RouterLink v-for="item in areaItems" :key="item.slug" class="area-link-card" :to="`/items/${item.slug}`">
                  <img :src="item.image" :alt="item.name" />
                  <span>
                    <small>{{ item.category }}</small>
                    <strong>{{ item.name }}</strong>
                    <em>{{ item.type }}</em>
                  </span>
                </RouterLink>
              </div>
            </section>

            <section id="recipes" class="guide-block">
              <h2>Recipes connected to {{ area.name }}</h2>
              <p>
                Recipes appear here when this area is the crafting station, the output is used
                here, or the materials are commonly routed from this area.
              </p>
              <div class="area-card-grid">
                <RouterLink v-for="recipe in areaRecipes" :key="recipe.slug" class="guide-card" :to="`/crafting/${recipe.slug}`">
                  <strong>{{ recipe.name }}</strong>
                  <span>{{ recipe.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ') }}</span>
                </RouterLink>
              </div>
            </section>

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
          <RouterLink to="/base-building">Back to base and areas</RouterLink>
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
const areas = areasData.find((section) => section.key === 'areas').items
const items = itemsData.find((section) => section.key === 'items').items
const recipes = craftingData.find((section) => section.key === 'recipes').items

const area = computed(() => areas.find((entry) => entry.slug === route.params.slug))
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

.area-card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.area-link-card {
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  border: 2px solid var(--color-ink);
  border-radius: 18px;
  padding: 10px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.area-link-card:hover,
.area-link-card:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-2px);
}

.area-link-card img {
  width: 84px;
  height: 74px;
  border: 2px solid var(--color-ink);
  border-radius: 12px;
  object-fit: cover;
}

.area-link-card span {
  display: grid;
  gap: 4px;
}

.area-link-card small {
  color: var(--color-primary);
  font-weight: 900;
  text-transform: uppercase;
}

.area-link-card strong {
  color: var(--color-ink);
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
}

.area-link-card em {
  color: var(--color-text);
  font-style: normal;
  font-weight: 850;
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

@media (max-width: 1024px) {
  .area-card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .area-card-grid,
  .area-split {
    grid-template-columns: 1fr;
  }
}
</style>
