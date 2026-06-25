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
            <img src="/images/page-03.webp" alt="Burglin' Gnomes gameplay screenshot" />
          </figure>
        </div>

        <!-- <GptAd unit="banner1" /> -->

        <AffiliateAd />

        <div class="guide-layout">
          <PageSidebar
            label="On this page"
            title="Wiki"
            aria-label="Wiki sections"
            :sections="wikiSidebarSections"
          />

          <div class="guide-main">
            <section id="wiki-directory" class="guide-block">
              <h2>Every Burglin' Gnomes guide page</h2>
              <p>
                Start with the beginner guide for your first clean run. Open Tasks when you need
                an objective call, Items when you are deciding what to carry, Crafting for upgrades,
                Enemies for threat counters, and Updates after patches land.
              </p>
              <div class="card-grid">
                <a href="/beginner" class="guide-card wiki-card">
                  <strong>Beginner Guide</strong>
                  <span>First route, tasks, doors and windows, revive rules, and co-op fixes.</span>
                </a>
                <a href="/guides/burglin-gnomes-complete-beginners-guide" class="guide-card wiki-card">
                  <strong>Complete Survival Guide</strong>
                  <span>Core loop, Gnome Haven setup, inventory rules, upgrades, and camp management.</span>
                </a>
                <a href="/beginner#first-tasks" class="guide-card wiki-card">
                  <strong>Tasks</strong>
                  <span>How High-Gnome jobs work and which rooms to hit first.</span>
                </a>
                <a href="/items" class="guide-card wiki-card">
                  <strong>Items</strong>
                  <span>Loot, materials, weapons, tools, and what each item is for in a run.</span>
                </a>
                <a href="/crafting" class="guide-card wiki-card">
                  <strong>Crafting</strong>
                  <span>Recipes, gear upgrades, and the craft order we use on co-op nights.</span>
                </a>
                <a href="/guides/burglin-gnomes-official-gear-weapons-directory" class="guide-card wiki-card">
                  <strong>Weapons &amp; Gear Directory</strong>
                  <span>Weapons, equipment slots, mobility gear, tools, and crafting costs.</span>
                </a>
                <a href="/base-building" class="guide-card wiki-card">
                  <strong>Base Building</strong>
                  <span>Gnome world, storage, purple crystal, bell extraction, and the crafting well.</span>
                </a>
                <a href="/wiki#area-guides" class="guide-card wiki-card">
                  <strong>Area Guides</strong>
                  <span>Gnome world, human house rooms, outdoor routes, and where items or threats show up.</span>
                </a>
                <a href="/bestiary" class="guide-card wiki-card">
                  <strong>NPCs &amp; Enemies Bestiary</strong>
                  <span>Humans, cats, pests, grabs, hazards, and how we survive them.</span>
                </a>
                <a href="/updates" class="guide-card wiki-card">
                  <strong>Updates</strong>
                  <span>Release facts and what to review after patches.</span>
                </a>
              </div>
            </section>

            <!-- <GptAd unit="banner2" /> -->

            <AffiliateAd />

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
                <a
                  v-for="area in areas"
                  :key="area.slug"
                  class="table-row area-row area-link"
                  :href="`/areas/${area.slug}`"
                >
                  <strong>{{ area.name }}</strong>
                  <span>{{ area.type }}</span>
                  <span>{{ area.summary }}</span>
                </a>
              </div>
            </section>

            <!-- <GptAd unit="banner3" /> -->

            <AffiliateAd />

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
                <a href="/beginner#human-world" class="table-row topic-row topic-link">
                  <strong>How to Enter the Human World</strong>
                  <span>Beginner Guide</span>
                  <span>Gnome-world start, inviting friends, vine window entry, and exit discipline.</span>
                </a>
                <a href="/beginner#first-tasks" class="table-row topic-row topic-link">
                  <strong>First Five Tasks</strong>
                  <span>Beginner</span>
                  <span>Break TV, climb counter, hit practice, open cabinet, and open window routing.</span>
                </a>
                <a href="/beginner#first-tasks" class="table-row topic-row topic-link">
                  <strong>Cabinet and Window Route</strong>
                  <span>Beginner</span>
                  <span>Container checks, kitchen counter movement, window entry, and early exit control.</span>
                </a>
                <a href="/beginner#first-tasks" class="table-row topic-row topic-link">
                  <strong>Kitchen Route</strong>
                  <span>Beginner</span>
                  <span>Fork locations, counters, drawers, and timing around the human.</span>
                </a>
                <a href="/items#items-tools" class="table-row topic-row topic-link">
                  <strong>Route Tools</strong>
                  <span>Items</span>
                  <span>Pickaxe, Eyeglass, Grappling Hook, and tools that change farming or movement routes.</span>
                </a>
                <a href="/items#items-weapons" class="table-row topic-row topic-link">
                  <strong>Weapons That Need Practice</strong>
                  <span>Items</span>
                  <span>Metal Bat, Marble Gun, Blowgun, Boxing Gloves, and dart ammo before clean runs.</span>
                </a>
                <a href="/crafting#materials" class="table-row topic-row topic-link">
                  <strong>Crafting Materials</strong>
                  <span>Crafting</span>
                  <span>Clonk, Fraggles, Basic Junk, Rag Strips, Plastic Blocks, and linked recipes.</span>
                </a>
                <a href="/base-building#mushroom-house" class="table-row topic-row topic-link">
                  <strong>Gnome-World Base Objects</strong>
                  <span>Base Building</span>
                  <span>Tree, mushroom house, storage, purple crystal, bell, and crafting well.</span>
                </a>
                <a href="/areas/kitchen" class="table-row topic-row topic-link">
                  <strong>Kitchen Route</strong>
                  <span>Areas</span>
                  <span>Counters, drawers, utensils, and timing around the human.</span>
                </a>
                <a href="/areas/outdoor-lawn" class="table-row topic-row topic-link">
                  <strong>Outdoor Lawn</strong>
                  <span>Areas</span>
                  <span>Cat routes, Fairy trades, exterior carries, and extraction timing.</span>
                </a>
                <a href="/bestiary/cat" class="table-row topic-row topic-link">
                  <strong>Surviving the Cat</strong>
                  <span>Bestiary</span>
                  <span>Floor control, safe distance, and gear that buys space.</span>
                </a>
                <a href="/bestiary/human-homeowner" class="table-row topic-row topic-link">
                  <strong>Surviving the Human</strong>
                  <span>Bestiary</span>
                  <span>Line of sight, when to drop loot, and tools that create escape windows.</span>
                </a>
                <a href="/bestiary/vacuum-robot" class="table-row topic-row topic-link">
                  <strong>Vacuum Robot Hazard</strong>
                  <span>Bestiary</span>
                  <span>Moving machine behavior, blocking risk, and route workarounds.</span>
                </a>
                <a href="/updates#patch-checklist" class="table-row topic-row topic-link">
                  <strong>Post-Patch Checklist</strong>
                  <span>Updates</span>
                  <span>Outdoor routes, glider, ranged weapons, protective gear, and large humanoid grabs.</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <GptAd unit="banner1" /> -->

  <AffiliateAd />

  <section id="guide-labels" class="labels-section page-section">
    <div class="container">
      <div class="labels-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Guide labels</span>
          <h2>How we mark what we know — and what we are still checking</h2>
          <p>We play the game, log what works, and say plainly when a tip still needs more time in the live build.</p>
        </div>
        <div class="card-grid">
          <article class="guide-card">
            <strong>Verified</strong>
            <p>Matches Steam, developer posts, or behavior that has stayed stable across our sessions.</p>
          </article>
          <article class="guide-card">
            <strong>Seen in-game</strong>
            <p>Matches repeatable player sessions, but still needs more samples before it is treated as final.</p>
          </article>
          <article class="guide-card">
            <strong>Still testing</strong>
            <p>Useful tip, but we would not bet a clean run on it yet.</p>
          </article>
          <article class="guide-card">
            <strong>May change with patches</strong>
            <p>AI, items, tasks, or recipes can shift after an update — recheck before you route around it.</p>
          </article>
          <article class="guide-card">
            <strong>Early notes</strong>
            <p>Useful for routing, but not stable enough to treat as final after patches or balance changes.</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- <GptAd unit="banner2" /> -->

  <AffiliateAd />

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
          <div class="table-row facts-row">
            <strong>Steam app id</strong>
            <span>3844970</span>
          </div>
          <div class="table-row facts-row">
            <strong>Developer / publisher</strong>
            <span>Fobri (© Qubrion Ltd Oy)</span>
          </div>
          <div class="table-row facts-row">
            <strong>Genre tags</strong>
            <span>Co-op, Multiplayer, First-Person, Heist, Stealth, Loot, Crafting</span>
          </div>
          <div class="table-row facts-row">
            <strong>Core loop</strong>
            <span>Break in, steal, complete High-Gnome tasks, craft equipment, upgrade home, survive threats</span>
          </div>
          <div class="table-row facts-row">
            <strong>PC requirements</strong>
            <span>Windows 10, 4 GB RAM minimum, 7 GB storage</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- <GptAd unit="banner3" /> -->

  <AffiliateAd />
  </div>
</template>

<script setup>
import PageSidebar from '../components/PageSidebar.vue'
import areasData from '../data/areasData'

const wikiSidebarSections = [
  { id: 'wiki-directory', label: 'Guide pages', href: '#wiki-directory' },
  { id: 'area-guides', label: 'Area guides', href: '#area-guides' },
  { id: 'wiki-topics', label: 'Popular topics', href: '#wiki-topics' },
  { id: 'guide-labels', label: 'How we label notes', href: '#guide-labels' },
  { id: 'official-facts', label: 'Official facts', href: '#official-facts' },
]

const areas = areasData.find((section) => section.key === 'areas').items
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
