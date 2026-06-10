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
            <img src="/images/bestiary-page-01.webp" alt="Burglin' Gnomes NPCs and enemies bestiary" />
          </figure>
        </div>

        <section class="bestiary-categories-section">
          <div class="category-rail" aria-label="Bestiary categories">
            <a v-for="category in categories" :key="category" :href="`#${categorySlug(category)}`">
              {{ category }}
            </a>
          </div>
        </section>

        <section v-for="category in categories" :id="categorySlug(category)" :key="category" class="bestiary-category-section">
          <div class="section-heading">
            <span class="eyebrow">{{ category }}</span>
            <h2>{{ categoryHeading(category) }}</h2>
          </div>
          <div class="database-grid">
            <RouterLink v-for="entry in entriesByCategory(category)" :key="entry.slug" class="bestiary-card" :to="`/bestiary/${entry.slug}`">
              <img :src="entry.image" :alt="entry.name" />
              <span>
                <small>{{ entry.role }}</small>
                <strong>{{ entry.name }}</strong>
                <em>Danger: {{ entry.danger }}</em>
                <b :class="['status-pill', statusClass(entry.status)]">{{ displayStatus(entry.status) }}</b>
              </span>
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import enemiesData from '../data/enemiesData'
import { displayStatus, statusClass } from '../utils/contentLabels'

const categories = enemiesData.find((section) => section.key === 'categories').items
const entries = enemiesData.find((section) => section.key === 'entries').items

const categorySlug = (category) => category.toLowerCase().replaceAll(' ', '-')
const entriesByCategory = (category) => entries.filter((entry) => entry.category === category)
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
  box-shadow: 3px 4px 0 rgba(36, 51, 45, 0.12);
}

.bestiary-category-section {
  display: grid;
  gap: 18px;
  scroll-margin-top: 110px;
}

.database-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.bestiary-card {
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

.bestiary-card:hover,
.bestiary-card:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-3px);
}

.bestiary-card img {
  width: 100%;
  aspect-ratio: 1.45;
  object-fit: cover;
}

.bestiary-card span {
  display: grid;
  gap: 8px;
  padding: 14px;
}

.bestiary-card small {
  color: var(--color-primary);
  font-weight: 900;
}

.bestiary-card strong {
  color: var(--color-ink);
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
  font-size: 1.18rem;
}

.bestiary-card em {
  color: var(--color-text);
  font-style: normal;
  font-weight: 900;
}

@media (max-width: 1024px) {
  .database-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .database-grid {
    grid-template-columns: 1fr;
  }
}
</style>
