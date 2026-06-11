<template>
  <section class="base-building-section page-section">
    <div class="container">
      <div class="base-building-content page-content">
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
            <img src="/images/hero-gnome-world.jpg" alt="Burglin' Gnomes gnome world base" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Gnome world base guide sections">
            <strong>On this page</strong>
            <a href="#gnome-world">Gnome World</a>
            <a href="#human-world">Human World</a>
            <a href="#area-routes">Area routes</a>
            <a href="#tree">The Tree</a>
            <a href="#mushroom-house">Mushroom House</a>
            <a href="#well">The Well</a>
            <a href="#pre-run-checklist">Pre-run checklist</a>
          </aside>

          <div class="guide-main">
            <section id="gnome-world" class="guide-block">
              <h2>Gnome World: Safe Base Before Each House Run</h2>
              <p class="section-lead">
                This page covers base objects and pre-run setup. For full Gnome World routing, tasks,
                linked items, and danger notes, use the dedicated area guide.
              </p>
              <div class="base-split">
                <article class="base-panel">
                  <img :src="gnomeWorld.image" :alt="gnomeWorld.name" />
                  <span>
                    <h3>{{ gnomeWorld.name }}</h3>
                    <p>{{ gnomeWorld.summary }}</p>
                    <span class="base-link-row">
                      <RouterLink class="area-guide-link" to="/areas/gnome-world">Open Gnome World area guide</RouterLink>
                      <RouterLink v-for="link in gnomeWorld.links" :key="link.path" :to="link.path">
                        {{ link.label }}
                      </RouterLink>
                    </span>
                  </span>
                </article>
                <div class="base-note-board">
                  <strong>Use the island for:</strong>
                  <ul>
                    <li>Banking stolen items and materials before the next day.</li>
                    <li>Inviting friends and confirming the party before the bell starts the run.</li>
                    <li>Crafting route-changing gear at the well.</li>
                    <li>Resetting the squad after failed rescue or risky enemy practice.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="human-world" class="guide-block">
              <h2>Human World: Task Area With Extraction Pressure</h2>
              <p class="section-lead">
                Room routes, loot overlap, and threat timing are tracked on the Human House and outdoor
                area pages instead of repeating them here.
              </p>
              <div class="base-split reverse">
                <div class="base-note-board danger">
                  <strong>Leave the base with a plan:</strong>
                  <ul>
                    <li>Complete at least three tasks before extraction.</li>
                    <li>Use a known entry route such as vine window or drain pipe.</li>
                    <li>Return after enough task progress, not after the backpack is overloaded.</li>
                  </ul>
                </div>
                <article class="base-panel">
                  <img :src="humanWorld.image" :alt="humanWorld.name" />
                  <span>
                    <h3>{{ humanWorld.name }}</h3>
                    <p>{{ humanWorld.summary }}</p>
                    <span class="base-link-row">
                      <RouterLink class="area-guide-link" to="/areas/human-house">Open Human House area guide</RouterLink>
                      <RouterLink v-for="link in humanWorld.links" :key="link.path" :to="link.path">
                        {{ link.label }}
                      </RouterLink>
                    </span>
                  </span>
                </article>
              </div>
            </section>

            <section id="area-routes" class="guide-block">
              <h2>Area Pages for Items, Weapons, and Recipes</h2>
              <p>
                Use these pages when you need to know whether a room is worth routing. Each area
                links to the items, weapons, and recipes connected to that location.
              </p>
              <div class="area-route-grid">
                <RouterLink v-for="area in areas" :key="area.slug" class="area-route-card" :to="`/areas/${area.slug}`">
                  <img :src="area.image" :alt="area.name" />
                  <span>
                    <small>{{ area.type }}</small>
                    <h3>{{ area.name }}</h3>
                    <p>{{ area.summary }}</p>
                  </span>
                </RouterLink>
              </div>
            </section>

            <section id="tree" class="guide-block">
              <h2>The Tree: Spawn and Respawn Point</h2>
              <article class="object-callout">
                <img :src="tree.image" :alt="tree.name" />
                <span>
                  <h3>{{ tree.name }}</h3>
                  <p>{{ tree.detail }}</p>
                  <ul>
                    <li v-for="tip in tree.tips" :key="tip">{{ tip }}</li>
                  </ul>
                </span>
              </article>
            </section>

            <section id="mushroom-house" class="guide-block">
              <h2>Mushroom House: Storage, Crystal, Spirit Catcher, and Bell</h2>
              <p>
                The mushroom-house area handles the parts of a run that happen before and after the
                house: storage, party setup, limited respawns, and starting or ending the route.
              </p>
              <div class="facility-grid">
                <article v-for="object in mushroomObjects" :key="object.name" class="facility-card">
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

            <section id="well" class="guide-block">
              <h2>The Well: Craft Backpack, Pickaxe, Metal Bat, Shoes, and Potions</h2>
              <article class="object-callout well-callout">
                <img :src="well.image" :alt="well.name" />
                <span>
                  <h3>{{ well.name }}</h3>
                  <p>{{ well.detail }}</p>
                  <ul>
                    <li v-for="tip in well.tips" :key="tip">{{ tip }}</li>
                  </ul>
                </span>
              </article>
              <div class="upgrade-grid">
                <RouterLink class="guide-card" to="/crafting/backpack">
                  <h3>Backpack</h3>
                  <p>Craft first when material runs require fewer return trips through the house.</p>
                </RouterLink>
                <RouterLink class="guide-card" to="/crafting/pickaxe">
                  <h3>Pickaxe</h3>
                  <p>Break suitable objects into resources when carrying them home is too slow.</p>
                </RouterLink>
                <RouterLink class="guide-card" to="/crafting/metal-bat">
                  <h3>Metal Bat</h3>
                  <p>Basic defense and object hits for pests, hostile gnomes, and emergency routes.</p>
                </RouterLink>
                <RouterLink class="guide-card" to="/crafting/spring-shoes">
                  <h3>Spring Shoes</h3>
                  <p>Fall-safety and vertical movement for windows, furniture, and exterior routes.</p>
                </RouterLink>
                <RouterLink class="guide-card" to="/crafting/potion-table">
                  <h3>Potion Table</h3>
                  <p>Unlock potion crafting before turning effects into Blowgun dart routes.</p>
                </RouterLink>
              </div>
            </section>

            <section id="pre-run-checklist" class="guide-block">
              <h2>Pre-Run Checklist Before Entering the House</h2>
              <div class="data-table">
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
import areasData from '../data/areasData'
import baseData from '../data/baseData'

