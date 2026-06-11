import { buildBestiaryPageMeta } from '../utils/contentLabels.js'

const placeholder = 'https://placehold.co/160x120/ffdac1/6B9B7B?text='

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
        image: '/images/task-list.webp',
        attacks: ['No attack pattern. The risk is ignoring the task list and failing the day timer.'],
        counters: ['Call all five tasks out loud before anyone starts looting.', 'Complete at least three tasks before ringing for extraction.'],
        testing: ['Task order and exact task pool can change after updates.'],
        sections: [
          {
            heading: 'Why High-Gnome matters',
            body:
              'The High-Gnome job list is the run planner. If the list says rag strips, fork, toilet, or cockroach, those objects define the route.',
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
        recommendedItems: ['cigarette-pack', 'small-junk-item'],
        relatedGuides: [
          { label: 'Base Building', path: '/base-building' },
          { label: 'Items', path: '/items' },
        ],
        status: 'Observed',
        image: '/images/hero-gnome-world.jpg',
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
          'Can patrol rooms, spot gnomes, grab players, carry them to dangerous household objects, throw them outside, or rarely use a handgun.',
        counter:
          'Break line of sight, hide under beds or sofas, use blind spots, drop heavy loot, and only fight when the team has weapons and an exit call.',
        recommendedItems: ['electric-gun', 'handgun', 'grenade', 'slap-hammer', 'smoke-tool'],
        relatedGuides: [
          { label: 'Death and revival', path: '/beginner#death-revival' },
          { label: 'Doors and windows', path: '/beginner#doors-windows' },
          { label: 'Electric Gun', path: '/items/electric-gun' },
        ],
        status: 'Observed',
        image: '/images/steam-shot-2.jpg',
        attacks: [
          'Grabs a gnome and may carry them toward oven, refrigerator, toilet, fireplace, or another danger point.',
          'May throw a gnome outside, which can split the team and break the planned exit route.',
          'Rare handgun behavior is reported; treat it as high-risk until spawn conditions are mapped.',
        ],
        counters: [
          'Hide under beds, sofas, counters, or places the human cannot reach.',
          'Use columns, furniture, corners, and room geometry to break pursuit.',
          'Mouse holes can reset pressure, but they can also place you in a bad room.',
          'Handgun and grenade can fully remove the human; Electric Gun is a stun tool and needs charge/use-count testing.',
        ],
        testing: [
          'Handgun and grenade spawn locations are often reported around bathrooms and drawers, but the spawn table is random.',
          'Electric Gun stun length and 3-4 use limit should be retested after patches.',
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
        recommendedItems: ['spring-shoes', 'smoke-tool'],
        relatedGuides: [
          { label: 'Death and revival', path: '/beginner#death-revival' },
          { label: 'Spring Shoes', path: '/crafting/spring-shoes' },
        ],
        status: 'Inferred',
        image: '/images/threat-cat.jpg',
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
          'Do not stare at it in tight spaces. Back out, clear room clutter, then use Slap Hammer, Knife, Handgun, Grenade, or Electric Gun.',
        recommendedItems: ['slap-hammer', 'knife', 'handgun', 'grenade', 'electric-gun'],
        relatedGuides: [
          { label: 'Slap Hammer', path: '/crafting/slap-hammer' },
          { label: 'Kitchen route', path: '/beginner#first-tasks' },
        ],
        status: 'Observed',
        image: `${placeholder}RT`,
        attacks: ['Bite pressure can kill after repeated hits; current notes track about three bites as lethal.'],
        counters: [
          'Slap Hammer appears to need roughly two to three hits.',
          'Thrown random objects are not reliable rat counters.',
          'Rats may run toward holes, which can make pursuit messy in small rooms.',
        ],
        testing: ['Rat health, bite count, and pathing should be retested after combat patches.'],
        sections: [
          {
            heading: 'Kitchen risk',
            body:
              'Rats matter because kitchen and drawer routes are already important for forks, weapons, cigarettes, and materials. Clear space before fighting.',
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
        recommendedItems: ['slap-hammer', 'knife', 'grenade'],
        relatedGuides: [
          { label: 'First task list', path: '/beginner#first-tasks' },
          { label: 'Slap Hammer', path: '/crafting/slap-hammer' },
        ],
        status: 'Observed',
        image: `${placeholder}CR`,
        attacks: ['Close-range pest attack. Usually wastes time more than it instantly kills.'],
        counters: [
          'Slap Hammer appears to kill a cockroach in one hit.',
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
          'Close doors and windows, avoid outdoor panic routes, use Slap Hammer or weapons, and bait them into moving hazards when possible.',
        recommendedItems: ['slap-hammer', 'handgun', 'grenade', 'electric-gun'],
        relatedGuides: [
          { label: 'Slap Hammer', path: '/crafting/slap-hammer' },
          { label: 'Vacuum Robot', path: '/bestiary/vacuum-robot' },
        ],
        status: 'Observed',
        image: `${placeholder}EG`,
        attacks: [
          'Close-range slap attacks can down a gnome quickly.',
          'After a first down, they may continue pressure until the player is fully eliminated.',
          'They can chase vertically, so climbing alone is not a guaranteed reset.',
        ],
        counters: [
          'Stay inside and close entry points if they are outside.',
          'Slap Hammer appears to need roughly three hits.',
          'Handgun, grenade, and Electric Gun can work, but use them with exit control.',
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
        name: 'Roomba / Vacuum Robot',
        category: 'Hazards',
        role: 'Moving household machine',
        danger: 'Medium',
        location: 'Inside the house, moving through rooms and paths',
        behavior: 'Can roll through routes and pull nearby gnomes into a rescue situation.',
        counter:
          'Keep distance, call teammate rescue early, attack it or jump on top and press E to shut it down for a limited time.',
        recommendedItems: ['slap-hammer', 'spring-shoes'],
        relatedGuides: [
          { label: 'Doors and windows', path: '/beginner#doors-windows' },
          { label: 'Slap Hammer', path: '/crafting/slap-hammer' },
        ],
        status: 'Observed',
        image: '/images/tool-vacuum-robot.jpg',
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
        name: 'Tall Humanoid',
        category: 'Unknown',
        role: 'Large grab-threat',
        danger: 'Unknown',
        location: 'Unclear',
        behavior: 'A large humanoid appears to be able to hold or grab a gnome.',
        counter: 'Test grab range, release conditions, line-of-sight rules, and whether gear prevents the hold.',
        recommendedItems: ['gnome-gloves', 'smoke-tool'],
        relatedGuides: [{ label: 'Death and revival', path: '/beginner#death-revival' }],
        status: 'Inferred',
        image: '/images/new-map.jpg',
        attacks: ['Possible grab or hold behavior.'],
        counters: ['Do not route clean runs around this enemy until behavior is confirmed.'],
        testing: ['Spawn location, grab range, and rescue rules need repeatable evidence.'],
        sections: [
          {
            heading: 'Why it matters',
            body:
              'Any enemy that can hold a player changes co-op routing, rescue timing, and death-revival advice.',
          },
        ],
      },
      {
        slug: 'groundhog',
        name: 'Groundhog',
        category: 'Unknown',
        role: 'Unconfirmed lawn creature',
        danger: 'Unknown',
        location: 'Reported under the outdoor lawn',
        behavior: 'Player reports mention underground movement on the lawn, but the creature behavior is not confirmed.',
        counter: 'Do not publish a final counter yet. Mark sightings, location, and whether it interacts with players or loot.',
        recommendedItems: [],
        relatedGuides: [{ label: 'Updates', path: '/updates#patch-checklist' }],
        status: 'Inferred',
        image: `${placeholder}GH`,
        attacks: ['No confirmed attack pattern.'],
        counters: ['Avoid treating reports as final mechanics until repeatable sightings are captured.'],
        testing: ['Confirm whether it exists, where it spawns, and whether it is enemy, hazard, or flavor wildlife.'],
        sections: [
          {
            heading: 'Verification note',
            body:
              'Groundhog belongs in the Unknown category because players search for it, but the behavior is not reliable enough for a real counter table yet.',
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
        image: '/images/smoke-tool.jpg',
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
