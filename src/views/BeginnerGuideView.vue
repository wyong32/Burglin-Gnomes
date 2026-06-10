<template>
  <div class="beginner-page">
  <section class="beginner-section page-section">
    <div class="container">
      <div class="beginner-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Start here</span>
            <h1>Beginner Guide — First Tasks &amp; Safe Routes | Burglin' Gnomes</h1>
            <p>
              New player? Read the High-Gnome task list before you touch loot. Pick an entry you
              can escape from, clear safe objectives, learn revive rules, and fix co-op setup before
              you test weapons or heavy hauls.
            </p>
          </div>
          <figure class="hero-art">
            <img src="/images/steam-shot-1.jpg" alt="Burglin' Gnomes entry route screenshot" />
          </figure>
        </div>

        <div class="guide-layout">
          <aside class="guide-sidebar" aria-label="Beginner guide sections">
            <strong>On this page</strong>
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
                  <span>Guide note</span>
                </div>
                <div v-for="task in firstTasks" :key="task.name" class="table-row first-task-row">
                  <RouterLink class="table-title task-link" :to="task.path">
                    <img :src="task.image" :alt="task.name" />
                    <strong>{{ task.name }}</strong>
                  </RouterLink>
                  <span>{{ task.target }}</span>
                  <span>{{ task.room }}</span>
                  <span>{{ task.method }}</span>
                  <b :class="['status-pill', statusClass(task.status)]">{{ displayStatus(task.status) }}</b>
                </div>
              </div>
            </section>

            <section id="human-world" class="guide-block">
              <h2>How to enter the human world safely</h2>
              <p>
                Start in the gnome world, invite teammates if needed, then move toward a recognizable
                entry point. The vine-covered window is the cleanest early route because it acts
                as both entry marker and exit memory. Do not enter deep rooms until someone can call
                the way back.
              </p>
              <div class="media-band">
                <article class="guide-card">
                  <h3>Entry rule</h3>
                  <p>
                    Enter through a route the team can describe quickly: vine window, exterior path,
                    door tool route, or another visible landmark. If nobody can name the exit, the team
                    is not ready to haul loot.
                  </p>
                </article>
                <figure class="media-panel">
                  <img src="/images/vine-entry.jpg" alt="Burglin' Gnomes vine window entry" />
                </figure>
              </div>
            </section>

            <section id="doors-windows" class="guide-block">
              <h2>How to open doors, climb windows, and avoid getting stuck</h2>
              <p>
                Doors and windows are route tools, not background props. Use normal interaction first,
                then test Crowbar or other tools only when the route is blocked. For windows, line up
                the gnome body before jumping, keep hands free if the climb feels unreliable, and avoid
                dragging large objects through the frame.
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
                  <span>Face the opening, keep the body centered, and use the window as an exit marker.</span>
                  <span>Jumping at an angle while holding a bulky object.</span>
                </div>
                <div class="table-row mechanic-row">
                  <strong>Carry distance</strong>
                  <span>Use mouse wheel distance control when objects catch on frames or furniture.</span>
                  <span>Dragging the object harder instead of adjusting carry distance.</span>
                </div>
              </div>
            </section>

            <section id="death-revival" class="guide-block">
              <h2>Death and revival mechanics: crystal vs press E</h2>
              <p>
                Revival needs separate practice because players mix up three states: being grabbed,
                being downed and rescued by a teammate, and returning through a crystal or base
                revive. We are confirming crystal rules in the full release.
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
                    The purple crystal is visible in gnome world, but exact revive cost, cooldown,
                    and co-op rules still need more playtime in the live game.
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
import { displayStatus, statusClass } from '../utils/contentLabels'

const steps = beginnerData.find((section) => section.key === 'steps').items
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
  grid-template-columns: 1.1fr 0.45fr 1fr 1.6fr 130px;
}

.mechanic-row,
.fix-row {
  grid-template-columns: 0.8fr 1.6fr 1.2fr;
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
</style>
