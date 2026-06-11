<template>
  <div class="wiki-page">
  <section class="wiki-section page-section">
    <div class="container">
      <div class="wiki-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Wiki index</span>
            <h1>Burglin' Gnomes Wiki — Guides, Items &amp; Enemies</h1>
            <p>
              Already know what you need? Jump straight to beginner routes, tasks, items, crafting,
              enemies, or post-patch changes. We organized pages around what players ask mid-run.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/steam-shot-2.jpg" alt="Burglin' Gnomes gameplay screenshot" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Wiki sections">
            <strong>On this page</strong>
            <a href="#wiki-directory">Guide pages</a>
            <a href="#area-guides">Area guides</a>
            <a href="#wiki-topics">Popular topics</a>
            <a href="#guide-labels">How we label notes</a>
            <a href="#official-facts">Official facts</a>
          </aside>

          <div class="guide-main">
            <section id="wiki-directory" class="guide-block">
              <h2>Every Burglin' Gnomes guide page</h2>
              <p>
                Start with the beginner guide for your first clean run. Open Tasks when you need
                an objective call, Items when you are deciding what to carry, Crafting for upgrades,
                Enemies for threat counters, and Updates after patches land.
              </p>
              <div class="card-grid">
                <RouterLink v-for="entry in indexes" :key="entry.path" class="guide-card wiki-card" :to="entry.path">
                  <strong>{{ entry.title }}</strong>
                  <span>{{ entry.scope }}</span>
                </RouterLink>
              </div>
            </section>

            <section id="area-guides" class="guide-block">
              <h2>Area guides for items, routes, and threats</h2>
              <p>
                Open a room or zone page when you need spawn overlap, task routing, linked recipes,
                or danger checks. Base Building covers gnome-world objects; these pages cover house
                and lawn routing.
              </p>
              <div class="data-table">
                <div class="table-row table-head area-row">
                  <span>Area</span>
                  <span>Type</span>
                  <span>What it covers</span>
                </div>
                <RouterLink
                  v-for="area in areas"
                  :key="area.slug"
                  class="table-row area-row area-link"
                  :to="`/areas/${area.slug}`"
                >
                  <strong>{{ area.name }}</strong>
                  <span>{{ area.type }}</span>
                  <span>{{ area.summary }}</span>
                </RouterLink>
              </div>
            </section>

            <section id="wiki-topics" class="guide-block">
              <h2>Popular questions by topic</h2>
              <p>
                These are the searches we hear most in co-op chat: how to enter the human world,
                what the first tasks mean, bathroom and kitchen routing, which tools matter, and
                how to survive cats and humans.
              </p>
              <div class="data-table">
                <div class="table-row table-head topic-row">
                  <span>Topic</span>
                  <span>Parent page</span>
                  <span>What it answers</span>
                </div>
                <RouterLink v-for="entry in deepIndexes" :key="entry.title" class="table-row topic-row topic-link" :to="entry.path">
                  <strong>{{ entry.title }}</strong>
                  <span>{{ entry.parent }}</span>
                  <span>{{ entry.scope }}</span>
                </RouterLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="guide-labels" class="labels-section page-section">
    <div class="container">
      <div class="labels-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Guide labels</span>
          <h2>How we mark what we know — and what we are still checking</h2>
          <p>We play the game, log what works, and say plainly when a tip still needs more time in the live build.</p>
        </div>
        <div class="card-grid">
          <article v-for="label in labels" :key="label.label" class="guide-card">
            <strong>{{ label.label }}</strong>
            <p>{{ label.meaning }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section id="official-facts" class="facts-section page-section">
    <div class="container">
      <div class="facts-content page-content">
        <div class="section-heading">
          <span class="eyebrow">From Steam</span>
          <h2>Official Burglin' Gnomes facts</h2>
          <p>Sourced from the Steam store page and developer announcements. Strategy pages link back to these when it matters.</p>
        </div>
        <div class="data-table">
          <div class="table-row table-head facts-row">
            <span>Fact</span>
            <span>Value</span>
          </div>
          <div v-for="fact in officialFacts" :key="fact.fact" class="table-row facts-row">
            <strong>{{ fact.fact }}</strong>
            <span>{{ fact.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import areasData from '../data/areasData'
import wikiData from '../data/wikiData'

const areas = areasData.find((section) => section.key === 'areas').items
const indexes = wikiData.find((section) => section.key === 'indexes').items
const deepIndexes = wikiData.find((section) => section.key === 'deepIndexes').items
const labels = wikiData.find((section) => section.key === 'labels').items
const officialFacts = wikiData.find((section) => section.key === 'officialFacts').items
</script>

<style scoped>
.wiki-card {
  transition:
    border-color 180ms ease,
    transform 180ms ease,
    background 180ms ease;
}

.wiki-card:hover,
.wiki-card:focus-visible {
  border-color: var(--color-primary);
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-3px);
}

.facts-row {
  grid-template-columns: minmax(180px, 0.5fr) minmax(0, 1.5fr);
}

.area-row {
  grid-template-columns: minmax(160px, 0.7fr) 0.55fr minmax(0, 1.5fr);
}

.area-link strong {
  color: var(--color-ink);
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
}

.area-link {
  transition:
    background 180ms ease,
    color 180ms ease;
}

.area-link:hover,
.area-link:focus-visible {
  background: var(--color-panel-2);
  outline: none;
}

.topic-row {
  grid-template-columns: 1fr 0.75fr 1.65fr;
}

.topic-link {
  transition:
    background 180ms ease,
    color 180ms ease;
}

.topic-link:hover,
.topic-link:focus-visible {
  background: var(--color-panel-2);
  outline: none;
}
</style>
