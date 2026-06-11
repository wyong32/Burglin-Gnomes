<template>
  <div class="beginner-page">
  <section class="beginner-section page-section">
    <div class="container">
      <div class="beginner-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Start here</span>
            <h1>Tasks First Beginner Guide | Burglin' Gnomes</h1>
            <p>
              New player? Your first job is not looting. Each day rolls five tasks, three are needed
              for extraction, and a failed timer can reset progress. Learn the entry, finish safe
              objectives, then decide whether loot is worth the risk.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/steam-shot-1.jpg" alt="Burglin' Gnomes entry route screenshot" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Beginner guide sections">
            <strong>On this page</strong>
            <a href="#core-loop">Core loop</a>
            <a href="#controls">Controls</a>
            <a href="#first-route">First route</a>
            <a href="#first-tasks">First five tasks</a>
            <a href="#human-world">Enter human world</a>
            <a href="#doors-windows">Doors and windows</a>
            <a href="#death-revival">Death and revival</a>
            <a href="#bug-fixes">Bug and lag fixes</a>
            <a href="#settings">Settings and controls</a>
            <a href="#room-order">Room order</a>
            <a href="#checklist">Clean-run checklist</a>
            <a href="#mistakes">Common mistakes</a>
          </aside>

          <div class="guide-main">
            <section id="core-loop" class="guide-block">
              <h2>Core loop: 5 tasks, 3 required to extract</h2>
              <p>
                Every run should be planned around the task count first. The house can contain useful
                loot, but the bell only matters after the team has enough task progress to leave safely.
              </p>
              <div class="data-table">
                <div class="table-row table-head core-loop-row">
                  <span>Rule</span>
                  <span>Number</span>
                  <span>What it means</span>
                </div>
                <div v-for="rule in coreLoop" :key="rule.label" class="table-row core-loop-row">
                  <strong>{{ rule.label }}</strong>
                  <span>{{ rule.value }}</span>
                  <span>{{ rule.detail }}</span>
                </div>
              </div>
              <div class="note-panel">
                <p>
                  Beginner rule: stop chasing valuables until three tasks are done, the exit is known,
                  and at least one player can call the route back to the bell.
                </p>
              </div>
            </section>

            <section id="controls" class="guide-block">
              <h2>Basic controls that actually decide runs</h2>
              <p>
                Burglin' Gnomes is a physics-heavy game. Right-click grab and mouse-wheel arm distance
                are not secondary controls; they decide whether you can climb windows, open drawers,
                pull heavy items, and avoid getting stuck in door frames.
              </p>
              <div class="data-table">
                <div class="table-row table-head control-row">
                  <span>Input</span>
                  <span>Action</span>
                  <span>Why it matters</span>
                </div>
                <div v-for="control in controls" :key="control.input" class="table-row control-row">
                  <strong>{{ control.input }}</strong>
                  <span>{{ control.action }}</span>
                  <span>{{ control.use }}</span>
                </div>
              </div>
            </section>

            <section id="first-route" class="guide-block">
              <h2>Best first route for new players</h2>
              <p>
                New players should not start by dragging the largest object they can find. The first
                run should prove that the team can enter, read the High-Gnome task list, complete a
                few small objectives, identify an exit, and leave without turning the house into a
                rescue mission.
              </p>
              <div class="card-grid">
                <article v-for="step in steps" :key="step.order" class="guide-card step-card">
                  <b>{{ step.order }}</b>
                  <h3>{{ step.title }}</h3>
                  <p>{{ step.detail }}</p>
                </article>
              </div>
            </section>

            <section id="first-tasks" class="guide-block">
              <h2>First task list new players should learn</h2>
              <p>
                The first useful route is built around five small objectives: collect rag strips,
                break cheap objects, stab one cockroach, flush one item, and steal a fork. These
                are not random chores; they teach room priority, item size, enemy focus,
                and when to stop looting.
              </p>
              <div class="data-table">
                <div class="table-row table-head first-task-row">
                  <span>Task</span>
                  <span>Target</span>
                  <span>Best room</span>
                  <span>Method</span>
                </div>
                <div v-for="task in firstTasks" :key="task.name" class="table-row first-task-row">
                  <RouterLink class="table-title task-link" :to="task.path">
                    <img :src="task.image" :alt="task.name" />
                    <strong>{{ task.name }}</strong>
                  </RouterLink>
                  <span>{{ task.target }}</span>
                  <span>{{ task.room }}</span>
                  <span>{{ task.method }}</span>
                </div>
              </div>
            </section>

            <section id="human-world" class="guide-block">
              <h2>How to enter the human world safely</h2>
              <p>
                The human world is the task zone: lawn, exterior walls, windows, drain pipe, and
                rooms such as kitchen, bathroom, bedroom, living room, and hallway. The front door
                does not open cleanly from outside, so new players should learn three entry methods.
              </p>
              <div class="entry-grid">
                <RouterLink v-for="entry in entryMethods" :key="entry.name" class="guide-card" :to="entry.path">
                  <h3>{{ entry.name }}</h3>
                  <p><strong>{{ entry.route }}</strong></p>
                  <p>{{ entry.method }}</p>
                  <p>{{ entry.risk }}</p>
                </RouterLink>
              </div>
            </section>

            <section id="doors-windows" class="guide-block">
              <h2>How to open doors, climb windows, and avoid getting stuck</h2>
              <p>
                Doors, windows, cabinets, drawers, ovens, and refrigerators are route tools, not
                background props. Many early runs fail because players never open the containers that
                actually hide task items, cigarettes, weapons, or useful small loot.
              </p>
              <div class="data-table">
                <div class="table-row table-head mechanic-row">
                  <span>Mechanic</span>
                  <span>What to do</span>
                  <span>Common failure</span>
                </div>
                <div class="table-row mechanic-row">
                  <strong>Door interaction</strong>
                  <span>Check normal interaction, then test Crowbar if the route is blocked.</span>
                  <span>Forcing a tool without knowing whether the door accepts it.</span>
                </div>
                <div class="table-row mechanic-row">
                  <strong>Window climb</strong>
                  <span>Right-click grab the frame, pull up, and keep the body centered before climbing through.</span>
                  <span>Jumping at an angle, carrying bulky loot, or hitting the weak-body bug.</span>
                </div>
                <div class="table-row mechanic-row">
                  <strong>Interior door setup</strong>
                  <span>Move a low chair or stool to the door, stand on it, and reach the handle from inside.</span>
                  <span>Trying to open human-scale doors from the floor with no height assist.</span>
                </div>
              </div>
              <div class="card-grid">
                <article v-for="item in interactions" :key="item.title" class="guide-card">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.detail }}</p>
                </article>
              </div>
            </section>

            <section id="death-revival" class="guide-block">
              <h2>Death and revival mechanics: crystal vs press E</h2>
              <p>
                Revival needs separate practice because players mix up three states: being grabbed,
                being downed and rescued by a teammate, and using the purple crystal. On the island,
                the crystal supports Steam friend invite flow. In the human world, the crystal is tied
                to reviving teammates and should be treated as a limited recovery resource.
              </p>
              <div class="card-grid">
                <article class="guide-card">
                  <h3>Press E rescue</h3>
                  <p>
                    If a prompt appears near a downed or held teammate, call the threat first, then
                    rescue. Do not start the revive while the human, cat, or large enemy still controls
                    the space.
                  </p>
                </article>
                <article class="guide-card">
                  <h3>Crystal revive</h3>
                  <p>
                    Treat purple crystal revives as limited. Current route notes track a three-use
                    run limit, so do not spend revives on greedy loot routes.
                  </p>
                </article>
                <article class="guide-card">
                  <h3>Clean-run rule</h3>
                  <p>
                    A route that depends on revival is not a safe beginner route. Use revival for recovery, not as the plan.
                  </p>
                </article>
              </div>
            </section>

            <section id="bug-fixes" class="guide-block">
              <h2>Muscle weakness bug, co-op lag, disconnects, and virtual memory setup</h2>
              <p>
                Full-release traffic can expose physics, network, and memory issues. Keep fixes direct:
                lower heavy graphics options, restart the lobby after severe desync, avoid testing
                movement gear during unstable sessions, and increase Windows virtual memory if crashes
                or memory errors appear during co-op.
              </p>
              <div class="data-table">
                <div class="table-row table-head fix-row">
                  <span>Problem</span>
                  <span>Fast fix</span>
                  <span>When to recheck</span>
                </div>
                <div class="table-row fix-row">
                  <strong>Weak-body / muscle weakness</strong>
                  <span>Stop movement spam, drop carried objects, avoid spring or ragdoll tools, then re-enter or restart the lobby if control stays broken.</span>
                  <span>After movement, physics, or multiplayer patches.</span>
                </div>
                <div class="table-row fix-row">
                  <strong>Co-op lag or desync</strong>
                  <span>Lower volumetric lighting and texture settings, reduce physics chaos, restart the lobby, and keep one host for testing.</span>
                  <span>After network updates or crowded release-day sessions.</span>
                </div>
                <div class="table-row fix-row">
                  <strong>Disconnects or memory crashes</strong>
                  <span>Close background apps and set a larger Windows virtual memory/page file before long co-op sessions.</span>
                  <span>After crashes, map loads, or repeated disconnects.</span>
                </div>
              </div>
            </section>

            <section id="settings" class="guide-block">
              <h2>Settings and controls worth checking before the first run</h2>
              <p>
                Burglin' Gnomes has enough physics, camera movement, voice coordination, and small
                object handling that setup matters. Do this before a co-op session, not after someone
                is already stuck under a table with a fork.
              </p>
              <div class="card-grid">
                <article v-for="item in interfaceNotes" :key="item.title" class="guide-card">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.detail }}</p>
                </article>
              </div>
            </section>

            <section id="room-order" class="guide-block">
              <h2>Recommended room order</h2>
              <p>
                Start with rooms that support small task objects. Bathrooms and kitchens are useful
                because they often contain interactable objects, light clutter, and task-friendly
                items. Deeper rooms and heavy valuables are safer after you know how to get back out.
              </p>
              <div class="note-panel">
                <p>
                  In co-op, one player should call the next objective while another watches the route.
                  Random splitting is fast for five seconds and slow for the rest of the run.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="checklist" class="route-section page-section">
    <div class="container">
      <div class="route-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Recommended opening</span>
          <h2>First clean-run checklist</h2>
        </div>
        <div class="data-table">
          <div v-for="(item, index) in route" :key="item" class="table-row route-row">
            <strong>{{ String(index + 1).padStart(2, '0') }}</strong>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="mistakes" class="mistakes-section page-section">
    <div class="container">
      <div class="mistakes-content page-content">
        <div class="section-heading">
          <span class="eyebrow">Common mistakes</span>
          <h2>What usually ruins early runs</h2>
        </div>
        <div class="card-grid">
          <article v-for="mistake in mistakes" :key="mistake.title" class="guide-card">
            <h3>{{ mistake.title }}</h3>
            <p>{{ mistake.fix }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import beginnerData from '../data/beginnerData'

const steps = beginnerData.find((section) => section.key === 'steps').items
const coreLoop = beginnerData.find((section) => section.key === 'coreLoop').items
const controls = beginnerData.find((section) => section.key === 'controls').items
const entryMethods = beginnerData.find((section) => section.key === 'entryMethods').items
const interactions = beginnerData.find((section) => section.key === 'interactions').items
const mistakes = beginnerData.find((section) => section.key === 'mistakes').items
const route = beginnerData.find((section) => section.key === 'route').items
const firstTasks = beginnerData.find((section) => section.key === 'firstTasks').items
const interfaceNotes = beginnerData.find((section) => section.key === 'interface').items
</script>

<style scoped>
.step-card b,
.route-row strong {
  color: var(--color-accent);
  font-weight: 900;
}

.route-row {
  grid-template-columns: 72px minmax(0, 1fr);
}

.first-task-row {
  grid-template-columns: 1.1fr 0.45fr 1fr 1.6fr;
}

.core-loop-row {
  grid-template-columns: 0.8fr 0.55fr 1.8fr;
}

.control-row {
  grid-template-columns: 0.7fr 1fr 1.7fr;
}

.mechanic-row,
.fix-row {
  grid-template-columns: 0.8fr 1.6fr 1.2fr;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.table-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.table-title img {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: cover;
}

.task-link {
  color: var(--color-accent);
  font-weight: 900;
  text-decoration: none;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.task-link:hover,
.task-link:focus-visible {
  color: var(--color-primary);
  outline: none;
}

@media (max-width: 1024px) {
  .entry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
