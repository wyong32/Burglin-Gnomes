<template>
  <div class="updates-page">
  <section class="updates-section page-section">
    <div class="container">
      <div class="updates-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Release &amp; patches</span>
            <h1>Burglin' Gnomes Updates — Release Date &amp; Patch Notes</h1>
            <p>
              Release facts, what we are watching in the full game, and which routes, items, and
              enemies we recheck after patches. When AI, crafting, or network code changes, old
              habits from the demo can stop working overnight.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/steam-hero.jpg" alt="Burglin' Gnomes Steam header art" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Updates guide sections">
            <strong>On this page</strong>
            <a href="#release-facts">Release facts</a>
            <a href="#release-preview">What we are testing</a>
            <a href="#patch-checklist">Post-patch checklist</a>
            <a href="#patch-rules">When patches drop</a>
          </aside>

          <div class="guide-main">
            <section id="release-facts" class="guide-block">
              <h2>Release facts from Steam</h2>
              <p>
                These details come from the official store page and developer posts. We only change
                strategy advice when in-game mechanics actually shift.
              </p>
              <div class="data-table">
                <div class="table-row table-head release-row">
                  <span>Fact</span>
                  <span>Value</span>
                  <span>Guide note</span>
                </div>
                <div v-for="fact in releaseFacts" :key="fact.label" class="table-row release-row">
                  <strong>{{ fact.label }}</strong>
                  <span>{{ fact.value }}</span>
                  <b class="status-pill confirmed">{{ displayStatus(fact.status) }}</b>
                </div>
              </div>
            </section>

            <section id="release-preview" class="guide-block release-preview-block">
              <h2>Full-release content we are testing now</h2>
              <p>
                These are the first pages we update after a patch: new routes, grab threats, gear,
                crafting links, and object interactions that can rewrite early-game loadouts.
              </p>
              <div class="patch-check-board">
                <RouterLink :to="featuredLead.path" class="patch-feature">
                  <img :src="featuredLead.image" :alt="featuredLead.title" />
                  <div class="patch-feature-copy">
                    <span class="patch-kicker">{{ featuredLead.type }} / {{ featuredLead.priority }} priority</span>
                    <h3>{{ featuredLead.title }}</h3>
                    <p>{{ featuredLead.detail }}</p>
                    <div class="patch-actions">
                      <b :class="['status-pill', statusClass(featuredLead.status)]">{{ displayStatus(featuredLead.status) }}</b>
                      <span>{{ featuredLead.target }}</span>
                    </div>
                  </div>
                </RouterLink>

                <div class="patch-stack" aria-label="Additional patch checks">
                  <RouterLink
                    v-for="(item, index) in secondaryLeads"
                    :key="item.title"
                    :to="item.path"
                    class="patch-card"
                  >
                    <img :src="item.image" :alt="item.title" />
                    <div class="patch-card-copy">
                      <small>{{ String(index + 2).padStart(2, '0') }} / {{ item.type }}</small>
                      <h3>{{ item.title }}</h3>
                      <p>{{ item.detail }}</p>
                      <div class="patch-card-footer">
                        <span>{{ item.target }}</span>
                        <b :class="['status-pill', statusClass(item.status)]">{{ displayStatus(item.status) }}</b>
                      </div>
                    </div>
                  </RouterLink>
                </div>
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
          <h2>What we recheck after major updates</h2>
          <p>Run through this list when a new patch lands — especially if tasks, AI, or crafting feel different.</p>
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
          <span class="eyebrow">Patch types</span>
          <h2>What to watch when each kind of patch drops</h2>
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
import { useRoute } from 'vue-router'
import updatesData from '../data/updatesData'
import { displayStatus, statusClass } from '../utils/contentLabels'
import { setRouteSeo } from '../utils/seo'

const routeMeta = useRoute()
setRouteSeo(routeMeta)

const releaseFacts = updatesData.find((section) => section.key === 'releaseFacts').items
const releasePreview = updatesData.find((section) => section.key === 'releasePreview').items
const featuredLead = releasePreview[0]
const secondaryLeads = releasePreview.slice(1)
const patchChecklist = updatesData.find((section) => section.key === 'patchChecklist').items
const patchRules = updatesData.find((section) => section.key === 'patchRules').items
</script>

<style scoped>
.release-row {
  grid-template-columns: 1fr 1.5fr 130px;
}

.queue-row {
  grid-template-columns: 72px minmax(0, 1fr);
}

.queue-row strong {
  color: var(--color-accent);
}

.release-preview-block {
  background:
    linear-gradient(135deg, rgba(255, 218, 193, 0.7), rgba(186, 229, 201, 0.45)),
    var(--color-surface);
}

.patch-check-board {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
  gap: 18px;
  margin-top: 20px;
}

.patch-feature,
.patch-card {
  color: inherit;
  text-decoration: none;
}

.patch-feature {
  position: relative;
  display: grid;
  min-height: 440px;
  overflow: hidden;
  border: 3px solid var(--color-ink);
  border-radius: 24px;
  background: #ffe8b9;
  box-shadow: 10px 10px 0 rgba(34, 45, 38, 0.18);
}

.patch-feature::after {
  content: 'New routes';
  position: absolute;
  top: 18px;
  right: -44px;
  width: 190px;
  padding: 8px 0;
  transform: rotate(34deg);
  background: var(--color-accent);
  color: #fffaf0;
  font-size: 0.74rem;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 2px solid var(--color-ink);
}

.patch-feature img {
  width: 100%;
  height: 100%;
  min-height: 440px;
  object-fit: cover;
}

.patch-feature-copy {
  position: absolute;
  inset: auto 18px 18px;
  padding: 18px;
  border: 3px solid var(--color-ink);
  border-radius: 18px;
  background: rgba(255, 250, 240, 0.94);
}

.patch-kicker,
.patch-card small {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 8px;
  color: var(--color-accent);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.patch-feature h3,
.patch-card h3 {
  margin-bottom: 8px;
}

.patch-actions,
.patch-card-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.patch-actions span,
.patch-card-footer span {
  font-weight: 900;
  color: var(--color-ink-soft);
}

.patch-stack {
  display: grid;
  gap: 12px;
}

.patch-card {
  display: grid;
  grid-template-columns: 134px minmax(0, 1fr);
  gap: 14px;
  align-items: stretch;
  min-height: 138px;
  padding: 10px;
  border: 3px solid var(--color-ink);
  border-radius: 20px;
  background: var(--color-paper);
  box-shadow: 6px 6px 0 rgba(34, 45, 38, 0.14);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;
}

.patch-card:hover,
.patch-card:focus-visible,
.patch-feature:hover,
.patch-feature:focus-visible {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 rgba(34, 45, 38, 0.18);
}

.patch-card:nth-child(2n) {
  background: #e8f6d8;
}

.patch-card:nth-child(3n) {
  background: #dff3ff;
}

.patch-card img {
  width: 100%;
  height: 100%;
  min-height: 112px;
  border: 2px solid var(--color-ink);
  border-radius: 14px;
  object-fit: cover;
}

.patch-card-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
}

.patch-card-copy p {
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .patch-check-board {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .patch-card {
    grid-template-columns: 1fr;
  }

  .patch-feature,
  .patch-feature img {
    min-height: 360px;
  }

  .patch-feature-copy {
    inset: auto 10px 10px;
    padding: 14px;
  }
}
</style>
