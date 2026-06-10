import { buildBestiaryPageMeta } from '../utils/contentLabels'

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
        behavior:
          'Represents the job system that pushes players toward task-first routing.',
        counter: 'Read the task list before looting and route by objective verbs.',
        recommendedItems: [],
        relatedGuides: ['first-tasks'],
        status: 'Confirmed',
        image: '/images/task-list.jpg',
        sections: [
          {
            heading: 'Why High-Gnome matters',
            body:
              'The High-Gnome job list is the run planner. If the list says rag strips, fork, toilet, or cockroach, those objects define the route.',
          },
        ],
      },
      {
        slug: 'human-homeowner',
        name: 'Human / Homeowner',
        category: 'Humans',
        role: 'Primary indoor threat',
        danger: 'High',
        behavior:
          'Can turn a loot route into a rescue or wipe if players move loudly, carry too much, or fight in bad rooms.',
        counter:
          'Break line of sight, avoid heavy hauling through unknown patrol paths, and test weapon effects outside progression.',
        recommendedItems: ['electric-gun', 'handgun', 'slap-hammer', 'smoke-tool'],
        relatedGuides: ['death-revival', 'open-doors-windows'],
        status: 'Observed',
        image: '/images/steam-shot-2.jpg',
        sections: [
          {
            heading: 'How to survive human contact',
            body:
              'Drop bulky loot, mark the exit, and leave if the room shape favors the human. Tools should create space, not start a long fight.',
          },
          {
            heading: 'Co-op tip',
            body:
              'Electric Gun, Slap Hammer, and ranged weapons should be tested against humans before they are treated as confirmed damage or stun counters.',
          },
          {
            heading: 'What we have seen',
            body:
              'Human threats can patrol rooms, grab or hold a gnome, and create rescue situations. The route answer is usually exit control first, weapon testing second.',
          },
        ],
      },
      {
        slug: 'cat',
        name: 'Cat',
        category: 'Animals',
        role: 'Floor predator',
        danger: 'Very High',
        behavior:
          'Appears to punish close movement and can collapse low floor routes quickly.',
        counter:
          'Give it wide space, avoid bulky objects nearby, and learn its grab range in a throwaway run before you trust a floor route.',
        recommendedItems: ['spring-shoes', 'smoke-tool'],
        relatedGuides: ['death-revival'],
        status: 'Inferred',
        image: '/images/threat-cat.jpg',
        sections: [
          {
            heading: 'Cat route rule',
            body:
              'Assume the cat controls floor space until pull range and safe bypasses are mapped. Do not carry heavy loot near it.',
          },
        ],
      },
      {
        slug: 'cockroach',
        name: 'Cockroach',
        category: 'Pests',
        role: 'Small pest / task target',
        danger: 'Low',
        behavior:
          'Required for an early stab objective. The danger is mostly wasted time and missed hits in clutter.',
        counter: 'Clear the floor, hit only what the objective requires, then return to routing.',
        recommendedItems: ['slap-hammer', 'grenade'],
        relatedGuides: ['first-tasks'],
        status: 'Observed',
        image: 'https://placehold.co/160x120/ffdac1/6B9B7B?text=CR',
        sections: [
          {
            heading: 'Task use',
            body:
              'The cockroach objective should be treated as a quick task, not a reason to fight every pest in the room.',
          },
        ],
      },
      {
        slug: 'rat',
        name: 'Rat',
        category: 'Animals',
        role: 'Small hostile',
        danger: 'Medium',
        behavior: 'Likely takes multiple hits and can make small rooms messy.',
        counter: 'Practice in a safe room until you know exact health and whether doors or furniture interrupt it.',
        recommendedItems: ['slap-hammer', 'spring-shoes'],
        relatedGuides: [],
        status: 'Inferred',
        image: 'https://placehold.co/160x120/ffdac1/6B9B7B?text=RT',
        sections: [
          {
            heading: 'What we still need to confirm',
            body:
              'Rat health, hit reaction, and room behavior should be tested in repeatable runs before publishing a final counter.',
          },
        ],
      },
      {
        slug: 'scrapling',
        name: 'Scrapling',
        category: 'NPCs',
        role: 'Friendly or neutral gnome-world NPC',
        danger: 'None',
        behavior:
          'A fairy-like or winged figure near the mushroom cottage appears to belong to friendly-side content.',
        counter: 'Do not attack or route around it until its exact function is tested.',
        recommendedItems: [],
        relatedGuides: [],
        status: 'Inferred',
        image: '/images/hero-gnome-world.jpg',
        sections: [
          {
            heading: 'Why this stays cautious',
            body:
              'The exact English name, function, and interaction are not confirmed yet, so this entry stays cautious.',
          },
        ],
      },
      {
        slug: 'evil-gnome',
        name: 'Evil Gnome',
        category: 'Hostile Gnomes',
        role: 'Hostile gnome-type threat',
        danger: 'Unknown',
        behavior:
          'This threat needs more testing before trigger, spawn rule, and counter advice can be finalized.',
        counter: 'Treat spawn rules as unconfirmed. Do not plan clean runs around assumptions yet.',
        recommendedItems: ['slap-hammer', 'grenade'],
        relatedGuides: [],
        status: 'Retest Required',
        image: 'https://placehold.co/160x120/ffdac1/6B9B7B?text=EG',
        sections: [
          {
            heading: 'What needs verification',
            body:
              'Spawn trigger, aggression, hit response, and whether hostile gnomes can block exits all need patch-level testing.',
          },
        ],
      },
      {
        slug: 'tall-humanoid',
        name: 'Tall Humanoid',
        category: 'Unknown',
        role: 'Large grab-threat',
        danger: 'Unknown',
        behavior: 'A large humanoid appears to be able to hold or grab a gnome.',
        counter:
          'Test grab range, release conditions, line-of-sight rules, and whether gear prevents the hold.',
        recommendedItems: ['gnome-gloves', 'smoke-tool'],
        relatedGuides: ['death-revival'],
        status: 'Inferred',
        image: '/images/new-map.jpg',
        sections: [
          {
            heading: 'Why it matters',
            body:
              'Any enemy that can hold a player changes co-op routing, rescue timing, and death-revival advice.',
          },
        ],
      },
      {
        slug: 'vacuum-robot',
        name: 'Vacuum Robot',
        category: 'Hazards',
        role: 'Moving household machine',
        danger: 'Medium',
        behavior:
          'Appears as a notable household machine and may interfere with indoor movement or entry control.',
        counter:
          'Test collision, blocking, damage, distraction, and whether Slap Hammer or routing can redirect it.',
        recommendedItems: ['slap-hammer', 'spring-shoes'],
        relatedGuides: ['open-doors-windows'],
        status: 'Observed',
        image: '/images/tool-vacuum-robot.jpg',
        sections: [
          {
            heading: 'Route hazard',
            body:
              'The Vacuum Robot belongs in the bestiary because moving household machines can function like enemies when they block a gnome-scale path.',
          },
        ],
      },
      {
        slug: 'environmental-hazards',
        name: 'Environmental Hazards',
        category: 'Hazards',
        role: 'Physics and event risk',
        danger: 'Medium',
        behavior:
          'Flooded toilet, fire causes, ragdoll events, vehicles, and unusual movement tools can break normal routes.',
        counter:
          'Check each hazard alone first. Do not stack unknown hazards with enemy pressure on a clean run.',
        recommendedItems: ['spring-shoes'],
        relatedGuides: ['muscle-weakness-bug', 'lag-disconnect'],
        status: 'Patch Sensitive',
        image: '/images/smoke-tool.jpg',
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
