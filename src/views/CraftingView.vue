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

        <section id="craft-order" class="craft-order-section">
          <div class="section-heading">
            <span class="eyebrow">Craft order</span>
            <h2>Recommended crafting order for new players</h2>
            <p>
              Crafting should reduce risk before it adds damage. Carry capacity, basic defense,
              mobility, hand control, and material farming each solve a different route problem.
            </p>
          </div>
          <div class="craft-order-list">
            <RouterLink
              v-for="item in craftOrder"
              :key="item.rank"
              class="craft-order-card"
              :to="`/crafting/${item.recipe}`"
            >
              <strong>{{ item.rank }}</strong>
              <span>
                <h3>{{ item.name }}</h3>
                <p>{{ item.reason }}</p>
                <em>{{ item.timing }}</em>
              </span>
            </RouterLink>
          </div>
        </section>

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
  </section>
</template>

<script setup>
import craftingData from '../data/craftingData'

const recipes = craftingData.find((section) => section.key === 'recipes').items
const materials = craftingData.find((section) => section.key === 'materials').items
const craftOrder = craftingData.find((section) => section.key === 'craftOrder').items

const recipeCardDetail = (recipe) =>
  recipe.materials.map((material) => `${material.quantity} ${material.name}`).join(' + ')

const materialCardSource = (material) => (material.source === 'Unknown' ? material.note : material.source)
</script>

<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.craft-order-list {
  display: grid;
  gap: 12px;
}

.craft-order-card {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  border: 2px solid var(--color-ink);
  border-radius: 20px;
  padding: 15px;
  background:
    linear-gradient(90deg, rgba(255, 240, 199, 0.9), rgba(223, 240, 198, 0.58)),
    var(--color-surface);
  box-shadow: var(--shadow-card);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.craft-order-card:hover,
.craft-order-card:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-2px);
}

.craft-order-card > strong {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border: 2px solid var(--color-ink);
  border-radius: 16px;
  background: var(--color-accent);
  color: var(--color-surface);
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
  font-size: 1.24rem;
}

.craft-order-card span {
  display: grid;
  gap: 6px;
}

.craft-order-card em {
  color: var(--color-primary);
  font-style: normal;
  font-weight: 900;
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

.material-row {
  grid-template-columns: 1fr 1.15fr 1.65fr;
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
