<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header-content">
        <RouterLink class="brand" to="/" aria-label="Burglin' Gnomes guide home">
          <img class="brand-mark" src="/images/logo.webp" alt="" width="42" height="42" />
          <span>
            <strong>Burglin' Gnomes</strong>
          </span>
        </RouterLink>

        <button type="button" :aria-expanded="isOpen" aria-label="Toggle navigation" @click="isOpen = !isOpen">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <nav class="nav-links" aria-label="Primary navigation">
          <RouterLink v-for="link in links" :key="link.path" :to="link.path" @click="isOpen = false">
            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const links = [
  { label: 'Home', path: '/' },
  { label: 'Beginner', path: '/beginner' },
  { label: 'Wiki', path: '/wiki' },
  { label: 'Items', path: '/items' },
  { label: 'Crafting', path: '/crafting' },
  { label: 'Base Building', path: '/base-building' },
  { label: 'NPCs & Enemies Bestiary', path: '/bestiary' },
  { label: 'Updates', path: '/updates' },
]
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
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
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
.nav-links a.router-link-active {
  border-color: var(--color-ink);
  background: var(--color-panel-2);
  color: var(--color-ink);
  outline: none;
  transform: translateY(-1px);
}

.nav-links a:nth-child(3n + 2).router-link-active,
.nav-links a:nth-child(3n + 2):hover,
.nav-links a:nth-child(3n + 2):focus-visible {
  background: var(--color-surface-strong);
}

.nav-links a:nth-child(3n).router-link-active,
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
