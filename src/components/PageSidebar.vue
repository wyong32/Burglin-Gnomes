<template>
  <aside class="page-sidebar" :aria-label="ariaLabel">
    <p class="page-sidebar__label">{{ label }}</p>
    <p v-if="title" class="page-sidebar__title">{{ title }}</p>

    <nav class="page-sidebar__nav">
      <component
        :is="linkComponent(section)"
        v-for="section in sections"
        :key="section.id"
        :to="section.to"
        :href="section.href"
        class="page-sidebar__link"
        :class="{ 'is-active': isActive(section) }"
      >
        <span class="page-sidebar__text">{{ section.label }}</span>
        <span v-if="section.count != null" class="page-sidebar__count">{{ section.count }}</span>
      </component>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSectionSpy } from '../composables/useSectionSpy'

const props = defineProps({
  label: {
    type: String,
    default: 'On this page',
  },
  title: {
    type: String,
    default: '',
  },
  sections: {
    type: Array,
    default: () => [],
  },
  ariaLabel: {
    type: String,
    default: 'Page sections',
  },
  activeId: {
    type: String,
    default: '',
  },
})

const hashSectionIds = computed(() =>
  props.sections.filter((section) => section.href?.startsWith('#')).map((section) => section.id),
)

const { activeId: spyActiveId } = useSectionSpy(hashSectionIds)

const resolvedActiveId = computed(() => props.activeId || spyActiveId.value)

const linkComponent = (section) => (section.to ? RouterLink : 'a')

const isActive = (section) => {
  if (section.to) return false
  return resolvedActiveId.value === section.id
}
</script>
