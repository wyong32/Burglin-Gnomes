export default [
  {
    key: 'coreLoop',
    items: [
      {
        label: 'Daily task roll',
        value: '5 tasks',
        detail:
          'Each day gives a set of five random sabotage or theft objectives. Read them before touching loot.',
        status: 'Observed',
      },
      {
        label: 'Minimum extraction',
        value: '3 tasks',
        detail:
          'Complete at least three tasks before calling extraction. Treat this as the safety line for every beginner route.',
        status: 'Observed',
      },
      {
        label: 'Failure penalty',
        value: 'Progress reset',
        detail:
          'If the timer ends before the minimum task count is complete, the run fails and progress can reset back to day one.',
        status: 'Patch Sensitive',
      },
      {
        label: 'Gnomium reward',
        value: 'Tasks minus deaths',
        detail:
          'Successful days reward Gnomium from completed tasks, reduced by dead players. Finish more tasks, but do not trade deaths for one extra objective.',
        status: 'Observed',
      },
    ],
  },
  {
    key: 'controls',
    items: [
      {
        input: 'W / A / S / D',
        action: 'Move',
        use: 'Basic movement, route control, dodging threats, and lining up window climbs.',
      },
      {
        input: 'Right mouse button',
        action: 'Extend both arms and grab',
        use: 'Core interaction for objects, windows, handles, furniture, and heavy dragging.',
      },
      {
        input: 'Mouse wheel',
        action: 'Adjust arm distance',
        use: 'Pull heavy objects, climb, free stuck items, and control carry distance through tight doors.',
      },
      {
        input: 'E',
        action: 'Context interaction',
        use: 'Used for prompts such as drain pipe entry, teammate rescue, and shutting down some hazards.',
      },
    ],
  },
  {
    key: 'entryMethods',
    items: [
      {
        name: 'Vine window',
        route: 'Random exterior window with green vines',
        method:
          'Grab the window with both hands, pull upward, and climb in. If the body will not pull, reset position before assuming the window is blocked.',
        risk: 'Bad angle, heavy carried item, or weak-body bug can make the climb fail.',
        path: '/beginner#doors-windows',
      },
      {
        name: 'Drain pipe',
        route: 'Usually fixed near the back side of the house',
        method:
          'Approach the pipe and press E when the prompt appears. Use it as a backup entry when windows are unsafe.',
        risk: 'It can place the team inside without the same visual exit marker as a vine window.',
        path: '/beginner#human-world',
      },
      {
        name: 'Inside door setup',
        route: 'After at least one player is already inside',
        method:
          'Move a low stool or chair to the door, stand on it, and use the height to reach handles or interior door controls.',
        risk: 'Furniture is heavy for one gnome; two players are safer when moving it.',
        path: '/items/chair-stool',
      },
    ],
  },
  {
    key: 'interactions',
    items: [
      {
        title: 'Oven and refrigerator doors',
        detail:
          'Grab the external handle and pull down or outward. Do not stand in a bad angle where the door pushes your body into clutter.',
      },
      {
        title: 'Drawers and cabinets',
        detail:
          'Pull drawers and cabinet doors open before calling a room empty. Small valuables, cigarettes, weapons, and task objects can hide inside.',
      },
      {
        title: 'Cigarettes and smoke items',
        detail:
          'House layout, object set, and item spawns are random. Some runs have several packs in drawers or cabinets; some runs may have none.',
      },
      {
        title: 'Mouse holes',
        detail:
          'Mouse holes can help escape pressure, but the exit may be awkward. Do not use them while carrying critical loot unless the route is already lost.',
      },
    ],
  },
  {
    key: 'steps',
    items: [
      {
        order: '01',
        title: 'Read the High-Gnome task list before touching loot',
        detail:
          'The tutorial task set teaches five fundamentals: break a TV, climb the kitchen counter, hit with Clonk-style force, open a cabinet, and open a window.',
        image: '/images/task-list.webp',
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
        title: 'Open cabinets before calling a room empty',
        detail:
          'Task items and useful loot often sit behind drawers or cabinet doors. Open containers before deciding the room has nothing useful.',
        image: '/images/steam-shot-3.jpg',
      },
      {
        order: '04',
        title: 'Use counters and windows as movement tests',
        detail:
          'Climbing the kitchen counter and opening a window are not side tricks; they teach how to reach human-scale surfaces and leave under pressure.',
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
      'Finish the tutorial fundamentals first: break, climb, hit, open a cabinet, and open a window.',
      'Move to the kitchen only after one player knows the exit and one player watches threat movement.',
      'Take small task objects before hauling valuables.',
      'Return to gnome-world crafting only after the first objective cluster is solved or the route becomes unsafe.',
    ],
  },
  {
    key: 'firstTasks',
    items: [
      {
        name: 'Break TV',
        target: '1',
        room: 'Living room or TV room',
        method:
          'Use this as the first object-breaking lesson. Clear the room shape before committing to a noisy hit.',
        image: '/images/task-list.webp',
        status: 'Observed',
        path: '/beginner#first-route',
      },
      {
        name: 'Climb Kitchen Counter',
        target: '1',
        room: 'Kitchen',
        method:
          'Practice vertical movement on a counter before using harder window or shelf routes.',
        image: '/images/steam-shot-3.jpg',
        status: 'Observed',
        path: '/beginner#human-world',
      },
      {
        name: 'Clonk Tutorial',
        target: '1',
        room: 'Tutorial route',
        method:
          'Learn how hitting works before using weapons in a real house run.',
        image: '/images/items/item-metal-bat.png',
        status: 'Observed',
        path: '/items/metal-bat',
      },
      {
        name: 'Open Cabinet',
        target: '1',
        room: 'Kitchen, bathroom, storage rooms',
        method:
          'Pull cabinet doors and drawers open before calling a room empty. Small loot and weapons can hide inside.',
        image: '/images/task-list.webp',
        status: 'Observed',
        path: '/beginner#doors-windows',
      },
      {
        name: 'Open Window',
        target: '1',
        room: 'Exterior wall or room window',
        method:
          'Grab the frame, pull up, and keep the body centered. This is the safest early entry and exit skill.',
        image: '/images/vine-entry.jpg',
        status: 'Observed',
        path: '/beginner#doors-windows',
      },
    ],
  },
  {
    key: 'taskGroups',
    items: [
      {
        group: 'Gather / Steal',
        pick: '1-2 per day',
        tasks: 'Gather Random, Steal From Random Room, Steal Random Category, Steal Random Specific',
        note: 'This is the only formal task group with a minimum pick count, so every normal day should route some kind of item collection.',
      },
      {
        group: 'Misc',
        pick: '1-3 per day',
        tasks: 'Garden gnome kisses, boar tasks, water plants, sauna water, garage, Jonathan, TV, greenhouse, shed, dog, window, cabinet, bee, weapon safe',
        note: 'Misc tasks are broad; read the verb first because these can send the team outdoors, into cabinets, or into special event routes.',
      },
      {
        group: 'Breaking',
        pick: '0-2 per day',
        tasks: 'Break Stealables, Blender, Window Shatter, Break Seagull Egg',
        note: 'Break objectives can be quick, but they make noise and can ruin a clean stealth route.',
      },
      {
        group: 'Toilet / Explosion / Violence / Stun / Blowdart',
        pick: '0-1 per group',
        tasks: 'Toilet tasks, explosive tasks, weapon tasks, stun tasks, and potion-dart tasks',
        note: 'These groups cap at one each, so do not expect several objectives from the same dangerous category on a normal roll.',
      },
    ],
  },
  {
    key: 'difficultySchedule',
    items: [
      { day: 'Days 0-1', roll: '5 Easy tasks', advice: 'Use these days to learn entry, containers, and extraction timing.' },
      { day: 'Day 2', roll: '3 Medium + 2 Easy', advice: 'Start crafting route tools before the house asks for harder objectives.' },
      { day: 'Days 3-4', roll: '1 Hard + 3 Medium + 1 Easy', advice: 'Do not over-loot before the hard task is solved or skipped.' },
      { day: 'Days 5-7', roll: '2 Hard + 3 Medium', advice: 'Enter with a craft plan, not just empty hands.' },
      { day: 'Days 8+', roll: 'Hard-heavy task pool', advice: 'Expect more dangerous verbs and recheck the exit before fighting.' },
    ],
  },
  {
    key: 'forbiddenCombos',
    items: [
      'Cause Explosion + Explode Random Enemy',
      'Mine Explode + Mine Trigger',
      'Boar Charge + Boar Tusk',
      'Jonathan Music Box + Jonathan Spawned',
      'Water Plants + Cut Plants',
      'Dart Stab + Fork Stab',
      'Enter Shed + Enter Greenhouse',
      'Build Minicopter + Garage Door Open',
      'Steal Dog Toy + Free Dog',
      'Window Open + Window Shatter',
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
        fix: 'Finish container, window, break, movement, and small-object tasks before heavy haul attempts.',
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
        fix: 'Backpack, Pickaxe, Metal Bat, and movement gear can change the whole route once the team can afford them.',
      },
    ],
  },
]
