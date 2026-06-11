export default [
  {
    key: 'facts',
    items: [
      { label: 'Current build', value: 'Full release', note: 'Steam launch: June 10, 2026' },
      { label: 'Platform', value: 'PC / Steam', note: 'Windows only on the store page' },
      { label: 'Party size', value: '1-6 players', note: 'Solo or online co-op squad' },
      { label: 'Win condition', value: '3+ tasks', note: 'Finish at least three before extraction' },
      { label: 'Developer', value: 'Fobri', note: 'Online co-op action-adventure' },
    ],
  },
  {
    key: 'quickLinks',
    items: [
      { label: 'Beginner', path: '/beginner', note: 'First route, tasks, doors and windows, revive rules, and co-op fixes.' },
      { label: 'Wiki', path: '/wiki', note: 'Every guide topic in one index when you need a fast answer mid-run.' },
      { label: 'Items & Loot', path: '/items', note: 'Materials, weapons, tools, task items, potions, ammo, and where to find them.' },
      { label: 'Crafting', path: '/crafting', note: 'Well recipes, Potion Table recipes, Repackager darts, and linked materials.' },
      { label: 'Base Building', path: '/base-building', note: 'Gnome-world objects, storage, crystal revival, bell extraction, and the crafting well.' },
      { label: 'NPCs & Enemies', path: '/bestiary', note: 'Humans, Fairy, Cat, Rat, Cockroach, Evil Gnome, Roomba, and outdoor entities.' },
      { label: 'Updates', path: '/updates', note: 'Full-release notes and what to recheck after patches land.' },
    ],
  },
  {
    key: 'runPlan',
    items: [
      { step: '01', title: 'Read the High-Gnome task list', detail: 'The day is built around five tasks. Finish at least three before calling extraction.' },
      { step: '02', title: 'Enter through a reliable route', detail: 'Use vine windows or pipe-style entries first; the front door is not your beginner plan.' },
      { step: '03', title: 'Clear small objectives first', detail: 'Open cabinet, open window, climb, break, and small-object tasks are safer than greedy hauling.' },
      { step: '04', title: 'Search storage with intent', detail: 'Drawers, cabinets, bathroom storage, and kitchen routes are where weapons, cigarettes, utensils, and materials start paying off.' },
      { step: '05', title: 'Upgrade for fewer rescues', detail: 'Backpack, Pickaxe, Metal Bat, Spring Shoes, Potion Table, and Gnomium Gloves reduce repeated exposure.' },
    ],
  },
  {
    key: 'searchIntent',
    items: [
      { title: "What is Burglin' Gnomes?", detail: 'A first-person online co-op heist game where tiny gnomes break into human homes, complete High-Gnome jobs, steal loot, craft gear, and survive cats, humans, and household chaos.' },
      { title: 'How do tasks work?', detail: 'The High-Gnome gives job objectives. Finish enough of them or the run can fail even if your backpack looks profitable.' },
      { title: 'What should I craft first?', detail: 'Backpack, Pickaxe, Metal Bat, Spring Shoes, Potion Table, Repackager, and Gnomium Gloves are the core early upgrades to compare.' },
      { title: 'What can kill a run?', detail: 'Humans, cats, rats, cockroaches, Evil Gnomes, Roomba traps, heavy loot, bad exits, lag, and all-dead failure are the main risks.' },
    ],
  },
  {
    key: 'priorityTable',
    items: [
      { target: 'Task sheet', room: 'Spawn / start area', action: 'Read before looting', status: 'Confirmed' },
      { target: 'Small household items', room: 'Bathroom, kitchen, clutter rooms', action: 'Use for early objectives', status: 'Confirmed' },
      { target: 'Crafting materials', room: 'Loot path', action: 'Bank Metal, Fabric, Plastic, Ceramics, Chemicals, and Gnomium', status: 'Confirmed' },
      { target: 'Backpack', room: 'Crafting station', action: 'Prioritize carry capacity', status: 'Confirmed' },
      { target: 'Revive and extraction', room: 'Crystal, bell, or teammate rescue line', action: 'Know the rescue plan before fighting', status: 'Patch Sensitive' },
    ],
  },
  {
    key: 'firstTasks',
    items: [
      { task: 'Break TV', target: '1', route: 'Living room or TV room', note: 'Learn object breaking before the house gets loud.', status: 'Observed' },
      { task: 'Climb Kitchen Counter', target: '1', route: 'Kitchen', note: 'Practice vertical movement before harder window routes.', status: 'Observed' },
      { task: 'Clonk Tutorial', target: '1', route: 'Tutorial route', note: 'Learn hit timing before using weapons in a live run.', status: 'Observed' },
      { task: 'Open Cabinet', target: '1', route: 'Kitchen, bathroom, storage rooms', note: 'Open containers before calling a room empty.', status: 'Observed' },
      { task: 'Open Window', target: '1', route: 'Exterior wall or room window', note: 'This is the safest early entry and exit skill.', status: 'Observed' },
    ],
  },
  {
    key: 'toolsToLearn',
    items: [
      { name: 'Vine Window', role: 'Entry route', image: '/images/extracted/area-garden.png', note: 'Our favorite early landmark for getting in and getting out.' },
      { name: 'Backpack', role: 'Carry gear', image: '/images/items/item-backpack.png', note: 'Usually our first craft because fewer trips mean fewer deaths.' },
      { name: 'Pickaxe', role: 'Resource tool', image: '/images/items/item-pickaxe.png', note: 'Break suitable objects into resources when hauling is too slow.' },
      { name: 'Metal Bat', role: 'Basic weapon', image: '/images/items/item-metal-bat.png', note: 'The early craft we trust for pests and emergency space.' },
      { name: 'Potion Table', role: 'Potion station', image: '/images/extracted/area-tools-board.png', note: 'Unlocks the potion routes that later feed Blowgun darts.' },
      { name: 'Cat', role: 'Major threat', image: '/images/extracted/npc-cat.png', note: 'Give outdoor floor space a wide berth until you know its route.' },
      { name: 'Outdoor Areas', role: 'Area routes', image: '/images/extracted/area-garden.png', note: 'Vine windows, Fairy trades, garden tasks, and animal threats all start outside.' },
    ],
  },
  {
    key: 'faq',
    items: [
      { question: "Is Burglin' Gnomes co-op?", answer: 'Yes. Steam lists online co-op for up to six players, including solo play with friends.' },
      { question: "When did Burglin' Gnomes release?", answer: 'The Steam release date is June 10, 2026. We update guides as the live game changes.' },
      { question: 'Is Burglin Gnomes on console or mobile?', answer: 'Steam currently lists Windows PC only. We have not seen official console or mobile versions announced.' },
      { question: 'What should new players do first?', answer: 'Read the task list, enter through a forgiving route like a vine window, finish three small tasks, then loot only when extraction is already safe.' },
    ],
  },
]
