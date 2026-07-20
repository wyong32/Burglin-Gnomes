import { buildAreaPageMeta } from '../utils/contentLabels.js'

const withAreaTdk = (areas) => {
  const source = areas.find((area) => area.slug === 'gnome-world')
  const bathroom = areas.find((area) => area.slug === 'bathroom')
  if (source?.deepDiveSections?.length && bathroom && !bathroom.deepDiveSections?.length) {
    bathroom.deepDiveSections = source.deepDiveSections
    delete source.deepDiveSections
  }
  return areas.map((area) => ({ ...area, tdk: buildAreaPageMeta(area) }))
}

const areas = [
  {
    slug: 'gnome-world',
    name: 'Gnome World',
    type: 'Safe base',
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Gnome World',
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
    deepDiveSections: [
      {
        heading: 'Bathroom route quick answer',
        paragraphs: [
          'Route Bathroom when the task list points to a toilet interaction, hygiene loot, cigarettes, or a small-storage search. Treat it as a compact objective room, not a place to clear automatically. The narrow layout can turn a long cabinet search into a containment problem when the human arrives, so identify the door and any alternate teammate position before opening storage. Finish the named interaction first, take only useful nearby loot, and leave before the room becomes the center of the run.',
        ],
      },
      {
        heading: 'Plan entry and exit before searching',
        paragraphs: [
          'Pause at the room edge and name the escape line. One player should be able to leave without crossing the person who is interacting with the toilet or cabinet. Keep carried objects out of the doorway, because a dropped item can make an already tight route harder to read. If the team entered through a recognizable window, vent, or connected room, repeat that return route aloud. The goal is to make the exit obvious before a human patrol, physics event, or rescue call removes the time needed to think.',
        ],
      },
      {
        heading: 'Use a task-first search order',
        paragraphs: [
          'Start with the exact task object. For Travel through toilet, Flood Toilet, or Flush item toilet, confirm the interaction and task registration before opening unrelated cabinets. For a small-storage search, work from the nearest container toward the exit and stop when the required item or a higher-priority piece of loot is found. This order avoids spending the extraction window on low-value clutter. It also makes a failed interaction easier to diagnose because the room was quiet before extra objects and players were added.',
        ],
      },
      {
        heading: 'Handle human and rat pressure',
        paragraphs: [
          'The Bathroom is dangerous when a threat controls the only comfortable doorway. A human can turn a small room into a containment spot, while rats from storage routes can punish a player who is focused on drawers. Do not start a long fight beside the objective. Leave, create space, and return with a known weapon or control plan when the room matters to the task sheet. If the objective is optional, abandon it and protect the three-task clear instead of converting a short visit into a rescue chain.',
        ],
      },
      {
        heading: 'Split co-op responsibilities',
        paragraphs: [
          'A simple two-player split works well: the route player completes the interaction or searches one storage line, while the safety player watches the approach and keeps the exit open. Extra teammates should not crowd the toilet or doorway. They can hold the connected room, carry confirmed loot out, or continue a second safe objective. The watcher calls stop as soon as the patrol changes. The searcher should leave immediately rather than finishing one more drawer, because the value of the room comes from task overlap, not from clearing every container.',
        ],
      },
      {
        heading: 'Separate flood mechanics from bugs',
        paragraphs: [
          'Flood, flush, ragdoll, weak-body behavior, and co-op desync can look similar during a noisy attempt. Test one interaction at a time. Record whether the task registered, which player initiated it, whether an item was held, and whether the result matched for host and guest. If a player becomes stuck or the physics state looks wrong, use the established bug-fix and revive guidance rather than repeating the same interaction with the whole squad in the room. Patch-sensitive evidence is more useful than a confident guess.',
        ],
      },
      {
        heading: 'Bathroom completion checklist',
        paragraphs: [
          'Leave the room when the named task is complete, the useful storage line is checked, or the escape becomes uncertain. Revisit only if the remaining task list still requires it. After game updates, recheck toilet task wording, flood behavior, small-storage contents, threat pathing, and whether doors or connected routes behave differently. This guide does not assume fixed spawns or guaranteed weapon finds; those claims require repeatable runs.',
        ],
        bullets: [
          'Confirm the task before entering and the registration before looting.',
          'Keep the doorway and return route free of dropped objects.',
          'Assign one searcher and one watcher instead of crowding the room.',
          'Exit on threat pressure unless Bathroom still blocks the three-task clear.',
        ],
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
          'Clonk, Plastic, Fabric, Fraggles, Chemicals, and Gnomium overlap across many recipes. A good route chooses one craft target before spending resources.',
      },
    ],
  },
  {
    slug: 'potion-table',
    name: 'Potion Table',
    type: 'Potion station',
    image: '/images/extracted/area-tools-board.png',
    summary:
      'The station for turning special ingredients and Fraggles into potions such as Health, Sleep, Strength, Mobility, and Flight.',
    routeUse:
      'Build it once Fraggles and potion ingredients are appearing often enough to support planned potion routes.',
    dangers: ['Potions are expensive if the effect does not solve the current route problem.'],
    tasks: ['Craft potions', 'Prepare status effects', 'Feed Repackager dart routes'],
    sections: [
      {
        heading: 'What to craft at the Potion Table',
        body:
          'All eight potion recipes use Fraggles plus one ingredient. Health, Sleep, Mobility, and Flight are usually easier to justify than random effect testing.',
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
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Repackager',
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
    image: '/images/human-world.webp',
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
    image: '/images/extracted/area-drawer.png',
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
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Kitchen',
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
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Bathroom',
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
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Bedroom and Living Room',
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
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Outdoor Lawn',
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
    contentExpansionSections: [
      {
        heading: 'Read the lawn before committing to an entry',
        paragraphs: [
          'Outdoor Lawn is not just empty ground between the gnome base and the house. It is the decision space where the team chooses an entry, identifies exterior threats, and decides whether garden or NPC opportunities belong in the current run. Pause at a safe observation point before spreading out. Locate the usable approach, note which door or window can support a return, and match those options to the task list instead of running toward the first visible opening.',
          'Vine-window routes can change which side of the house is useful, so avoid memorizing one guaranteed entrance. Use visible landmarks and communicate the selected entry for this run. If no outside task overlaps the approach, cross the lawn with a purpose and move indoors. Searching every edge for an ideal route can cost more time than a slightly longer but clearly understood entry.',
        ],
      },
      {
        heading: 'Cluster outdoor tasks into one exposure window',
        paragraphs: [
          'Read Window Open, Bee sting, garden-related work, and outdoor NPC interactions as a possible cluster rather than four separate trips. Group only the objectives that share a safe side of the map and can be completed without carrying unnecessary loot back and forth. One planned exterior pass reduces repeated exposure and gives the team a clear moment to reassess before entering the house.',
          'Do not force every outside objective into the same pass. A task that requires a missing tool, an uncertain NPC request, or a dangerous threat position may belong later. Finish the reliable overlap first, then decide whether the remaining task still contributes to the three-task minimum. Task clustering is valuable because it shortens indecision, not because it creates a rule that the lawn must be fully cleared.',
        ],
      },
      {
        heading: 'Plan carries around doors, windows, and cover',
        paragraphs: [
          'Before moving a heavy or important object across the lawn, walk the return line without the burden. Check the opening, the turn back toward safety, and the place where the carrier can drop the item without blocking everyone else. A route that is comfortable for an empty scout may be poor for a slow carrier, especially when the entry requires precise movement or a teammate to hold access.',
          'Use doors, windows, walls, and terrain as decision points. The carrier announces each transition; the safety player checks the next exposed segment before the item moves. If the route closes or a threat occupies the path, set the object down in a recoverable position and choose another line. Protecting the task item and the carrier is more important than preserving a perfectly continuous carry.',
        ],
      },
      {
        heading: 'Reroute for the cat and other exterior threats',
        paragraphs: [
          'The cat changes the value of open ground. When it is active near the planned route, reduce time outside, stop optional searches, and favor an entry that the whole team can identify quickly. Do not assume that distance alone makes a line safe; use current sight, cover, and an available indoor break point. If the threat position is unclear, send a light scout rather than the objective carrier.',
          'Bee and other exterior encounters have different purposes, so keep their task context separate from cat avoidance. A Bee sting objective may justify a controlled interaction, while an unrelated encounter should not pull the squad away from extraction. For any threat, call the reroute before players split. Six individual reactions create more danger than one conservative team decision.',
        ],
      },
      {
        heading: 'Split scout, carrier, and safety roles in co-op',
        paragraphs: [
          'A small team can cover three simple jobs even when one player holds two of them. The scout confirms the next opening and reports threats. The carrier moves the task object or important loot only after that report. The safety player watches the previous segment, keeps the retreat recognizable, and helps with doors or rescues. Name the jobs at the start of the exterior pass so everyone knows who should move first.',
          'Solo players can use the same structure as a checklist: scout a short segment, return to the object, carry it to the next safe point, then repeat. This is slower than a blind sprint but easier to recover when the layout or threat position differs from the previous run. In larger groups, avoid sending every unassigned player ahead; extra bodies can hide hazards and make narrow entries harder to read.',
        ],
      },
      {
        heading: 'Choose the extraction moment and recheck changed routes',
        paragraphs: [
          'Once three tasks are secure, the lawn becomes an extraction decision rather than a general loot field. Count the completed objectives, identify who carries the most important item, and choose the return line before adding optional garden or house searches. If the team is damaged, separated, or uncertain about the cat, take the conservative extraction. A clean banked run is better than losing finished work to one final detour.',
          'Patch Sensitive: after an update, verify which openings are usable, whether visible vine-window behavior matches the current guide, how exterior task wording appears, and whether threat or NPC placement has changed. Record the route and game version from a low-value run before publishing a firm recommendation. This page intentionally avoids guaranteed layouts, spawn rates, exact detection distances, and fixed timing claims.',
        ],
      },
    ],
  },
  {
    slug: 'garage-shed',
    name: 'Garage and Shed',
    type: 'Heavy storage',
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Garage and Shed',
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
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Greenhouse and Garden',
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
    image: 'https://placehold.co/300x200/ffdac1/6B9B7B?text=Weapon Safe',
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
