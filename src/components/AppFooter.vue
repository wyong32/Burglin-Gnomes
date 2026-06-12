<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer-content">
        <div class="footer-brand">
          <RouterLink class="footer-logo" to="/" aria-label="Burglin' Gnomes guide home">
            <img class="footer-mark" src="/images/logo.webp" alt="" width="48" height="48" />
            <span>
              <strong>Burglin' Gnomes</strong>
            </span>
          </RouterLink>
          <p>
            Player-written routes, task calls, item notes, crafting priorities, enemy counters,
            and patch updates for Burglin' Gnomes — from burglin-gnomes.org.
          </p>
        </div>

        <div class="footer-nav" aria-label="Footer navigation">
          <nav aria-label="Footer primary navigation">
            <strong>Navigate</strong>
            <RouterLink v-for="link in navigateLinks" :key="link.path" :to="link.path">
              {{ link.label }}
            </RouterLink>
          </nav>
          <nav aria-label="Footer legal navigation">
            <strong>Legal</strong>
            <RouterLink v-for="link in legalLinks" :key="link.path" :to="link.path">
              {{ link.label }}
            </RouterLink>
          </nav>
        </div>
      </div>

      <div class="footer-bottom">
        <span>Copyright © 2026 burglin-gnomes.org. All rights reserved.</span>
        <span>Burglin' Gnomes names, images, and game content belong to their respective owners.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { legalNavLinks, primaryNavLinks } from '../data/navLinks.js'

const navigateLinks = primaryNavLinks
const legalLinks = legalNavLinks
</script>

<style scoped>
.app-footer {
  border-top: 2px solid var(--color-ink);
  background:
    linear-gradient(90deg, rgba(223, 91, 50, 0.16), transparent 42%),
    #23332d;
}

.app-footer-content {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(360px, 0.8fr);
  gap: 48px;
  padding: 42px 0 28px;
}

.footer-brand {
  display: grid;
  align-content: start;
  gap: 14px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
}

.footer-mark {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  border: 2px solid #f0e4c8;
  border-radius: 16px;
  object-fit: cover;
}

.footer-logo strong,
.footer-nav strong {
  display: block;
  color: #fffaf0;
  font-family: "Bricolage Grotesque", "Nunito", sans-serif;
}

.footer-logo strong {
  font-size: 1.28rem;
}

.footer-logo small {
  display: block;
  margin-top: 3px;
  color: #f0e4c8;
  font-weight: 900;
}

.app-footer p {
  max-width: 620px;
  color: #f0e4c8;
  font-weight: 800;
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.footer-nav nav {
  display: grid;
  align-content: start;
  gap: 9px;
  border: 2px solid rgba(240, 228, 200, 0.2);
  border-radius: 18px;
  padding: 16px;
  background: rgba(255, 250, 240, 0.05);
}

.footer-nav strong {
  margin-bottom: 4px;
  font-size: 1rem;
}

.footer-nav a {
  color: #f0e4c8;
  font-weight: 900;
}

.footer-nav a:hover,
.footer-nav a:focus-visible {
  color: #fffaf0;
  outline: none;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  border-top: 2px solid rgba(240, 228, 200, 0.18);
  padding: 18px 0 28px;
  color: #f0e4c8;
  font-size: 0.86rem;
  font-weight: 800;
}

@media (max-width: 1024px) {
  .app-footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .app-footer-content {
    grid-template-columns: 1fr;
    display: grid;
    gap: 26px;
  }

  .footer-nav {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    display: grid;
  }
}
</style>
