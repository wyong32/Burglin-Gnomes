<template>
  <section class="guide-detail-section page-section">
    <div class="container">
      <div v-if="guide" class="guide-detail-content page-content">
        <div class="page-hero guide-detail-hero">
          <div class="page-hero-copy">
            <nav class="guide-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/guides">Guides</a>
              <span aria-hidden="true">/</span>
              <strong>{{ guide.title }}</strong>
            </nav>
            <span class="eyebrow">{{ guide.category || 'Guide' }}</span>
            <h1>{{ guide.title }}</h1>
            <p>{{ guide.description }}</p>
          </div>
          <figure class="hero-art">
            <img :src="guide.imageUrl" :alt="guide.imageAlt || guide.title" />
          </figure>
        </div>

        <GptAd unit="banner2" />

        <div class="guide-layout guide-detail-layout">
          <article class="guide-main guide-article">
            <div class="guide-tags" aria-label="Guide topics">
              <span v-for="tag in guide.tags" :key="tag">{{ tag }}</span>
            </div>

            <div class="guide-body" v-html="guide.detailsHtml"></div>

            <GptAd unit="banner3" />

            <section v-if="guidePager.length" class="related-guides-section">
              <div class="section-heading">
                <span class="eyebrow">Guide Navigation</span>
                <h2>Previous and next guides</h2>
              </div>
              <div class="related-guide-grid">
                <a
                  v-for="item in guidePager"
                  :key="item.type"
                  class="guide-card"
                  :href="`/guides/${item.guide.addressBar}`"
                >
                  <small>{{ item.label }}</small>
                  <strong>{{ item.guide.title }}</strong>
                </a>
              </div>
            </section>
          </article>
          

          <aside class="guide-sidebar" aria-label="Guide information">
            <div class="guide-sidebar-panel">
              <span class="guide-sidebar-label">Category</span>
              <strong>{{ guide.category }}</strong>
              <p>{{ guide.description }}</p>
            </div>

            <div class="guide-sidebar-list">
              <span>
                <small>Updated</small>
                <b>{{ guide.publishDate }}</b>
              </span>
              <span>
                <small>Author</small>
                <b>{{ guide.author }}</b>
              </span>
            </div>

            <div class="guide-topic-panel">
              <small>Topics</small>
              <div>
                <span v-for="tag in guide.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>

            <a class="guide-back-link" href="/guides">Browse all guides</a>
          </aside>
        </div>
      </div>

      <div v-else class="page-content">
        <div class="guide-card">
          <h1>Guides | Burglin' Gnomes</h1>
          <p>That guide does not exist yet. Browse the full guide list.</p>
          <a href="/guides">Back to guides</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import guidesData from '../data/guides.js'

const route = useRoute()
const guides = guidesData.filter((item) => item.addressBar)
const guide = computed(() => guides.find((item) => item.addressBar === route.params.slug))
const guidePager = computed(() => {
  if (!guide.value) return []
  const currentIndex = guides.findIndex((item) => item.addressBar === guide.value.addressBar)
  if (currentIndex < 0) return []

  return [
    guides[currentIndex - 1] && {
      type: 'previous',
      label: 'Previous guide',
      guide: guides[currentIndex - 1],
    },
    guides[currentIndex + 1] && {
      type: 'next',
      label: 'Next guide',
      guide: guides[currentIndex + 1],
    },
  ].filter(Boolean)
})
</script>

<style scoped>
.guide-detail-hero {
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(114, 80, 166, 0.14), transparent 44%),
    linear-gradient(90deg, rgba(223, 240, 198, 0.8), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.guide-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(255, 248, 232, 0.82);
  box-shadow: var(--shadow-card);
}

.guide-breadcrumb a,
.guide-breadcrumb span,
.guide-breadcrumb strong {
  color: var(--color-ink-soft);
  font-size: 0.86rem;
  font-weight: 900;
  line-height: 1.25;
}

.guide-breadcrumb a {
  color: var(--color-primary);
}

.guide-breadcrumb a:hover,
.guide-breadcrumb a:focus-visible {
  color: var(--color-accent);
  outline: none;
}

