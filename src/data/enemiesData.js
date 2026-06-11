import { buildBestiaryPageMeta } from '../utils/contentLabels.js'

const withBestiaryTdk = (entries) => entries.map((entry) => ({ ...entry, tdk: buildBestiaryPageMeta(entry) }))

export default [
  {
    key: 'categories',
    items: ['NPCs', 'Humans', 'Animals', 'Pests', 'Hostile Gnomes', 'Hazards', 'Unknown'],
  },
  {
    key: 'entries',
    items: withBestiaryTdk([
      {
        slug: 'high-gnome',
        name: 'High-Gnome',
        category: 'NPCs',
        role: 'Task giver',
        danger: 'None',
        location: 'Task board and run-start job flow',
        behavior: 'Represents the job system that pushes players toward task-first routing.',
        counter: 'Read the task list before looting and route by objective verbs.',
        recommendedItems: [],
        relatedGuides: [
          { label: 'First task list', path: '/beginner#first-tasks' },
          { label: 'Core loop', path: '/beginner#core-loop' },
        ],
        status: 'Confirmed',
        image: '/images/extracted/npc-gnome.png',
        attacks: ['No attack pattern. The risk is ignoring the task list and failing the day timer.'],
        counters: ['Call all five tasks out loud before anyone starts looting.', 'Complete at least three tasks before ringing for extraction.'],
        testing: ['Task order and exact task pool can change after updates.'],
        sections: [
          {
            heading: 'Why High-Gnome matters',
            body:
              'The High-Gnome job list is the run planner. If the list says break, climb, open, steal, stun, or kill, that verb defines the route.',
          },
        ],
      },
      {
        slug: 'fairy',
        name: 'Fairy',
        category: 'NPCs',
        role: 'Friendly request NPC',
        danger: 'None',
        location: 'Outdoor lawn and sometimes near the mushroom-house area',
        behavior:
          'A friendly NPC can ask for specific objects, then reward players with materials or equipment when the requested item is delivered.',
        counter: 'Do not treat the Fairy as a threat. Read the requested item, then decide whether the trade is worth the route risk.',
        recommendedItems: ['cigarette', 'music-box', 'papyrus'],
        relatedGuides: [
          { label: 'Outdoor Lawn', path: '/areas/outdoor-lawn' },
          { label: 'Bee', path: '/bestiary/bee' },
          { label: 'Base Building', path: '/base-building' },
          { label: 'Items', path: '/items' },
        ],
        status: 'Observed',
        image: '/images/extracted/npc-fairy.png',
        attacks: ['No hostile attack pattern recorded.'],
        counters: [
          'Bring only the requested item; do not overstay outside if cat routes are active.',
          'Treat requested cosmetics, odd valuables, or strange household items as trade candidates until the reward table is mapped.',
        ],
        testing: ['Exact request pool and reward table need more samples.'],
        sections: [
          {
            heading: 'Trade use',
            body:
              'The Fairy belongs in NPC routing because a good trade can shortcut materials or equipment. Mark requested items instead of discarding them as junk.',
          },
        ],
      },
      {
        slug: 'human-homeowner',
        name: 'Human / Homeowner',
        category: 'Humans',
        role: 'Primary indoor threat',
        danger: 'High',
        location: 'Inside the house, moving through rooms and corridors',
        behavior:
          'Can patrol rooms, spot gnomes, grab players, carry them to dangerous household objects, throw them outside, or force a rescue route.',
        counter:
          'Break line of sight, hide under beds or sofas, use blind spots, drop heavy loot, and only fight when the team has weapons and an exit call.',
        recommendedItems: ['marble-gun', 'blowgun', 'metal-bat', 'sleep-dart', 'confusion-dart'],
        relatedGuides: [
          { label: 'Death and revival', path: '/beginner#death-revival' },
          { label: 'Doors and windows', path: '/beginner#doors-windows' },
          { label: 'Marble Gun', path: '/items/marble-gun' },
        ],
        status: 'Observed',
        image: '/images/extracted/npc-human.png',
        attacks: [
          'Grabs a gnome and may carry them toward oven, refrigerator, toilet, fireplace, or another danger point.',
          'May throw a gnome outside, which can split the team and break the planned exit route.',
          'Rare weapon behavior is reported; treat it as high-risk until spawn conditions are mapped.',
        ],
        counters: [
          'Hide under beds, sofas, counters, or places the human cannot reach.',
          'Use columns, furniture, corners, and room geometry to break pursuit.',
          'Mouse holes can reset pressure, but they can also place you in a bad room.',
          'Ranged tools such as Marble Gun or Blowgun effects are safer than melee when the human controls the room.',
        ],
        testing: [
          'Weapon and utility item spawns are random; check drawers, bathroom storage, and small containers before assuming a house has no answer.',
          'Sleep, confusion, and ranged pressure should be retested after patches.',
        ],
        sections: [
          {
            heading: 'How to survive human contact',
            body:
              'Drop bulky loot, mark the exit, and leave if the room shape favors the human. Tools should create space, not start a long fight.',
          },
          {
            heading: 'Weapon rule',
            body:
              'A weapon only helps if the team can aim, reload, and extract afterward. Do not turn a three-task route into a house-wide fight unless the run is already committed to combat.',
          },
        ],
      },
      {
        slug: 'cat',
        name: 'Cat',
        category: 'Animals',
        role: 'Outdoor predator',
        danger: 'Very High',
        location: 'Outside lawn and window-side routes',
        behavior: 'Moves extremely fast and can kill a gnome outright when it reaches them.',
        counter: 'Stay indoors when the cat is active, close doors and windows, and avoid carrying loot across exposed lawn routes.',
        recommendedItems: ['spring-shoes', 'glider', 'flight-potion'],
        relatedGuides: [
          { label: 'Death and revival', path: '/beginner#death-revival' },
          { label: 'Spring Shoes', path: '/crafting/spring-shoes' },
        ],
        status: 'Inferred',
        image: '/images/extracted/npc-cat.png',
        attacks: ['Fast direct kill on exposed gnomes. Player notes describe it as much less forgiving than small pests.'],
        counters: [
          'Do not loiter on the lawn.',
          'Close windows and doors if the team is staying inside.',
          'Delay outdoor trades or exterior routes until the cat path is understood.',
        ],
        testing: ['Cat spawn timing, detection range, and reliable counters still need more confirmed samples.'],
        sections: [
          {
            heading: 'Cat route rule',
            body:
              'Assume the cat controls outdoor floor space until pull range and safe bypasses are mapped. Do not carry heavy loot near it.',
          },
        ],
      },
      {
        slug: 'rat',
        name: 'Rat',
        category: 'Animals',
        role: 'Cabinet hostile',
        danger: 'Medium',
        location: 'Often found around kitchen cabinets and storage spaces',
        behavior:
          'Usually appears in small groups. Looking at or staying near a rat for one to two seconds can trigger aggression.',
        counter:
          'Do not stare at it in tight spaces. Back out, clear room clutter, then use Metal Bat, Marble Gun, Blowgun darts, or another real weapon.',
        recommendedItems: ['metal-bat', 'marble-gun', 'blowgun', 'sleep-dart'],
        relatedGuides: [
          { label: 'Metal Bat', path: '/crafting/metal-bat' },
          { label: 'Kitchen route', path: '/beginner#first-tasks' },
        ],
        status: 'Observed',
        image: '/images/extracted/npc-rat.png',
        attacks: ['Bite pressure can kill after repeated hits; current notes track about three bites as lethal.'],
        counters: [
          'Metal Bat or another real weapon is safer than throwing random clutter.',
          'Marble Gun and Blowgun let the team pressure rats without standing in bite range.',
          'Rats may run toward holes, which can make pursuit messy in small rooms.',
        ],
        testing: ['Rat health, bite count, and pathing should be retested after combat patches.'],
        sections: [
          {
            heading: 'Kitchen risk',
            body:
              'Rats matter because kitchen and drawer routes are already important for weapons, cigarettes, materials, and special loot. Clear space before fighting.',
          },
        ],
      },
      {
        slug: 'cockroach',
        name: 'Cockroach',
        category: 'Pests',
        role: 'Small pest / task target',
        danger: 'Low',
        location: 'Dark corners, floor clutter, and pest rooms',
        behavior: 'Attacks when players get close, but the damage is much lower than major threats.',
        counter: 'Use a quick weapon hit or throw objects when the route is safe. Leave once the task count registers.',
        recommendedItems: ['metal-bat', 'boxing-gloves', 'branch'],
        relatedGuides: [
          { label: 'First task list', path: '/beginner#first-tasks' },
          { label: 'Metal Bat', path: '/crafting/metal-bat' },
        ],
        status: 'Observed',
        image: '/images/extracted/npc-roach.png',
        attacks: ['Close-range pest attack. Usually wastes time more than it instantly kills.'],
        counters: [
          'A real melee weapon should remove cockroaches quickly.',
          'Thrown objects can work when the angle is clean.',
          'Do not fight extra pests after the objective is complete.',
        ],
        testing: ['Exact hit registration and alternate weapon breakpoints need repeat testing.'],
        sections: [
          {
            heading: 'Task use',
            body:
              'The cockroach objective should be treated as a quick task, not a reason to fight every pest in the room.',
          },
        ],
      },
      {
        slug: 'evil-gnome',
        name: 'Evil Gnome',
        category: 'Hostile Gnomes',
        role: 'Post-human hostile squad',
        danger: 'High',
        location: 'Can appear after the human is fully eliminated',
        behavior:
          'Several hostile gnomes may spawn, chase players aggressively, climb to higher routes, and keep attacking downed players.',
        counter:
          'Close doors and windows, avoid outdoor panic routes, use Metal Bat or ranged weapons, and bait them into moving hazards when possible.',
        recommendedItems: ['metal-bat', 'marble-gun', 'blowgun', 'sleep-dart', 'confusion-dart'],
        relatedGuides: [
          { label: 'Metal Bat', path: '/crafting/metal-bat' },
          { label: 'Vacuum Robot', path: '/bestiary/vacuum-robot' },
        ],
        status: 'Observed',
        image: '/images/extracted/npc-redcap.png',
        attacks: [
          'Close-range slap attacks can down a gnome quickly.',
          'After a first down, they may continue pressure until the player is fully eliminated.',
          'They can chase vertically, so climbing alone is not a guaranteed reset.',
        ],
        counters: [
          'Stay inside and close entry points if they are outside.',
          'Use Metal Bat only when you have room to swing and leave.',
          'Marble Gun, Blowgun darts, and control effects are safer when several hostile gnomes rush at once.',
          'Baiting into Vacuum Robot paths is a possible hazard counter.',
        ],
        testing: ['Spawn count, exact trigger, and damage breakpoints remain patch-sensitive.'],
        sections: [
          {
            heading: 'Trigger warning',
            body:
              'Removing the human can make the house safer in one way and more dangerous in another. Be ready for hostile gnomes before committing to a full human takedown.',
          },
        ],
      },
      {
        slug: 'vacuum-robot',
aliases: ['roomba'],
        name: 'Roomba / Vacuum Robot',
        category: 'Hazards',
        role: 'Moving household machine',
        danger: 'Medium',
        location: 'Inside the house, moving through rooms and paths',
        behavior: 'Can roll through routes and pull nearby gnomes into a rescue situation.',
        counter:
          'Keep distance, call teammate rescue early, attack it or jump on top and press E to shut it down for a limited time.',
        recommendedItems: ['metal-bat', 'spring-shoes'],
        relatedGuides: [
          { label: 'Doors and windows', path: '/beginner#doors-windows' },
          { label: 'Metal Bat', path: '/crafting/metal-bat' },
        ],
        status: 'Observed',
        image: '/images/extracted/npc-vacuum.png',
        attacks: ['Pulls or traps a gnome when they get too close, but does not always mean immediate full elimination.'],
        counters: [
          'A nearby teammate can rescue a trapped player.',
          'Jump on top and press E to shut it down temporarily.',
          'Weapon hits may also interrupt it, but shutdown duration needs repeat testing.',
        ],
        testing: ['Shutdown duration, restart timing, and whether enemies can be baited into it need more samples.'],
        sections: [
          {
            heading: 'Route hazard',
            body:
              'The Vacuum Robot belongs in the bestiary because moving household machines can function like enemies when they block a gnome-scale path.',
          },
        ],
      },
      {
        slug: 'tall-humanoid',
aliases: ['bibi', 'tall humanoid'],
        name: 'Bibi / Tall Humanoid',
        category: 'Unknown',
        role: 'Large grab-threat',
        danger: 'Unknown',
        location: 'Likely outdoor or special-event route; exact spawn is still being mapped',
        behavior:
          'Bibi appears in the game files and matches the large-humanoid route note players have been asking about. Treat the grab behavior as unfinished until you can reproduce it in a live run.',
        counter: 'Test grab range, release conditions, line-of-sight rules, and whether gear prevents the hold before routing around it.',
        recommendedItems: ['gnomium-gloves', 'mobility-potion'],
        relatedGuides: [
          { label: 'Death and revival', path: '/beginner#death-revival' },
          { label: 'Outdoor Lawn', path: '/areas/outdoor-lawn' },
        ],
        status: 'Inferred',
        image: '/images/extracted/npc-bibi.png',
        attacks: ['Possible grab or hold behavior.'],
        counters: ['Do not route clean runs around this entity until behavior is confirmed.', 'Keep one player free for rescue checks if the entity appears.'],
        testing: ['Confirm spawn location, grab range, release rules, and whether revival works normally after contact.'],
        sections: [
          {
            heading: 'Why Bibi matters',
            body:
              'Any large entity that can hold a player changes co-op routing, rescue timing, and death-revival advice. Keep this page conservative until the route is repeatable.',
          },
        ],
      },
      {
        slug: 'groundhog',
aliases: ['mole', 'groundhog'],
        name: 'Mole / Groundhog',
        category: 'Unknown',
        role: 'Underground lawn creature',
        danger: 'Unknown',
        location: 'Outdoor lawn and garden-style routes',
        behavior:
          'The extracted entity list includes Mole, which lines up with player reports of underground movement outside. Its exact attack, if any, still needs clean route confirmation.',
        counter: 'Do not path heavy loot through moving ground effects until the team knows whether the creature can interrupt carrying or damage players.',
        recommendedItems: [],
        relatedGuides: [
          { label: 'Outdoor Lawn', path: '/areas/outdoor-lawn' },
          { label: 'Greenhouse and Garden', path: '/areas/greenhouse-garden' },
        ],
        status: 'Inferred',
        image: '/images/extracted/npc-mole.png',
        attacks: ['No confirmed attack pattern.'],
        counters: ['Avoid treating reports as final mechanics until repeatable sightings are captured.'],
        testing: ['Confirm spawn location, movement path, and whether it is enemy, hazard, or flavor wildlife.'],
        sections: [
          {
            heading: 'Why players search for it',
            body:
              'Mole belongs in the Unknown category because players search for the lawn creature, but the behavior is not reliable enough for a final counter table yet.',
          },
        ],
      },
      {
        slug: 'jonathan',
        name: 'Jonathan',
        category: 'NPCs',
        role: 'Special route character',
        danger: 'Low until the route proves otherwise',
        location: 'Bedroom, living-room, music-box, or special-object routes',
        behavior:
          'Jonathan appears as a named game entity and connects naturally to music-box style tasks. Route him as a special objective rather than a normal enemy.',
        counter: 'If Jonathan appears in the task list, search living spaces first and avoid turning the route into random looting.',
        recommendedItems: ['music-box'],
        relatedGuides: [
          { label: 'Music Box', path: '/items/music-box' },
          { label: 'Bedroom and Living Room', path: '/areas/bedroom-living-room' },
        ],
        status: 'Observed',
        image: '/images/extracted/npc-jonathan.png',
        attacks: ['No reliable hostile attack pattern has been routed for this page yet.'],
        counters: ['Treat Jonathan as objective content until the task wording proves a combat interaction.'],
        testing: ['Map exact task wording, spawn room, and whether Music Box changes the interaction.'],
        sections: [
          {
            heading: 'How to route Jonathan',
            body:
              'Start with bedroom and living-room objects, then check Music Box links. If the task does not name Jonathan, do not spend a clean run chasing the spawn.',
          },
        ],
      },
      {
        slug: 'boar',
        name: 'Boar',
        category: 'Animals',
        role: 'Outdoor animal',
        danger: 'Unknown',
        location: 'Outdoor, garden, or yard-style routes',
        behavior:
          'Boar is present in the extracted entity list. Until the route is confirmed, assume it can disrupt outdoor movement and carry paths.',
        counter: 'Avoid heavy exterior carries near the animal and keep a window or pipe return line ready.',
        recommendedItems: ['spring-shoes', 'glider'],
        relatedGuides: [
          { label: 'Outdoor Lawn', path: '/areas/outdoor-lawn' },
          { label: 'Greenhouse and Garden', path: '/areas/greenhouse-garden' },
        ],
        status: 'Inferred',
        image: '/images/extracted/npc-boar.png',
        attacks: ['Attack pattern still needs a repeatable live route.'],
        counters: ['Route around it first; only test close contact in a throwaway run.'],
        testing: ['Confirm spawn area, detection distance, damage, and whether doors or windows block it.'],
        sections: [
          {
            heading: 'Outdoor route risk',
            body:
              'Boar should be treated like a route blocker until proven harmless. It matters most when the squad is moving tools or loot through the lawn.',
          },
        ],
      },
      {
        slug: 'pitbull',
        name: 'Pitbull',
        category: 'Animals',
        role: 'Dog threat',
        danger: 'High if active',
        location: 'House exterior or pet-related spaces',
        behavior:
          'Pitbull assets exist in the game data. Because dog enemies usually punish exposed routes, do not assume the lawn is safe when this entity is active.',
        counter: 'Stay inside, close doors and windows, and avoid long outdoor carries until the dog route is understood.',
        recommendedItems: ['spring-shoes', 'mobility-potion', 'glider'],
        relatedGuides: [
          { label: 'Outdoor Lawn', path: '/areas/outdoor-lawn' },
          { label: 'Death and revival', path: '/beginner#death-revival' },
        ],
        status: 'Inferred',
        image: '/images/extracted/npc-pitbull.png',
        attacks: ['Exact bite, grab, or chase behavior still needs clean samples.'],
        counters: ['Use interior routes first and keep extraction short if it appears outside.'],
        testing: ['Confirm whether doors block it, whether it enters windows, and how fast it catches a gnome.'],
        sections: [
          {
            heading: 'How to play around Pitbull',
            body:
              'Treat it as an outdoor speed check. If a task forces lawn movement, send one player light instead of moving the whole team with loot.',
          },
        ],
      },
      {
        slug: 'sealman',
        name: 'Sealman',
        category: 'Unknown',
        role: 'Special entity',
        danger: 'Unknown',
        location: 'Unmapped special route',
        behavior:
          'Sealman appears in the extracted entity list, but the live-game route and player interaction are not clear enough for a final guide.',
        counter: 'Record the room, task wording, and whether it moves, attacks, trades, or simply appears as set dressing.',
        recommendedItems: [],
        relatedGuides: [{ label: 'Updates', path: '/updates#patch-checklist' }],
        status: 'Inferred',
        image: '/images/extracted/npc-sealman.png',
        attacks: ['No confirmed attack pattern.'],
        counters: ['Do not route progression around it until its interaction is known.'],
        testing: ['Confirm spawn trigger, player interaction, and whether it belongs to a task.'],
        sections: [
          {
            heading: 'What to check first',
            body:
              'If Sealman appears in your run, capture the task list and location first. A named entity is useful only when we can connect it to a repeatable objective.',
          },
        ],
      },
      {
        slug: 'bee',
        name: 'Bee',
        category: 'Animals',
        role: 'Outdoor sting threat',
        danger: 'Medium',
        location: 'Outdoor lawn, greenhouse, garden routes, and beehive-style areas',
        behavior:
          'Bee shows up on exterior and garden routes, often tied to Bee sting tasks or beehive-style interactions rather than normal indoor loot.',
        counter:
          'Route around beehive areas when the task list does not need Bee. Do not carry heavy loot through exposed garden paths while testing sting range.',
        recommendedItems: ['fairywings'],
        relatedGuides: [
          { label: 'Outdoor Lawn', path: '/areas/outdoor-lawn' },
          { label: 'Greenhouse and Garden', path: '/areas/greenhouse-garden' },
          { label: 'Fairy', path: '/bestiary/fairy' },
        ],
        status: 'Observed',
        image: '/images/items/item-bee.png',
        attacks: ['Sting pressure can interrupt outdoor routes when the bee is active near the team.'],
        counters: [
          'Skip the beehive route unless Bee sting or a related task is on the list.',
          'Keep exterior movement short and avoid testing sting range during a clean three-task run.',
        ],
        testing: ['Confirm sting range, task trigger wording, and whether Fairy or beehive interactions overlap.'],
        sections: [
          {
            heading: 'Why Bee belongs in Animals',
            body:
              'Bee behaves more like a route-blocking outdoor creature than a normal carried item. Treat it as an animal threat on lawn and garden paths until the live task rules are fully mapped.',
          },
          {
            heading: 'Garden overlap',
            body:
              'Water Plants, Cut Plants, greenhouse entry, and Bee sting tasks can all pull the team outside. Check the task list before committing to a long garden detour.',
          },
        ],
      },
      {
        slug: 'seagull',
        name: 'Seagull',
        category: 'Animals',
        role: 'Outdoor animal',
        danger: 'Unknown',
        location: 'Outdoor lawn or open-air routes',
        behavior:
          'Seagull appears in the entity list and should be watched on exterior routes, especially when carrying items outside.',
        counter: 'Keep exterior movement short and avoid leaving small objective items exposed until its behavior is confirmed.',
        recommendedItems: ['spring-shoes', 'glider'],
        relatedGuides: [{ label: 'Outdoor Lawn', path: '/areas/outdoor-lawn' }],
        status: 'Inferred',
        image: '/images/extracted/npc-seagull.png',
        attacks: ['No confirmed attack pattern.'],
        counters: ['Do not test it during a clean three-task route. Use a spare run to check whether it steals, attacks, or ignores players.'],
        testing: ['Confirm whether it targets players, food, carried loot, or outdoor set pieces.'],
        sections: [
          {
            heading: 'Why Seagull matters',
            body:
              'Any outdoor animal can change how safe vine windows, garden routes, and Fairy trades feel. Seagull stays on the watch list until behavior is confirmed.',
          },
        ],
      },
      {
        slug: 'environmental-hazards',
        name: 'Environmental Hazards',
        category: 'Hazards',
        role: 'Physics and event risk',
        danger: 'Medium',
        location: 'Bathrooms, kitchens, fireplaces, vehicle paths, and physics-heavy rooms',
        behavior: 'Flooded toilet, fire causes, ragdoll events, vehicles, and unusual movement tools can break normal routes.',
        counter: 'Check each hazard alone first. Do not stack unknown hazards with enemy pressure on a clean run.',
        recommendedItems: ['spring-shoes'],
        relatedGuides: [
          { label: 'Bug fixes', path: '/beginner#bug-fixes' },
          { label: 'Spring Shoes', path: '/crafting/spring-shoes' },
        ],
        status: 'Patch Sensitive',
        image: '/images/extracted/area-bathroom.png',
        attacks: ['Physics, fire, water, ragdoll, and movement events can cause a failed route without behaving like normal enemies.'],
        counters: ['Separate real mechanics from bugs by repeating the same test in a quiet route.'],
        testing: ['Fire, flood, ragdoll, and network desync cases should be retested after patches.'],
        sections: [
          {
            heading: 'Bug and physics overlap',
            body:
              'Some hazards look like bugs until repeated. The beginner page should separate real death, revive, ragdoll, weak-body bugs, and network desync.',
          },
        ],
      },
    ]),
  },
]
