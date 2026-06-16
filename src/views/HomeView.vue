<template>
  <div class="home-page">
  <section class="home-hero-section page-section">
    <div class="container">
      <div class="home-hero-content page-hero">
        <div class="page-hero-copy">
          <span class="eyebrow">Player guide</span>
          <h1>Burglin' Gnomes Guide — Tasks, Items, Crafting &amp; Co-op Tips</h1>
          <p>
            Burglin' Gnomes is out on Steam as of June 10, 2026. This site is our full-release player guide — beginner routes, item and crafting databases, bestiary notes, and co-op tips from real runs, updated as patches land.
          </p>
          <form class="hero-search" role="search" @submit.prevent="submitSearch">
            <label class="hero-search-label" for="hero-search-input">Search guides, items, recipes, and enemies</label>
            <div class="hero-search-row">
              <input
                id="hero-search-input"
                v-model="searchQuery"
                type="search"
                name="q"
                autocomplete="off"
                placeholder="Search items, recipes, enemies..."
              />
              <button type="submit">Search</button>
            </div>
          </form>
          <div class="hero-actions" aria-label="Primary guide links">
            <RouterLink to="/beginner">Start with Beginner Guide</RouterLink>
            <RouterLink to="/items">Browse all items</RouterLink>
          </div>
        </div>
        <figure class="hero-art">
          <img
            src="/images/page-01.webp"
            alt="Burglin' Gnomes official Steam key art"
            width="595"
            height="340"
            decoding="async"
            fetchpriority="high"
          />
        </figure>
      </div>
    </div>
  </section>

  <section class="facts-section page-section">
    <div class="container">
      <div class="facts-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Official information</span>
          <h2>Burglin' Gnomes release date, platform, co-op size, and developer</h2>
        </div>
        <div class="fact-strip">
          <article>
            <span>Current build</span>
            <strong>Full release</strong>
            <p>Steam launch: June 10, 2026</p>
          </article>
          <article>
            <span>Platform</span>
            <strong>PC / Steam</strong>
            <p>Windows only on the store page</p>
          </article>
          <article>
            <span>Party size</span>
            <strong>1-6 players</strong>
            <p>Solo or online co-op squad</p>
          </article>
          <article>
            <span>Win condition</span>
            <strong>3+ tasks</strong>
            <p>Finish at least three before extraction</p>
          </article>
          <article>
            <span>Developer</span>
            <strong>Fobri</strong>
            <p>Online co-op action-adventure</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="intro-band">
    <div class="container">
      <div class="intro-band__inner">
        <article class="intro-band__content">
          <span class="eyebrow">Gameplay introduction</span>
          <h2>How a Burglin' Gnomes run works</h2>
          <p>
            Chasing raw loot before task progress is the fastest way to lose a clean day. Read the High-Gnome list, secure three tasks, then decide whether extra loot is worth the risk.
          </p>
          <RouterLink class="intro-band__cta" to="/beginner">Read the beginner route guide</RouterLink>
        </article>
        <figure class="intro-band__visual">
          <img src="/images/page-02.webp" alt="Burglin' Gnomes kitchen route and house item guide" />
        </figure>
      </div>
    </div>
  </section>

  <section class="quicklinks-section page-section">
    <div class="container">
      <div class="quicklinks-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Quick links</span>
          <h2>Guides we use on co-op nights</h2>
          <p>Jump from your first clean run into tasks, loot, crafting, enemies, and post-patch changes.</p>
        </div>
        <div class="card-grid">
          <RouterLink to="/beginner" class="guide-card quick-card">
            <strong>Beginner</strong>
            <span>First route, tasks, doors and windows, revive rules, and co-op fixes.</span>
          </RouterLink>
          <RouterLink to="/guides/burglin-gnomes-complete-beginners-guide" class="guide-card quick-card">
            <strong>Complete Survival Guide</strong>
            <span>Core loop, Gnome Haven setup, inventory rules, camp upgrades, and first-week survival.</span>
          </RouterLink>
          <RouterLink to="/wiki" class="guide-card quick-card">
            <strong>Wiki</strong>
            <span>Every guide topic in one index when you need a fast answer mid-run.</span>
          </RouterLink>
          <RouterLink to="/items" class="guide-card quick-card">
            <strong>Items &amp; Loot</strong>
            <span>Materials, weapons, tools, task items, potions, ammo, and where to find them.</span>
          </RouterLink>
          <RouterLink to="/crafting" class="guide-card quick-card">
            <strong>Crafting</strong>
            <span>Well recipes, Potion Table recipes, Repackager darts, and linked materials.</span>
          </RouterLink>
          <RouterLink to="/guides/burglin-gnomes-official-gear-weapons-directory" class="guide-card quick-card">
            <strong>Weapons &amp; Gear Directory</strong>
            <span>Crafting costs, equipment slots, melee weapons, mobility gear, and industrial tools.</span>
          </RouterLink>
          <RouterLink to="/base-building" class="guide-card quick-card">
            <strong>Base Building</strong>
            <span>Gnome-world objects, storage, crystal revival, bell extraction, and the crafting well.</span>
          </RouterLink>
          <RouterLink to="/bestiary" class="guide-card quick-card">
            <strong>NPCs &amp; Enemies</strong>
            <span>Humans, Fairy, Cat, Rat, Cockroach, Evil Gnome, Roomba, and outdoor entities.</span>
          </RouterLink>
          <RouterLink to="/updates" class="guide-card quick-card">
            <strong>Updates</strong>
            <span>Full-release notes and what to recheck after patches land.</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="plan-section page-section">
    <div class="container">
      <div class="plan-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Opening route</span>
          <h2>Burglin Gnomes beginner route for the first clean run</h2>
        </div>
        <div class="media-band">
          <div class="card-grid plan-grid">
            <article class="guide-card plan-card">
              <b>01</b>
              <h3>Read the High-Gnome task list</h3>
              <p>The day is built around five tasks. Finish at least three before calling extraction.</p>
            </article>
            <article class="guide-card plan-card">
              <b>02</b>
              <h3>Enter through a reliable route</h3>
              <p>Use vine windows or pipe-style entries first; the front door is not your beginner plan.</p>
            </article>
            <article class="guide-card plan-card">
              <b>03</b>
              <h3>Clear small objectives first</h3>
              <p>Open cabinet, open window, climb, break, and small-object tasks are safer than greedy hauling.</p>
            </article>
            <article class="guide-card plan-card">
              <b>04</b>
              <h3>Search storage with intent</h3>
              <p>Drawers, cabinets, bathroom storage, and kitchen routes are where weapons, cigarettes, utensils, and materials start paying off.</p>
            </article>
            <article class="guide-card plan-card">
              <b>05</b>
              <h3>Upgrade for fewer rescues</h3>
              <p>Backpack, Pickaxe, Metal Bat, Spring Shoes, Potion Table, and Gnomium Gloves reduce repeated exposure.</p>
            </article>
          </div>
          <figure class="media-panel">
            <img src="/images/page-03.webp" alt="Burglin' Gnomes cabinets drawers and storage route guide" />
          </figure>
        </div>
      </div>
    </div>
  </section>

  <section class="overview-section page-section">
    <div class="container">
      <div class="overview-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Game basics</span>
          <h2>How Burglin' Gnomes works for new players</h2>
          <p>The core loop is simple: break in, finish jobs, steal what helps, craft upgrades, survive threats, and improve your next run.</p>
        </div>
        <div class="card-grid">
          <article class="guide-card">
            <h3>What is Burglin' Gnomes?</h3>
            <p>A first-person online co-op heist game where tiny gnomes break into human homes, complete High-Gnome jobs, steal loot, craft gear, and survive cats, humans, and household chaos.</p>
          </article>
          <article class="guide-card">
            <h3>How do tasks work?</h3>
            <p>The High-Gnome gives job objectives. Finish enough of them or the run can fail even if your backpack looks profitable.</p>
          </article>
          <article class="guide-card">
            <h3>What should I craft first?</h3>
            <p>Backpack, Pickaxe, Metal Bat, Spring Shoes, Potion Table, Repackager, and Gnomium Gloves are the core early upgrades to compare.</p>
          </article>
          <article class="guide-card">
            <h3>What can kill a run?</h3>
            <p>Humans, cats, rats, cockroaches, Evil Gnomes, Roomba traps, heavy loot, bad exits, lag, and all-dead failure are the main risks.</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="priority-section page-section">
    <div class="container">
      <div class="priority-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Run priorities</span>
          <h2>What to focus on during your first runs</h2>
        </div>
        <div class="data-table">
          <div class="table-row table-head priority-row">
            <span>Target</span>
            <span>Where</span>
            <span>Action</span>
          </div>
          <div class="table-row priority-row">
            <strong>Task sheet</strong>
            <span>Spawn / start area</span>
            <span>Read before looting</span>
          </div>
          <div class="table-row priority-row">
            <strong>Small household items</strong>
            <span>Bathroom, kitchen, clutter rooms</span>
            <span>Use for early objectives</span>
          </div>
          <div class="table-row priority-row">
            <strong>Crafting materials</strong>
            <span>Loot path</span>
            <span>Bank Clonk, Fabric, Plastic, Fraggles, Chemicals, and Gnomium</span>
          </div>
          <div class="table-row priority-row">
            <strong>Backpack</strong>
            <span>Crafting station</span>
            <span>Prioritize carry capacity</span>
          </div>
          <div class="table-row priority-row">
            <strong>Revive and extraction</strong>
            <span>Crystal, bell, or teammate rescue line</span>
            <span>Know the rescue plan before fighting</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="first-tasks-section page-section">
    <div class="container">
      <div class="first-tasks-content page-content">
        <div class="section-heading">
          <span class="eyebrow">First five tasks</span>
          <h2>Early objectives most squads route around first</h2>
          <p>
            These five jobs teach bathroom and kitchen routing, small object handling, one pest
            target, and when to stop looting. Start here before chasing high-value hauls.
          </p>
        </div>
        <div class="data-table">
          <div class="table-row table-head first-task-row">
            <span>Task</span>
            <span>Target</span>
            <span>Route</span>
            <span>Run note</span>
          </div>
          <div class="table-row first-task-row">
            <strong>Break TV</strong>
            <span>1</span>
            <span>Living room or TV room</span>
            <span>Learn object breaking before the house gets loud.</span>
          </div>
          <div class="table-row first-task-row">
            <strong>Climb Kitchen Counter</strong>
            <span>1</span>
            <span>Kitchen</span>
            <span>Practice vertical movement before harder window routes.</span>
          </div>
          <div class="table-row first-task-row">
            <strong>Clonk Tutorial</strong>
            <span>1</span>
            <span>Tutorial route</span>
            <span>Learn hit timing before using weapons in a live run.</span>
          </div>
          <div class="table-row first-task-row">
            <strong>Open Cabinet</strong>
            <span>1</span>
            <span>Kitchen, bathroom, storage rooms</span>
            <span>Open containers before calling a room empty.</span>
          </div>
          <div class="table-row first-task-row">
            <strong>Open Window</strong>
            <span>1</span>
            <span>Exterior wall or room window</span>
            <span>This is the safest early entry and exit skill.</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="tools-section page-section">
    <div class="container">
      <div class="tools-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Learn next</span>
          <h2>Routes, tools, threats, and areas to learn next</h2>
          <p>
            After the first five tasks, route the house with intent: know how to get in, which rooms
            pay off early, what to craft first, and which threats end a run before extraction.
          </p>
        </div>
        <div class="tool-grid">
          <RouterLink
            v-for="item in learnNext"
            :key="item.path"
            :to="item.path"
            class="guide-card tool-card"
          >
            <img :src="item.image" :alt="item.name" />
            <span>{{ item.role }}</span>
            <h3>{{ item.name }}</h3>
            <p>{{ item.note }}</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="systems-section page-section">
    <div class="container">
      <div class="systems-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Core systems</span>
          <h2>Tasks, crafting, enemies, and home upgrades explained</h2>
          <p>These systems overlap. A good route uses task objectives to choose rooms, item notes to choose what to carry, and crafting priorities to reduce future risk.</p>
        </div>
        <div class="card-grid">
          <article class="guide-card">
            <h3>High-Gnome Tasks</h3>
            <p>Tasks are the run&apos;s checklist. Ignore them and a profitable-looking run can still fail its actual job requirement.</p>
          </article>
          <article class="guide-card">
            <h3>Loot and Materials</h3>
            <p>Small items finish objectives fast. We bank material-looking loot once we know which recipes we are chasing.</p>
          </article>
          <article class="guide-card">
            <h3>Crafting and Equipment</h3>
            <p>Crafting should improve route safety first: more carrying room, better interaction tools, and equipment that buys time against threats.</p>
          </article>
          <article class="guide-card">
            <h3>Enemies and Rescue</h3>
            <p>Humans, animals, pests, and household hazards can turn a short route into a rescue run. Check the bestiary after patches change AI.</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="faq-section page-section" id="faq">
    <div class="container">
      <div class="faq-content page-content">
        <div class="section-heading">
          <span class="eyebrow">FAQ</span>
          <h2>Burglin Gnomes FAQ for new and returning players</h2>
        </div>
        <div class="card-grid">
          <article class="guide-card">
            <h3>Is Burglin' Gnomes co-op?</h3>
            <p>Yes. Steam lists online co-op for up to six players, including solo play with friends.</p>
          </article>
          <article class="guide-card">
            <h3>When did Burglin' Gnomes release?</h3>
            <p>The Steam release date is June 10, 2026. We update guides as the live game changes.</p>
          </article>
          <article class="guide-card">
            <h3>Is Burglin Gnomes on console or mobile?</h3>
            <p>Steam currently lists Windows PC only. We have not seen official console or mobile versions announced.</p>
          </article>
          <article class="guide-card">
            <h3>What should new players do first?</h3>
            <p>Read the task list, enter through a forgiving route like a vine window, finish three small tasks, then loot only when extraction is already safe.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

