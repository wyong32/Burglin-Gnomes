export default [
  {
    key: 'zones',
    items: [
      {
        name: 'Gnome World',
        type: 'Safe zone',
        image: '/images/hero-gnome-world.jpg',
        summary:
          'The island is the pre-run base. Use it to regroup, store loot, invite friends, craft equipment, and start the next house run.',
        links: [
          { label: 'Crafting', path: '/crafting' },
          { label: 'Beginner route', path: '/beginner#core-loop' },
        ],
      },
      {
        name: 'Human World',
        type: 'Task zone',
        image: '/images/steam-shot-1.jpg',
        summary:
          'The house and lawn are the active run area. Complete at least three tasks, steal useful loot, avoid threats, and call extraction before time runs out.',
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
        image: '/images/hero-gnome-world.jpg',
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
        image: '/images/hero-gnome-world.jpg',
        status: 'Observed',
        detail:
          'The mushroom house is where base utility belongs: storage, friend setup, and pre-run cleanup. Empty your inventory before starting a task route.',
        tips: [
          'Store materials before testing combat or risky routes.',
          'Do not bring random clutter into the next run unless it has a known use.',
        ],
      },
      {
        name: 'Storage Chest',
        role: 'Loot and material storage',
        location: 'Inside or near the mushroom house',
        image: '/images/crafting-board.jpg',
        status: 'Observed',
        detail:
          'Use the chest to bank stolen materials and task loot. A clean inventory makes it easier to carry forks, rag strips, tools, and emergency items.',
        tips: [
          'Bank materials before crafting checks.',
          'Separate task items from valuables when possible.',
        ],
      },
      {
        name: 'Purple Crystal',
        role: 'Friend invite and revive utility',
        location: 'Gnome world and human-world run space',
        image: '/images/hero-gnome-world.jpg',
        status: 'Observed',
        detail:
          'On the island, the purple crystal is used for Steam friend invite flow. In the human world, it is tied to teammate revival and should be treated as a limited recovery resource.',
        tips: [
          'Practice revive calls before relying on them.',
          'Track the three-use run limit until the live build proves otherwise.',
        ],
        links: [{ label: 'Death and revival', path: '/beginner#death-revival' }],
      },
      {
        name: 'Bell',
        role: 'Start and extraction call',
        location: 'Gnome world and human-world run space',
        image: '/images/task-list.webp',
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
        image: '/images/crafting-page-01.webp',
        status: 'Observed',
        detail:
          'The well is the base crafting station. Spend collected parts here to make gear that changes routes, carrying, combat, and material farming.',
        tips: [
          'Craft backpack upgrades before greedy loot routes.',
          'Test combat gear away from progression runs.',
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
