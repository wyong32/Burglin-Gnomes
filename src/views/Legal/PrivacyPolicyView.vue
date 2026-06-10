<template>
  <section class="legal-section page-section">
    <div class="container">
      <div class="legal-content page-content">
        <div class="page-hero">
          <div class="page-hero-copy">
            <span class="eyebrow">Legal</span>
            <h1>Privacy Policy</h1>
            <p>
              This Privacy Policy explains how burglin-gnomes.org handles basic information when
              players read our Burglin Gnomes guides, wiki pages, item notes, crafting recipes, and
              bestiary entries.
            </p>
          </div>
        </div>

        <div class="guide-main legal-main">
          <section class="guide-block">
            <h2>Information we collect</h2>
            <p>
              burglin-gnomes.org is a static guide website. We do not ask visitors to create an
              account, submit gameplay data, or fill out forms. If analytics, hosting logs, or
              security logs are used by the hosting provider, they may record standard technical
              information such as page URL, browser type, device type, approximate region, referring
              page, and request time.
            </p>
            <p>
              If you contact us by email, we will receive the email address, message content, and
              any information you choose to include. Do not send private account credentials,
              payment information, or sensitive personal data.
            </p>
          </section>

          <section class="guide-block">
            <h2>How information is used</h2>
            <p>
              Technical information is used to keep the website available, understand which guide
              pages are useful, identify broken pages, and improve navigation for players. Email
              messages are used only to respond to questions, corrections, copyright concerns, or
              site feedback.
            </p>
            <p>
              We do not sell personal information. We do not use visitor information to create
              player profiles. We do not operate login accounts, payment systems, or user-submitted
              public profiles on this website.
            </p>
          </section>

          <section class="guide-block">
            <h2>Cookies and third-party services</h2>
            <p>
              The site may rely on normal hosting, browser caching, and security services. If a
              third-party analytics or hosting service is enabled, that service may use cookies or
              similar technology according to its own policy. The guide pages themselves are written
              to work without requiring an account or a player profile.
            </p>
          </section>

          <section class="guide-block">
            <h2>Contact</h2>
            <p>
              For privacy questions or data-related requests, contact us at
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
