<template>
  <section class="base-building-section page-section">
    <div class="container">
      <div class="base-building-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Base building</span>
            <h1>Burglin' Gnomes Base Building Guide</h1>
            <p>
              The gnome world is not just a lobby. It is where players store loot, invite friends,
              craft gear, recover after failed routes, and decide whether the next house run is
              about tasks, materials, or enemy testing.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/hero-gnome-world.jpg" alt="Burglin' Gnomes gnome world base" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Base building sections">
            <strong>On this page</strong>
            <a href="#zones">World zones</a>
            <a href="#base-objects">Base objects</a>
            <a href="#pre-run-checklist">Pre-run checklist</a>
            <a href="#crafting-links">Crafting links</a>
          </aside>

          <div class="guide-main">
            <section id="zones" class="guide-block">
              <h2>Gnome World and Human World</h2>
              <p>
                Burglin' Gnomes switches between a safe base island and a dangerous human house.
                New players should learn the difference early: the island is for planning and
                upgrades; the house is for task progress and extraction pressure.
              </p>
              <div class="zone-grid">
                <article v-for="zone in zones" :key="zone.name" class="zone-card">
                  <img :src="zone.image" :alt="zone.name" />
                  <span>
                    <small>{{ zone.type }}</small>
                    <h3>{{ zone.name }}</h3>
                    <p>{{ zone.summary }}</p>
                    <span class="base-link-row">
                      <RouterLink v-for="link in zone.links" :key="link.path" :to="link.path">
                        {{ link.label }}
                      </RouterLink>
                    </span>
                  </span>
                </article>
              </div>
            </section>

            <section id="base-objects" class="guide-block">
              <h2>Base objects players should learn first</h2>
              <p>
                These objects define the loop between runs. Treat the bell, crystal, storage, and
                well as part of the route, not background decoration.
              </p>
              <div class="base-object-list">
                <article v-for="object in objects" :key="object.name" class="base-object-card">
                  <img :src="object.image" :alt="object.name" />
                  <span>
                    <small>{{ object.role }}</small>
                    <h3>{{ object.name }}</h3>
                    <p>{{ object.detail }}</p>
                    <ul>
                      <li v-for="tip in object.tips" :key="tip">{{ tip }}</li>
                    </ul>
                    <span v-if="object.links" class="base-link-row">
                      <RouterLink v-for="link in object.links" :key="link.path" :to="link.path">
                        {{ link.label }}
                      </RouterLink>
                    </span>
                  </span>
                </article>
              </div>
            </section>

            <section id="pre-run-checklist" class="guide-block">
              <h2>Pre-run checklist before ringing the bell</h2>
              <div class="data-table">
                <div v-for="(item, index) in checklist" :key="item" class="table-row base-check-row">
                  <strong>{{ String(index + 1).padStart(2, '0') }}</strong>
                  <span>{{ item }}</span>
                </div>
              </div>
            </section>

            <section id="crafting-links" class="guide-block">
              <h2>Base upgrades that change future routes</h2>
              <p>
                The well matters because equipment changes the next house entry. Backpack improves
                carrying, Slap Hammer gives basic defense, Spring Shoes help vertical routes, Gnome
                Gloves support finer object handling, and Pickaxe can turn stolen items into parts.
              </p>
              <div class="card-grid">
                <RouterLink class="guide-card" to="/crafting/expanded-backpack">
                  <h3>Expanded Backpack</h3>
                  <p>First craft for safer material runs and fewer repeat trips.</p>
                </RouterLink>
                <RouterLink class="guide-card" to="/crafting/slap-hammer">
                  <h3>Slap Hammer</h3>
                  <p>Basic defense and object-breaking tool for pests and hostile gnomes.</p>
                </RouterLink>
                <RouterLink class="guide-card" to="/crafting/pickaxe">
                  <h3>Pickaxe</h3>
                  <p>Material farming tool once its interaction rules are confirmed.</p>
                </RouterLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import baseData from '../data/baseData'

const zones = baseData.find((section) => section.key === 'zones').items
const objects = baseData.find((section) => section.key === 'objects').items
const checklist = baseData.find((section) => section.key === 'checklist').items
</script>

<style scoped>
.zone-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.zone-card,
.base-object-card {
  display: grid;
  gap: 16px;
  border: 2px solid var(--color-ink);
  border-radius: 22px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.zone-card {
  grid-template-rows: 220px minmax(0, 1fr);
}

.zone-card img,
.base-object-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.zone-card > span,
.base-object-card > span {
  display: grid;
  gap: 10px;
  padding: 18px;
}

.zone-card small,
.base-object-card small {
  color: var(--color-primary);
  font-weight: 900;
  text-transform: uppercase;
}

.base-link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.base-link-row a {
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 7px 10px;
  background: var(--color-panel-2);
  color: var(--color-ink);
  font-weight: 900;
}

.base-object-list {
  display: grid;
  gap: 14px;
}

.base-object-card {
  grid-template-columns: 220px minmax(0, 1fr);
}

.base-object-card ul {
  display: grid;
  gap: 6px;
  padding-left: 18px;
}

.base-object-card li {
  color: var(--color-text);
  font-weight: 800;
  list-style: disc;
}

.base-check-row {
  grid-template-columns: 72px minmax(0, 1fr);
}

.base-check-row strong {
  color: var(--color-accent);
}

@media (max-width: 1024px) {
  .base-object-card {
    grid-template-columns: 180px minmax(0, 1fr);
  }
}

@media (max-width: 768px) {
  .zone-grid,
  .base-object-card {
    grid-template-columns: 1fr;
  }

  .zone-card {
    grid-template-rows: auto;
  }

  .zone-card img,
  .base-object-card img {
    aspect-ratio: 16 / 9;
  }
}
</style>
