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
            <img src="/images/page-08.webp" alt="Burglin' Gnomes update and extraction bell" />
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
                <div class="table-row release-row">
                  <strong>Release date</strong>
                  <span>June 10, 2026</span>
                </div>
                <div class="table-row release-row">
                  <strong>Store</strong>
                  <span>Steam app 3844970</span>
                </div>
                <div class="table-row release-row">
                  <strong>Supported platform</strong>
                  <span>Windows PC</span>
                </div>
                <div class="table-row release-row">
                  <strong>Player count</strong>
                  <span>1-6 players online co-op</span>
                </div>
                <div class="table-row release-row">
                  <strong>Developer / publisher</strong>
                  <span>Fobri</span>
                </div>
                <div class="table-row release-row">
                  <strong>Core loop</strong>
                  <span>Complete five listed tasks when possible, finish at least three, extract, bank loot, craft upgrades, repeat</span>
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
                <RouterLink to="/beginner#first-tasks" class="preview-card">
                  <img src="https://placehold.co/40x40/ffdac1/6B9B7B?text=" alt="Full-release task loop" />
                  <div>
                    <small>01 / Task routing</small>
                    <h3>Full-release task loop</h3>
                    <p>Each day gives a task list. Three completed tasks are the practical safety line before extraction; five tasks are the clean route goal when the house stays under control.</p>
                    <span class="preview-card__target">Beginner task guide</span>
                  </div>
                </RouterLink>
                <RouterLink to="/items" class="preview-card">
                  <img src="https://placehold.co/40x40/ffdac1/6B9B7B?text=" alt="House weapons and storage loot" />
                  <div>
                    <small>02 / Items</small>
                    <h3>House weapons and storage loot</h3>
                    <p>Gun, Taser, Pepper Spray, Grenade, Rocket Launcher, Landmine, Firework, Chainsaw, utensils, and task items now need item pages linked to rooms and storage routes.</p>
                    <span class="preview-card__target">Items database</span>
                  </div>
                </RouterLink>
                <RouterLink to="/crafting" class="preview-card">
                  <img src="https://placehold.co/40x40/ffdac1/6B9B7B?text=" alt="Crafting stations and base objects" />
                  <div>
                    <small>03 / Crafting</small>
                    <h3>Crafting stations and base objects</h3>
                    <p>The Well, Potion Table, Repackager, crystal, bell, and storage all affect pre-run planning. Recipe pages should link back to materials, tools, and areas.</p>
                    <span class="preview-card__target">Crafting pages</span>
                  </div>
                </RouterLink>
                <RouterLink to="/bestiary" class="preview-card">
                  <img src="https://placehold.co/40x40/ffdac1/6B9B7B?text=" alt="NPCs, enemies, and outdoor animals" />
                  <div>
                    <small>04 / Bestiary</small>
                    <h3>NPCs, enemies, and outdoor animals</h3>
                    <p>Human, Fairy, Cat, Rat, Cockroach, Evil Gnome, Vacuum Robot, Mole, Boar, Pitbull, Sealman, Seagull, Jonathan, and Bibi now have route pages or watch-list notes.</p>
                    <span class="preview-card__target">NPCs and enemies</span>
                  </div>
                </RouterLink>
                <RouterLink to="/areas/human-house" class="preview-card">
                  <img src="https://placehold.co/40x40/ffdac1/6B9B7B?text=" alt="Outdoor entry and area pages" />
                  <div>
                    <small>05 / Areas</small>
                    <h3>Outdoor entry and area pages</h3>
                    <p>Vine windows, lawn paths, greenhouse and garden routes, garage/shed storage, weapon-safe checks, kitchen, bathroom, and cabinet pages now connect items to where they are found.</p>
                    <span class="preview-card__target">Area guide pages</span>
                  </div>
                </RouterLink>
                <RouterLink to="/beginner#death-revival" class="preview-card">
                  <img src="https://placehold.co/40x40/ffdac1/6B9B7B?text=" alt="Co-op revive and performance checks" />
                  <div>
                    <small>06 / Co-op</small>
                    <h3>Co-op revive and performance checks</h3>
                    <p>Crystal revival, teammate rescue, all-dead failure, lag, disconnects, and virtual memory fixes remain high-search beginner topics after launch.</p>
                    <span class="preview-card__target">Beginner fixes</span>
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
          <div class="table-row queue-row">
            <strong>01</strong>
            <span>Daily task count, three-task extraction rule, all-dead fail behavior, and task completion triggers.</span>
          </div>
          <div class="table-row queue-row">
            <strong>02</strong>
            <span>Tutorial task sequence: Break TV, Climb Kitchen Counter, Clonk Tutorial, Open Cabinet, and Open Window.</span>
          </div>
          <div class="table-row queue-row">
            <strong>03</strong>
            <span>Backpack, Pickaxe, Metal Bat, Spring Shoes, Potion Table, Repackager, and Gnomium Gloves recipe costs.</span>
          </div>
          <div class="table-row queue-row">
            <strong>04</strong>
            <span>Metal Bat, Marble Gun, Blowgun, potion darts, and enemy response after combat patches.</span>
          </div>
          <div class="table-row queue-row">
            <strong>05</strong>
            <span>Cabinet and drawer loot behavior, including weapons, cigarettes, task items, and special ingredients.</span>
          </div>
          <div class="table-row queue-row">
            <strong>06</strong>
            <span>Potion duration, dart delivery, valid targets, and Repackager output count.</span>
          </div>
          <div class="table-row queue-row">
            <strong>07</strong>
            <span>Medical Terminal charges, CPR revive reliability, and all-dead fail behavior.</span>
          </div>
          <div class="table-row queue-row">
            <strong>08</strong>
            <span>Human, Cat, Rat, Cockroach, Evil Gnome, Vacuum Robot, Mole, Boar, Pitbull, Jonathan, Bibi, Sealman, and Seagull behavior.</span>
          </div>
          <div class="table-row queue-row">
            <strong>09</strong>
            <span>Vine window entry reliability across house variants and backup exits.</span>
          </div>
          <div class="table-row queue-row">
            <strong>10</strong>
            <span>Fire, flooded toilet, ragdoll, and other physics hazards after network patches.</span>
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
          <article class="guide-card">
            <h3>Tasks</h3>
            <p>Task wording, valid objects, room hints, objective counts, and completion triggers are the first things to verify after patches.</p>
          </article>
          <article class="guide-card">
            <h3>Items</h3>
            <p>Weapons, materials, potion ingredients, ammo, cigarettes, utensils, and special loot can change route value when storage pools shift.</p>
          </article>
          <article class="guide-card">
            <h3>Crafting</h3>
            <p>Recipe costs, station unlocks, gear effects, potion output, and Repackager dart counts should match the current build before guides quote them.</p>
          </article>
          <article class="guide-card">
            <h3>NPCs and enemies</h3>
            <p>Detection range, pursuit, grabs, rescue windows, hiding spots, and line of sight can invalidate old survival advice quickly.</p>
          </article>
          <article class="guide-card">
            <h3>Areas</h3>
            <p>Vine windows, outdoor paths, kitchen cabinets, bathroom storage, garage/shed routes, weapon-safe routes, and extraction lines drive item discovery.</p>
          </article>
          <article class="guide-card">
            <h3>Co-op stability</h3>
            <p>Object sync, ragdolls, teammate rescue, disconnects, lag, and virtual memory fixes affect whether a route works in a real squad.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import PageSidebar from '../components/PageSidebar.vue'

const updatesSidebarSections = [
  { id: 'release-facts', label: 'Release facts', href: '#release-facts' },
  { id: 'release-preview', label: 'Live guide priorities', href: '#release-preview' },
  { id: 'patch-checklist', label: 'Post-patch checklist', href: '#patch-checklist' },
  { id: 'patch-rules', label: 'When patches drop', href: '#patch-rules' },
]
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
