export default [
  {
    key: 'indexes',
    items: [
      { title: 'Beginner Guide', path: '/beginner', scope: 'First route, tasks, doors and windows, revive rules, and co-op fixes.' },
      { title: 'Tasks', path: '/beginner#first-tasks', scope: 'How High-Gnome jobs work and which rooms to hit first.' },
      { title: 'Items', path: '/items', scope: 'Loot, materials, weapons, tools, and what each item is for in a run.' },
      { title: 'Crafting', path: '/crafting', scope: 'Recipes, gear upgrades, and the craft order we use on co-op nights.' },
      { title: 'NPCs & Enemies Bestiary', path: '/bestiary', scope: 'Humans, cats, pests, grabs, hazards, and how we survive them.' },
      { title: 'Updates', path: '/updates', scope: 'Release facts and what we recheck after patches.' },
    ],
  },
  {
    key: 'deepIndexes',
    items: [
      { title: 'How to Enter the Human World', parent: 'Beginner Guide', scope: 'Gnome-world start, inviting friends, vine window entry, and exit discipline.', path: '/beginner#human-world' },
      { title: 'First Five Tasks', parent: 'Beginner', scope: 'Rag strips, break items, cockroach, toilet flush, and fork routing.', path: '/beginner#first-tasks' },
      { title: 'Bathroom Route', parent: 'Beginner', scope: 'Toilet flush, rag strips, cheap break objects, and early clutter control.', path: '/beginner#first-tasks' },
      { title: 'Kitchen Route', parent: 'Beginner', scope: 'Fork locations, counters, drawers, and timing around the human.', path: '/beginner#first-tasks' },
      { title: 'Route Tools', parent: 'Items', scope: 'Crowbar, smoke, and other tools that change entries or exits.', path: '/items#items-tools' },
      { title: 'Weapons That Need Practice', parent: 'Items', scope: 'Slap Hammer, Electric Gun, Handgun, Grenade — what we test before trusting in a clean run.', path: '/items#items-weapons' },
      { title: 'Crafting Materials', parent: 'Crafting', scope: 'Clonk, Basic Junk, Rag Strips, Plastic Blocks, and linked recipes.', path: '/crafting#materials' },
      { title: 'Gnome-World Base Objects', parent: 'Items', scope: 'Wooden well, purple crystal, and other home upgrade objects.', path: '/items#items-base-objects' },
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
      { label: 'Seen in-game', meaning: 'We watched or did this ourselves in the demo or full release.' },
      { label: 'Still testing', meaning: 'Useful tip, but we would not bet a clean run on it yet.' },
      { label: 'May change with patches', meaning: 'AI, items, tasks, or recipes can shift after an update — recheck before you route around it.' },
      { label: 'Early notes', meaning: 'Based on footage and first play sessions; we are confirming details in the live game.' },
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
