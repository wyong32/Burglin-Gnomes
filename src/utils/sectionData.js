export function getSectionItems(data, key) {
  const section = data.find((entry) => entry.key === key)
  return section?.items ?? []
}
