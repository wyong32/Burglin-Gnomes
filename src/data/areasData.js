import { buildAreaPageMeta } from '../utils/contentLabels.js'

const withAreaTdk = (areas) => areas.map((area) => ({ ...area, tdk: buildAreaPageMeta(area) }))

const areas = [
  {
    slug: 'gnome-world',
    name: 'Gnome World',
    type: 'Safe base',
    image: '/images/extracted/area-gnome-tree.png',
    summary:
      'The pre-run island where you store loot, craft equipment, invite teammates, manage respawns, and start the next house run.',
    routeUse:
      'Return here after extraction, bank materials, craft the next route tool, then start the next day only when the team knows the entry plan.',
    dangers: ['No house enemies in the safe base, but bad prep here usually causes failures inside the house.'],
    tasks: ['Start the run from the bell', 'Bank materials before crafting', 'Reset the squad after a failed route'],
    sections: [
      {
        heading: 'What to do in Gnome World',
        body:
          'Use the island as the route planning hub. Empty random loot, choose the next craft, prepare weapons or potions, and only ring the bell after everyone knows the first task target.',
      },
      {
        heading: 'Why this area matters',
        body:
          'Most failed beginner runs start before the house: players bring the wrong tools, forget to bank materials, or start without agreeing on the extraction threshold.',
      },
    ],
  },
  {
    slug: 'well',
    name: 'The Well',
    type: 'Crafting station',
    image: '/images/extracted/area-well.png',
    summary:
      'The main crafting station for weapons, tools, gear, and base furniture recipes that use stored materials.',
    routeUse:
      'Check the Well after every successful extraction. Backpack, Pickaxe, Metal Bat, Spring Shoes, and Potion Table are the early upgrades to compare first.',
    dangers: ['No direct danger, but spending rare materials on the wrong craft slows progression.'],
    tasks: ['Craft route gear', 'Spend materials after extraction', 'Prepare tools before material farming'],
    sections: [
      {
        heading: 'What to craft at The Well',
        body:
          'The Well is where most early progression happens. Prioritize carry capacity, material farming, and basic defense before expensive mobility experiments.',
      },
      {
        heading: 'Material discipline',
        body:
          'Metal, Plastic, Fabric, Ceramics, Chemicals, and Gnomium overlap across many recipes. A good route chooses one craft target before spending resources.',
      },
    ],
  },
  {
    slug: 'potion-table',
    name: 'Potion Table',
    type: 'Potion station',
    image: '/images/extracted/area-tools-board.png',
    summary:
      'The station for turning special ingredients and Ceramics into potions such as Health, Sleep, Strength, Mobility, and Flight.',
    routeUse:
      'Build it once Ceramics and potion ingredients are appearing often enough to support planned potion routes.',
    dangers: ['Potions are expensive if the effect does not solve the current route problem.'],
    tasks: ['Craft potions', 'Prepare status effects', 'Feed Repackager dart routes'],
    sections: [
      {
        heading: 'What to craft at the Potion Table',
        body:
          'All eight potion recipes use Ceramics plus one ingredient. Health, Sleep, Mobility, and Flight are usually easier to justify than random effect testing.',
      },
      {
        heading: 'Potion planning',
        body:
          'A potion should answer one question before you craft it: does this help us survive, move faster, disable a threat, or prepare darts for Blowgun?',
      },
    ],
  },
  {
    slug: 'repackager',
    name: 'Repackager',
    type: 'Dart station',
    image: '/images/extracted/area-tools-board.png',
    summary:
      'A base furniture craft that turns one matching potion into five darts for Blowgun routes.',
    routeUse:
      'Use it only when Blowgun is part of the plan. It converts potion value into ranged status delivery.',
    dangers: ['Costs Gnomium and Chemicals, so it is a poor early craft without Blowgun and potion stock.'],
    tasks: ['Convert potions into darts', 'Prepare ranged status routes', 'Support Blowgun planning'],
    sections: [
      {
        heading: 'When Repackager is worth building',
        body:
          'Build it when the team is already using Blowgun or wants ranged Sleep, Confusion, Health, Mobility, Stamina, Strength, Flight, or Fart effects.',
      },
      {
        heading: 'How it links items and recipes',
        body:
          'Potion pages should link here through their dart versions, and dart pages should link back to Blowgun and the original potion.',
      },
    ],
  },
  {
    slug: 'human-house',
    name: 'Human House',
    type: 'Main task area',
    image: '/images/extracted/area-kitchen.png',
    summary:
      'The active run area where the team completes five generated tasks, steals useful loot, finds weapons, and extracts before time runs out.',
    routeUse:
      'Finish three tasks first, then decide whether extra loot or the remaining tasks are worth the risk.',
    dangers: ['Human patrols', 'Rats and cockroaches', 'Roomba hazards', 'Random weapon and storage pressure'],
    tasks: ['Complete at least three of five tasks', 'Steal random room/category/specific items', 'Break objects', 'Find weapons or tools'],
    sections: [
      {
        heading: 'How to route the Human House',
        body:
          'Start with the safest task cluster. If the team completes three tasks, extraction becomes the priority unless a nearby fourth task or high-value item is almost free.',
      },
      {
        heading: 'Loot discipline inside the house',
        body:
          'Drawers, cabinets, kitchen storage, bathroom storage, and living areas can all pay off, but every search costs patrol time. Search when it supports a task, weapon need, or recipe target.',
      },
    ],
  },
  {
    slug: 'cabinets-drawers',
    name: 'Cabinets and Drawers',
    type: 'Indoor storage',
    image: '/images/extracted/area-cupboard.png',
    summary:
      'Small storage spots for cigarettes, weapons, utensils, potion ingredients, materials, and task loot.',
    routeUse:
      'Open storage when the current route needs a small item, weapon, cigarette, utensil, or special ingredient.',
    dangers: ['Human patrol exposure', 'Rats can appear from cabinet routes', 'Search time can burn the extraction window'],
    tasks: ['Open Cabinet', 'Steal specific items', 'Find cigarettes', 'Find small weapons or utensils'],
    sections: [
      {
        heading: 'What to search here',
        body:
          'Use cabinets and drawers for small-object objectives: cigarette-style loot, utensils, weapons, potion ingredients, and random specific steal tasks.',
      },
      {
        heading: 'When to stop searching',
        body:
          'If the third task is not complete, do not turn every drawer into a full loot route. Check the high-value storage, then move.',
      },
    ],
  },
  {
    slug: 'kitchen',
    name: 'Kitchen',
    type: 'Indoor room',
    image: '/images/extracted/area-kitchen.png',
    summary:
      'High-density room for food, utensils, kitchenware, breakable objects, rats, and several task interactions.',
    routeUse:
      'Route kitchen when the task list mentions cabinets, utensils, blender, microwave metal, food, or break objectives.',
    dangers: ['Rats in cabinet routes', 'Human patrols', 'Noisy object movement'],
    tasks: ['Blender', 'Microwave Metal', 'Open Cabinet', 'Utensil tasks', 'Gather and steal tasks'],
    sections: [
      {
        heading: 'Why Kitchen is high value',
        body:
          'Kitchen stacks task value and loot density. It is one of the best rooms to check when you need utensils, food, materials, or breakable objects.',
      },
      {
        heading: 'Kitchen risk control',
        body:
          'Do not stand in open sight lines while searching cabinets. If rats appear, either leave, use a prepared weapon, or clear them quickly with a known escape line.',
      },
    ],
  },
  {
    slug: 'bathroom',
    name: 'Bathroom',
    type: 'Indoor room',
    image: '/images/extracted/area-bathroom.png',
    summary:
      'Bathroom storage, toilet tasks, hygiene loot, cigarettes, and sometimes high-value weapon searches.',
    routeUse:
      'Route bathroom when toilet tasks, hygiene loot, or small storage searches overlap with the current task list.',
    dangers: ['Human containment spots', 'Tight exits', 'Search time in a small room'],
    tasks: ['Travel through toilet', 'Flood Toilet', 'Flush item toilet', 'Small storage search'],
    sections: [
      {
        heading: 'What bathroom routes are good for',
        body:
          'Bathroom is valuable when toilet tasks appear or when small storage may contain cigarettes, hygiene loot, or weapons.',
      },
      {
        heading: 'Bathroom escape planning',
        body:
          'Because bathroom routes can be tight, know the door, vent, window, or teammate position before committing to a long search.',
      },
    ],
  },
  {
    slug: 'bedroom-living-room',
    name: 'Bedroom and Living Room',
    type: 'Indoor rooms',
    image: '/images/extracted/area-refrigerator.png',
    summary:
      'Common route spaces for TV, music box, books, toys, fabric-like objects, valuables, and human patrol overlap.',
    routeUse:
      'Route these rooms for Break TV, Jonathan/music-box tasks, toy/valuable steals, and safer broad-room navigation.',
    dangers: ['Human patrols', 'Open sight lines', 'Roomba paths in some layouts'],
    tasks: ['Break TV', 'Jonathan spawned', 'JonathanMusicBox', 'Steal toys or valuables'],
    sections: [
      {
        heading: 'What these rooms provide',
        body:
          'Living spaces usually combine task objects, valuables, soft items, and wider movement lanes. They are often easier to route than tight bathroom or kitchen searches.',
      },
      {
        heading: 'How to search safely',
        body:
          'Use furniture and underside hiding spots to break sight. If the human enters, drop greed and move toward the safest exit instead of finishing a long carry.',
      },
    ],
  },
  {
    slug: 'outdoor-lawn',
    name: 'Outdoor Lawn',
    type: 'Exterior route',
    image: '/images/extracted/area-garden.png',
    summary:
      'Exterior area for vine windows, outdoor threats, Fairy-style interactions, cat danger, and garden-adjacent task routes.',
    routeUse:
      'Use the lawn to locate vine-window entries, outdoor NPCs, garden paths, and exterior extraction lines.',
    dangers: ['Cat threat', 'Outdoor exposure', 'Route confusion when windows randomize'],
    tasks: ['Window Open Task', 'Bee sting', 'Garden-related tasks', 'Outdoor NPC interactions'],
    sections: [
      {
        heading: 'Why the lawn matters',
        body:
          'The front door is not the reliable entry. Exterior routing is about finding vine windows, safe outdoor paths, and NPC or garden opportunities.',
      },
      {
        heading: 'Outdoor threat control',
        body:
          'If the cat is active, indoor safety becomes more valuable than outdoor loot. Close doors and windows when possible and avoid long exterior carries.',
      },
    ],
  },
  {
    slug: 'garage-shed',
    name: 'Garage and Shed',
    type: 'Heavy storage',
    image: '/images/extracted/area-tools-board.png',
    summary:
      'Heavy storage areas for tools, explosives, vehicle parts, chainsaw routes, garage remote tasks, and late-run material value.',
    routeUse:
      'Route these areas when the task list points to GarageDoorOpen, minicopter parts, explosives, heavy tools, or vehicle-part steals.',
    dangers: ['Heavy item movement', 'Long carry paths', 'Tool clutter and explosive risk'],
    tasks: ['GarageDoorOpen', 'Build minicopter', 'Vehicle-part routes', 'Explosive tasks'],
    sections: [
      {
        heading: 'What to find in garage and shed routes',
        body:
          'Expect heavy tools, vehicle parts, explosives, and route-specific objects. These areas are valuable but usually slower than small-object rooms.',
      },
      {
        heading: 'When to route heavy storage',
        body:
          'Only commit when the task list rewards it or the team needs a specific weapon/tool. Heavy storage is bad for unfocused looting.',
      },
    ],
  },
  {
    slug: 'greenhouse-garden',
    name: 'Greenhouse and Garden',
    type: 'Outdoor task area',
    image: '/images/extracted/area-garden.png',
    summary:
      'Plant, watering, cutting, bee, and garden-tool routes with outdoor exposure and task-specific value.',
    routeUse:
      'Route this area when Water Plants, Cut Plants, Cut Grass, Bee sting, greenhouse entry, or garden-tool tasks appear.',
    dangers: ['Outdoor exposure', 'Cat risk', 'Tool carry time'],
    tasks: ['Water Plants', 'Cut plants', 'Cut Grass', 'EnterGreenhouse', 'Bee sting'],
    sections: [
      {
        heading: 'What garden routes are good for',
        body:
          'Garden routes are task-driven. Watering Can, Gardening Shears, Bee, and plant objectives can overlap well, but the area is not worth long detours without task value.',
      },
      {
        heading: 'Garden route safety',
        body:
          'Check for exterior threats before carrying tools across the lawn. If the cat is present, shorten outdoor movement and return indoors quickly.',
      },
    ],
  },
  {
    slug: 'weapon-safe',
    name: 'Weapon Safe',
    type: 'Special loot point',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=SAFE',
    summary:
      'Special weapon-storage route tied to Unlock weaponsafe and high-value firearms or heavy weapons.',
    routeUse:
      'Route the safe when the task list includes Unlock weaponsafe or when the team intentionally wants firearms.',
    dangers: ['Time sink', 'Weapon greed', 'Human pressure while searching'],
    tasks: ['Unlock weaponsafe', 'Find firearms', 'Prepare combat route'],
    sections: [
      {
        heading: 'When to open the weapon safe',
        body:
          'Open it when the task list asks for it or when the team has already secured three tasks and wants a weapon for an extra objective.',
      },
      {
        heading: 'How to avoid weapon greed',
        body:
          'A gun does not matter if the day fails. Secure task progress first, then use the safe for optional power or late-route safety.',
      },
    ],
  },
]

export default [
  {
    key: 'categories',
    items: ['Safe base', 'Crafting station', 'Potion station', 'Dart station', 'Main task area', 'Indoor storage', 'Indoor room', 'Exterior route', 'Heavy storage', 'Outdoor task area', 'Special loot point'],
  },
  {
    key: 'areas',
    items: withAreaTdk(areas),
  },
]