function submitSearch() {
  const q = searchQuery.value.trim()
  if (!q) {
    router.push('/search')
    return
  }
  router.push({ path: '/search', query: { q } })
}

const learnNext = [
  {
    name: 'Human World Entry',
    role: 'Entry route',
    path: '/beginner#human-world',
    image: '/images/the-tree.webp',
    note: 'Vine windows and drain pipe are the reliable first entries — not the front door.',
  },
  {
    name: 'Human House',
    role: 'Main area',
    path: '/areas/human-house',
    image: '/images/human-world.webp',
    note: 'Five tasks roll here. Finish three before chasing extra loot or deep rooms.',
  },
  {
    name: 'Kitchen',
    role: 'Task room',
    path: '/areas/kitchen',
    image: '/images/page-02.webp',
    note: 'Counters, cabinets, utensils, and break objectives stack in one high-value room.',
  },
  {
    name: 'Backpack',
    role: 'First craft',
    path: '/crafting/backpack',
    image: '/images/items/item-backpack.png',
    note: 'Extra carry slots cut return trips — the upgrade we craft before risky farming.',
  },
  {
    name: 'Cabinets and Drawers',
    role: 'Storage route',
    path: '/areas/cabinets-drawers',
    image: '/images/extracted/area-drawer.png',
    note: 'Cigarettes, utensils, weapons, and small steal tasks hide behind doors you must open.',
  },
  {
    name: 'Cat',
    role: 'Outdoor threat',
    path: '/bestiary/cat',
    image: '/images/extracted/npc-cat.png',
    note: 'Treat the lawn like a kill zone until you know the cat path and when to stay indoors.',
  },
]
</script>

