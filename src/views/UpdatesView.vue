<template>
  <div class="updates-page">
  <section class="updates-section page-section">
    <div class="container">
      <div class="updates-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Release &amp; patches</span>
            <h1>Burglin' Gnomes Updates &amp; Patch Notes</h1>
            <p>
              Full-release update notes for routes, tasks, items, crafting, NPCs, enemies, and
              co-op fixes players should check before trusting an old strategy.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/updates-page-01.webp" alt="Burglin' Gnomes update and extraction bell" />
          </figure>
        </div>

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            title="Updates"
            aria-label="Updates guide sections"
            :sections="updatesSidebarSections"
          />

          <div class="guide-main">
            <section id="release-facts" class="guide-block">
              <h2>Burglin' Gnomes full release facts</h2>
              <p>
                These details come from the official store page and developer posts. We only change
                strategy advice when in-game mechanics actually shift.
              </p>
              <div class="data-table">
                <div class="table-row table-head release-row">
                  <span>Fact</span>
                  <span>Value</span>
                </div>
                <div v-for="fact in releaseFacts" :key="fact.label" class="table-row release-row">
                  <strong>{{ fact.label }}</strong>
                  <span>{{ fact.value }}</span>
                </div>
              </div>
            </section>

            <section id="release-preview" class="guide-block">
              <h2>What changed from early tests to the full release</h2>
              <p>
                Start here when a patch lands or a route feels different: task flow, house weapons,
                crafting links, outdoor routes, and enemy behavior have the highest impact on live runs.
              </p>
              <div class="preview-grid" aria-label="Release guide priorities">
                <RouterLink
                  v-for="(item, index) in releasePreview"
                  :key="item.title"
                  :to="item.path"
                  class="preview-card"
                >
                  <img :src="updatesPlaceholder(item.title, 'sm')" :alt="item.title" />
                  <div>
                    <small>{{ String(index + 1).padStart(2, '0') }} / {{ item.type }}</small>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.detail }}</p>
                    <span class="preview-card__target">{{ item.target }}</span>
                  </div>
                </RouterLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="patch-checklist" class="queue-section page-section">
    <div class="container">
      <div class="queue-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Post-patch checklist</span>
          <h2>What to check after every Burglin' Gnomes patch</h2>
          <p>Use this list before copying an old route into the current build, especially after AI, task, item, or network changes.</p>
        </div>
        <div class="data-table">
          <div v-for="(item, index) in patchChecklist" :key="item" class="table-row queue-row">
            <strong>{{ String(index + 1).padStart(2, '0') }}</strong>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="patch-rules" class="rules-section page-section">
    <div class="container">
      <div class="rules-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Live build priorities</span>
          <h2>Which systems can change your route first</h2>
        </div>
        <div class="card-grid">
          <article v-for="item in patchRules" :key="item.title" class="guide-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import PageSidebar from '../components/PageSidebar.vue'
import updatesData from '../data/updatesData'

const placeholderSizes = {
  hero: [640, 360],
  sm: [88, 88],
}

function updatesPlaceholder(label, size = 'sm') {
  const [width, height] = placeholderSizes[size] ?? placeholderSizes.sm
  const text = String(label)
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 6)
    .toUpperCase() || 'IMG'

  return `https://placehold.co/${width}x${height}/f4e8c6/28724f?text=${encodeURIComponent(text)}`
}

const updatesSidebarSections = [
  { id: 'release-facts', label: 'Release facts', href: '#release-facts' },
  { id: 'release-preview', label: 'Live guide priorities', href: '#release-preview' },
  { id: 'patch-checklist', label: 'Post-patch checklist', href: '#patch-checklist' },
  { id: 'patch-rules', label: 'When patches drop', href: '#patch-rules' },
]

const releaseFacts = updatesData.find((section) => section.key === 'releaseFacts').items
const releasePreview = updatesData.find((section) => section.key === 'releasePreview').items
const patchChecklist = updatesData.find((section) => section.key === 'patchChecklist').items
const patchRules = updatesData.find((section) => section.key === 'patchRules').items
</script>

<style scoped>
.release-row {
  grid-template-columns: 1fr 1.5fr;
}

.queue-row {
  grid-template-columns: 72px minmax(0, 1fr);
}

.queue-row strong {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .preview-card {
    grid-template-columns: 72px minmax(0, 1fr);
  }

  .preview-card img {
    width: 72px;
    height: 72px;
  }
}
</style>
