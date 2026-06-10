export default [
  {
    key: 'releaseFacts',
    items: [
      { label: 'Release date', value: 'June 10, 2026', status: 'Confirmed' },
      { label: 'Store', value: 'Steam app 3844970', status: 'Confirmed' },
      { label: 'Supported platform', value: 'Windows PC', status: 'Confirmed' },
      { label: 'Player count', value: '1-6 players online co-op', status: 'Confirmed' },
      { label: 'Developer / publisher', value: 'Fobri', status: 'Confirmed' },
      { label: 'Core loop', value: 'Break in, complete High-Gnome tasks, steal, craft, upgrade, survive', status: 'Confirmed' },
    ],
  },
  {
    key: 'releasePreview',
    items: [
      {
        title: 'New outdoor map routes',
        detail:
          'The full game adds exterior paths and vertical movement. Relearn extraction routes before you reuse demo habits.',
        image: '/images/new-map.jpg',
        status: 'Inferred',
        type: 'Map routes',
        priority: 'High',
        target: 'Wiki map guides',
        path: '/wiki/',
      },
      {
        title: 'Tall humanoid grabs',
        detail:
          'A large humanoid can hold a gnome. Practice grab range, escape timing, and rescue calls with your squad before clean runs.',
        image: '/images/new-map.jpg',
        status: 'Inferred',
        type: 'Bestiary',
        priority: 'High',
        target: 'Tall Humanoid page',
        path: '/bestiary/tall-humanoid/',
      },
      {
        title: 'Expanded gear set',
        detail:
          'Glider, ranged weapons, gloves, and protective gear are in the full release. We are logging recipes and route value as we play.',
        image: '/images/new-gear.jpg',
        status: 'Inferred',
        type: 'Items and crafting',
        priority: 'High',
        target: 'Items and crafting pages',
        path: '/items/',
      },
      {
        title: 'Smoke tool behavior',
        detail:
          'Smoke has an in-game prompt. Time the duration, line-of-sight effect, and whether threats still chase your teammates.',
        image: '/images/smoke-tool.jpg',
        status: 'Observed',
        type: 'Tools',
        priority: 'Medium',
        target: 'Smoke tool page',
        path: '/items/smoke-tool/',
      },
      {
        title: 'Gnome-world base objects',
        detail:
          'Mushroom houses, the wooden well, and purple crystal objects may tie into revival or home upgrades — we are mapping interactions now.',
        image: '/images/hero-gnome-world.jpg',
        status: 'Observed',
        type: 'Base building',
        priority: 'Medium',
        target: 'Base object guides',
        path: '/items/purple-crystal/',
      },
      {
        title: 'Door and entry tools',
        detail:
          'Crowbar and explosive tools can open new paths. Note which doors they work on in each house variant.',
        image: '/images/tool-crowbar.jpg',
        status: 'Observed',
        type: 'Route tools',
        priority: 'Medium',
        target: 'Crowbar and tool pages',
        path: '/items/crowbar/',
      },
    ],
  },
  {
    key: 'patchChecklist',
    items: [
      'Task wording, counts, accepted item types, and whether the first five tasks always appear together.',
      'Rag strip, fork, small junk, material, and tool spawn locations by room.',
      'Expanded Backpack cost and exact carry-capacity bonus.',
      'Slap Hammer damage, stun, material names, and object interactions.',
      'Crowbar-compatible doors, windows, and cabinets — and whether prying alerts the human.',
      'Smoke duration, visibility effect, enemy response, and co-op value.',
      'Electric gun hit count, stun time, range, cooldown, and human reactions.',
      'Human, cat, rat, cockroach, Evil Gnome, and tall humanoid detection and grab behavior.',
      'Vine window entry reliability across house variants and backup exits.',
      'Fire, flooded toilet, ragdoll, and other physics hazards after network patches.',
    ],
  },
  {
    key: 'patchRules',
    items: [
      { title: 'AI updates', detail: 'Recheck enemy range, pursuit, hiding, grabs, rescue windows, and line-of-sight behavior.' },
      { title: 'Task updates', detail: 'Recheck task wording, valid objects, room hints, objective counts, and completion triggers.' },
      { title: 'Item updates', detail: 'Recheck fork, rag strip, junk, material, and valuable-loot spawn locations.' },
      { title: 'Crafting updates', detail: 'Recheck recipes, material names, costs, gear effects, cooldowns, and craft order.' },
      { title: 'Map updates', detail: 'Recheck vine windows, outdoor paths, doors, bathrooms, kitchens, and safe exits.' },
      { title: 'Network updates', detail: 'Recheck co-op carrying, ragdolls, object sync, and rescue consistency.' },
    ],
  },
]
