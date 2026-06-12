import beginnerData from '../data/beginnerData.js'
import areasData from '../data/areasData.js'
import baseData from '../data/baseData.js'
import craftingData from '../data/craftingData.js'
import enemiesData from '../data/enemiesData.js'
import itemsData from '../data/itemsData.js'
import { routeSeo } from '../router/routeSeo.js'
import { getSectionItems } from './sectionData.js'

function joinParts(...parts) {
  return parts.flat().filter(Boolean).join(' ')
}

function sectionText(sections) {
  return (sections ?? []).map((section) => `${section.heading} ${section.body}`).join(' ')
}

function addEntry(entries, { title, summary, path, type, image, parts = [] }) {
  entries.push({
    id: `${type}-${path}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    summary,
    path,
    type,
    image,
    text: joinParts(title, summary, type, parts),
  })
}

function buildSearchIndex() {
  const entries = []

  const staticPages = [
    { key: 'home', path: '/', type: 'Page' },
    { key: 'search', path: '/search', type: 'Page' },
    { key: 'wiki', path: '/wiki', type: 'Wiki' },
    { key: 'beginner', path: '/beginner', type: 'Guide' },
    { key: 'items', path: '/items', type: 'Items' },
    { key: 'crafting', path: '/crafting', type: 'Crafting' },
    { key: 'base-building', path: '/base-building', type: 'Guide' },
    { key: 'bestiary', path: '/bestiary', type: 'Bestiary' },
    { key: 'updates', path: '/updates', type: 'Updates' },
  ]

  staticPages.forEach(({ key, path, type }) => {
    const meta = routeSeo[key]
    if (!meta && key !== 'base-building') return
    addEntry(entries, {
      title: meta?.title ?? "Burglin' Gnomes Base Building Guide",
      summary:
        meta?.description ??
        'Gnome-world base guide for storage, purple crystal revival, bell extraction, crafting well upgrades, safe-zone objects, and pre-run setup.',
      path,
      type,
      parts: [meta?.keywords, 'base building gnome world storage crystal bell well'],
    })
  })

  const zoneAreaPaths = {
    'gnome-world': '/areas/gnome-world',
    'human-world': '/areas/human-house',
  }

  getSectionItems(baseData, 'zones').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: entry.summary,
      path: zoneAreaPaths[entry.id] ?? '/base-building#zones',
      type: 'Base',
      image: entry.image,
      parts: [entry.type, 'base building zone'],
    })
  })

  getSectionItems(baseData, 'checklist').forEach((item, index) => {
    addEntry(entries, {
      title: `Pre-run checklist ${index + 1}`,
      summary: item,
      path: '/base-building#pre-run-checklist',
      type: 'Base',
    })
  })

  getSectionItems(baseData, 'objects').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: entry.detail,
      path: '/base-building#base-objects',
      type: 'Base',
      image: entry.image,
      parts: [entry.role, entry.location, entry.tips],
    })
  })

  getSectionItems(areasData, 'areas').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: entry.summary,
      path: `/areas/${entry.slug}`,
      type: 'Area',
      image: entry.image,
      parts: [entry.type, entry.routeUse, entry.tasks, entry.dangers, sectionText(entry.sections)],
    })
  })

  getSectionItems(itemsData, 'items').forEach((item) => {
    addEntry(entries, {
      title: item.name,
      summary: joinParts(item.category, item.type, item.source === 'Unknown source' ? item.use : item.source),
      path: `/items/${item.slug}`,
      type: 'Item',
      image: item.image,
      parts: [item.use, item.advice, item.priority, item.status, item.areas, item.stats, item.acquisition, sectionText(item.sections)],
    })
  })

  getSectionItems(craftingData, 'craftOrder').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: joinParts(entry.reason, entry.timing),
      path: entry.recipe ? `/crafting/${entry.recipe}` : '/crafting',
      type: 'Recipe',
      parts: [entry.rank],
    })
  })

  getSectionItems(craftingData, 'materials').forEach((material) => {
    addEntry(entries, {
      title: material.name,
      summary: joinParts(material.role, material.source, material.note),
      path: material.item ? `/items/${material.item}` : '/crafting#materials',
      type: 'Crafting',
      image: material.image,
      parts: [material.status],
    })
  })

  getSectionItems(craftingData, 'recipes').forEach((recipe) => {
    addEntry(entries, {
      title: recipe.name,
      summary: joinParts(recipe.category, recipe.effect),
      path: `/crafting/${recipe.slug}`,
      type: 'Recipe',
      image: recipe.image,
      parts: [
        recipe.priority,
        recipe.bestUse,
        recipe.status,
        recipe.materials?.map((material) => material.name).join(' '),
        sectionText(recipe.sections),
      ],
    })
  })

  getSectionItems(enemiesData, 'entries').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: joinParts(entry.category, entry.role, `Danger: ${entry.danger}`),
      path: `/bestiary/${entry.slug}`,
      type: 'Bestiary',
      image: entry.image,
      parts: [
        entry.aliases,
        entry.location,
        entry.behavior,
        entry.counter,
        entry.attacks,
        entry.counters,
        entry.status,
        sectionText(entry.sections),
      ],
    })

    ;(entry.aliases ?? []).forEach((alias) => {
      addEntry(entries, {
        title: alias,
        summary: joinParts(entry.name, entry.category, entry.role),
        path: `/bestiary/${entry.slug}`,
        type: 'Bestiary',
        image: entry.image,
        parts: [entry.behavior, entry.counter],
      })
    })
  })

  getSectionItems(beginnerData, 'coreLoop').forEach((entry) => {
    addEntry(entries, {
      title: entry.label,
      summary: joinParts(entry.value, entry.detail),
      path: '/beginner#core-loop',
      type: 'Guide',
      parts: [entry.status],
    })
  })

  getSectionItems(beginnerData, 'controls').forEach((entry) => {
    addEntry(entries, {
      title: entry.action,
      summary: entry.use,
      path: '/beginner#controls',
      type: 'Guide',
      parts: [entry.input],
    })
  })

  getSectionItems(beginnerData, 'entryMethods').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: joinParts(entry.method, entry.risk),
      path: entry.path ?? '/beginner#human-world',
      type: 'Guide',
      parts: [entry.route],
    })
  })

  getSectionItems(beginnerData, 'interactions').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.detail,
      path: '/beginner#doors-windows',
      type: 'Guide',
    })
  })

  getSectionItems(beginnerData, 'taskGroups').forEach((entry) => {
    addEntry(entries, {
      title: entry.group,
      summary: joinParts(entry.pick, entry.note),
      path: '/beginner#first-tasks',
      type: 'Task',
      parts: [entry.tasks],
    })
  })

  getSectionItems(beginnerData, 'difficultySchedule').forEach((entry) => {
    addEntry(entries, {
      title: entry.day,
      summary: joinParts(entry.roll, entry.advice),
      path: '/beginner#first-route',
      type: 'Guide',
    })
  })

  getSectionItems(beginnerData, 'forbiddenCombos').forEach((combo) => {
    addEntry(entries, {
      title: 'Forbidden task combo',
      summary: combo,
      path: '/beginner#mistakes',
      type: 'Guide',
    })
  })

  getSectionItems(beginnerData, 'steps').forEach((step) => {
    addEntry(entries, {
      title: step.title,
      summary: step.detail,
      path: '/beginner',
      type: 'Guide',
      image: step.image,
      parts: [step.order],
    })
  })

  getSectionItems(beginnerData, 'firstTasks').forEach((task) => {
    addEntry(entries, {
      title: task.name,
      summary: joinParts(task.room, task.method),
      path: task.path,
      type: 'Task',
      image: task.image,
      parts: [task.target, task.status],
    })
  })

  getSectionItems(beginnerData, 'route').forEach((step, index) => {
    addEntry(entries, {
      title: `Beginner route step ${index + 1}`,
      summary: step,
      path: '/beginner#checklist',
      type: 'Guide',
    })
  })

  getSectionItems(beginnerData, 'interface').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.detail,
      path: '/beginner#settings',
      type: 'Guide',
    })
  })

  getSectionItems(beginnerData, 'mistakes').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.fix,
      path: '/beginner#mistakes',
      type: 'Guide',
    })
  })

  return entries
}

let cachedIndex = null

function getSearchIndex() {
  if (!cachedIndex) cachedIndex = buildSearchIndex()
  return cachedIndex
}

export function searchSite(query, limit = 80) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  const tokens = normalized.split(/\s+/).filter(Boolean)
  const index = getSearchIndex()

  return index
    .map((entry) => {
      const title = entry.title.toLowerCase()
      const text = entry.text.toLowerCase()
      let score = 0

      if (title === normalized) score += 200
      else if (title.includes(normalized)) score += 120

      tokens.forEach((token) => {
        if (title.includes(token)) score += 24
        if (text.includes(token)) score += 6
      })

      if (['Item', 'Recipe', 'Bestiary', 'Area'].includes(entry.type)) score += 4

      return { ...entry, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}
