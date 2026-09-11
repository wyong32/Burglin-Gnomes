<template>
  <aside class="ad-placeholder" aria-label="Advertisement placeholder">
    <div class="ad-placeholder__slot">
      <span>Advertisement placeholder</span>
    </div>
  </aside>
</template>

<style scoped>
.ad-placeholder {
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

.ad-placeholder__slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 90px;
  margin: 0 auto;
  overflow: hidden;
  border: 2px dashed rgba(36, 51, 45, 0.24);
  border-radius: var(--radius-md);
  background: rgba(255, 248, 232, 0.55);
  color: var(--color-muted);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  max-width: 728px;
}

@media (max-width: 767px) {
  .ad-placeholder__slot {
    min-height: 250px;
    max-width: 300px;
  }
}
</style>