<style scoped>
.home-hero-section {
  padding-top: 54px;
}

.hero-search {
  display: grid;
  gap: 8px;
  margin-top: 8px;
}

.hero-search-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hero-search-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.hero-search-row input {
  width: 100%;
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 12px 16px;
  background: var(--color-surface);
  color: var(--color-ink);
  font: inherit;
  font-weight: 800;
  box-shadow: 3px 4px 0 rgba(36, 51, 45, 0.12);
}

.hero-search-row input:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.hero-search-row button {
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 12px 16px;
  background: var(--color-ink);
  color: var(--color-surface);
  font: inherit;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 4px 5px 0 rgba(36, 51, 45, 0.18);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.hero-search-row button:hover,
.hero-search-row button:focus-visible {
  background: var(--color-primary);
  outline: none;
  transform: translateY(-2px);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.hero-actions a {
  border: 2px solid var(--color-ink);
  border-radius: 999px;
  padding: 12px 16px;
  background: var(--color-ink);
  color: var(--color-surface);
  font-weight: 900;
  box-shadow: 4px 5px 0 rgba(36, 51, 45, 0.18);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.hero-actions a + a {
  background: transparent;
  color: var(--color-ink);
}

.hero-actions a:hover,
.hero-actions a:focus-visible {
  background: var(--color-primary);
  outline: none;
  transform: translateY(-2px);
}

.fact-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.fact-strip article {
  border: 2px solid var(--color-ink);
  border-radius: 18px;
  padding: 18px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}

.fact-strip span {
  color: var(--color-muted);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.fact-strip strong {
  display: block;
  margin-top: 6px;
  color: var(--color-ink);
  font-size: clamp(1.35rem, 2vw, 2rem);
}

.fact-strip p {
  margin-top: 6px;
  color: var(--color-text);
  font-weight: 800;
}

.quick-card {
  transition:
    border-color 180ms ease,
    transform 180ms ease,
    background 180ms ease;
}

.quick-card:hover,
.quick-card:focus-visible {
  border-color: var(--color-ink);
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-3px);
}

.plan-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.plan-card b {
  color: var(--color-accent);
  font-weight: 900;
}

.priority-row {
  grid-template-columns: 1fr 1.25fr 1.5fr;
}

.first-task-row {
  grid-template-columns: 1fr 0.5fr 1.15fr 1.45fr;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
}

.tool-card {
  align-content: start;
  padding: 12px;
  background: #fff5db;
  color: inherit;
  text-decoration: none;
  transition:
    border-color 180ms ease,
    transform 180ms ease,
    background 180ms ease;
}

.tool-card:hover,
.tool-card:focus-visible {
  border-color: var(--color-ink);
  outline: none;
  transform: translateY(-3px);
}

.tool-card img {
  width: 100%;
  aspect-ratio: 1.1;
  border: 2px solid var(--color-ink);
  border-radius: 14px;
  object-fit: cover;
}

.tool-card span {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
}

.tool-card:nth-child(3n + 2) {
  background: #e9f3d6;
}

.tool-card:nth-child(3n) {
  background: #f8dec9;
}

@media (max-width: 1024px) {
  .fact-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .fact-strip {
    grid-template-columns: 1fr;
  }

  .tool-grid {
    grid-template-columns: 1fr;
  }

  .hero-search-row {
    grid-template-columns: 1fr;
  }

}
</style>
