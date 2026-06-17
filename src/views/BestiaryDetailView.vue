<template>
  <section class="bestiary-detail-section page-section detail-page">
    <div class="container">
      <div v-if="entry" class="bestiary-detail-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">{{ entry.category }}</span>
            <h1>{{ entry.tdk.title }}</h1>
            <p>{{ entry.behavior }} {{ entry.counter }}</p>
          </div>
          <figure class="hero-art">
            <img :src="entry.image" :alt="entry.name" />
          </figure>
        </div>

        <GptAd unit="banner3" />

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            :title="entry.name"
            aria-label="Bestiary detail sections"
            :sections="bestiarySidebarSections"
          />

          <div class="guide-main">
            <section id="overview" class="guide-block">
              <h2>{{ entry.name }} — danger and role</h2>
              <div class="data-table">
                <div class="table-row detail-row"><strong>Category</strong><span>{{ entry.category }}</span></div>
                <div class="table-row detail-row"><strong>Role</strong><span>{{ entry.role }}</span></div>
                <div class="table-row detail-row"><strong>Danger</strong><span>{{ entry.danger }}</span></div>
                <div class="table-row detail-row"><strong>Location</strong><span>{{ entry.location }}</span></div>
              </div>
            </section>

            

            <section id="behavior" class="guide-block">
              <h2>{{ entry.name }} behavior and attack pattern</h2>
              <p>{{ entry.behavior }}</p>
              <div class="data-table">
                <div v-for="attack in entry.attacks" :key="attack" class="table-row bestiary-note-row">
                  <strong>Pattern</strong>
                  <span>{{ attack }}</span>
                </div>
              </div>
            </section>

            <GptAd unit="banner1" />

            <section id="counters" class="guide-block">
              <h2>How to survive {{ entry.name }}</h2>
              <p>{{ entry.counter }}</p>
              <div class="data-table">
                <div v-for="counter in entry.counters" :key="counter" class="table-row bestiary-note-row">
                  <strong>Counter</strong>
                  <span>{{ counter }}</span>
                </div>
              </div>
              <div class="link-list">
                <a v-for="item in recommendedItems" :key="item.slug" class="link-list__item" :href="`/items/${item.slug}`">
                  <span>
                    <strong>{{ item.name }}</strong>
                    <span>{{ item.use }}</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <section id="related-guides" class="guide-block">
              <h2>Related pages for {{ entry.name }}</h2>
              <div class="link-list">
                <a v-for="guide in entry.relatedGuides" :key="guide.path" class="link-list__item" :href="guide.path">
                  <span>
                    <strong>{{ guide.label }}</strong>
                    <span>Open the connected route, item, crafting, or mechanics page.</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <GptAd unit="banner2" />

            <section id="notes" class="guide-block">
              <h2>{{ entry.name }} route notes</h2>
              <article v-for="section in entry.sections" :key="section.heading" class="note-panel">
                <h3>{{ section.heading }}</h3>
                <p>{{ section.body }}</p>
              </article>
              <div class="data-table">
                <div v-for="note in entry.testing" :key="note" class="table-row bestiary-note-row">
                  <strong>Check</strong>
                  <span>{{ note }}</span>
                </div>
              </div>
            </section>

            <section v-if="sameCategoryEntries.length" id="related-category" class="guide-block">
              <h2>More {{ entry.category }} in the bestiary</h2>
              <p>
                Other {{ entry.category.toLowerCase() }} entries — open a page for danger level,
                behavior notes, and survival tips.
              </p>
              <div class="tile-grid">
                <a
                  v-for="related in sameCategoryEntries"
                  :key="related.slug"
                  class="tile-card"
                  :href="`/bestiary/${related.slug}`"
                >
                  <span class="tile-card__media">
                    <img :src="related.image" :alt="related.name" />
                    <span class="tile-card__badge" :class="dangerClass(related.danger)">{{ related.danger }}</span>
                  </span>
                  <span class="tile-card__body">
                    <small>{{ related.role }}</small>
                    <strong>{{ related.name }}</strong>
                  </span>
                </a>
              </div>
              <a class="category-back-link" :href="`/bestiary#${categorySlug(entry.category)}`">
                View all {{ entry.category }}
              </a>
            </section>

            <GptAd unit="banner3" />
          </div>
        </div>
      </div>

      <div v-else class="page-content">
        <div class="guide-card">
          <h1>Bestiary | Burglin' Gnomes</h1>
          <p>That enemy or NPC page does not exist yet. Browse the full bestiary or send us a tip.</p>
          <a href="/bestiary">Back to the bestiary</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageSidebar from '../components/PageSidebar.vue'
import enemiesData from '../data/enemiesData'
import itemsData from '../data/itemsData'

const route = useRoute()
const entries = enemiesData.find((section) => section.key === 'entries').items
const items = itemsData.find((section) => section.key === 'items').items

const entry = computed(() => entries.find((item) => item.slug === route.params.slug))
const recommendedItems = computed(() => (entry.value?.recommendedItems || []).map((slug) => items.find((item) => item.slug === slug)).filter(Boolean))
const sameCategoryEntries = computed(() => {
  if (!entry.value) return []
  return entries.filter((item) => item.category === entry.value.category && item.slug !== entry.value.slug)
})

const bestiarySidebarSections = computed(() => {
  const sections = [
    { id: 'overview', label: 'Danger level', href: '#overview' },
    { id: 'behavior', label: 'Behavior', href: '#behavior' },
    { id: 'counters', label: 'Survival plan', href: '#counters' },
    { id: 'related-guides', label: 'Related guides', href: '#related-guides' },
    { id: 'notes', label: 'Route notes', href: '#notes' },
  ]

  if (sameCategoryEntries.value.length) {
    sections.push({
      id: 'related-category',
      label: `More ${entry.value.category}`,
      href: '#related-category',
      count: sameCategoryEntries.value.length,
    })
  }

  return sections
})
const categorySlug = (category) => category.toLowerCase().replaceAll(' ', '-')

const dangerClass = (danger) => {
  const value = String(danger).toLowerCase()
  if (value.includes('very high')) return 'is-very-high'
  if (value === 'high') return 'is-high'
  if (value === 'medium') return 'is-medium'
  if (value === 'low') return 'is-low'
  if (value === 'none') return 'is-none'
  return ''
}
</script>

<style scoped>
.detail-row {
  grid-template-columns: 180px minmax(0, 1fr);
}

.bestiary-note-row {
  grid-template-columns: 120px minmax(0, 1fr);
}

.note-panel h3 {
  margin-bottom: 8px;
}

.category-back-link {
  display: inline-flex;
  margin-top: 12px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 8px 12px;
  background: var(--color-surface);
  color: var(--color-ink);
  font-weight: 800;
  transition:
    background 140ms ease,
    border-color 140ms ease;
}

.category-back-link:hover,
.category-back-link:focus-visible {
  border-color: rgba(40, 114, 79, 0.35);
  background: rgba(223, 240, 198, 0.35);
  color: var(--color-primary);
  outline: none;
}
</style>
