const BRAND = "Burglin' Gnomes"

function cleanText(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
}

function trimMeta(text, max = 158) {
  const normalized = cleanText(text)
  if (!normalized) return ''
  if (normalized.length <= max) return normalized

  const slice = normalized.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > 48 ? slice.slice(0, lastSpace) : slice
  return `${cut.trim()}…`
}

function joinMeta(...parts) {
  return trimMeta(parts.map(cleanText).filter(Boolean).join(' '))
}

function titleCase(value) {
  return cleanText(value)
    .split(' ')
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ''))
    .join(' ')
}

function itemTitle(item) {
  const suffixByCategory = {
    Materials: 'Material Guide',
    Weapons: 'Weapon Guide',
    Tools: 'Tool Guide',
    Gear: 'Gear Guide',
    'Task Items': 'Task Item Guide',
    Potions: 'Potion Guide',
    Ammo: 'Ammo Guide',
  }

  const suffix = suffixByCategory[item.category] || titleCase(item.type) || 'Item Guide'
  return `${item.name} — ${suffix} | ${BRAND}`
}

function itemDescription(item) {
  const sourceHint =
    item.source && !item.source.startsWith('House-run loot:')
      ? item.source
      : item.advice || 'Check linked areas, recipes, and route notes from our runs.'

  if (item.category === 'Materials') {
    return joinMeta(`${item.name} material in ${BRAND}:`, item.use, sourceHint)
  }

  if (item.category === 'Potions' || item.category === 'Ammo') {
    return joinMeta(`${item.name}:`, item.use, item.advice)
  }

  if (item.category === 'Weapons' || item.category === 'Tools') {
    return joinMeta(`${item.name} for ${BRAND} runs:`, item.use, item.advice || sourceHint)
  }

  return joinMeta(`${item.name} in ${BRAND}:`, item.use, item.advice || sourceHint)
}

function itemKeywords(item) {
  const terms = [
    `${BRAND} ${item.name}`,
    item.name,
    item.category,
    item.type,
    item.priority,
  ]

  if (item.category === 'Materials') terms.push(`${item.name} material`, `${item.name} farming`)
  if (item.category === 'Weapons') terms.push(`${item.name} weapon`)
  if (item.category === 'Potions') terms.push(`${item.name} potion`, 'potion crafting')
  if (item.category === 'Ammo') terms.push(`${item.name} dart`, 'blowgun ammo')

  return [...new Set(terms.map(cleanText).filter(Boolean))].join(', ')
}

function recipeTitle(recipe) {
  const suffixByCategory = {
    Weapons: 'Weapon Recipe',
    Gear: 'Gear Recipe',
    Mobility: 'Mobility Recipe',
    Tools: 'Tool Recipe',
    'Base Upgrades': 'Base Upgrade Recipe',
    Potions: 'Potion Recipe',
    Furniture: 'Furniture Recipe',
    Unverified: 'Recipe',
  }

  const suffix = suffixByCategory[recipe.category] || 'Crafting Recipe'
  return `${recipe.name} — ${suffix} | ${BRAND}`
}

function recipeDescription(recipe) {
  const materials = recipe.materials?.map((material) => `${material.quantity} ${material.name}`).join(', ')
  const lead = materials ? `Craft ${recipe.name} with ${materials}.` : `Craft ${recipe.name} at the well.`

  return joinMeta(lead, recipe.effect, recipe.bestUse || recipe.mechanic)
}

function recipeKeywords(recipe) {
  const materialNames = recipe.materials?.map((material) => material.name).join(', ')
  return [
    `${BRAND} ${recipe.name} recipe`,
    `${recipe.name} crafting`,
    recipe.category,
    materialNames,
    recipe.outputItem,
  ]
    .map(cleanText)
    .filter(Boolean)
    .join(', ')
}

function areaTitle(area) {
  const typeLabel = area.type ? `${area.type} ` : ''
  return `${area.name} — ${typeLabel}Area Guide | ${BRAND}`
}

function areaDescription(area) {
  const taskHint = area.tasks?.length ? `Tasks here: ${area.tasks.slice(0, 2).join(', ')}.` : ''
  const dangerHint = area.dangers?.length ? area.dangers[0] : ''

  return joinMeta(area.summary, area.routeUse, taskHint, dangerHint)
}

function areaKeywords(area) {
  return [
    `${BRAND} ${area.name}`,
    `${area.name} guide`,
    `${area.name} items`,
    area.type,
    area.slug,
  ]
    .map(cleanText)
    .filter(Boolean)
    .join(', ')
}

function bestiaryTitle(entry) {
  if (entry.category === 'NPCs') {
    return `${entry.name} — NPC Guide | ${BRAND}`
  }

  if (entry.category === 'Humans') {
    return `${entry.name} — Survival Guide | ${BRAND}`
  }

  if (entry.category === 'Animals') {
    return `${entry.name} — Animal Threat Guide | ${BRAND}`
  }

  if (entry.category === 'Pests') {
    return `${entry.name} — Pest Guide | ${BRAND}`
  }

  if (entry.category === 'Hostile Gnomes') {
    return `${entry.name} — Enemy Guide | ${BRAND}`
  }

  if (entry.category === 'Hazards') {
    return `${entry.name} — Hazard Guide | ${BRAND}`
  }

  return `${entry.name} — ${entry.role || 'Threat Guide'} | ${BRAND}`
}

function bestiaryDescription(entry) {
  if (entry.category === 'NPCs' || entry.danger === 'None') {
    return joinMeta(`${entry.name} (${entry.role}) in ${BRAND}:`, entry.behavior, entry.counter)
  }

  if (entry.category === 'Hazards') {
    return joinMeta(`${entry.name} hazard (${entry.danger}):`, entry.behavior, entry.counter)
  }

  return joinMeta(
    `Survive ${entry.name} in ${BRAND} (${entry.danger} danger):`,
    entry.behavior,
    entry.counter,
  )
}

function bestiaryKeywords(entry) {
  const aliases = entry.aliases ?? []
  return [
    `${BRAND} ${entry.name}`,
    ...aliases.map((alias) => `${BRAND} ${alias}`),
    `${entry.name} counter`,
    entry.category,
    entry.role,
    entry.danger !== 'None' ? `${entry.name} danger` : '',
  ]
    .map(cleanText)
    .filter(Boolean)
    .join(', ')
}

export const displayStatus = (status) => {
  const labels = {
    Confirmed: 'Verified',
    Observed: 'Seen in-game',
    Inferred: 'Early notes',
    'Retest Required': 'Needs recheck',
    'Patch Sensitive': 'May change with patches',
    'Needs Testing': 'Still testing',
  }

  return labels[status] || status
}

export const statusClass = (status) => {
  if (['Confirmed', 'Verified', 'Observed', 'Seen in-game'].includes(status)) return 'confirmed'
  if (['Patch Sensitive', 'Retest Required', 'May change with patches', 'Needs recheck'].includes(status)) {
    return 'patch'
  }
  return ''
}

export const buildItemPageMeta = (item) => ({
  title: itemTitle(item),
  description: itemDescription(item),
  keywords: itemKeywords(item),
})

export const buildRecipePageMeta = (recipe) => ({
  title: recipeTitle(recipe),
  description: recipeDescription(recipe),
  keywords: recipeKeywords(recipe),
})

export const buildAreaPageMeta = (area) => ({
  title: areaTitle(area),
  description: areaDescription(area),
  keywords: areaKeywords(area),
})

export const buildBestiaryPageMeta = (entry) => ({
  title: bestiaryTitle(entry),
  description: bestiaryDescription(entry),
  keywords: bestiaryKeywords(entry),
})
