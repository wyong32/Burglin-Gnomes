<template>
  <section class="guides-section page-section">
    <div class="container">
      <div class="guides-content page-content">
        <div class="page-hero guides-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Guides</span>
            <h1>Burglin' Gnomes Guides for Tasks, Loot, Crafting, and Co-op Runs</h1>
            <p>
              Short, practical guide pages for players who need a route, a rule, or a survival
              answer before the next house run starts.
            </p>
          </div>
          <figure class="hero-art guides-hero-art">
            <img src="/images/page-09.webp" alt="Burglin' Gnomes guide list placeholder" />
          </figure>
        </div>

        <section v-if="categoryOptions.length" class="guide-filter-section">
          <div class="guide-filter-content" aria-label="Guide categories">
            <button
              v-for="category in categoryOptions"
              :key="category.name"
              type="button"
              :class="{ 'is-active': activeCategory === category.name }"
              @click="activeCategory = category.name"
            >
              {{ category.name }} <b>{{ category.count }}</b>
            </button>
          </div>
        </section>

        <section class="guide-list-section">
          <div v-if="filteredGuides.length" class="guide-list-content">
            <RouterLink
              v-for="guide in filteredGuides"
              :key="guide.id"
              class="guide-card-link"
              :to="`/guides/${guide.addressBar}`"
            >
              <figure>
                <img :src="guide.imageUrl" :alt="guide.imageAlt || guide.title" />
              </figure>
              <span class="guide-card-copy">
                <small>{{ guide.category }}</small>
                <h2>{{ guide.title }}</h2>
                <p>{{ guide.description }}</p>
                <span class="guide-card-meta">
                  <b>{{ guide.publishDate }}</b>
                  <em>{{ guide.tags.join(' / ') }}</em>
                </span>
              </span>
            </RouterLink>
          </div>

          <div v-else class="guide-empty-content" role="status">
            <span class="guide-empty-mark">0</span>
            <div class="guide-empty-copy">
              <span class="eyebrow">{{ activeCategory }} Guides</span>
              <h2>No published guides in this category yet</h2>
              <p>
                This section is reserved for route-tested Burglin' Gnomes guides. Use the
                beginner route, wiki index, item list, and crafting pages while the next guide
                batch is being written.
              </p>
            </div>
            <nav class="guide-empty-actions" aria-label="Useful Burglin' Gnomes pages">
              <RouterLink to="/beginner">Beginner Route</RouterLink>
              <RouterLink to="/wiki">Wiki Index</RouterLink>
              <RouterLink to="/items">Items</RouterLink>
              <RouterLink to="/crafting">Crafting</RouterLink>
            </nav>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import guidesData from '../data/guides.js'

const guides = guidesData.filter((guide) => guide.addressBar)
const categories = [...new Set(guides.map((guide) => guide.category).filter(Boolean))]
const categoryOptions = computed(() => {
  if (!guides.length) return []

  return [
    { name: 'All', count: guides.length },
    ...categories.map((category) => ({
      name: category,
      count: guides.filter((guide) => guide.category === category).length,
    })),
  ]
})
const activeCategory = ref('All')
const filteredGuides = computed(() => {
  if (activeCategory.value === 'All') return guides
  return guides.filter((guide) => guide.category === activeCategory.value)
})
</script>

