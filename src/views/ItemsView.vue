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
            <img src="/images/page-04.webp" alt="Burglin' Gnomes materials weapons tools and item guide" />
          </figure>
        </div>

        <div class="guide-layout">
          <PageSidebar
            label="Categories"
            title="Items"
            aria-label="Item categories"
            :sections="sidebarSections"
          />

          <div class="guide-main">
            <section id="items-overview" class="guide-block item-list-section" aria-label="Items by category">
              <div class="section-heading">
                <span class="eyebrow">By category</span>
                <h2>Find the item you need</h2>
                <p>
                  Each row links to a full page with locations, uses, linked recipes, and player notes
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
                      <span>Where to get it or why it matters</span>
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PageSidebar from '../components/PageSidebar.vue'
import itemsData from '../data/itemsData'

const categories = itemsData.find((section) => section.key === 'categories').items
const items = itemsData.find((section) => section.key === 'items').items

const itemsByCategory = (category) => items.filter((item) => item.category === category)
const categoryGroups = categories.map((category) => ({ category, items: itemsByCategory(category) })).filter((group) => group.items.length)
const categoryId = (category) => `items-${category.toLowerCase().replaceAll(' ', '-')}`

const sidebarSections = computed(() => [
  { id: 'items-overview', label: 'Overview', href: '#items-overview' },
  ...categoryGroups.map((group) => ({
    id: categoryId(group.category),
    label: group.category,
    href: `#${categoryId(group.category)}`,
    count: group.items.length,
  })),
])

const itemCardSource = (item) => (item.source === 'Unknown source' ? item.use : item.source)

const categoryIntro = (category) =>
  ({
    Materials: 'Metal, cloth, and junk you need for early crafts and task overlap.',
    Weapons: 'Crafted weapons and house weapons, including firearms, explosives, stun tools, and close-range options.',
    Tools: 'Pickaxe, Eyeglass, Grappling Hook, and tools that change farming or movement routes.',
    Gear: 'Wearables that change carrying, movement, hands, and survival odds.',
    'Task Items': 'Objects the High-Gnome list asks for directly — route to these first.',
    Potions: 'Potion Table crafts that apply player status effects or feed the Repackager.',
    Ammo: 'Marbles and blowgun darts used by ranged weapons during planned house routes.',
  })[category] || 'Items we are still confirming in the full release.'
</script>

<style scoped>
.item-list-section {
  scroll-margin-top: 96px;
}

.item-category-stack {
  display: grid;
  gap: 24px;
}

.item-category-block {
  display: grid;
  gap: 14px;
  scroll-margin-top: 110px;
}

.item-category-heading {
  display: grid;
  grid-template-columns: minmax(120px, 0.22fr) minmax(160px, 0.38fr) minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  background: rgba(223, 240, 198, 0.28);
  box-shadow: var(--shadow-card);
}

.item-category-heading span {
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.item-category-heading h3 {
  margin: 0;
  font-size: 1.15rem;
}

.item-category-heading p {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
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
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.table-title h3 {
  font-size: 1rem;
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
