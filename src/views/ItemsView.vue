<template>
  <section class="items-section page-section">
    <div class="container">
      <div class="items-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">All items</span>
            <h1>All Items — Materials, Weapons, Tools &amp; Gear | Burglin' Gnomes</h1>
            <p>
              Every item we track from our runs: materials, weapons, tools, gear, task loot, base
              objects, and utility items. Pick a category, then open a page for where to find it,
              what it is for, and which recipes it feeds.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/item-page-01.webp" alt="Burglin' Gnomes materials and item guide" />
          </figure>
        </div>

        <section class="item-categories-section">
          <div class="category-rail" aria-label="Item categories">
            <a v-for="category in categories" :key="category" :href="`#${categoryId(category)}`">
              {{ category }} <b>{{ itemsByCategory(category).length }}</b>
            </a>
          </div>
        </section>

        <section class="item-list-section" aria-label="Items by category">
          <div class="section-heading">
            <span class="eyebrow">By category</span>
            <h2>Find the item you need</h2>
            <p>
              Each row links to a full page with sources, uses, linked recipes, and player notes
              for planning a cleaner route.
            </p>
          </div>

          <div class="item-category-stack">
            <section
              v-for="group in categoryGroups"
              :id="categoryId(group.category)"
              :key="group.category"
              class="item-category-block"
            >
              <div class="item-category-heading">
                <span>{{ group.items.length }} items</span>
                <h3>{{ group.category }}</h3>
                <p>{{ categoryIntro(group.category) }}</p>
              </div>

              <div class="data-table">
                <div class="table-row table-head item-row">
                  <span>Item</span>
                  <span>Type</span>
                  <span>Source / use</span>
                </div>
                <div v-for="item in group.items" :key="item.slug" class="table-row item-row">
                  <RouterLink class="table-title" :to="`/items/${item.slug}`">
                    <img :src="item.image" :alt="item.name" />
                    <h3>{{ item.name }}</h3>
                  </RouterLink>
                  <span>{{ item.type }}</span>
                  <span>{{ itemCardSource(item) }}</span>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import itemsData from '../data/itemsData'

const categories = itemsData.find((section) => section.key === 'categories').items
const items = itemsData.find((section) => section.key === 'items').items

const itemsByCategory = (category) => items.filter((item) => item.category === category)
const categoryGroups = categories.map((category) => ({ category, items: itemsByCategory(category) })).filter((group) => group.items.length)
const categoryId = (category) => `items-${category.toLowerCase().replaceAll(' ', '-')}`
const itemCardSource = (item) => (item.source === 'Unknown source' ? item.use : item.source)

const categoryIntro = (category) =>
  ({
    Materials: 'Metal, cloth, and junk you need for early crafts and task overlap.',
    Weapons: 'Gear for pests, humans, and buying escape time — practice before clean runs.',
    Tools: 'Crowbars, pickaxes, and items that open routes or change the house.',
    Gear: 'Wearables that change carrying, movement, hands, and survival odds.',
    'Task Items': 'Objects the High-Gnome list asks for directly — route to these first.',
    'Base Objects': 'Gnome-world objects tied to revival, storage, or home upgrades.',
    'Utility Items': 'Smoke, potions, and support tools that change timing on a run.',
    'Hazard Items': 'Household objects and environmental risks that can block a gnome-scale path.',
  })[category] || 'Items we are still confirming in the full release.'
</script>

<style scoped>
.category-rail {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-rail a {
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 9px 12px;
  background: var(--color-panel-2);
  color: var(--color-ink);
  font-weight: 900;
  text-decoration: none;
  box-shadow: 3px 4px 0 rgba(36, 51, 45, 0.12);
}

.category-rail a:hover,
.category-rail a:focus-visible {
  background: var(--color-surface-strong);
  color: var(--color-accent);
  outline: none;
}

.category-rail b {
  color: var(--color-accent);
}

.item-list-section {
  display: grid;
  gap: 18px;
  scroll-margin-top: 110px;
}

.item-category-stack {
  display: grid;
  gap: 24px;
}

.item-category-block {
  display: grid;
  gap: 14px;
  scroll-margin-top: 120px;
}

.item-category-heading {
  display: grid;
  grid-template-columns: minmax(140px, 0.25fr) minmax(180px, 0.45fr) minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  border: 3px solid var(--color-ink);
  border-radius: 22px;
  padding: 16px 18px;
  background:
    linear-gradient(135deg, rgba(255, 218, 193, 0.72), rgba(232, 246, 216, 0.7)),
    var(--color-surface);
  box-shadow: 6px 7px 0 rgba(36, 51, 45, 0.12);
}

.item-category-heading span {
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.item-category-heading h3 {
  margin: 0;
}

.item-category-heading p {
  margin: 0;
}

.item-row {
  grid-template-columns: minmax(180px, 1.1fr) 0.75fr 1.5fr;
}

.table-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.table-title img {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border: 2px solid var(--color-ink);
  border-radius: 12px;
  object-fit: cover;
}

.table-title h3 {
  font-size: 1.05rem;
  line-height: 1.15;
}

@media (max-width: 1024px) {
  .item-category-heading {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}

@media (max-width: 768px) {
  .item-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .item-row.table-head {
    display: none;
  }
}
</style>
