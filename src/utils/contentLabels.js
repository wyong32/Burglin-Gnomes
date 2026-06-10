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
  title: `${item.name} — Where to Find & How to Use | Burglin' Gnomes`,
  description: `How to get ${item.name} in Burglin' Gnomes: ${item.source.toLowerCase()}, best uses for ${item.category.toLowerCase()}, and linked crafting pages from our playtesting notes.`,
  keywords: `Burglin Gnomes ${item.name}, ${item.name} location, ${item.category}`,
})

export const buildRecipePageMeta = (recipe) => ({
  title: `${recipe.name} Recipe — Materials & Crafting | Burglin' Gnomes`,
  description: `Craft ${recipe.name} in Burglin' Gnomes. Materials, what the gear does in a run, and when we craft it first based on our co-op routes.`,
  keywords: `Burglin Gnomes ${recipe.name} recipe, ${recipe.name} crafting`,
})

export const buildBestiaryPageMeta = (entry) => ({
  title: `${entry.name} — How to Survive | Burglin' Gnomes`,
  description: `Fight or avoid ${entry.name} in Burglin' Gnomes: danger level, behavior we have seen, survival tips, and gear that helps on co-op runs.`,
  keywords: `Burglin Gnomes ${entry.name}, ${entry.name} counter`,
})
