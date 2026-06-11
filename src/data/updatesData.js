export default [
  {
    key: 'releaseFacts',
    items: [
      { label: 'Release date', value: 'June 10, 2026', status: 'Confirmed' },
      { label: 'Store', value: 'Steam app 3844970', status: 'Confirmed' },
      { label: 'Supported platform', value: 'Windows PC', status: 'Confirmed' },
      { label: 'Player count', value: '1-6 players online co-op', status: 'Confirmed' },
      { label: 'Developer / publisher', value: 'Fobri', status: 'Confirmed' },
      { label: 'Core loop', value: 'Complete five listed tasks when possible, finish at least three, extract, bank loot, craft upgrades, repeat', status: 'Confirmed' },
    ],
  },
  {
    key: 'releasePreview',
    items: [
      {
        title: 'Full-release task loop',
        detail:
          'Each day gives a task list. Three completed tasks are the practical safety line before extraction; five tasks are the clean route goal when the house stays under control.',
        image: '/images/extracted/npc-gnome.png',
        status: 'Observed',
        type: 'Task routing',
        priority: 'High',
        target: 'Beginner task guide',
        path: '/beginner#first-tasks',
      },
      {
        title: 'House weapons and storage loot',
        detail:
          'Gun, Taser, Pepper Spray, Grenade, Rocket Launcher, Landmine, Firework, Chainsaw, utensils, and task items now need item pages linked to rooms and storage routes.',
        image: '/images/items/item-pepper-spray.png',
        status: 'Observed',
        type: 'Items',
        priority: 'High',
        target: 'Items database',
        path: '/items',
      },
      {
        title: 'Crafting stations and base objects',
        detail:
          'The Well, Potion Table, Repackager, crystal, bell, and storage all affect pre-run planning. Recipe pages should link back to materials, tools, and areas.',
        image: '/images/extracted/area-well.png',
        status: 'Observed',
        type: 'Crafting',
        priority: 'High',
        target: 'Crafting pages',
        path: '/crafting',
      },
      {
        title: 'NPCs, enemies, and outdoor animals',
        detail:
          'Human, Fairy, Cat, Rat, Cockroach, Evil Gnome, Vacuum Robot, Mole, Boar, Pitbull, Sealman, Seagull, Jonathan, and Bibi now have route pages or watch-list notes.',
        image: '/images/extracted/npc-human.png',
        status: 'Observed',
        type: 'Bestiary',
        priority: 'High',
        target: 'NPCs and enemies',
        path: '/bestiary',
      },
      {
        title: 'Outdoor entry and area pages',
        detail:
          'Vine windows, lawn paths, greenhouse and garden routes, garage/shed storage, weapon-safe checks, kitchen, bathroom, and cabinet pages now connect items to where they are found.',
        image: '/images/extracted/area-garden.png',
        status: 'Observed',
        type: 'Areas',
        priority: 'Medium',
        target: 'Area guide pages',
        path: '/areas/human-house',
      },
      {
        title: 'Co-op revive and performance checks',
        detail:
          'Crystal revival, teammate rescue, all-dead failure, lag, disconnects, and virtual memory fixes remain high-search beginner topics after launch.',
        image: '/images/extracted/area-crystal.png',
        status: 'Observed',
        type: 'Co-op',
        priority: 'Medium',
        target: 'Beginner fixes',
        path: '/beginner#death-revival',
      },
    ],
  },
  {
    key: 'patchChecklist',
    items: [
      'Daily task count, three-task extraction rule, all-dead fail behavior, and task completion triggers.',
      'Tutorial task sequence: Break TV, Climb Kitchen Counter, Clonk Tutorial, Open Cabinet, and Open Window.',
      'Backpack, Pickaxe, Metal Bat, Spring Shoes, Potion Table, Repackager, and Gnomium Gloves recipe costs.',
      'Metal Bat, Marble Gun, Blowgun, potion darts, and enemy response after combat patches.',
      'Cabinet and drawer loot behavior, including weapons, cigarettes, task items, and special ingredients.',
      'Potion duration, dart delivery, valid targets, and Repackager output count.',
      'Medical Terminal charges, CPR revive reliability, and all-dead fail behavior.',
      'Human, Cat, Rat, Cockroach, Evil Gnome, Vacuum Robot, Mole, Boar, Pitbull, Jonathan, Bibi, Sealman, and Seagull behavior.',
      'Vine window entry reliability across house variants and backup exits.',
      'Fire, flooded toilet, ragdoll, and other physics hazards after network patches.',
    ],
  },
  {
    key: 'patchRules',
    items: [
      { title: 'Tasks', detail: 'Task wording, valid objects, room hints, objective counts, and completion triggers are the first things to verify after patches.' },
      { title: 'Items', detail: 'Weapons, materials, potion ingredients, ammo, cigarettes, utensils, and special loot can change route value when storage pools shift.' },
      { title: 'Crafting', detail: 'Recipe costs, station unlocks, gear effects, potion output, and Repackager dart counts should match the current build before guides quote them.' },
      { title: 'NPCs and enemies', detail: 'Detection range, pursuit, grabs, rescue windows, hiding spots, and line of sight can invalidate old survival advice quickly.' },
      { title: 'Areas', detail: 'Vine windows, outdoor paths, kitchen cabinets, bathroom storage, garage/shed routes, weapon-safe routes, and extraction lines drive item discovery.' },
      { title: 'Co-op stability', detail: 'Object sync, ragdolls, teammate rescue, disconnects, lag, and virtual memory fixes affect whether a route works in a real squad.' },
    ],
  },
]
