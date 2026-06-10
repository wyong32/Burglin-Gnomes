import { buildRecipePageMeta } from '../utils/contentLabels'

const withRecipeTdk = (recipes) => recipes.map((recipe) => ({ ...recipe, tdk: buildRecipePageMeta(recipe) }))

export default [
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
        status: 'Observed',
        image: '/images/recipe-expanded-backpack.jpg',
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
        image: '/images/material-clonk.jpg',
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
        image: '/images/material-rag-strip.jpg',
      },
      {
        name: 'Plastic Block',
        item: 'plastic-block',
        role: 'Plastic material',
        source: 'Plastic-made objects',
        note: 'Used by Spring Shoes. Exact English item name should be rechecked in the English build.',
        status: 'Observed',
        image: '/images/material-plastic-block.jpg',
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
