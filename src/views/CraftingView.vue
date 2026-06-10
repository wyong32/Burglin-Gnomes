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
            <img src="/images/crafting-page-01.webp" alt="Burglin' Gnomes crafting board" />
          </figure>
        </div>

        <section id="recipes" class="recipe-board-section">
          <div class="section-heading">
            <span class="eyebrow">Recipes</span>
            <h2>Crafting recipes worth checking first</h2>
            <p>Open a recipe for exact materials, what you craft, when we make it first, and what still needs more playtime.</p>
          </div>
          <div class="recipe-grid">
            <RouterLink v-for="recipe in recipes" :key="recipe.slug" class="recipe-card" :to="`/crafting/${recipe.slug}`">
              <img :src="recipe.image" :alt="recipe.name" />
              <span>
                <small>{{ recipe.category }}</small>
                <strong>{{ recipe.name }}</strong>
                <em>{{ recipeCardDetail(recipe) }}</em>
                <b :class="recipeCardLabelClass(recipe)">{{ recipeCardLabel(recipe) }}</b>
              </span>
            </RouterLink>
          </div>
        </section>

        <section id="materials" class="materials-section">
          <div class="section-heading">
            <span class="eyebrow">Materials</span>
            <h2>Where to get recipe materials</h2>
          </div>
          <div class="data-table">
            <div class="table-row table-head material-row">
              <span>Material</span>
              <span>Source</span>
              <span>Used for</span>
              <span>Guide note</span>
            </div>
            <div v-for="material in materials" :key="material.name" class="table-row material-row">
              <RouterLink class="table-title" :to="material.item ? `/items/${material.item}` : '/items'">
                <img :src="material.image" :alt="material.name" />
                <strong>{{ material.name }}</strong>
              </RouterLink>
              <span>{{ materialCardSource(material) }}</span>
              <span>{{ material.note }}</span>
              <b :class="materialCardLabelClass(material)">{{ materialCardLabel(material) }}</b>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import craftingData from '../data/craftingData'
import { displayStatus, statusClass } from '../utils/contentLabels'

const recipes = craftingData.find((section) => section.key === 'recipes').items
const materials = craftingData.find((section) => section.key === 'materials').items

const isNewRecipe = (recipe) => recipe.status === 'Retest Required' || recipe.category === 'Unverified'

const recipeCardDetail = (recipe) =>
  recipe.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ')

const recipeCardLabel = (recipe) => (isNewRecipe(recipe) ? 'New' : displayStatus(recipe.status))

const recipeCardLabelClass = (recipe) =>
  isNewRecipe(recipe) ? 'status-pill new' : ['status-pill', statusClass(recipe.status)]

const isNewMaterial = (material) => material.source === 'Unknown' || material.status === 'Retest Required'

const materialCardSource = (material) => (material.source === 'Unknown' ? material.note : material.source)

const materialCardLabel = (material) => (isNewMaterial(material) ? 'New' : displayStatus(material.status))

const materialCardLabelClass = (material) =>
  isNewMaterial(material) ? 'status-pill new' : ['status-pill', statusClass(material.status)]
</script>

<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.recipe-card {
  display: grid;
  border: 2px solid var(--color-ink);
  border-radius: 20px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.recipe-card:hover,
.recipe-card:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-3px);
}

.recipe-card img {
  width: 100%;
  aspect-ratio: 1.7;
  object-fit: cover;
}

.recipe-card span {
  display: grid;
  gap: 8px;
  padding: 16px;
}

.recipe-card small {
  color: var(--color-primary);
  font-weight: 900;
}

.recipe-card strong {
  color: var(--color-ink);
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
  font-size: 1.24rem;
}

.recipe-card em {
  color: var(--color-text);
  font-style: normal;
  font-weight: 900;
  line-height: 1.32;
}

.recipe-card .status-pill.new,
.materials-section .status-pill.new {
  background: rgba(217, 163, 49, 0.14);
  color: var(--color-gold);
  border-color: var(--color-gold);
}

.material-row {
  grid-template-columns: 1fr 1.15fr 1.65fr 130px;
}

.table-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.table-title img {
  width: 46px;
  height: 46px;
  border: 2px solid var(--color-ink);
  border-radius: 12px;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .recipe-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .recipe-grid {
    grid-template-columns: 1fr;
  }
}
</style>
