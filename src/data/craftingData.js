import { buildRecipePageMeta } from '../utils/contentLabels.js'

const withRecipeTdk = (recipes) => recipes.map((recipe) => ({ ...recipe, tdk: buildRecipePageMeta(recipe) }))

export default [
  {
    key: 'craftOrder',
    items: [
      {
        rank: '01',
        recipe: 'expanded-backpack',
        name: 'Expanded Backpack',
        reason: 'Carry capacity reduces repeated trips through human, cat, pest, and hazard routes.',
        timing: 'Craft first when the team is farming materials or trying to finish several small tasks in one route.',
      },
      {
        rank: '02',
        recipe: 'slap-hammer',
        name: 'Slap Hammer',
        reason: 'Basic defense, pest control, and object breaking without depending on rare weapon spawns.',
        timing: 'Craft after backpack unless the current task list forces combat or break objectives early.',
      },
      {
        rank: '03',
        recipe: 'spring-shoes',
        name: 'Spring Shoes',
        reason: 'Fall-damage immunity and vertical movement can make windows, furniture, and exterior paths safer.',
        timing: 'Craft when the house route rewards height or when players keep failing climbs and drops.',
      },
      {
        rank: '04',
        recipe: 'gnome-gloves',
        name: 'Gnome Gloves',
        reason: 'Better hand control may improve opening, grabbing, and precise object handling.',
        timing: 'Craft after the material names and actual handling bonus are confirmed in your current build.',
      },
      {
        rank: '05',
        recipe: 'pickaxe',
        name: 'Pickaxe',
        reason: 'Can support material farming by breaking stolen objects into parts without hauling them home.',
        timing: 'Craft once your squad is deliberately farming parts instead of only clearing task objectives.',
      },
    ],
  },
  {
    key: 'categories',
    items: ['Early Priority', 'Weapons', 'Gear', 'Mobility', 'Tools', 'Base Upgrades', 'Unverified'],
  },
  {
    key: 'recipes',
    items: withRecipeTdk([
      {
        slug: 'expanded-backpack',
        name: 'Expanded Backpack',
        category: 'Early Priority',
        outputItem: 'expanded-backpack',
        priority: 'Top early priority',
        materials: [
          { item: 'rag-strip', name: 'Rag Strip', quantity: 3 },
          { item: 'basic-junk', name: 'Basic Junk', quantity: 1 },
        ],
        effect: 'Increases route efficiency by reducing repeated trips through hostile rooms.',
        bestUse:
          'Craft this before chasing risky valuables. Carry capacity is one of the few upgrades that helps every route.',
        mechanic:
          'More inventory space means fewer return trips through the same danger zones. It is the most beginner-friendly upgrade because it improves both task routing and material farming.',
        scenario: 'Resource collection, early progression, multi-room task routes, and co-op material runs.',
        warning: 'Do not use extra capacity as an excuse to overstay after the three-task extraction line is safe.',
        status: 'Observed',
        image: '/images/recipe-expanded-backpack.webp',
        relatedBestiary: ['human-homeowner', 'cat'],
        sections: [
          {
            heading: 'Why Expanded Backpack comes first',
            body:
              'The backpack reduces repeat exposure. That matters more than early damage because a safer route prevents more failed runs than a weapon does.',
          },
          {
            heading: 'When to delay it',
            body:
              'Delay the backpack only if the current task list demands a weapon, movement tool, or very specific interaction before the team can extract.',
          },
        ],
      },
      {
        slug: 'slap-hammer',
        name: 'Slap Hammer',
        category: 'Weapons',
        outputItem: 'slap-hammer',
        priority: 'High after capacity',
        materials: [
          { item: 'clonk', name: 'Clonk', quantity: 3 },
          { item: 'basic-junk', name: 'Basic Junk', quantity: 2 },
        ],
        effect: 'A sturdy defensive weapon or tool for small threats and route disruption.',
        bestUse:
          'Use it to buy space, not to turn a clean route into a fight. Damage, stun, and enemy response should be rechecked after combat patches.',
        mechanic:
          'Useful against small threats and break objectives. Current route notes put cockroaches at roughly one Slap Hammer hit, rats around two to three hits, and Evil Gnomes around three hits.',
        scenario: 'Basic combat, break tasks, pest control, and emergency defense after capacity is solved.',
        warning: 'Hit counts are marked for retest. Do not stand still trading hits in cluttered rooms.',
        status: 'Observed',
        image: '/images/recipe-slap-hammer.jpg',
        relatedBestiary: ['cockroach', 'rat', 'evil-gnome', 'human-homeowner'],
        sections: [
          {
            heading: 'Combat value',
            body:
              'The recipe is visible, but the actual combat value depends on stun, swing timing, hitbox, and enemy response. Test those outside progression runs.',
          },
          {
            heading: 'Route value',
            body:
              'If the Slap Hammer can interrupt small enemies or break objects reliably, it becomes a strong task-support craft.',
          },
        ],
      },
      {
        slug: 'spring-shoes',
        name: 'Spring Shoes',
        category: 'Mobility',
        outputItem: 'spring-shoes',
        priority: 'Route dependent',
        materials: [
          { item: 'clonk', name: 'Clonk', quantity: 1 },
          { item: 'plastic-block', name: 'Plastic Block', quantity: 2 },
        ],
        effect: 'Raises jump height and can help with human-scale furniture, windows, and vertical routes.',
        bestUse:
          'Use after you know where vertical movement saves time. Practice fall risk and co-op sync before you rely on it in a clean run.',
        mechanic:
          'Spring Shoes help with parkour, high-low movement, and fall-damage safety. They can also make noise when jumping, so stealth routes need extra care.',
        scenario: 'Window climbs, furniture routes, exterior paths, drop recovery, and awkward vertical exits.',
        warning: 'Movement gear can amplify weak-body bugs, desync, and bad landings. Test it before progression runs.',
        status: 'Observed',
        image: '/images/recipe-spring-shoes.jpg',
        relatedBestiary: ['cat', 'human-homeowner'],
        sections: [
          {
            heading: 'Best map use',
            body:
              'Spring Shoes are most valuable when a route has windows, counters, furniture, shelves, or exterior height changes that shorten extraction.',
          },
          {
            heading: 'Risk note',
            body:
              'Mobility tools can create desync, fall damage, or body-control issues. Keep a separate testing note for any muscle-weakness or ragdoll behavior.',
          },
        ],
      },
      {
        slug: 'pickaxe',
        name: 'Pickaxe',
        category: 'Tools',
        outputItem: 'pickaxe',
        priority: 'Route dependent',
        materials: [
          { item: 'clonk', name: 'Clonk', quantity: 3 },
          { item: 'basic-junk', name: 'Basic Junk', quantity: 2 },
        ],
        effect: 'Possible environment, material, or object-interaction tool.',
        bestUse:
          'Craft once interactable targets are mapped. The recipe is clear, but the value depends on what it actually changes in a run.',
        mechanic:
          'Use the Pickaxe as a material-efficiency tool: break stolen objects into parts on site when carrying the whole object home is too slow or unsafe.',
        scenario: 'Material farming, heavy-object routes, and runs where the squad wants parts more than trophies.',
        warning: 'Confirm which objects can be dismantled before routing around it.',
        status: 'Observed',
        image: '/images/recipe-pickaxe.jpg',
        relatedBestiary: [],
        sections: [
          {
            heading: 'Testing checklist',
            body:
              'Test whether it breaks objects faster, opens routes, gathers materials, damages enemies, or only functions as a carried tool.',
          },
        ],
      },
      {
        slug: 'gnome-gloves',
        name: 'Gnome Gloves',
        category: 'Unverified',
        outputItem: 'gnome-gloves',
        priority: 'Threat dependent',
        materials: [
          { item: 'gnome-element', name: 'Gnome Element', quantity: 3 },
          { item: 'unknown-glove-material', name: 'Unclear secondary material', quantity: 1 },
        ],
        effect: 'Potential hand, protection, grabbing, or punching upgrade.',
        bestUse:
          'Do not treat it as confirmed combat gear until the second material name and effect are tested in the English build.',
        mechanic:
          'Gnome Gloves are tracked as precision-hand gear: better handling, door interaction, small-object control, or close interaction may be the value.',
        scenario: 'Advanced stealth, door and drawer work, small item handling, and possible grab recovery tests.',
        warning: 'Material names and exact stat effect still need retesting; keep this as a marked recipe.',
        status: 'Retest Required',
        image: '/images/recipe-gnome-gloves.jpg',
        relatedBestiary: ['human-homeowner', 'cat'],
        sections: [
          {
            heading: 'Why this recipe stays marked',
            body:
              'The material count for Gnome Element is clear, but the second material name still needs confirmation. Keep the recipe visible but labeled.',
          },
        ],
      },
    ]),
  },
  {
    key: 'materials',
    items: [
      {
        name: 'Clonk',
        item: 'clonk',
        role: 'Metal material',
        source: 'Items containing metal',
        note:
          'Used by Slap Hammer, Spring Shoes, and Pickaxe. The material guide describes it as gathered from metal-containing items.',
        status: 'Observed',
        image: '/images/material-clonk.webp',
      },
      {
        name: 'Basic Junk',
        item: 'basic-junk',
        role: 'Common material',
        source: 'Items containing wood, stone, paper, or organic matter',
        note:
          'Used by Slap Hammer, Expanded Backpack, and Pickaxe. Exact conversion values may change after item patches.',
        status: 'Observed',
        image: '/images/material-basic-junk.jpg',
      },
      {
        name: 'Rag Strip',
        item: 'rag-strip',
        role: 'Fabric material / task item',
        source: 'Fabric, linen, and cloth-type objects',
        note: 'Used by the Expanded Backpack and also appears as an early task target.',
        status: 'Observed',
        image: '/images/material-rag-strip.webp',
      },
      {
        name: 'Plastic Block',
        item: 'plastic-block',
        role: 'Plastic material',
        source: 'Plastic-made objects',
        note: 'Used by Spring Shoes. Exact English item name should be rechecked in the English build.',
        status: 'Observed',
        image: '/images/material-plastic-block.webp',
      },
      {
        name: 'Gnome Element',
        item: 'gnome-element',
        role: 'Gnome gear material',
        source: 'Unknown',
        note: 'Used by Gnome Gloves. Source and exact English naming still need confirmation.',
        status: 'Retest Required',
        image: '/images/recipe-gnome-gloves.jpg',
      },
    ],
  },
]
