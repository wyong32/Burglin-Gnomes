<template>
  <div class="home-page">
  <section class="home-hero-section page-section">
    <div class="container">
      <div class="home-hero-content page-hero">
        <div class="page-hero-copy">
          <span class="eyebrow">Player guide</span>
          <h1>Burglin' Gnomes Guide — Tasks, Items, Crafting &amp; Co-op Tips</h1>
          <p>
            Burglin' Gnomes is a first-person online co-op heist game where tiny gnomes break into
            human homes, finish High-Gnome jobs, steal useful loot, craft gear, upgrade home, and
            try not to get caught. We built this guide for players who want fast answers mid-run:
            safe routes, item finds, crafting order, enemy counters, and co-op fixes after the
            June 10 release.
          </p>
          <div class="hero-actions" aria-label="Primary guide links">
            <RouterLink to="/beginner/">Start with Beginner Guide</RouterLink>
            <RouterLink to="/items/">Browse all items</RouterLink>
          </div>
        </div>
        <figure class="hero-art">
          <img src="/images/steam-cover.jpg" alt="Burglin' Gnomes official Steam key art" />
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
          <article v-for="fact in facts" :key="fact.label">
            <span>{{ fact.label }}</span>
            <strong>{{ fact.value }}</strong>
            <p>{{ fact.note }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="intro-section page-section">
    <div class="container">
      <div class="intro-content page-content">
        <div class="media-band">
          <article class="intro-copy guide-card">
            <span class="eyebrow">Gameplay introduction</span>
            <h2>How a Burglin' Gnomes run works</h2>
            <p>
              A run starts with small gnomes entering a human home and trying to turn household chaos
              into useful progress. The game is not only about grabbing valuables. The High-Gnome gives
              jobs, and those jobs decide which rooms matter, which objects are worth carrying, and
              when the group should leave instead of getting greedy.
            </p>
            <p>
              The safest early rhythm is: check the task list, identify a low-risk entry, clear small
              objectives, bank useful materials, then carry larger loot once the route back out is known.
              Combat, enemy behavior, and strange physics interactions should be tested separately
              before a team relies on them during a clean run.
            </p>
          </article>
          <figure class="media-panel">
            <img src="/images/steam-shot-2.jpg" alt="Burglin' Gnomes house interior gameplay" />
          </figure>
        </div>
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
          <RouterLink v-for="link in quickLinks" :key="link.path" class="guide-card quick-card" :to="link.path">
            <strong>{{ link.label }}</strong>
            <span>{{ link.note }}</span>
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
            <article v-for="step in runPlan" :key="step.step" class="guide-card plan-card">
              <b>{{ step.step }}</b>
              <h3>{{ step.title }}</h3>
              <p>{{ step.detail }}</p>
            </article>
          </div>
          <figure class="media-panel">
            <img src="/images/steam-shot-1.jpg" alt="Burglin' Gnomes house route screenshot" />
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
          <article v-for="item in searchIntent" :key="item.title" class="guide-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
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
            <span>Guide note</span>
          </div>
          <div v-for="item in priorityTable" :key="item.target" class="table-row priority-row">
            <strong>{{ item.target }}</strong>
            <span>{{ item.room }}</span>
            <span>{{ item.action }}</span>
            <b :class="['status-pill', statusClass(item.status)]">{{ displayStatus(item.status) }}</b>
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
            <span>Guide note</span>
          </div>
          <div v-for="item in firstTasks" :key="item.task" class="table-row first-task-row">
            <strong>{{ item.task }}</strong>
            <span>{{ item.target }}</span>
            <span>{{ item.route }}</span>
            <span>{{ item.note }}</span>
            <b :class="['status-pill', statusClass(item.status)]">{{ displayStatus(item.status) }}</b>
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
          <h2>Routes, tools, threats, and new map content</h2>
          <p>
            After the first task set, these are the pages we open most: entry routes, carry upgrades,
            utility items, major threats, and outdoor map leads from the full release.
          </p>
        </div>
        <div class="tool-grid">
          <article v-for="item in toolsToLearn" :key="item.name" class="guide-card tool-card">
            <img :src="item.image" :alt="item.name" />
            <span>{{ item.role }}</span>
            <h3>{{ item.name }}</h3>
            <p>{{ item.note }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="danger-section page-section">
    <div class="container">
      <div class="danger-content dark-band page-content">
        <div class="section-heading">
          <span class="eyebrow">Strategy guide</span>
          <h2>Why task routing matters more than raw loot value</h2>
          <p>
            Burglin' Gnomes rewards stealth, teamwork, rescue timing, crafting, and High-Gnome task
            completion. That means the best route is not a loot-only value list. It is a plan that
            protects task progress.
          </p>
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
          <article v-for="item in faq" :key="item.question" class="guide-card">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import homeData from '../data/homeData'
import { displayStatus, statusClass } from '../utils/contentLabels'
import { setRouteSeo } from '../utils/seo'

const routeMeta = useRoute()
setRouteSeo(routeMeta)

const facts = homeData.find((section) => section.key === 'facts').items
const quickLinks = homeData.find((section) => section.key === 'quickLinks').items
const runPlan = homeData.find((section) => section.key === 'runPlan').items
const searchIntent = homeData.find((section) => section.key === 'searchIntent').items
const priorityTable = homeData.find((section) => section.key === 'priorityTable').items
const firstTasks = homeData.find((section) => section.key === 'firstTasks').items
const toolsToLearn = homeData.find((section) => section.key === 'toolsToLearn').items
const faq = homeData.find((section) => section.key === 'faq').items
</script>

<style scoped>
.home-hero-section {
  padding-top: 54px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
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
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
  font-size: clamp(1.35rem, 2vw, 2rem);
}

.fact-strip p {
  margin-top: 6px;
  color: var(--color-text);
  font-weight: 800;
}

.intro-copy {
  align-content: center;
  gap: 14px;
  padding: 28px;
  background:
    linear-gradient(135deg, rgba(223, 91, 50, 0.12), transparent 44%),
    var(--color-surface);
}

.intro-copy h2 {
  font-size: 2.45rem;
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
  grid-template-columns: 1fr 1.25fr 1.5fr 130px;
}

.first-task-row {
  grid-template-columns: 1fr 0.5fr 1.15fr 1.45fr 130px;
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

.danger-content .eyebrow {
  border-color: rgba(255, 250, 240, 0.22);
  background: rgba(255, 250, 240, 0.08);
  color: var(--color-surface);
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

  .intro-copy h2 {
    font-size: 1.72rem;
  }
}
</style>
