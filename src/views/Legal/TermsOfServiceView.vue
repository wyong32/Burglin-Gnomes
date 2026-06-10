<template>
  <section class="legal-section page-section">
    <div class="container">
      <div class="legal-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Legal</span>
            <h1>Terms of Service</h1>
            <p>
              These Terms of Service describe the basic rules for using burglin-gnomes.org, a
              player-focused Burglin Gnomes guide and wiki resource.
            </p>
          </div>
        </div>

        <div class="guide-main legal-main">
          <section class="guide-block">
            <h2>Use of the website</h2>
            <p>
              burglin-gnomes.org provides guide content, item notes, crafting information, bestiary
              entries, update checks, and beginner route advice for informational purposes. You may
              read and use the guides for personal gameplay, route planning, and general reference.
            </p>
            <p>
              You may not misuse the website by attempting to disrupt hosting, scrape pages in a way
              that harms availability, impersonate the site, remove attribution from copied content,
              or use the content in a misleading way.
            </p>
          </section>

          <section class="guide-block">
            <h2>Accuracy and patch changes</h2>
            <p>
              Burglin Gnomes mechanics may change after updates. We label pages with
              <strong>Verified</strong>, <strong>Seen in-game</strong>, <strong>Early notes</strong>,
              <strong>Still testing</strong>, and <strong>May change with patches</strong> so you
              can judge how reliable a tip is. Even with careful play, a route, item, recipe, or
              enemy behavior may become outdated after a patch.
            </p>
            <p>
              The content is provided without a guarantee that every mechanic, number, route, or
              recipe will always match the latest game version.
            </p>
          </section>

          <section class="guide-block">
            <h2>Intellectual property</h2>
            <p>
              The written guide content, page organization, and original site text on
              burglin-gnomes.org are protected by copyright. Burglin' Gnomes names, images, and
              game-related assets belong to their respective owners. This website is a guide resource
              and does not claim ownership of the game or official game materials.
            </p>
          </section>

          <section class="guide-block">
            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to
              <a href="mailto:wyong@burglin-gnomes.org">wyong@burglin-gnomes.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { setRouteSeo } from '../../utils/seo'

const routeMeta = useRoute()
setRouteSeo(routeMeta)
</script>

<style scoped>
.legal-main {
  max-width: 980px;
}
</style>
