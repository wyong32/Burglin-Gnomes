export default [
  {
    key: 'zones',
    items: [
      {
        name: 'Gnome World',
        type: 'Safe zone',
        image: '/images/extracted/area-gnome-tree.png',
        summary:
          'Pre-run island hub for storage, invites, crafting, and bell starts. Full routing notes live on the area page.',
        links: [
          { label: 'Crafting', path: '/crafting' },
          { label: 'Beginner route', path: '/beginner#core-loop' },
        ],
      },
      {
        name: 'Human World',
        type: 'Task zone',
        image: '/images/extracted/area-kitchen.png',
        summary:
          'Active task zone with extraction pressure. Room-by-room guides start on the Human House area page.',
        links: [
          { label: 'Entry methods', path: '/beginner#human-world' },
          { label: 'Bestiary', path: '/bestiary' },
        ],
      },
    ],
  },
  {
    key: 'objects',
    items: [
      {
        name: 'The Tree',
        role: 'Spawn and respawn point',
        location: 'Gnome-world island',
        image: '/images/extracted/area-gnome-tree.png',
        status: 'Observed',
        detail:
          'Players begin near the tree. It also works as the practical anchor point after death or failed pressure, so use it as the team regroup call.',
        tips: [
          'Regroup here before starting another run.',
          'Use it as the mental reset point after a failed rescue.',
        ],
      },
      {
        name: 'Mushroom House',
        role: 'Storage and lobby utility',
        location: 'Gnome-world island',
        image: '/images/extracted/area-gnome-tree.png',
        status: 'Observed',
        detail:
          'The mushroom house is where base utility belongs: storage, friend setup, and pre-run cleanup. Empty your inventory before starting a task route.',
        tips: [
          'Store materials before practicing combat or risky routes.',
          'Do not bring random clutter into the next run unless it has a known use.',
        ],
      },
      {
        name: 'Storage Chest',
        role: 'Loot and material storage',
        location: 'Inside or near the mushroom house',
        image: '/images/extracted/area-cupboard.png',
        status: 'Observed',
        detail:
          'Use the chest to bank stolen materials and task loot. A clean inventory makes it easier to carry tools, potion ingredients, weapons, and emergency items.',
        tips: [
          'Bank materials before crafting checks.',
          'Separate task items from valuables when possible.',
        ],
      },
      {
        name: 'Purple Crystal',
        role: 'Friend invite and lobby utility',
        location: 'Gnome world and human-world run space',
        image: '/images/extracted/area-crystal.png',
        status: 'Observed',
        detail:
          'On the island, the purple crystal is used for Steam friend invite flow and squad setup. Treat revival planning separately through the Spirit Catcher / Medical Terminal system.',
        tips: [
          'Invite friends before ringing the bell.',
          'Do not confuse lobby setup with in-run rescue calls.',
        ],
        links: [{ label: 'Death and revival', path: '/beginner#death-revival' }],
      },
      {
        name: 'Spirit Catcher',
        role: 'Limited respawn furniture',
        location: 'Gnome-world base setup',
        image: '/images/extracted/area-crystal.png',
        status: 'Observed',
        detail:
          'The Medical Terminal / Spirit Catcher handles limited respawns during a day. Multiplayer has three charges, while solo play has one charge.',
        tips: [
          'Spend respawns on task progress, not greedy loot mistakes.',
          'If everyone is dead and no auto-respawn is available, the day can collapse fast.',
        ],
        links: [{ label: 'Death and revival', path: '/beginner#death-revival' }],
      },
      {
        name: 'Bell',
        role: 'Start and extraction call',
        location: 'Gnome world and human-world run space',
        image: '/images/extracted/area-bell.png',
        status: 'Observed',
        detail:
          'On the island, the bell starts the run. In the human world, the bell calls extraction back to the island after the team has enough task progress.',
        tips: [
          'Do not call extraction before the team knows where everyone is.',
          'Use the bell only after the required task count is safe.',
        ],
        links: [{ label: 'Core loop', path: '/beginner#core-loop' }],
      },
      {
        name: 'The Well',
        role: 'Crafting station',
        location: 'Gnome-world island',
        image: '/images/extracted/area-well.png',
        status: 'Observed',
        detail:
          'The well is the base crafting station. Spend collected parts here to make gear that changes routes, carrying, combat, and material farming.',
        tips: [
          'Craft Backpack and Pickaxe before greedy loot routes.',
          'Practice combat gear away from progression runs.',
        ],
        links: [{ label: 'Crafting recipes', path: '/crafting' }],
      },
    ],
  },
  {
    key: 'checklist',
    items: [
      'Store loose loot before starting the next day.',
      'Invite Steam friends at the crystal before the bell starts the run.',
      'Craft route-changing gear at the well when materials allow it.',
      'Agree on the first entry method: vine window, drain pipe, or known interior door route.',
      'After extraction, bank materials and update the next craft target.',
    ],
  },
]
