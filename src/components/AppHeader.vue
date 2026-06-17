<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header-content">
        <a class="brand" href="/" aria-label="Burglin' Gnomes guide home">
          <img class="brand-mark" src="/images/logo.webp" alt="" width="42" height="42" />
          <span>
            <strong>Burglin' Gnomes</strong>
          </span>
        </a>

        <button type="button" :aria-expanded="isOpen" aria-label="Toggle navigation" @click="isOpen = !isOpen">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <nav class="nav-links" aria-label="Primary navigation">
          <a
            v-for="link in links"
            :key="link.path"
            :href="link.path"
            :class="{ 'is-active': isNavActive(link.path) }"
            @click="isOpen = false"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { primaryNavLinks } from '../data/navLinks.js'

const route = useRoute()
const isOpen = ref(false)
const links = primaryNavLinks

const isNavActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 10px;
  z-index: 30;
  background: transparent;
}

.app-header-content {
  position: relative;
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 8px 12px;
  background: rgba(255, 248, 232, 0.92);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(14px);
}

.app-header button {
  display: none;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 2px solid var(--color-ink);
  border-radius: 14px;
  background: var(--color-surface-strong);
  box-shadow: 3px 3px 0 rgba(36, 51, 45, 0.16);
  cursor: pointer;
}

.app-header button span {
  display: block;
  width: 22px;
  height: 3px;
  border-radius: 999px;
  background: var(--color-ink);
}

.app-header button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: max-content;
}

.brand-mark {
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border: 2px solid var(--color-ink);
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 3px 3px 0 rgba(36, 51, 45, 0.18);
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 1.02rem;
  color: var(--color-ink);
}

.brand small {
  margin-top: 2px;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 800;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 7px;
  overflow-x: auto;
}

.nav-links a {
  min-width: max-content;
  border: 2px solid transparent;
  border-radius: 999px;
  padding: 8px 11px;
  background: transparent;
  color: var(--color-ink);
  font-size: 0.84rem;
  font-weight: 900;
  transition:
    color 180ms ease,
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;
}

.nav-links a:hover,
.nav-links a:focus-visible,
.nav-links a.is-active {
  border-color: var(--color-ink);
  background: var(--color-panel-2);
  color: var(--color-ink);
  outline: none;
  transform: translateY(-1px);
}

.nav-links a:nth-child(3n + 2).is-active,
.nav-links a:nth-child(3n + 2):hover,
.nav-links a:nth-child(3n + 2):focus-visible {
  background: var(--color-surface-strong);
}

.nav-links a:nth-child(3n).is-active,
.nav-links a:nth-child(3n):hover,
.nav-links a:nth-child(3n):focus-visible {
  background: #f5d8c4;
}

@media (max-width: 1024px) {
  .app-header-content {
    min-height: 62px;
    align-items: center;
    gap: 14px;
    padding: 8px 10px;
  }

  .app-header button {
    display: grid;
    gap: 4px;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    left: 0;
    display: none;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
    overflow: visible;
    border: 2px solid var(--color-ink);
    border-radius: 18px;
    padding: 12px;
    background:
      linear-gradient(90deg, rgba(223, 91, 50, 0.1), transparent 34%),
      rgba(255, 248, 232, 0.98);
    box-shadow: 7px 8px 0 rgba(36, 51, 45, 0.16);
  }

  .app-header button[aria-expanded='true'] + .nav-links {
    display: grid;
  }

  .nav-links a {
    min-width: 0;
    border-color: rgba(36, 51, 45, 0.18);
    padding: 10px 11px;
    white-space: normal;
  }
}

@media (max-width: 768px) {
  .app-header {
    top: 6px;
  }

  .brand strong {
    font-size: 0.95rem;
  }

  .brand small {
    font-size: 0.68rem;
  }

  .brand-mark {
    width: 40px;
    height: 40px;
  }

  .nav-links {
    grid-template-columns: 1fr;
  }
}
</style>
