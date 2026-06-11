import beginnerData from '../data/beginnerData.js'
import baseData from '../data/baseData.js'
import craftingData from '../data/craftingData.js'
import enemiesData from '../data/enemiesData.js'
import homeData from '../data/homeData.js'
import itemsData from '../data/itemsData.js'
import updatesData from '../data/updatesData.js'
import wikiData from '../data/wikiData.js'
import { routeSeo } from '../router/routeSeo.js'

function getSectionItems(data, key) {
  const section = data.find((entry) => entry.key === key)
  return section?.items ?? []
}

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

  getSectionItems(baseData, 'zones').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: entry.summary,
      path: '/base-building#zones',
      type: 'Base',
      image: entry.image,
      parts: [entry.type],
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

  getSectionItems(itemsData, 'items').forEach((item) => {
    addEntry(entries, {
      title: item.name,
      summary: joinParts(item.category, item.type, item.source === 'Unknown source' ? item.use : item.source),
      path: `/items/${item.slug}`,
      type: 'Item',
      image: item.image,
      parts: [item.use, item.advice, item.priority, item.status, sectionText(item.sections)],
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
      parts: [entry.behavior, entry.counter, entry.status, sectionText(entry.sections)],
    })
  })

  getSectionItems(wikiData, 'indexes').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.scope,
      path: entry.path,
      type: 'Wiki',
    })
  })

  getSectionItems(wikiData, 'deepIndexes').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: joinParts(entry.parent, entry.scope),
      path: entry.path,
      type: 'Wiki',
    })
  })

  getSectionItems(wikiData, 'labels').forEach((entry) => {
    addEntry(entries, {
      title: entry.label,
      summary: entry.meaning,
      path: '/wiki',
      type: 'Wiki',
    })
  })

  getSectionItems(wikiData, 'officialFacts').forEach((entry) => {
    addEntry(entries, {
      title: entry.fact,
      summary: entry.value,
      path: '/wiki',
      type: 'Wiki',
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

  getSectionItems(updatesData, 'releaseFacts').forEach((entry) => {
    addEntry(entries, {
      title: entry.label,
      summary: entry.value,
      path: '/updates#release-facts',
      type: 'Updates',
      parts: [entry.status],
    })
  })

  getSectionItems(updatesData, 'releasePreview').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.detail,
      path: entry.path,
      type: 'Updates',
      image: entry.image,
      parts: [entry.type, entry.priority, entry.status, entry.target],
    })
  })

  getSectionItems(updatesData, 'patchChecklist').forEach((item, index) => {
    addEntry(entries, {
      title: `Patch checklist ${index + 1}`,
      summary: item,
      path: '/updates#patch-checklist',
      type: 'Updates',
    })
  })

  getSectionItems(updatesData, 'patchRules').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.detail,
      path: '/updates#patch-rules',
      type: 'Updates',
    })
  })

  getSectionItems(homeData, 'quickLinks').forEach((entry) => {
    addEntry(entries, {
      title: entry.label,
      summary: entry.note,
      path: entry.path,
      type: 'Page',
    })
  })

  getSectionItems(homeData, 'runPlan').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.detail,
      path: '/beginner',
      type: 'Guide',
      parts: [entry.step],
    })
  })

  getSectionItems(homeData, 'searchIntent').forEach((entry) => {
    addEntry(entries, {
      title: entry.title,
      summary: entry.detail,
      path: '/',
      type: 'Guide',
    })
  })

  getSectionItems(homeData, 'priorityTable').forEach((entry) => {
    addEntry(entries, {
      title: entry.target,
      summary: joinParts(entry.room, entry.action),
      path: '/beginner#first-tasks',
      type: 'Guide',
      parts: [entry.status],
    })
  })

  getSectionItems(homeData, 'firstTasks').forEach((entry) => {
    addEntry(entries, {
      title: entry.task,
      summary: joinParts(entry.route, entry.note),
      path: '/beginner#first-tasks',
      type: 'Task',
      parts: [entry.target, entry.status],
    })
  })

  const toolPaths = {
    'Vine Window': '/beginner#human-world',
    Crowbar: '/items/crowbar',
    'Expanded Backpack': '/crafting/expanded-backpack',
    'Smoke Tool': '/items/smoke-tool',
    Cat: '/bestiary/cat',
    'Outdoor Map Leads': '/updates#release-preview',
  }

  getSectionItems(homeData, 'toolsToLearn').forEach((entry) => {
    addEntry(entries, {
      title: entry.name,
      summary: joinParts(entry.role, entry.note),
      path: toolPaths[entry.name] ?? '/',
      type: 'Guide',
      image: entry.image,
    })
  })

  getSectionItems(homeData, 'faq').forEach((entry) => {
    addEntry(entries, {
      title: entry.question,
      summary: entry.answer,
      path: '/beginner',
      type: 'FAQ',
    })
  })

  getSectionItems(homeData, 'facts').forEach((entry) => {
    addEntry(entries, {
      title: entry.label,
      summary: joinParts(entry.value, entry.note),
      path: '/',
      type: 'Page',
    })
  })

  return entries
}

let cachedIndex = null

export function getSearchIndex() {
  if (!cachedIndex) cachedIndex = buildSearchIndex()
  return cachedIndex
}

export function searchSite(query, limit = 60) {
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

      if (entry.type === 'Item' || entry.type === 'Recipe' || entry.type === 'Bestiary') score += 4

      return { ...entry, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}
