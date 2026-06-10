export default [
  {
    key: 'steps',
    items: [
      {
        order: '01',
        title: 'Read the High-Gnome task list before touching loot',
        detail:
          'The first visible task set includes rag strips, broken objects, a cockroach, a toilet flush, and a fork. That means bathroom and kitchen routing matters more than random valuables.',
        image: '/images/task-list.jpg',
      },
      {
        order: '02',
        title: 'Leave the gnome world through a planned entry',
        detail:
          'The safest early entry is the vine-covered window. Treat it as both the way in and the mental marker for how to leave when threats move badly.',
        image: '/images/vine-entry.jpg',
      },
      {
        order: '03',
        title: 'Clear bathroom tasks before heavy hauling',
        detail:
          'The toilet objective needs a small object, not a trophy haul. Bring something disposable, flush it, then continue with rag strips and break tasks.',
        image: '/images/steam-shot-3.jpg',
      },
      {
        order: '04',
        title: 'Sweep kitchen and dining surfaces for the fork',
        detail:
          'Fork objectives pull you toward counters, dining tables, drawers, and utensil areas. Do this before the route gets noisy or blocked.',
        image: '/images/steam-shot-4.jpg',
      },
      {
        order: '05',
        title: 'Use mouse wheel distance control when carrying objects',
        detail:
          'Held-object distance changes how safely you move through clutter and doorways. If a small object keeps catching on geometry, adjust the carry distance instead of forcing it.',
        image: '/images/steam-shot-1.jpg',
      },
      {
        order: '06',
        title: 'Save enemy testing for throwaway runs',
        detail:
          'Human hits, cat pull range, rat health, and tool stun values are too risky to test during progression. Mark the route, leave, then test mechanics deliberately.',
        image: '/images/threat-cat.jpg',
      },
    ],
  },
  {
    key: 'route',
    items: [
      'Check the task list immediately and call every required object out loud.',
      'Use the vine window or another exterior entry that you can recognize under pressure.',
      'Finish bathroom objectives first when the list includes rag strips, toilet flush, or break tasks.',
      'Move to the kitchen only after one player knows the exit and one player watches threat movement.',
      'Take the fork and other small task objects before hauling valuables.',
      'Return to gnome-world crafting only after the first objective cluster is solved or the route becomes unsafe.',
    ],
  },
  {
    key: 'firstTasks',
    items: [
      {
        name: 'Collect Rag Strips',
        target: '5',
        room: 'Bathroom, cloth piles, low clutter',
        method:
          'Search soft clutter first. Do not carry bulky loot while checking for small cloth pieces.',
        image: '/images/task-list.jpg',
        status: 'Observed',
        path: '/items/rag-strip/',
      },
      {
        name: 'Break Any Items',
        target: '4',
        room: 'Bathroom, kitchen, cheap clutter rooms',
        method:
          'Use disposable objects. Avoid breaking task objects until the list is complete.',
        image: '/images/steam-shot-3.jpg',
        status: 'Observed',
        path: '/items/small-junk-item/',
      },
      {
        name: 'Stab a Cockroach',
        target: '1',
        room: 'Pest spawn rooms',
        method:
          'Clear floor clutter, isolate the target, then leave once the objective registers.',
        image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=CR',
        status: 'Observed',
        path: '/bestiary/cockroach/',
      },
      {
        name: 'Flush an Item in the Toilet',
        target: '1',
        room: 'Bathroom',
        method:
          'Bring a small junk object. Large objects waste time and can block movement near the toilet.',
        image: '/images/task-list.jpg',
        status: 'Observed',
        path: '/items/small-junk-item/',
      },
      {
        name: 'Steal a Fork',
        target: '1',
        room: 'Kitchen or dining area',
        method:
          'Check counters, tables, drawers, and utensil surfaces before chasing valuables.',
        image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=FK',
        status: 'Observed',
        path: '/items/fork/',
      },
    ],
  },
  {
    key: 'interface',
    items: [
      {
        title: 'Main menu flow',
        detail:
          'Create Game, Tutorial, Join Game, Settings, and Quit are visible entry points. New players should run Tutorial once before co-op routing.',
      },
      {
        title: 'Co-op readiness',
        detail:
          'The gnome world supports friend invite flow. Assign one task caller before entering the human world.',
      },
      {
        title: 'Comfort settings',
        detail:
          'Voice chat, invert mouse Y, 3D sickness mode, camera smoothing, FPS cap, VSync, volumetric lighting, and texture resolution are relevant before a long session.',
      },
      {
        title: 'Carry control',
        detail:
          'Mouse wheel carry-distance adjustment is an actual routing tool. Use it for doors, toilets, small clutter, and tight window entries.',
      },
    ],
  },
  {
    key: 'mistakes',
    items: [
      {
        title: 'Looting before reading tasks',
        fix: 'Read the High-Gnome list first; task verbs decide the correct room order.',
      },
      {
        title: 'Entering without an exit marker',
        fix: 'Use the vine window or another recognizable entry and call it to the team.',
      },
      {
        title: 'Dragging large objects through early objectives',
        fix: 'Finish rag, fork, toilet, pest, and break tasks before heavy haul attempts.',
      },
      {
        title: 'Fighting in cluttered rooms',
        fix: 'Clear space or leave. Tiny enemies and bad physics waste more time than they look.',
      },
      {
        title: 'Trusting damage rumors as final math',
        fix: 'Treat human hit counts, rat health, and cat range as early notes until you confirm them in your current build.',
      },
      {
        title: 'Ignoring crafting after the first run',
        fix: 'Expanded Backpack and basic tools can change the whole route once recipes are confirmed.',
      },
    ],
  },
]
