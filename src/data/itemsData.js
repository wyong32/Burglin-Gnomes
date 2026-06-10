import { buildItemPageMeta } from '../utils/contentLabels.js'

const placeholder = 'https://placehold.co/160x120/ffdac1/6B9B7B?text='

const withItemTdk = (items) => items.map((item) => ({ ...item, tdk: buildItemPageMeta(item) }))

export default [
  {
    key: 'categories',
    items: ['Materials', 'Weapons', 'Tools', 'Gear', 'Task Items', 'Base Objects', 'Utility Items', 'Hazard Items'],
  },
  {
    key: 'items',
    items: withItemTdk([
      {
        slug: 'clonk',
        name: 'Clonk',
        category: 'Materials',
        type: 'Metal material',
        priority: 'High',
        source: 'Items containing metal',
        use: 'Required by Slap Hammer, Spring Shoes, and Pickaxe.',
        advice:
          'Search metal household objects first. The material journal states that Clonk is gathered from items containing metal.',
        status: 'Observed',
        image: '/images/material-clonk.webp',
        usedIn: ['slap-hammer', 'spring-shoes', 'pickaxe'],
        relatedItems: ['basic-junk', 'plastic-block'],
        sections: [
          {
            heading: 'How to get Clonk',
            body:
              'Clonk comes from metal-containing objects. The safest farming route is to mark metal clutter while completing task objectives, then convert or bank it after the exit route is known.',
          },
          {
            heading: 'Why Clonk matters',
            body:
              'Three early recipes use Clonk. If you are planning Slap Hammer or Pickaxe, treat metal objects as route-value items instead of random junk.',
          },
        ],
      },
      {
        slug: 'basic-junk',
        name: 'Basic Junk',
        category: 'Materials',
        type: 'Common material',
        priority: 'High',
        source: 'Wood, stone, paper, and organic-object sources',
        use: 'Required by Slap Hammer, Expanded Backpack, and Pickaxe.',
        advice:
          'Wood, stone, paper, and organic matter are the main source categories. Exact conversion values should be rechecked after item patches.',
        status: 'Observed',
        image: '/images/material-basic-junk.jpg',
        usedIn: ['slap-hammer', 'expanded-backpack', 'pickaxe'],
        relatedItems: ['clonk', 'rag-strip'],
        sections: [
          {
            heading: 'Best Basic Junk route',
            body:
              'Basic Junk is broad enough that players should collect it while doing normal task routing. Do not overfarm it before the backpack recipe is solved.',
          },
          {
            heading: 'Conversion warning',
            body:
              'Source categories are clear, but exact object-to-material conversion may shift after item patches.',
          },
        ],
      },
      {
        slug: 'rag-strip',
        name: 'Rag Strip',
        category: 'Materials',
        type: 'Fabric material / task item',
        priority: 'High',
        source: 'Fabric, linen, and cloth-type objects',
        use: 'Required by the early collection task and Expanded Backpack.',
        advice:
          'Need 5 for the observed early task list and 3 for Expanded Backpack. Search cloth clutter before heavy loot.',
        status: 'Observed',
        image: '/images/material-rag-strip.webp',
        usedIn: ['expanded-backpack'],
        relatedItems: ['basic-junk'],
        sections: [
          {
            heading: 'Task and crafting overlap',
            body:
              'Rag Strips are important because they serve both the task list and the carry-capacity upgrade. That makes them one of the best early objects to identify.',
          },
          {
            heading: 'Where to look',
            body:
              'Start with fabric-looking objects, bathroom cloth clutter, laundry-style items, and soft piles. Keep the route light until the task count is complete.',
          },
        ],
      },
      {
        slug: 'plastic-block',
        name: 'Plastic Block',
        category: 'Materials',
        type: 'Plastic material',
        priority: 'Medium',
        source: 'Plastic-made objects',
        use: 'Required by Spring Shoes.',
        advice:
          'Search plastic bins, containers, toys, and similar plastic objects once source conversion is tested.',
        status: 'Observed',
        image: '/images/material-plastic-block.webp',
        usedIn: ['spring-shoes'],
        relatedItems: ['clonk'],
        sections: [
          {
            heading: 'Why Plastic Blocks matter',
            body:
              'Plastic Blocks unlock Spring Shoes, which can change vertical movement. That makes plastic sources more important on maps with windows, ledges, or furniture routes.',
          },
        ],
      },
      {
        slug: 'gnome-element',
        name: 'Gnome Element',
        category: 'Materials',
        type: 'Gnome gear material',
        priority: 'Medium',
        source: 'Unknown source',
        use: 'Required by Gnome Gloves.',
        advice:
          'The recipe count is 3, but the source and exact English name still need confirmation.',
        status: 'Retest Required',
        image: '/images/recipe-gnome-gloves.jpg',
        usedIn: ['gnome-gloves'],
        relatedItems: ['unknown-glove-material'],
        sections: [
          {
            heading: 'Why this material is not final',
            body:
              'The recipe count is clear, but the drop source and final English naming are not confirmed yet.',
          },
        ],
      },
      {
        slug: 'unknown-glove-material',
        name: 'Unclear Gnome Gloves Material',
        category: 'Materials',
        type: 'Unverified material',
        priority: 'Low',
        source: 'Unknown source',
        use: 'Unconfirmed second material for Gnome Gloves.',
        advice:
          'Do not use this as a farming target until the English name and icon are verified.',
        status: 'Retest Required',
        image: '/images/recipe-gnome-gloves.jpg',
        usedIn: ['gnome-gloves'],
        relatedItems: ['gnome-element'],
        sections: [
          {
            heading: 'Verification note',
            body:
              'This entry exists to keep the Gnome Gloves recipe honest. It should be replaced once the actual item name is captured clearly.',
          },
        ],
      },
      {
        slug: 'fork',
        name: 'Fork',
        category: 'Task Items',
        type: 'Kitchen task item',
        priority: 'High',
        source: 'Kitchen, dining table, drawers, utensil areas',
        use: 'Required by the steal-a-fork objective.',
        advice: 'Route kitchen early, then leave with it before human movement blocks the exit.',
        status: 'Observed',
        image: `${placeholder}FK`,
        usedIn: [],
        relatedItems: ['small-junk-item'],
        sections: [
          {
            heading: 'Fork route',
            body:
              'Check tables, counters, drawers, dish clutter, and utensil areas before hauling valuables. The fork objective is a route signal, not a random collectible.',
          },
        ],
      },
      {
        slug: 'small-junk-item',
        name: 'Small Junk Item',
        category: 'Task Items',
        type: 'Task utility',
        priority: 'High',
        source: 'Any clutter room',
        use: 'Best candidate for toilet flush and break tasks.',
        advice: 'Keep one disposable object available until flush and break objectives are solved.',
        status: 'Observed',
        image: `${placeholder}J`,
        usedIn: [],
        relatedItems: ['fork', 'rag-strip'],
        sections: [
          {
            heading: 'Why small junk is useful',
            body:
              'Small junk solves objectives without slowing the route. Use it for the toilet flush and break tasks instead of wasting a valuable or hard-to-carry object.',
          },
        ],
      },
      {
        slug: 'slap-hammer',
        name: 'Slap Hammer',
        category: 'Weapons',
        type: 'Weapon / tool',
        priority: 'High after capacity',
        source: 'Gnome-world crafting board',
        use: 'Basic combat or interaction tool with visible material requirements.',
        advice: 'Observed recipe: 3 Clonk and 2 Basic Junk. Damage and stun still need testing.',
        status: 'Observed',
        image: '/images/recipe-slap-hammer.jpg',
        usedIn: [],
        relatedCrafts: ['slap-hammer'],
        relatedItems: ['clonk', 'basic-junk'],
        sections: [
          {
            heading: 'Best use',
            body:
              'Use the Slap Hammer as a defensive and utility option, not as permission to fight everything. Route safety still beats combat testing.',
          },
        ],
      },
      {
        slug: 'electric-gun',
        name: 'Electric Gun',
        category: 'Weapons',
        type: 'Stun weapon',
        priority: 'Threat dependent',
        source: 'Human-world combat and task interaction',
        use: 'Used as a ranged stun or shock weapon against human threats.',
        advice:
          'Treat hit count, stun time, recharge, and recipe data as early notes until your squad confirms them in the live build.',
        status: 'Retest Required',
        image: '/images/weapon-electric-gun.jpg',
        relatedItems: ['handgun', 'slap-hammer'],
        sections: [
          {
            heading: 'What the Electric Gun is for',
            body:
              'Use it as a human-control tool only after you confirm stun duration and range. Any "3–4 hit" claim is rumor until you verify it yourself.',
          },
          {
            heading: 'Task relevance',
            body:
              'Human-target tasks may require stun or ranged interactions. Keep this item tied to task routing until exact wording is verified.',
          },
        ],
      },
      {
        slug: 'handgun',
        name: 'Handgun',
        category: 'Weapons',
        type: 'Ranged weapon',
        priority: 'Threat dependent',
        source: 'Human-world combat and task interaction',
        use: 'Likely tied to shoot-human style objectives or ranged combat testing.',
        advice:
          'Recipe, ammo, damage, and exact task wording need confirmation before this becomes a final weapon route.',
        status: 'Retest Required',
        image: '/images/weapon-handgun.jpg',
        relatedItems: ['electric-gun', 'grenade'],
        sections: [
          {
            heading: 'Why the Handgun is marked',
            body:
              'Gun-related task and combat behavior is important enough to track, but not stable enough for a final damage table yet.',
          },
        ],
      },
      {
        slug: 'grenade',
        name: 'Grenade',
        category: 'Weapons',
        type: 'Explosive weapon',
        priority: 'Route dependent',
        source: 'Human-world combat interaction',
        use: 'May damage small enemies, open routes, or solve blocked encounters.',
        advice:
          'Practice blast range, friendly fire, noise, object damage, and door compatibility before you bring it on a clean route.',
        status: 'Retest Required',
        image: '/images/weapon-grenade.jpg',
        relatedItems: ['handgun', 'crowbar'],
        sections: [
          {
            heading: 'Explosion warning',
            body:
              'An explosive is only good if it creates a safer route. If it wakes human threats or destroys task objects, it can lose a run.',
          },
        ],
      },
      {
        slug: 'expanded-backpack',
        name: 'Expanded Backpack',
        category: 'Gear',
        type: 'Carry upgrade',
        priority: 'Top early craft',
        source: 'Gnome-world crafting board',
        use: 'Increases carrying efficiency and reduces repeat trips.',
        advice: 'Observed recipe: 3 Rag Strips and 1 Basic Junk. Prioritize early because capacity changes every route.',
        status: 'Observed',
        image: '/images/recipe-expanded-backpack.webp',
        usedIn: [],
        relatedCrafts: ['expanded-backpack'],
        relatedItems: ['rag-strip', 'basic-junk'],
        sections: [
          {
            heading: 'Why it is first priority',
            body:
              'More carrying room means fewer trips through human, cat, or pest routes. For most new players, this is the cleanest early upgrade.',
          },
        ],
      },
      {
        slug: 'spring-shoes',
        name: 'Spring Shoes',
        category: 'Gear',
        type: 'Mobility gear',
        priority: 'Route dependent',
        source: 'Gnome-world crafting board',
        use: 'Raises jump height and may help with vertical movement.',
        advice: 'Observed recipe: 1 Clonk and 2 Plastic Blocks. Test fall safety before using it in clean routes.',
        status: 'Observed',
        image: '/images/recipe-spring-shoes.jpg',
        relatedCrafts: ['spring-shoes'],
        relatedItems: ['clonk', 'plastic-block'],
        sections: [
          {
            heading: 'Route value',
            body:
              'Spring Shoes matter when a map rewards vertical movement. They need separate testing around windows, furniture, fall damage, and co-op desync.',
          },
        ],
      },
      {
        slug: 'gnome-gloves',
        name: 'Gnome Gloves',
        category: 'Gear',
        type: 'Hand gear',
        priority: 'Medium',
        source: 'Crafting list',
        use: 'Potential hand, punching, grabbing, or protection upgrade.',
        advice:
          'Current recipe note: 3 Gnome Elements plus 1 unclear secondary material. Confirm the second material name before finalizing.',
        status: 'Retest Required',
        image: '/images/recipe-gnome-gloves.jpg',
        relatedCrafts: ['gnome-gloves'],
        relatedItems: ['gnome-element'],
        sections: [
          {
            heading: 'Testing target',
            body:
              'The gloves should be tested against carrying, punching, grab recovery, and enemy contact. Do not publish a final effect until those checks are repeated.',
          },
        ],
      },
      {
        slug: 'pickaxe',
        name: 'Pickaxe',
        category: 'Tools',
        type: 'Environment tool',
        priority: 'Medium',
        source: 'Crafting list',
        use: 'Likely environment or material interaction.',
        advice: 'Observed recipe: 3 Clonk and 2 Basic Junk. Do not assume mining behavior until interactable targets are confirmed.',
        status: 'Observed',
        image: '/images/recipe-pickaxe.jpg',
        relatedCrafts: ['pickaxe'],
        relatedItems: ['clonk', 'basic-junk'],
        sections: [
          {
            heading: 'What to test',
            body:
              'Test whether the Pickaxe opens resources, damages objects, breaks routes, or only acts as a basic tool. The recipe is clear; the gameplay value still needs field testing.',
          },
        ],
      },
      {
        slug: 'crowbar',
        name: 'Crowbar',
        category: 'Tools',
        type: 'Route tool',
        priority: 'High',
        source: 'Human-world tool use',
        use: 'Used to pry or open doors.',
        advice: 'Track which doors, cabinets, or windows accept crowbar interaction.',
        status: 'Observed',
        image: '/images/tool-crowbar.jpg',
        relatedItems: ['slap-hammer'],
        sections: [
          {
            heading: 'Door and route value',
            body:
              'The Crowbar belongs in route planning. A tool that opens a blocked route is more valuable than a weapon if it prevents a rescue or failed extraction.',
          },
        ],
      },
      {
        slug: 'smoke-tool',
        name: 'Smoke Tool',
        category: 'Utility Items',
        type: 'Utility tool',
        priority: 'Co-op dependent',
        source: 'Tool prompt',
        use: 'Prompt shows a smoke action on left mouse button.',
        advice: 'We are still timing smoke duration, visibility, and whether teammate count changes its value.',
        status: 'Observed',
        image: '/images/smoke-tool.jpg',
        relatedItems: ['crowbar'],
        sections: [
          {
            heading: 'What smoke needs to prove',
            body:
              'Smoke only matters if it changes line of sight, enemy targeting, or rescue timing. It should be tested with humans and animals separately.',
          },
        ],
      },
      {
        slug: 'vacuum-robot',
        name: 'Vacuum Robot',
        category: 'Hazard Items',
        type: 'Moving household hazard',
        priority: 'Patch Sensitive',
        source: 'Human-world household hazard',
        use: 'Can interfere with indoor movement and may be used as a distraction or obstacle.',
        advice:
          'Test whether it blocks, damages, distracts enemies, or simply moves around as route clutter.',
        status: 'Observed',
        image: '/images/tool-vacuum-robot.jpg',
        relatedItems: ['slap-hammer', 'spring-shoes'],
        sections: [
          {
            heading: 'Why we list it here',
            body:
              'Household machines can behave like hazards even when they are not enemies. Track route interference, collision, and whether tools can redirect it.',
          },
        ],
      },
      {
        slug: 'stamina-potion',
        name: 'Stamina Potion',
        category: 'Utility Items',
        type: 'Potion / consumable',
        priority: 'Route dependent',
        source: 'Potion and consumable systems',
        use: 'Likely improves movement or stamina during routes.',
        advice:
          'Duration, crafting source, and stacking rules need testing before it can be recommended for clean routes.',
        status: 'Inferred',
        image: '/images/new-gear.jpg',
        relatedItems: ['spring-shoes'],
        sections: [
          {
            heading: 'Movement value',
            body:
              'A stamina potion matters only if it changes travel time, escape consistency, or heavy-loot hauling. Test it with and without Spring Shoes.',
          },
        ],
      },
      {
        slug: 'oil-barrel',
        name: 'Oil Barrel',
        category: 'Hazard Items',
        type: 'Environmental hazard item',
        priority: 'Patch Sensitive',
        source: 'Environmental hazard systems',
        use: 'Potential fire, slip, or hazard interaction.',
        advice:
          'Do not write final fire-cause advice until oil, stove, and fire interactions are tested together.',
        status: 'Inferred',
        image: '/images/new-map.jpg',
        relatedItems: ['grenade'],
        sections: [
          {
            heading: 'Fire-system warning',
            body:
              'The fire system is unclear. Oil Barrel should stay marked for testing until ignition, spread, and cleanup behavior are verified.',
          },
        ],
      },
      {
        slug: 'purple-crystal',
        name: 'Purple Crystal',
        category: 'Base Objects',
        type: 'Gnome-world object',
        priority: 'Unknown',
        source: 'Gnome-world base area',
        use: 'Possible revive or base-system object; function unclear.',
        advice: 'Keep as a wiki stub until the interaction, cost, or progression use is confirmed.',
        status: 'Retest Required',
        image: '/images/hero-gnome-world.jpg',
        relatedItems: ['wooden-well'],
        sections: [
          {
            heading: 'Why the crystal needs its own test',
            body:
              'The beginner page should explain death and revival separately because players may confuse crystal revival, press-E rescue prompts, and co-op recovery.',
          },
        ],
      },
      {
        slug: 'wooden-well',
        name: 'Wooden Well',
        category: 'Base Objects',
        type: 'Gnome-world object',
        priority: 'Unknown',
        source: 'Gnome-world base area',
        use: 'Possible base interaction point.',
        advice: 'Record whether it stores items, starts upgrades, teleports, or has no gameplay role.',
        status: 'Observed',
        image: '/images/hero-gnome-world.jpg',
        relatedItems: ['purple-crystal'],
        sections: [
          {
            heading: 'Base object note',
            body:
              'The well is visible in the gnome world, but its exact function is not final enough for route advice.',
          },
        ],
      },
    ]),
  },
]
