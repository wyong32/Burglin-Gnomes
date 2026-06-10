<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer-content">
        <div class="footer-brand">
          <RouterLink class="footer-logo" to="/" aria-label="Burglin' Gnomes guide home">
            <span class="footer-mark" aria-hidden="true">BG</span>
            <span>
              <strong>Burglin' Gnomes Guide</strong>
              <small>burglin-gnomes.org</small>
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
const navigateLinks = [
  { label: 'Home', path: '/' },
  { label: 'Beginner', path: '/beginner/' },
  { label: 'Wiki', path: '/wiki/' },
  { label: 'Items', path: '/items/' },
  { label: 'Crafting', path: '/crafting/' },
  { label: 'NPCs & Enemies Bestiary', path: '/bestiary/' },
  { label: 'Updates', path: '/updates/' },
]

const legalLinks = [
  { label: 'Privacy Policy', path: '/legal/privacy-policy/' },
  { label: 'Terms of Service', path: '/legal/terms-of-service/' },
  { label: 'Copyright', path: '/legal/copyright/' },
  { label: 'About Us', path: '/legal/about-us/' },
  { label: 'Contact Us', path: '/legal/contact-us/' },
]
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
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 2px solid #f0e4c8;
  border-radius: 16px;
  background:
    linear-gradient(135deg, var(--color-primary), #3f8c63 58%, var(--color-accent));
  color: #fffaf0;
  font-weight: 900;
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