<style scoped>
.guides-hero {
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(223, 91, 50, 0.14), transparent 42%),
    linear-gradient(90deg, rgba(223, 240, 198, 0.8), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.guides-hero-art img {
  object-fit: cover;
}

.guide-filter-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.guide-filter-content button {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 8px 12px;
  background: var(--color-surface);
  color: var(--color-ink);
  cursor: pointer;
  font: inherit;
  font-size: 0.84rem;
  font-weight: 900;
  box-shadow: 3px 4px 0 rgba(36, 51, 45, 0.1);
  transition:
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.guide-filter-content button:hover,
.guide-filter-content button:focus-visible,
.guide-filter-content button.is-active {
  background: var(--color-ink);
  color: var(--color-surface);
  outline: none;
  transform: translateY(-2px);
}

.guide-filter-content button b {
  color: var(--color-accent);
}

.guide-list-content {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.guide-card-link {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  color: inherit;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.guide-card-link::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 7px;
  height: auto;
  background:
    linear-gradient(180deg, var(--color-accent), var(--color-primary));
  content: "";
}

.guide-card-link:hover,
.guide-card-link:focus-visible {
  border-color: rgba(40, 114, 79, 0.42);
  box-shadow: var(--shadow-soft);
  outline: none;
  transform: translateY(-3px);
}

.guide-card-link figure {
  overflow: hidden;
  margin: 0;
  background: rgba(223, 240, 198, 0.5);
}

.guide-card-link img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.guide-card-copy {
  display: grid;
  gap: 9px;
  align-content: start;
  padding: clamp(16px, 2.4vw, 24px);
}

.guide-card-copy small {
  color: var(--color-primary);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.guide-card-copy h2 {
  font-size: clamp(1.12rem, 1.5vw, 1.32rem);
  line-height: 1.08;
  display: -webkit-box;
  min-height: 2.16em;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.guide-card-copy p {
  display: -webkit-box;
  overflow: hidden;
  color: var(--color-text);
  font-weight: 800;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.guide-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px dashed rgba(36, 51, 45, 0.16);
}

.guide-card-meta b,
.guide-card-meta em {
  font-size: 0.78rem;
  line-height: 1.25;
}

.guide-card-meta b {
  color: var(--color-ink-soft);
}

.guide-card-meta em {
  color: var(--color-accent);
  font-style: normal;
  font-weight: 900;
}

.guide-empty-content {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: clamp(18px, 3vw, 34px);
  align-items: center;
  overflow: hidden;
  border: 1px solid rgba(36, 51, 45, 0.16);
  border-radius: 22px;
  padding: clamp(22px, 4vw, 42px);
  background:
    radial-gradient(circle at 12% 18%, rgba(223, 91, 50, 0.18), transparent 26%),
    linear-gradient(135deg, rgba(255, 240, 199, 0.95), rgba(223, 240, 198, 0.9));
  box-shadow: var(--shadow-card);
}

.guide-empty-mark {
  display: grid;
  width: clamp(76px, 9vw, 118px);
  aspect-ratio: 1;
  place-items: center;
  border: 2px solid rgba(36, 51, 45, 0.18);
  border-radius: 50%;
  background: rgba(255, 248, 232, 0.88);
  color: var(--color-accent);
  font-size: clamp(2.5rem, 5vw, 4.4rem);
  font-weight: 950;
  line-height: 1;
  box-shadow: 8px 10px 0 rgba(36, 51, 45, 0.08);
}

.guide-empty-copy {
  display: grid;
  gap: 10px;
  max-width: 740px;
}

.guide-empty-copy h2 {
  max-width: 720px;
  font-size: clamp(1.6rem, 3vw, 2.7rem);
  line-height: 1;
}

.guide-empty-copy p {
  max-width: 680px;
  color: var(--color-text);
  font-weight: 800;
}

.guide-empty-actions {
  display: grid;
  gap: 10px;
  min-width: 178px;
}

.guide-empty-actions a {
  border: 1px solid rgba(36, 51, 45, 0.14);
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(255, 248, 232, 0.78);
  color: var(--color-ink);
  font-size: 0.88rem;
  font-weight: 950;
  text-align: center;
  box-shadow: 3px 4px 0 rgba(36, 51, 45, 0.08);
  transition:
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.guide-empty-actions a:hover,
.guide-empty-actions a:focus-visible {
  background: var(--color-ink);
  color: var(--color-surface);
  outline: none;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .guide-list-content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .guide-empty-content {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .guide-empty-actions {
    grid-column: 1 / -1;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .guide-list-content {
    grid-template-columns: 1fr;
  }

  .guide-empty-content {
    grid-template-columns: 1fr;
  }

  .guide-empty-mark {
    width: 82px;
  }

  .guide-empty-actions {
    grid-template-columns: 1fr;
  }
}
</style>