const areas = areasData.find((section) => section.key === 'areas').items
const zones = baseData.find((section) => section.key === 'zones').items
const objects = baseData.find((section) => section.key === 'objects').items
const checklist = baseData.find((section) => section.key === 'checklist').items

const gnomeWorld = zones.find((zone) => zone.name === 'Gnome World')
const humanWorld = zones.find((zone) => zone.name === 'Human World')
const tree = objects.find((object) => object.name === 'The Tree')
const well = objects.find((object) => object.name === 'The Well')
const mushroomObjects = ['Mushroom House', 'Storage Chest', 'Purple Crystal', 'Spirit Catcher', 'Bell']
  .map((name) => objects.find((object) => object.name === name))
  .filter(Boolean)
</script>

<style scoped>
.base-building-section {
  overflow: hidden;
  background:
    radial-gradient(circle at 9% 7%, rgba(223, 91, 50, 0.16) 0 94px, transparent 96px),
    radial-gradient(circle at 88% 14%, rgba(40, 114, 79, 0.16) 0 118px, transparent 120px),
    linear-gradient(135deg, rgba(255, 218, 193, 0.34), rgba(223, 240, 198, 0.46));
}

.base-building-content {
  gap: 38px;
}

.base-building-content .page-hero {
  background:
    linear-gradient(115deg, rgba(255, 248, 232, 0.94) 0 48%, rgba(255, 224, 169, 0.9) 48% 72%, rgba(223, 240, 198, 0.92) 72%),
    var(--color-surface);
}

.base-building-content .page-hero::before {
  width: 220px;
  background: repeating-linear-gradient(90deg, var(--color-primary) 0 24px, var(--color-gold) 24px 48px, var(--color-accent) 48px 72px);
}

.base-building-content .hero-art {
  transform: rotate(-1.5deg);
}

.base-split {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 18px;
  align-items: stretch;
}

.base-split.reverse {
  grid-template-columns: minmax(320px, 0.92fr) minmax(0, 1.08fr);
}

.base-panel,
.base-note-board,
.object-callout,
.facility-card {
  position: relative;
  border: 2px solid var(--color-ink);
  border-radius: 24px;
  background: var(--color-surface);
  box-shadow: 9px 10px 0 rgba(36, 51, 45, 0.14);
  overflow: hidden;
}

.base-panel {
  display: grid;
  grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1fr);
  min-height: 260px;
  background:
    linear-gradient(135deg, rgba(255, 240, 199, 0.92), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.base-panel::after,
.object-callout::after {
  position: absolute;
  right: 16px;
  bottom: 14px;
  width: 84px;
  height: 16px;
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  background: var(--color-sky);
  content: "";
}

.base-panel img,
.object-callout img,
.facility-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.base-panel img,
.object-callout img {
  border-right: 2px solid var(--color-ink);
}

.base-panel > span,
.object-callout > span,
.facility-card > span {
  display: grid;
  align-content: center;
  gap: 12px;
  padding: 22px;
}

.base-panel h3,
.object-callout h3,
.facility-card h3 {
  max-width: 720px;
  font-size: 1.48rem;
}

.base-panel p,
.object-callout p,
.facility-card p {
  color: var(--color-text);
  font-weight: 850;
}

.base-note-board {
  display: grid;
  align-content: center;
  gap: 14px;
  padding: 28px;
  background:
    linear-gradient(135deg, rgba(223, 240, 198, 0.94), rgba(255, 240, 199, 0.94)),
    var(--color-surface);
}

.base-note-board::before {
  position: absolute;
  top: 16px;
  right: 18px;
  width: 62px;
  height: 62px;
  border: 2px solid var(--color-ink);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.35), transparent),
    var(--color-panel-2);
  content: "";
  transform: rotate(7deg);
}

