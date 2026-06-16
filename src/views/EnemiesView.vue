<template>
  <section class="bestiary-section page-section">
    <div class="container">
      <div class="bestiary-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Bestiary</span>
            <h1>Bestiary — NPCs, Enemies &amp; Hazards | Burglin' Gnomes</h1>
            <p>
              Humans, cats, pests, hostile gnomes, and household hazards that can end a run. We
              log what blocks tasks, what causes wipes, and which tools we practice before trusting
              them on a clean route.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/page-07.webp" alt="Burglin' Gnomes NPCs enemies and hazards bestiary" />
          </figure>
        </div>

        <GptAd unit="banner3" />

        <div class="guide-layout">
          <PageSidebar
            label="Categories"
            title="Bestiary"
            aria-label="Bestiary categories"
            :sections="sidebarSections"
          />

          <div class="guide-main">
            <section
              v-for="category in categories"
              :id="categorySlug(category)"
              :key="category"
              class="guide-block bestiary-category-section"
            >
              <div class="section-heading">
                <span class="eyebrow">{{ category }}</span>
                <h2>{{ categoryHeading(category) }}</h2>
              </div>
              <div class="tile-grid">
                <RouterLink
                  v-for="entry in entriesByCategory(category)"
                  :key="entry.slug"
                  class="tile-card"
                  :to="`/bestiary/${entry.slug}`"
                >
                  <span class="tile-card__media">
                    <img :src="entry.image" :alt="entry.name" />
                    <span class="tile-card__badge" :class="dangerClass(entry.danger)">{{ entry.danger }}</span>
                  </span>
                  <span class="tile-card__body">
                    <small>{{ entry.role }}</small>
                    <strong>{{ entry.name }}</strong>
                  </span>
                </RouterLink>
              </div>

              <GptAd unit="banner1" />
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
import enemiesData from '../data/enemiesData'

const categories = enemiesData.find((section) => section.key === 'categories').items
const entries = enemiesData.find((section) => section.key === 'entries').items

const categorySlug = (category) => category.toLowerCase().replaceAll(' ', '-')
const entriesByCategory = (category) => entries.filter((entry) => entry.category === category)

const sidebarSections = computed(() =>
  categories.map((category) => ({
    id: categorySlug(category),
    label: category,
    href: `#${categorySlug(category)}`,
    count: entriesByCategory(category).length,
  })),
)

const categoryHeading = (category) =>
  ({
    NPCs: 'Friendly and neutral NPCs',
    Humans: 'Human threats and rescue risks',
    Animals: 'Animals that can block your route',
    Pests: 'Small pests and how they interfere',
    'Hostile Gnomes': 'Hostile gnomes to watch for',
    Hazards: 'Hazards that behave like enemies',
    Unknown: 'Threats we are still confirming',
  })[category] || `${category} in Burglin' Gnomes`

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
.bestiary-category-section {
  scroll-margin-top: 96px;
}
</style>
