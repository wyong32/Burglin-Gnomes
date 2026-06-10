<template>
  <section class="crafting-detail-section page-section">
    <div class="container">
      <div v-if="recipe" class="crafting-detail-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">{{ recipe.category }}</span>
            <h1>{{ recipe.name }} Recipe — Burglin' Gnomes Crafting</h1>
            <p>{{ recipe.effect }} {{ recipe.bestUse }}</p>
          </div>
          <figure class="hero-art">
            <img :src="recipe.image" :alt="recipe.name" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Crafting detail sections">
            <strong>{{ recipe.name }}</strong>
            <a href="#materials">Materials</a>
            <a href="#output">What you craft</a>
            <a href="#bestiary">Helps against</a>
            <a href="#notes">From our runs</a>
          </aside>

          <div class="guide-main">
            <section id="materials" class="guide-block">
              <h2>Materials to craft {{ recipe.name }}</h2>
              <div class="ingredient-grid">
                <RouterLink v-for="material in materials" :key="material.item" class="ingredient-card" :to="`/items/${material.item}/`">
                  <img :src="material.image" :alt="material.name" />
                  <span>
                    <strong>{{ material.quantity }}x {{ material.name }}</strong>
                    <em>{{ material.source }}</em>
                  </span>
                </RouterLink>
              </div>
            </section>

            <section id="output" class="guide-block">
              <h2>What {{ recipe.name }} gives you</h2>
              <RouterLink v-if="outputItem" class="guide-card" :to="`/items/${outputItem.slug}/`">
                <strong>{{ outputItem.name }}</strong>
                <span>{{ outputItem.use }}</span>
              </RouterLink>
              <p>{{ recipe.bestUse }}</p>
              <b :class="['status-pill', statusClass(recipe.status)]">{{ displayStatus(recipe.status) }}</b>
            </section>

            <section id="bestiary" class="guide-block">
              <h2>Enemies and hazards this craft helps with</h2>
              <div class="link-grid">
                <RouterLink v-for="entry in relatedBestiary" :key="entry.slug" class="guide-card" :to="`/bestiary/${entry.slug}/`">
                  <strong>{{ entry.name }}</strong>
                  <span>{{ entry.counter }}</span>
                </RouterLink>
              </div>
            </section>

            <section id="notes" class="guide-block">
              <h2>What we learned about {{ recipe.name }}</h2>
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
          <h1>Recipe not found</h1>
          <p>That crafting page does not exist yet. Browse all recipes or send us a correction.</p>
          <RouterLink to="/crafting/">Back to all recipes</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import craftingData from '../data/craftingData'
import enemiesData from '../data/enemiesData'
import itemsData from '../data/itemsData'
import { displayStatus, statusClass } from '../utils/contentLabels'
import { setPageSeo } from '../utils/seo'

const route = useRoute()
const recipes = craftingData.find((section) => section.key === 'recipes').items
const materialData = craftingData.find((section) => section.key === 'materials').items
const items = itemsData.find((section) => section.key === 'items').items
const bestiary = enemiesData.find((section) => section.key === 'entries').items

const recipe = computed(() => recipes.find((entry) => entry.slug === route.params.slug))
const outputItem = computed(() => items.find((item) => item.slug === recipe.value?.outputItem))
const materials = computed(() =>
  (recipe.value?.materials || []).map((material) => ({
    ...material,
    ...items.find((entry) => entry.slug === material.item),
    ...materialData.find((entry) => entry.item === material.item),
  })),
)
const relatedBestiary = computed(() => (recipe.value?.relatedBestiary || []).map((slug) => bestiary.find((entry) => entry.slug === slug)).filter(Boolean))

watchEffect(() => {
  if (!recipe.value) {
    setPageSeo({
      title: "Crafting Recipes | Burglin' Gnomes",
      description: "Burglin' Gnomes crafting recipes with materials, gear effects, and the craft order we use on co-op runs.",
      path: '/crafting/',
    })
    return
  }

  setPageSeo({
    ...recipe.value.tdk,
    path: `/crafting/${recipe.value.slug}/`,
  })
})
</script>

<style scoped>
.ingredient-grid,
.link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.ingredient-card {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  border: 2px solid var(--color-ink);
  border-radius: 18px;
  padding: 10px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.ingredient-card img {
  width: 96px;
  height: 82px;
  border: 2px solid var(--color-ink);
  border-radius: 12px;
  object-fit: cover;
}

.ingredient-card span {
  display: grid;
  gap: 6px;
}

.ingredient-card strong {
  color: var(--color-ink);
}

.ingredient-card em {
  color: var(--color-text);
  font-style: normal;
  font-weight: 800;
}

.note-panel h3 {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .ingredient-grid,
  .link-grid {
    grid-template-columns: 1fr;
  }

  .ingredient-card {
    grid-template-columns: 82px minmax(0, 1fr);
  }

  .ingredient-card img {
    width: 82px;
    height: 74px;
  }
}
</style>
