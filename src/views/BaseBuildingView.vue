<template>
  <section class="base-building-section page-section">
    <div class="container">
      <div class="page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Gnome world</span>
            <h1>Burglin' Gnomes Gnome World Base Guide</h1>
            <p>
              Use the base before every house run: store loot, invite Steam friends, craft equipment,
              check party setup, and ring the bell only after the squad knows the next entry
              route and task plan.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/page-06.webp" alt="Burglin' Gnomes gnome world base" />
          </figure>
        </div>

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            title="Base Building"
            aria-label="Gnome world base guide sections"
            :sections="baseSidebarSections"
          />

          <div class="guide-main">
            <section id="gnome-world" class="guide-block">
              <h2>Gnome World: safe base before each house run</h2>
              <p class="section-lead">
                Base objects and pre-run setup live here. For full routing, tasks, and danger notes,
                open the dedicated area guide.
              </p>
              <div class="zone-stack">
                <div class="split-panel">
                  <article class="split-panel__copy">
                    <span class="eyebrow">{{ gnomeWorld.type }}</span>
                    <h3>{{ gnomeWorld.name }}</h3>
                    <p>{{ gnomeWorld.summary }}</p>
                    <div class="link-list zone-links">
                      <RouterLink class="link-list__item" to="/areas/gnome-world">
                        <span>
                          <strong>Open Gnome World area guide</strong>
                          <span>Tasks, linked items, and route notes</span>
                        </span>
                        <span class="entry-chevron" aria-hidden="true">→</span>
                      </RouterLink>
                      <RouterLink
                        v-for="link in gnomeWorld.links"
                        :key="link.path"
                        class="link-list__item"
                        :to="link.path"
                      >
                        <span>
                          <strong>{{ link.label }}</strong>
                        </span>
                        <span class="entry-chevron" aria-hidden="true">→</span>
                      </RouterLink>
                    </div>
                  </article>
                  <figure class="split-panel__media">
                    <img :src="gnomeWorld.image" :alt="gnomeWorld.name" />
                  </figure>
                </div>
                <article class="note-panel">
                  <h3>Use the island for</h3>
                  <ul>
                    <li>Banking stolen items and materials before the next day.</li>
                    <li>Inviting friends and confirming the party before the bell starts the run.</li>
                    <li>Crafting route-changing gear at the well.</li>
                    <li>Resetting the squad after failed rescue or risky enemy practice.</li>
                  </ul>
                </article>
              </div>
            </section>

            <section id="human-world" class="guide-block">
              <h2>Human World: task area with extraction pressure</h2>
              <p class="section-lead">
                Room routes, loot overlap, and threat timing are on the Human House and outdoor area
                pages — not duplicated here.
              </p>
              <div class="zone-stack">
                <div class="split-panel split-panel--reverse">
                  <figure class="split-panel__media">
                    <img :src="humanWorld.image" :alt="humanWorld.name" />
                  </figure>
                  <article class="split-panel__copy">
                    <span class="eyebrow">{{ humanWorld.type }}</span>
                    <h3>{{ humanWorld.name }}</h3>
                    <p>{{ humanWorld.summary }}</p>
                    <div class="link-list zone-links">
                      <RouterLink class="link-list__item" to="/areas/human-house">
                        <span>
                          <strong>Open Human House area guide</strong>
                          <span>Room routes, weapons, and task overlap</span>
                        </span>
                        <span class="entry-chevron" aria-hidden="true">→</span>
                      </RouterLink>
                      <RouterLink
                        v-for="link in humanWorld.links"
                        :key="link.path"
                        class="link-list__item"
                        :to="link.path"
                      >
                        <span>
                          <strong>{{ link.label }}</strong>
                        </span>
                        <span class="entry-chevron" aria-hidden="true">→</span>
                      </RouterLink>
                    </div>
                  </article>
                </div>
                <article class="note-panel note-panel--warn">
                  <h3>Leave the base with a plan</h3>
                  <ul>
                    <li>Complete at least three tasks before extraction.</li>
                    <li>Use a known entry route such as vine window or drain pipe.</li>
                    <li>Return after enough task progress, not after the backpack is overloaded.</li>
                  </ul>
                </article>
              </div>
            </section>

            <section id="area-routes" class="guide-block">
              <h2>Area pages for items, weapons, and recipes</h2>
              <p>
                Open an area when you need to know whether a room is worth routing. Each page links
                to the items, weapons, and recipes connected to that location.
              </p>
              <div class="tile-grid">
                <RouterLink
                  v-for="area in areas"
                  :key="area.slug"
                  class="tile-card"
                  :to="`/areas/${area.slug}`"
                >
                  <span class="tile-card__media">
                    <img :src="area.image" :alt="area.name" />
                    <span class="tile-card__badge is-none">{{ area.type }}</span>
                  </span>
                  <span class="tile-card__body">
                    <small>Area guide</small>
                    <strong>{{ area.name }}</strong>
                  </span>
                </RouterLink>
              </div>
            </section>

            <section id="tree" class="guide-block">
              <h2>The Tree: spawn and respawn point</h2>
              <div class="object-panel">
                <img :src="tree.image" :alt="tree.name" />
                <div class="object-panel__copy">
                  <span class="eyebrow">{{ tree.role }}</span>
                  <h3>{{ tree.name }}</h3>
                  <p>{{ tree.detail }}</p>
                  <ul>
                    <li v-for="tip in tree.tips" :key="tip">{{ tip }}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="mushroom-house" class="guide-block">
              <h2>Mushroom House: storage, crystal, spirit catcher, and bell</h2>
              <p>
                The mushroom-house cluster handles pre-run and post-run flow: storage, party setup,
                limited respawns, and starting or ending the route.
              </p>
              <div class="facility-list">
                <article v-for="object in mushroomObjects" :key="object.name" class="facility-row">
                  <img :src="object.image" :alt="object.name" />
                  <div class="facility-row__copy">
                    <small>{{ object.role }}</small>
                    <h3>{{ object.name }}</h3>
                    <p>{{ object.detail }}</p>
                    <ul>
                      <li v-for="tip in object.tips" :key="tip">{{ tip }}</li>
                    </ul>
                    <div v-if="object.links?.length" class="facility-row__links">
                      <RouterLink v-for="link in object.links" :key="link.path" :to="link.path">
                        {{ link.label }}
                      </RouterLink>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section id="well" class="guide-block">
              <h2>The Well: craft backpack, pickaxe, metal bat, shoes, and potions</h2>
              <div class="object-panel object-panel--well">
                <img :src="well.image" :alt="well.name" />
                <div class="object-panel__copy">
                  <span class="eyebrow">{{ well.role }}</span>
                  <h3>{{ well.name }}</h3>
                  <p>{{ well.detail }}</p>
                  <ul>
                    <li v-for="tip in well.tips" :key="tip">{{ tip }}</li>
                  </ul>
                  <div v-if="well.links?.length" class="facility-row__links">
                    <RouterLink v-for="link in well.links" :key="link.path" :to="link.path">
                      {{ link.label }}
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="link-list craft-links">
                <RouterLink class="link-list__item" to="/crafting/backpack">
                  <span>
                    <strong>Backpack</strong>
                    <span>Fewer return trips when farming materials through the house.</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </RouterLink>
                <RouterLink class="link-list__item" to="/crafting/pickaxe">
                  <span>
                    <strong>Pickaxe</strong>
                    <span>Break objects into resources instead of hauling everything home.</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </RouterLink>
                <RouterLink class="link-list__item" to="/crafting/metal-bat">
                  <span>
                    <strong>Metal Bat</strong>
                    <span>Basic defense and object hits for pests and emergency routes.</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </RouterLink>
                <RouterLink class="link-list__item" to="/crafting/spring-shoes">
                  <span>
                    <strong>Spring Shoes</strong>
                    <span>Vertical movement for windows, furniture, and exterior routes.</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </RouterLink>
                <RouterLink class="link-list__item" to="/areas/potion-table">
                  <span>
                    <strong>Potion Table</strong>
                    <span>Unlock potion crafting before Blowgun dart routes.</span>
                  </span>
                  <span class="entry-chevron" aria-hidden="true">→</span>
                </RouterLink>
              </div>
            </section>

            <section id="pre-run-checklist" class="guide-block">
              <h2>Pre-run checklist before entering the house</h2>
              <div class="data-table">
                <div class="table-row table-head base-check-row">
                  <span>Step</span>
                  <span>Check</span>
                </div>
                <div v-for="(item, index) in checklist" :key="item" class="table-row base-check-row">
                  <strong>{{ String(index + 1).padStart(2, '0') }}</strong>
                  <span>{{ item }}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import PageSidebar from '../components/PageSidebar.vue'