.guide-breadcrumb strong {
  overflow: hidden;
  max-width: min(560px, 72vw);
  color: var(--color-ink);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.guide-detail-layout {
  grid-template-columns: minmax(0, 1fr) minmax(270px, 340px);
}

.guide-sidebar {
  position: sticky;
  top: 96px;
  display: grid;
  gap: 14px;
  align-self: start;
  overflow: hidden;
  border: 1px solid rgba(36, 51, 45, 0.2);
  border-radius: 22px;
  padding: 16px;
  background:
    linear-gradient(180deg, rgba(255, 240, 199, 0.78), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.guide-sidebar::before {
  display: block;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background:
    linear-gradient(90deg, var(--color-accent), var(--color-gold), var(--color-primary));
  content: "";
}

.guide-sidebar-panel {
  display: grid;
  gap: 8px;
  padding: 2px 2px 8px;
}

.guide-sidebar strong {
  color: var(--color-ink);
  font-size: 1.55rem;
  line-height: 1.05;
}

.guide-sidebar p {
  color: var(--color-text);
  font-weight: 800;
  line-height: 1.55;
}

.guide-sidebar-label,
.guide-topic-panel small,
.guide-sidebar-list small {
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.guide-sidebar-list {
  display: grid;
  gap: 10px;
}

.guide-sidebar-list span {
  display: grid;
  gap: 4px;
  border: 1px solid rgba(36, 51, 45, 0.14);
  border-radius: 14px;
  padding: 12px;
  background: rgba(255, 248, 232, 0.72);
}

.guide-sidebar-list b {
  color: var(--color-ink);
  font-size: 0.94rem;
  line-height: 1.25;
}

.guide-topic-panel {
  display: grid;
  gap: 9px;
}

.guide-topic-panel div {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.guide-topic-panel span {
  border: 1px solid rgba(40, 114, 79, 0.22);
  border-radius: 999px;
  padding: 7px 10px;
  background: rgba(223, 240, 198, 0.72);
  color: var(--color-ink);
  font-size: 0.78rem;
  font-weight: 900;
}

.guide-back-link {
  display: inline-flex;
  justify-content: center;
  border: 1px solid var(--color-ink);
  border-radius: 999px;
  padding: 11px 14px;
  background: var(--color-ink);
  color: var(--color-surface);
  font-weight: 900;
  box-shadow: 4px 5px 0 rgba(36, 51, 45, 0.14);
  transition:
    background 160ms ease,
    transform 160ms ease;
}

.guide-back-link:hover,
.guide-back-link:focus-visible {
  background: var(--color-primary);
  outline: none;
  transform: translateY(-2px);
}

.guide-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.guide-tags span {
  border-radius: 999px;
  padding: 7px 11px;
  background: rgba(223, 240, 198, 0.75);
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 900;
}

.guide-article {
  max-width: none;
}

.guide-body {
  display: grid;
  gap: 16px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: clamp(20px, 3vw, 34px);
  background:
    linear-gradient(180deg, rgba(255, 248, 232, 0.98), rgba(255, 240, 199, 0.42)),
    var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.guide-body :deep(h2) {
  margin-top: 10px;
  color: var(--color-ink);
  font-size: clamp(1.35rem, 2vw, 1.8rem);
  line-height: 1.12;
}

.guide-body :deep(h2:first-child) {
  margin-top: 0;
}

.guide-body :deep(h3) {
  color: var(--color-ink);
  font-size: 1.18rem;
}

.guide-body :deep(p) {
  color: var(--color-text);
  font-size: 1.02rem;
  font-weight: 800;
  line-height: 1.72;
}

.guide-body :deep(a) {
  color: var(--color-primary);
  font-weight: 950;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.guide-body :deep(a:hover),
.guide-body :deep(a:focus-visible) {
  color: var(--color-accent);
  outline: none;
}

.guide-body :deep(ul),
.guide-body :deep(ol) {
  display: grid;
  gap: 8px;
  padding-left: 20px;
}

.guide-body :deep(li) {
  color: var(--color-text);
  font-weight: 800;
  line-height: 1.55;
  list-style: disc;
}

.related-guide-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.related-guide-grid .guide-card {
  display: grid;
  gap: 8px;
}

.related-guide-grid strong {
  display: -webkit-box;
  min-height: 2.4em;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.related-guide-grid small {
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 950;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 1024px) {
  .guide-detail-layout {
    grid-template-columns: 1fr;
  }

  .guide-sidebar {
    position: static;
    order: -1;
  }

  .related-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .related-guide-grid {
    grid-template-columns: 1fr;
  }
}
</style>
