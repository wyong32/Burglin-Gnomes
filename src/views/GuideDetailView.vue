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
            <h1>{{ guide.h1 || guide.title }}</h1>
            <p>{{ guide.description }}</p>
            <p class="guide-hero-byline">
              <time :datetime="guide.publishDate">Published {{ formatGuideDate(guide.publishDate) }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ guide.author }}</span>
            </p>
          </div>
          <figure class="hero-art">
            <img :src="guide.imageUrl" :alt="guide.imageAlt || guide.title" />
          </figure>
        </div>

        <!-- <GptAd unit="banner2" /> -->

        <AffiliateAd />

        <div class="guide-layout guide-detail-layout">
          <article class="guide-main guide-article">
            <div class="guide-tags" aria-label="Guide topics">
              <span v-for="tag in guide.tags" :key="tag">{{ tag }}</span>
            </div>

            <div class="guide-body" v-html="guide.detailsHtml"></div>

            <!-- <GptAd unit="banner3" /> -->

            <AffiliateAd />

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
            </div>

            <dl class="guide-sidebar-facts">
              <div>
                <dt>Published</dt>
                <dd>
                  <time :datetime="guide.publishDate">{{ formatGuideDate(guide.publishDate) }}</time>
                </dd>
              </div>
              <div>
                <dt>Author</dt>
                <dd>{{ guide.author }}</dd>
              </div>
            </dl>

            <div v-if="guide.tags?.length" class="guide-topic-panel">
              <span class="guide-sidebar-label">Topics</span>
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
import { formatGuideDate } from '../utils/formatDate.js'

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
  color: var(--color-primary);
  outline: none;
}

.guide-hero-byline {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
  color: var(--color-muted);
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.4;
}

.guide-hero-byline time,
.guide-hero-byline span:not([aria-hidden]) {
  color: var(--color-muted);
}

.guide-hero-byline span[aria-hidden] {
  color: rgba(104, 118, 109, 0.55);
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
  gap: 16px;
  align-self: start;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 18px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.guide-sidebar-panel {
  display: grid;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(36, 51, 45, 0.1);
}

.guide-sidebar strong {
  color: var(--color-ink);
  font-size: 1.2rem;
  line-height: 1.15;
}

.guide-sidebar-label {
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.guide-sidebar-facts {
  display: grid;
  gap: 12px;
  margin: 0;
}

.guide-sidebar-facts div {
  display: grid;
  gap: 4px;
}

.guide-sidebar-facts dt {
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.guide-sidebar-facts dd {
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.4;
}

.guide-topic-panel {
  display: grid;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid rgba(36, 51, 45, 0.1);
}

.guide-topic-panel div {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.guide-topic-panel span {
  border: 1px solid rgba(36, 51, 45, 0.12);
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(223, 240, 198, 0.45);
  color: var(--color-ink-soft);
  font-size: 0.78rem;
  font-weight: 800;
}

.guide-back-link {
  display: inline-flex;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 11px 14px;
  background: var(--color-surface-strong);
  color: var(--color-ink);
  font-weight: 800;
  transition:
    background 160ms ease,
    border-color 160ms ease;
}

.guide-back-link:hover,
.guide-back-link:focus-visible {
  border-color: rgba(40, 114, 79, 0.35);
  background: rgba(223, 240, 198, 0.45);
  outline: none;
}

.guide-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.guide-tags span {
  border: 1px solid rgba(36, 51, 45, 0.12);
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(223, 240, 198, 0.45);
  color: var(--color-ink-soft);
  font-size: 0.78rem;
  font-weight: 800;
}

.guide-article {
  max-width: none;
  min-width: 0;
}

.guide-body {
  display: grid;
  gap: 16px;
  min-width: 0;
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

.guide-body :deep(figure) {
  overflow: hidden;
  margin: 4px 0 8px;
  border: 1px solid rgba(36, 51, 45, 0.18);
  border-radius: 18px;
  background: rgba(255, 248, 232, 0.78);
  box-shadow: var(--shadow-card);
}

.guide-body :deep(figure img) {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.guide-body :deep(figcaption) {
  border-top: 1px solid rgba(36, 51, 45, 0.12);
  padding: 10px 14px;
  background: rgba(223, 240, 198, 0.42);
  color: var(--color-ink-soft);
  font-size: 0.84rem;
  font-weight: 900;
  line-height: 1.45;
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

.guide-body :deep(table) {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(36, 51, 45, 0.18);
  border-radius: 16px;
  border-spacing: 0;
  background: rgba(255, 248, 232, 0.78);
  box-shadow: 5px 6px 0 rgba(36, 51, 45, 0.08);
  white-space: nowrap;
}

.guide-body :deep(thead),
.guide-body :deep(tbody) {
  display: table;
  width: 100%;
  min-width: 720px;
  border-collapse: separate;
  border-spacing: 0;
}

.guide-body :deep(th),
.guide-body :deep(td) {
  border-right: 1px solid rgba(36, 51, 45, 0.12);
  border-bottom: 1px solid rgba(36, 51, 45, 0.12);
  padding: 12px 14px;
  color: var(--color-text);
  font-size: 0.92rem;
  font-weight: 850;
  line-height: 1.45;
  text-align: left;
  vertical-align: top;
  white-space: normal;
}

.guide-body :deep(th) {
  background:
    linear-gradient(180deg, rgba(40, 114, 79, 0.96), rgba(36, 51, 45, 0.98));
  color: var(--color-surface);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.guide-body :deep(td) {
  background: rgba(255, 248, 232, 0.72);
}

.guide-body :deep(tbody tr:nth-child(even) td) {
  background: rgba(223, 240, 198, 0.38);
}

.guide-body :deep(th:last-child),
.guide-body :deep(td:last-child) {
  border-right: 0;
}

.guide-body :deep(tbody tr:last-child td) {
  border-bottom: 0;
}

.guide-body :deep(td:first-child) {
  color: var(--color-ink);
  font-weight: 950;
}

.guide-body :deep(td a) {
  white-space: normal;
}

.related-guide-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.related-guide-grid .guide-card {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition:
    border-color 160ms ease,
    background 160ms ease;
}

.related-guide-grid .guide-card:hover,
.related-guide-grid .guide-card:focus-visible {
  border-color: rgba(40, 114, 79, 0.35);
  background: rgba(223, 240, 198, 0.28);
  outline: none;
}

.related-guide-grid strong {
  display: -webkit-box;
  min-height: 2.4em;
  overflow: hidden;
  color: var(--color-ink);
  font-size: 1rem;
  line-height: 1.25;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.related-guide-grid small {
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
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