import areasData from '../data/areasData'
import baseData from '../data/baseData'

const baseSidebarSections = [
  { id: 'gnome-world', label: 'Gnome World', href: '#gnome-world' },
  { id: 'human-world', label: 'Human World', href: '#human-world' },
  { id: 'area-routes', label: 'Area routes', href: '#area-routes', count: areasData.find((s) => s.key === 'areas').items.length },
  { id: 'tree', label: 'The Tree', href: '#tree' },
  { id: 'mushroom-house', label: 'Mushroom House', href: '#mushroom-house', count: 5 },
  { id: 'well', label: 'The Well', href: '#well' },
  { id: 'pre-run-checklist', label: 'Pre-run checklist', href: '#pre-run-checklist', count: 5 },
]

const areas = areasData.find((section) => section.key === 'areas').items
const zones = baseData.find((section) => section.key === 'zones').items
const objects = baseData.find((section) => section.key === 'objects').items
const checklist = baseData.find((section) => section.key === 'checklist').items

function findById(items, id) {
  return items.find((item) => item.id === id)
}

const gnomeWorld = findById(zones, 'gnome-world')
const humanWorld = findById(zones, 'human-world')
const tree = findById(objects, 'tree')
const well = findById(objects, 'well')
const mushroomObjects = ['mushroom-house', 'storage-chest', 'purple-crystal', 'spirit-catcher', 'bell']
  .map((id) => findById(objects, id))
  .filter(Boolean)
