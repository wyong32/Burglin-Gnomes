<template>
  <section class="bestiary-detail-section page-section">
    <div class="container">
      <div v-if="entry" class="bestiary-detail-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">{{ entry.category }}</span>
            <h1>{{ entry.name }} — How to Survive | Burglin' Gnomes</h1>
            <p>{{ entry.behavior }} {{ entry.counter }}</p>
          </div>
          <figure class="hero-art">
            <img :src="entry.image" :alt="entry.name" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Bestiary detail sections">
            <strong>{{ entry.name }}</strong>
            <a href="#overview">Danger level</a>
            <a href="#counters">Survival plan</a>
            <a href="#notes">What we have seen</a>
          </aside>

          <div class="guide-main">
            <section id="overview" class="guide-block">
              <h2>{{ entry.name }} — danger and role</h2>
              <div class="data-table">
                <div class="table-row detail-row"><strong>Category</strong><span>{{ entry.category }}</span></div>
                <div class="table-row detail-row"><strong>Role</strong><span>{{ entry.role }}</span></div>
                <div class="table-row detail-row"><strong>Danger</strong><span>{{ entry.danger }}</span></div>
                <div class="table-row detail-row"><strong>Guide note</strong><b :class="['status-pill', statusClass(entry.status)]">{{ displayStatus(entry.status) }}</b></div>
              </div>
            </section>

            <section id="counters" class="guide-block">
              <h2>How to survive {{ entry.name }}</h2>
              <p>{{ entry.counter }}</p>
              <div class="link-grid">
                <RouterLink v-for="item in recommendedItems" :key="item.slug" class="guide-card" :to="`/items/${item.slug}/`">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.use }}</span>
                </RouterLink>
              </div>
            </section>

            <section id="notes" class="guide-block">
              <h2>What we have seen from {{ entry.name }}</h2>
              <article v-for="section in entry.sections" :key="section.heading" class="note-panel">
                <h3>{{ section.heading }}</h3>
                <p>{{ section.body }}</p>
              </article>
            </section>
          </div>
        </div>
      </div>

      <div v-else class="page-content">
        <div class="guide-card">
          <h1>Bestiary entry not found</h1>
          <p>That enemy or NPC page does not exist yet. Browse the full bestiary or send us a tip.</p>
          <RouterLink to="/bestiary/">Back to the bestiary</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import enemiesData from '../data/enemiesData'
import itemsData from '../data/itemsData'
import { displayStatus, statusClass } from '../utils/contentLabels'
import { setPageSeo } from '../utils/seo'

const route = useRoute()
const entries = enemiesData.find((section) => section.key === 'entries').items
const items = itemsData.find((section) => section.key === 'items').items

const entry = computed(() => entries.find((item) => item.slug === route.params.slug))
const recommendedItems = computed(() => (entry.value?.recommendedItems || []).map((slug) => items.find((item) => item.slug === slug)).filter(Boolean))

watchEffect(() => {
  if (!entry.value) {
    setPageSeo({
      title: "Bestiary | Burglin' Gnomes",
      description: "NPCs, enemies, and hazards in Burglin' Gnomes with danger levels and survival tips from our co-op runs.",
      path: '/bestiary/',
    })
    return
  }

  setPageSeo({
    ...entry.value.tdk,
    path: `/bestiary/${entry.value.slug}/`,
  })
})
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
