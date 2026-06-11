export default [
  {
    key: 'indexes',
    items: [
      { title: 'Beginner Guide', path: '/beginner', scope: 'First route, tasks, doors and windows, revive rules, and co-op fixes.' },
      { title: 'Tasks', path: '/beginner#first-tasks', scope: 'How High-Gnome jobs work and which rooms to hit first.' },
      { title: 'Items', path: '/items', scope: 'Loot, materials, weapons, tools, and what each item is for in a run.' },
      { title: 'Crafting', path: '/crafting', scope: 'Recipes, gear upgrades, and the craft order we use on co-op nights.' },
      { title: 'Base Building', path: '/base-building', scope: 'Gnome world, storage, purple crystal, bell extraction, and the crafting well.' },
      { title: 'Area Guides', path: '/wiki#area-guides', scope: 'Gnome world, human house rooms, outdoor routes, and where items or threats show up.' },
      { title: 'NPCs & Enemies Bestiary', path: '/bestiary', scope: 'Humans, cats, pests, grabs, hazards, and how we survive them.' },
      { title: 'Updates', path: '/updates', scope: 'Release facts and what we recheck after patches.' },
    ],
  },
  {
    key: 'deepIndexes',
    items: [
      { title: 'How to Enter the Human World', parent: 'Beginner Guide', scope: 'Gnome-world start, inviting friends, vine window entry, and exit discipline.', path: '/beginner#human-world' },
      { title: 'First Five Tasks', parent: 'Beginner', scope: 'Break TV, climb counter, hit practice, open cabinet, and open window routing.', path: '/beginner#first-tasks' },
      { title: 'Cabinet and Window Route', parent: 'Beginner', scope: 'Container checks, kitchen counter movement, window entry, and early exit control.', path: '/beginner#first-tasks' },
      { title: 'Kitchen Route', parent: 'Beginner', scope: 'Fork locations, counters, drawers, and timing around the human.', path: '/beginner#first-tasks' },
      { title: 'Route Tools', parent: 'Items', scope: 'Pickaxe, Eyeglass, Grappling Hook, and tools that change farming or movement routes.', path: '/items#items-tools' },
      { title: 'Weapons That Need Practice', parent: 'Items', scope: 'Metal Bat, Marble Gun, Blowgun, Boxing Gloves, and dart ammo before clean runs.', path: '/items#items-weapons' },
      { title: 'Crafting Materials', parent: 'Crafting', scope: 'Clonk, Basic Junk, Rag Strips, Plastic Blocks, and linked recipes.', path: '/crafting#materials' },
      { title: 'Gnome-World Base Objects', parent: 'Base Building', scope: 'Tree, mushroom house, storage, purple crystal, bell, and crafting well.', path: '/base-building#mushroom-house' },
      { title: 'Kitchen Route', parent: 'Areas', scope: 'Counters, drawers, utensils, and timing around the human.', path: '/areas/kitchen' },
      { title: 'Outdoor Lawn', parent: 'Areas', scope: 'Cat routes, Fairy trades, exterior carries, and extraction timing.', path: '/areas/outdoor-lawn' },
      { title: 'Surviving the Cat', parent: 'Bestiary', scope: 'Floor control, safe distance, and gear that buys space.', path: '/bestiary/cat' },
      { title: 'Surviving the Human', parent: 'Bestiary', scope: 'Line of sight, when to drop loot, and tools that create escape windows.', path: '/bestiary/human-homeowner' },
      { title: 'Vacuum Robot Hazard', parent: 'Bestiary', scope: 'Moving machine behavior, blocking risk, and route workarounds.', path: '/bestiary/vacuum-robot' },
      { title: 'Post-Patch Checklist', parent: 'Updates', scope: 'Outdoor routes, glider, ranged weapons, protective gear, and large humanoid grabs.', path: '/updates#patch-checklist' },
    ],
  },
  {
    key: 'labels',
    items: [
      { label: 'Verified', meaning: 'Matches Steam, developer posts, or behavior that has stayed stable across our sessions.' },
      { label: 'Seen in-game', meaning: 'Matches repeatable player sessions, but still needs more samples before it is treated as final.' },
      { label: 'Still testing', meaning: 'Useful tip, but we would not bet a clean run on it yet.' },
      { label: 'May change with patches', meaning: 'AI, items, tasks, or recipes can shift after an update — recheck before you route around it.' },
      { label: 'Early notes', meaning: 'Useful for routing, but not stable enough to treat as final after patches or balance changes.' },
    ],
  },
  {
    key: 'officialFacts',
    items: [
      { fact: 'Steam app id', value: '3844970' },
      { fact: 'Developer / publisher', value: 'Fobri (© Qubrion Ltd Oy)' },
      { fact: 'Genre tags', value: 'Co-op, Multiplayer, First-Person, Heist, Stealth, Loot, Crafting' },
      { fact: 'Core loop', value: 'Break in, steal, complete High-Gnome tasks, craft equipment, upgrade home, survive threats' },
      { fact: 'PC requirements', value: 'Windows 10, 4 GB RAM minimum, 7 GB storage' },
    ],
  },
]