</script>

<style scoped>
.base-building-section {
  background: linear-gradient(180deg, rgba(223, 240, 198, 0.22) 0%, transparent 28%);
}

.section-lead {
  color: var(--color-text);
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.55;
}

.zone-stack {
  display: grid;
  gap: 12px;
}

.split-panel--reverse {
  grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.15fr);
}

.split-panel__copy h3,
.object-panel__copy h3,
.facility-row__copy h3 {
  font-size: 1.2rem;
  line-height: 1.15;
}

.zone-links {
  margin-top: 6px;
}

.note-panel h3 {
  margin-bottom: 8px;
  font-size: 1rem;
}

.note-panel ul {
  display: grid;
  gap: 6px;
  padding-left: 18px;
}

.note-panel li {
  color: var(--color-text);
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.45;
  list-style: disc;
}

.note-panel--warn {
  border-left-color: var(--color-accent);
  background: rgba(255, 225, 197, 0.5);
}

.object-panel {
  display: grid;
  grid-template-columns: minmax(200px, 280px) minmax(0, 1fr);
  gap: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.object-panel img {
  width: 100%;
  height: 100%;
  min-height: 200px;
  object-fit: cover;
}

.object-panel__copy {
  display: grid;
  gap: 8px;
  align-content: center;
  padding: clamp(16px, 2.5vw, 22px);
}

.object-panel__copy p {
  font-size: 0.94rem;
  font-weight: 700;
  line-height: 1.5;
}

.object-panel__copy ul {
  display: grid;
  gap: 5px;
  padding-left: 18px;
}

.object-panel__copy li {
  color: var(--color-muted);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.4;
  list-style: disc;
}

.object-panel--well {
  margin-bottom: 12px;
}

.facility-list {
  display: grid;
  gap: 10px;
}

.facility-row {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.facility-row img {
  width: 88px;
  height: 88px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.facility-row__copy {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.facility-row__copy small {
  color: var(--color-primary);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.facility-row__copy h3 {
  font-size: 1.02rem;
}

.facility-row__copy p {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.45;
}

.facility-row__copy ul {
  display: grid;
  gap: 4px;
  padding-left: 16px;
}

.facility-row__copy li {
  color: var(--color-muted);
  font-size: 0.86rem;
  font-weight: 700;
  line-height: 1.4;
  list-style: disc;
}

.facility-row__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.facility-row__links a {
  color: var(--color-primary);
  font-size: 0.86rem;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.facility-row__links a:hover,
.facility-row__links a:focus-visible {
  color: var(--color-accent);
  outline: none;
}

.craft-links {
  margin-top: 0;
}

.base-check-row {
  grid-template-columns: 64px minmax(0, 1fr);
}

.base-check-row strong {
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .split-panel--reverse {
    grid-template-columns: 1fr;
  }

  .object-panel {
    grid-template-columns: 1fr;
  }

  .object-panel img {
    max-height: 220px;
  }
}

@media (max-width: 768px) {
  .facility-row {
    grid-template-columns: 72px minmax(0, 1fr);
  }

  .facility-row img {
    width: 72px;
    height: 72px;
  }
}
</style>
