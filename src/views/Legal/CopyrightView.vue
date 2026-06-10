<template>
  <section class="legal-section page-section">
    <div class="container">
      <div class="legal-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Legal</span>
            <h1>Copyright</h1>
            <p>
              This page explains how copyright, attribution, and takedown requests are handled for
              burglin-gnomes.org.
            </p>
          </div>
        </div>

        <div class="guide-main legal-main">
          <section class="guide-block">
            <h2>Site content</h2>
            <p>
              Original written content, page structure, guide explanations, tables, route notes, and
              editorial organization on burglin-gnomes.org are protected by copyright. You may link
              to our pages, quote short excerpts with attribution, and use the information for
              personal gameplay reference.
            </p>
            <p>
              Republishing full pages, copying the site structure at scale, or presenting our guide
              text as your own is not permitted without written permission.
            </p>
          </section>

          <section class="guide-block">
            <h2>Game names and assets</h2>
            <p>
              Burglin' Gnomes names, screenshots, visual assets, game concepts, and related game
              materials belong to their respective owners. Any game-related imagery or references
              are used to identify the game and help players understand guide topics.
            </p>
            <p>
              This website is not an official game website. It is a fan-oriented guide and reference
              resource for players.
            </p>
          </section>

          <section class="guide-block">
            <h2>Copyright requests</h2>
            <p>
              If you believe content on this website infringes your rights, contact us with the page
              URL, a clear description of the material, proof that you own or represent the rights,
              and the action you are requesting.
            </p>
            <p>
              Copyright concerns can be sent to
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
