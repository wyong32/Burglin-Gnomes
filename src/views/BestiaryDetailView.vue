<template>
  <section class="bestiary-detail-section page-section">
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

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Bestiary detail sections">
            <strong>{{ entry.name }}</strong>
            <a href="#overview">Danger level</a>
            <a href="#behavior">Behavior</a>
            <a href="#counters">Survival plan</a>
            <a href="#related-guides">Related guides</a>
            <a href="#notes">What we have seen</a>
            <a v-if="sameCategoryEntries.length" href="#related-category">More {{ entry.category }}</a>
          </aside>

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

            <section id="counters" class="guide-block">
              <h2>How to survive {{ entry.name }}</h2>
              <p>{{ entry.counter }}</p>
              <div class="data-table">
                <div v-for="counter in entry.counters" :key="counter" class="table-row bestiary-note-row">
                  <strong>Counter</strong>
                  <span>{{ counter }}</span>
                </div>
              </div>
              <div class="link-grid">
                <RouterLink v-for="item in recommendedItems" :key="item.slug" class="guide-card" :to="`/items/${item.slug}`">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.use }}</span>
                </RouterLink>
              </div>
            </section>

            <section id="related-guides" class="guide-block">
              <h2>Related pages for {{ entry.name }}</h2>
              <div class="link-grid">
                <RouterLink v-for="guide in entry.relatedGuides" :key="guide.path" class="guide-card" :to="guide.path">
                  <strong>{{ guide.label }}</strong>
                  <span>Open the connected route, item, crafting, or mechanics page.</span>
                </RouterLink>
              </div>
            </section>

            <section id="notes" class="guide-block">
              <h2>Verification notes for {{ entry.name }}</h2>
              <article v-for="section in entry.sections" :key="section.heading" class="note-panel">
                <h3>{{ section.heading }}</h3>
                <p>{{ section.body }}</p>
              </article>
              <div class="data-table">
                <div v-for="note in entry.testing" :key="note" class="table-row bestiary-note-row">
                  <strong>Retest</strong>
                  <span>{{ note }}</span>
                </div>
              </div>
            </section>

            <section v-if="sameCategoryEntries.length" id="related-category" class="guide-block">
              <h2>More {{ entry.category }} in the bestiary</h2>
              <p>
                Other {{ entry.category.toLowerCase() }} entries we track — open a page for danger level,
                behavior notes, and survival tips.
              </p>
              <ul class="related-list">
                <li v-for="related in sameCategoryEntries" :key="related.slug">
                  <RouterLink class="related-entry" :to="`/bestiary/${related.slug}`">
                    <img :src="related.image" :alt="related.name" />
                    <span class="related-entry-copy">
                      <h3>{{ related.name }}</h3>
                      <p>{{ related.role }} · Danger: {{ related.danger }}</p>
                    </span>
                  </RouterLink>
                </li>
              </ul>
              <RouterLink class="category-back-link" :to="`/bestiary#${categorySlug(entry.category)}`">
                View all {{ entry.category }}
              </RouterLink>
            </section>
          </div>
        </div>
      </div>

      <div v-else class="page-content">
        <div class="guide-card">
          <h1>Bestiary | Burglin' Gnomes</h1>
          <p>That enemy or NPC page does not exist yet. Browse the full bestiary or send us a tip.</p>
          <RouterLink to="/bestiary">Back to the bestiary</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
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
const categorySlug = (category) => category.toLowerCase().replaceAll(' ', '-')
</script>

<style scoped>
.detail-row {
  grid-template-columns: 180px minmax(0, 1fr);
}

.bestiary-note-row {
  grid-template-columns: 120px minmax(0, 1fr);
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.note-panel h3 {
  margin-bottom: 8px;
}

.related-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
}

.related-entry {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  border: 2px solid var(--color-ink);
  border-radius: 16px;
  padding: 10px 12px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.related-entry:hover,
.related-entry:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-2px);
}

.related-entry img {
  width: 64px;
  height: 64px;
  border: 2px solid var(--color-ink);
  border-radius: 12px;
  object-fit: cover;
}

.related-entry-copy {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.related-entry-copy h3 {
  font-size: 1.05rem;
  line-height: 1.15;
}

.related-entry-copy p {
  color: var(--color-text);
  font-weight: 800;
  line-height: 1.35;
}

.category-back-link {
  display: inline-flex;
  margin-top: 12px;
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 10px 14px;
  background: var(--color-panel-2);
  color: var(--color-ink);
  font-weight: 900;
  box-shadow: 3px 4px 0 rgba(36, 51, 45, 0.12);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.category-back-link:hover,
.category-back-link:focus-visible {
  background: var(--color-surface-strong);
  color: var(--color-accent);
  outline: none;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .link-grid {
    grid-template-columns: 1fr;
  }

  .related-entry {
    grid-template-columns: 56px minmax(0, 1fr);
  }

}
</style>
