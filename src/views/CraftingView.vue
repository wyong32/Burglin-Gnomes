<template>
  <section class="crafting-section page-section">
    <div class="container">
      <div class="crafting-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Crafting</span>
            <h1>Crafting Recipes — Gear &amp; Upgrades | Burglin' Gnomes</h1>
            <p>
              What materials do you need, what gear do you get, and is it worth crafting before
              your next run? Every recipe links to material pages and to items or enemies when
              the output matters for survival.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/page-05.webp" alt="Burglin' Gnomes crafting well and recipe guide" />
          </figure>
        </div>

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            title="Crafting"
            aria-label="Crafting sections"
            :sections="sidebarSections"
          />

          <div class="guide-main">
            <section id="craft-order" class="guide-block craft-order-section">
              <div class="section-heading">
                <span class="eyebrow">Craft order</span>
                <h2>Recommended crafting order for new players</h2>
                <p>
                  Crafting should reduce risk before it adds damage. Carry capacity, basic defense,
                  mobility, hand control, and material farming each solve a different route problem.
                </p>
              </div>
              <div class="timeline">
                <RouterLink
                  v-for="item in craftOrder"
                  :key="item.rank"
                  class="timeline__item"
                  :to="`/crafting/${item.recipe}`"
                >
                  <strong class="timeline__rank">{{ item.rank }}</strong>
                  <span class="timeline__copy">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.reason }}</p>
                    <em>{{ item.timing }}</em>
                  </span>
                </RouterLink>
              </div>
            </section>

            <section id="recipes" class="guide-block recipe-board-section">
              <div class="section-heading">
                <span class="eyebrow">Recipes</span>
                <h2>Crafting recipes worth checking first</h2>
                <p>Open a recipe for exact materials, what you craft, when we make it first, and what still needs more playtime.</p>
              </div>
              <div class="recipe-tile-grid">
                <RouterLink
                  v-for="recipe in recipes"
                  :key="recipe.slug"
                  class="recipe-tile"
                  :to="`/crafting/${recipe.slug}`"
                >
                  <img :src="recipe.image" :alt="recipe.name" />
                  <small>{{ recipe.category }}</small>
                  <strong>{{ recipe.name }}</strong>
                  <span class="recipe-tile__pills">
                    <span v-for="material in recipe.materials" :key="material.item" class="recipe-tile__pill">
                      {{ material.quantity }} {{ material.name }}
                    </span>
                  </span>
                </RouterLink>
              </div>
            </section>

            <section id="materials" class="guide-block materials-section">
              <div class="section-heading">
                <span class="eyebrow">Materials</span>
                <h2>Where to get recipe materials</h2>
              </div>
              <div class="data-table">
                <div class="table-row table-head material-row">
                  <span>Material</span>
                  <span>Where to get it</span>
                  <span>Used for</span>
                </div>
                <div v-for="material in materials" :key="material.name" class="table-row material-row">
                  <RouterLink class="table-title" :to="material.item ? `/items/${material.item}` : '/items'">
                    <img :src="material.image" :alt="material.name" />
                    <strong>{{ material.name }}</strong>
                  </RouterLink>
                  <span>{{ materialCardSource(material) }}</span>
                  <span>{{ material.note }}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PageSidebar from '../components/PageSidebar.vue'
import craftingData from '../data/craftingData'

const recipes = craftingData.find((section) => section.key === 'recipes').items
const materials = craftingData.find((section) => section.key === 'materials').items
const craftOrder = craftingData.find((section) => section.key === 'craftOrder').items

const sidebarSections = computed(() => [
  { id: 'craft-order', label: 'Craft order', href: '#craft-order', count: craftOrder.length },
  { id: 'recipes', label: 'All recipes', href: '#recipes', count: recipes.length },
  { id: 'materials', label: 'Materials', href: '#materials', count: materials.length },
])

const materialCardSource = (material) => (material.source === 'Unknown' ? material.note : material.source)
</script>

<style scoped>
.material-row {
  grid-template-columns: 1fr 1.15fr 1.65fr;
}

.table-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.table-title img {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  object-fit: cover;
}
</style>
