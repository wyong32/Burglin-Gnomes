<template>
  <div class="search-page">
    <section class="search-section page-section">
      <div class="container">
        <div class="search-content page-content">
          <div class="page-hero search-hero">
            <div class="page-hero-copy">
              <span class="eyebrow">Search</span>
              <h1>Search Burglin' Gnomes guides</h1>
              <p>Find items, recipes, enemies, beginner routes, wiki topics, and update notes across the full site.</p>
              <form class="search-form" role="search" @submit.prevent="runSearch">
                <label class="search-label" for="site-search-input">Search the guide</label>
                <div class="search-input-row">
                  <input
                    id="site-search-input"
                    v-model="inputQuery"
                    type="search"
                    name="q"
                    autocomplete="off"
                    placeholder="Try pickaxe, metal bat, cat, backpack..."
                  />
                  <button type="submit">Search</button>
                </div>
              </form>
            </div>
          </div>

          <section v-if="query" class="search-results-section" aria-label="Search results">
            <div class="section-heading">
              <span class="eyebrow">Results</span>
              <h2 v-if="results.length">{{ results.length }} matches for “{{ query }}”</h2>
              <h2 v-else>No matches for “{{ query }}”</h2>
              <p v-if="!results.length">
                Try a shorter keyword, an item name, enemy type, or crafting material from the task list.
              </p>
            </div>

            <div v-if="results.length" class="search-results">
              <RouterLink
                v-for="result in results"
                :key="result.id"
                class="search-result"
                :to="result.path"
              >
                <img v-if="result.image" :src="result.image" alt="" />
                <span v-else class="search-result-fallback" aria-hidden="true">{{ result.type.slice(0, 1) }}</span>
                <span class="search-result-copy">
                  <small>{{ result.type }}</small>
                  <h3>{{ result.title }}</h3>
                  <p>{{ result.summary }}</p>
                </span>
              </RouterLink>
            </div>
          </section>

          <section v-else class="search-hints">
            <div class="section-heading">
              <span class="eyebrow">Popular lookups</span>
              <h2>Start with a common search</h2>
            </div>
            <div class="hint-grid">
              <button v-for="hint in hints" :key="hint" type="button" @click="searchHint(hint)">{{ hint }}</button>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchSite } from '../utils/searchIndex'

const route = useRoute()
const router = useRouter()
const inputQuery = ref('')
const hints = ['pickaxe', 'metal bat', 'cat', 'backpack', 'human', 'gnomium gloves', 'health potion']

const query = computed(() => String(route.query.q ?? '').trim())
const results = computed(() => (query.value ? searchSite(query.value) : []))

watch(
  () => route.query.q,
  (value) => {
    inputQuery.value = String(value ?? '')
  },
  { immediate: true },
)

function runSearch() {
  const q = inputQuery.value.trim()
  router.push({ path: '/search', query: q ? { q } : {} })
}

function searchHint(hint) {
  inputQuery.value = hint
  runSearch()
}
</script>

<style scoped>
.search-hero {
  align-items: start;
}

.search-form {
  display: grid;
  gap: 8px;
  margin-top: 8px;
}

.search-label {
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

.search-input-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.search-input-row input {
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

.search-input-row input:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.search-input-row button,
.hint-grid button {
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

.search-input-row button:hover,
.search-input-row button:focus-visible,
.hint-grid button:hover,
.hint-grid button:focus-visible {
  background: var(--color-primary);
  outline: none;
  transform: translateY(-2px);
}

.search-results-section,
.search-hints {
  display: grid;
  gap: 18px;
}

.search-results {
  display: grid;
  gap: 12px;
}

.search-result {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  border: 2px solid var(--color-ink);
  border-radius: 18px;
  padding: 12px 14px;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition:
    background 180ms ease,
    transform 180ms ease;
}

.search-result:hover,
.search-result:focus-visible {
  background: var(--color-surface-strong);
  outline: none;
  transform: translateY(-2px);
}

.search-result img,
.search-result-fallback {
  width: 72px;
  height: 72px;
  border: 2px solid var(--color-ink);
  border-radius: 14px;
  object-fit: cover;
}

.search-result-fallback {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(255, 218, 193, 0.72), rgba(232, 246, 216, 0.7));
  color: var(--color-accent);
  font-size: 1.4rem;
  font-weight: 900;
}

.search-result-copy {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.search-result-copy small {
  color: var(--color-primary);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.search-result-copy h3 {
  font-size: 1.08rem;
  line-height: 1.15;
}

.search-result-copy p {
  color: var(--color-text);
  font-weight: 800;
  line-height: 1.4;
}

.hint-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hint-grid button {
  background: var(--color-panel-2);
  color: var(--color-ink);
}

@media (max-width: 768px) {
  .search-input-row {
    grid-template-columns: 1fr;
  }
}
</style>