.base-note-board.danger {
  background:
    linear-gradient(135deg, rgba(255, 218, 193, 0.96), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.base-note-board.danger::before {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.35), transparent),
    var(--color-accent);
}

.base-note-board strong {
  color: var(--color-ink);
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
  font-size: 1.42rem;
  line-height: 1.08;
}

.base-note-board ul,
.object-callout ul,
.facility-card ul {
  display: grid;
  gap: 7px;
  padding-left: 18px;
}

.base-note-board li,
.object-callout li,
.facility-card li {
  color: var(--color-text);
  font-weight: 800;
  line-height: 1.45;
  list-style: disc;
}

.section-lead {
  color: var(--color-text);
  font-weight: 800;
  line-height: 1.55;
}

.base-link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.base-link-row .area-guide-link {
  background: var(--color-ink);
  color: var(--color-surface);
}

.base-link-row a {
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 8px 12px;
  background: var(--color-panel-2);
  color: var(--color-ink);
  font-weight: 900;
  box-shadow: 3px 4px 0 rgba(36, 51, 45, 0.12);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.base-link-row a:hover,
.base-link-row a:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-2px);
}

.object-callout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  min-height: 250px;
  background:
    linear-gradient(90deg, rgba(255, 240, 199, 0.86), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.object-callout::before {
  position: absolute;
  top: 14px;
  left: 16px;
  z-index: 1;
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 5px 10px;
  background: var(--color-surface);
  color: var(--color-accent);
  content: "Base anchor";
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
}

.well-callout {
  background:
    linear-gradient(90deg, rgba(223, 240, 198, 0.86), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.well-callout::before {
  content: "Crafting station";
}

.facility-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.area-route-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.area-route-card {
  display: grid;
  grid-template-rows: 150px minmax(0, 1fr);
  border: 2px solid var(--color-ink);
  border-radius: 22px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(232, 246, 216, 0.82), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
  box-shadow: 7px 8px 0 rgba(36, 51, 45, 0.13);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.area-route-card:hover,
.area-route-card:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-2px);
}

.area-route-card img {
  width: 100%;
  height: 100%;
  border-bottom: 2px solid var(--color-ink);
  object-fit: cover;
}

.area-route-card span {
  display: grid;
  gap: 8px;
  padding: 16px;
}

.area-route-card small {
  color: var(--color-primary);
  font-weight: 900;
  text-transform: uppercase;
}

.area-route-card h3 {
  font-size: 1.22rem;
}

.facility-card {
  display: grid;
  grid-template-rows: 180px minmax(0, 1fr);
  background:
    linear-gradient(180deg, rgba(255, 248, 232, 0.96), rgba(255, 240, 199, 0.74)),
    var(--color-surface);
  transition:
    background 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

.facility-card:hover {
  background: var(--color-surface-strong);
  box-shadow: 12px 13px 0 rgba(36, 51, 45, 0.16);
  transform: translate(-2px, -2px);
}

.facility-card::before {
  position: absolute;
  top: 148px;
  left: 18px;
  z-index: 1;
  width: 70px;
  height: 18px;
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  background: var(--color-accent);
  content: "";
}

.facility-card small {
  color: var(--color-primary);
  font-weight: 900;
  text-transform: uppercase;
}

.upgrade-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.upgrade-grid .guide-card {
  min-height: 178px;
  background:
    linear-gradient(180deg, rgba(223, 240, 198, 0.72), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.upgrade-grid .guide-card:nth-child(2n) {
  background:
    linear-gradient(180deg, rgba(255, 218, 193, 0.72), rgba(255, 248, 232, 0.96)),
    var(--color-surface);
}

.base-check-row {
  grid-template-columns: 72px minmax(0, 1fr);
}

.base-check-row strong {
  color: var(--color-accent);
}

@media (max-width: 1024px) {
  .base-split,
  .base-split.reverse,
  .object-callout {
    grid-template-columns: 1fr;
  }

  .base-panel {
    grid-template-columns: minmax(180px, 0.42fr) minmax(0, 1fr);
  }

  .facility-grid {
    grid-template-columns: 1fr;
  }

  .area-route-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .upgrade-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .base-panel,
  .area-route-grid,
  .upgrade-grid {
    grid-template-columns: 1fr;
  }

  .base-panel img,
  .object-callout img {
    border-right: 0;
    border-bottom: 2px solid var(--color-ink);
  }

  .base-panel img,
  .object-callout img,
  .facility-card img {
    aspect-ratio: 16 / 9;
  }
}
</style>
