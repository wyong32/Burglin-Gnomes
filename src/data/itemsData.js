import { buildItemPageMeta } from '../utils/contentLabels.js'

const icon = (slug) => `/images/items/item-${slug}.png`

const withItemTdk = (items) => items.map((item) => ({ ...item, tdk: buildItemPageMeta(item) }))

const allItemsSource = 'House-run loot: check drawers, shelves, cabinets, outdoor spots, and special task pickups'
const craftSource = 'Crafted at the well'
const potionSource = 'Crafted at the Potion Table'
const repackagerSource = 'Convert 1 matching potion into 5 darts at the Repackager'
const resourceSource =
  'Household resource: break or steal matching clutter, then bank it for crafting'

function titleCase(value) {
  return value
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function sentenceList(entries) {
  return entries.map(({ quantity, name }) => `${quantity} ${name}`).join(' + ')
}

function makeItem({
  slug,
  name,
  category,
  type,
  priority,
  source,
  use,
  advice,
  image = icon(slug),
  relatedItems = [],
  areas = [],
  acquisition = [],
  stats = [],
  sections = [],
}) {
  return {
    slug,
    name,
    category,
    type,
    priority,
    source,
    use,
    advice,
    image,
    relatedItems,
    areas,
    acquisition,
    stats,
    relatedCrafts: [],
    usedIn: [],
    sections,
  }
}

function recipeItem({ slug, name, category, type, priority, materials, use, advice, relatedItems = [], sections = [] }) {
  const recipeText = sentenceList(materials)

  return makeItem({
    slug,
    name,
    category,
    type,
    priority,
    source: `${craftSource}: ${recipeText}`,
    use,
    advice,
    relatedItems: [...materials.map((material) => material.slug), ...relatedItems],
    sections: [
      { heading: `How to get ${name}`, body: `Craft it at the well with ${recipeText}.` },
      ...sections,
    ],
  })
}

function potionItem({ key, ingredient, effectName, priority, use }) {
  const name = `${titleCase(key)} Potion`
  return makeItem({
    slug: `${key}-potion`,
    name,
    category: 'Potions',
    type: 'Potion / consumable',
    priority,
    source: `${potionSource}: 1 ${ingredient.name} + 1 Ceramics`,
    use,
    advice: `Drink it to apply the ${effectName} potion status to the player, or convert it into ${titleCase(key)} Darts for Blowgun delivery.`,
    relatedItems: [ingredient.slug, 'ceramics', `${key}-dart`],
    sections: [
      {
        heading: `How to get ${name}`,
        body: `Craft it at the Potion Table with 1 ${ingredient.name} and 1 Ceramics.`,
      },
      {
        heading: 'Use and properties',
        body:
          'Drink the potion during an active run to trigger its temporary effect. Save it for routes where the effect solves a real problem.',
      },
    ],
  })
}

function dartItem({ key, effectName, priority }) {
  const name = `${titleCase(key)} Dart`
  return makeItem({
    slug: `${key}-dart`,
    name,
    category: 'Ammo',
    type: 'Blowgun ammo',
    priority,
    source: repackagerSource,
    use: `Ammo for Blowgun that applies the ${effectName} potion status on valid blow-dart targets.`,
    advice: `Prepare ${name} only when you also have Blowgun; it is not fired by itself.`,
    relatedItems: [`${key}-potion`, 'blowgun'],
    sections: [
      {
        heading: `How to get ${name}`,
        body: `Put 1 ${titleCase(key)} Potion into the Repackager to receive 5 ${name}.`,
      },
      {
        heading: 'Use and properties',
        body:
          'Blowgun spends one dart per shot and can still chip valid targets even when the main value is the potion effect.',
      },
    ],
  })
}

const materials = [
  makeItem({
    slug: 'ceramics',
    name: 'Ceramics',
    category: 'Materials',
    type: 'Core resource',
    priority: 'Very high',
    source: resourceSource,
    use: 'Required by every potion recipe and by Gnomium Gloves, Glider, and Eyeglass-related crafting.',
    advice: 'Treat Ceramics as a universal bottleneck because all eight potion recipes consume it.',
    relatedItems: ['flight-potion', 'health-potion', 'gnomium-gloves', 'glider'],
    sections: [
      {
        heading: 'How to get Ceramics',
        body:
          'Break or steal household objects that drop Ceramics, then carry the resource home or deposit it in storage before crafting.',
      },
      {
        heading: 'Recipe uses',
        body:
          'Used in Flight, Strength, Health, Confusion, Mobility, Sleep, Stamina, and Fart Potions, plus Gnomium Gloves, Glider, and Eyeglass.',
      },
    ],
  }),
  makeItem({
    slug: 'chemicals',
    name: 'Chemicals',
    category: 'Materials',
    type: 'Core resource',
    priority: 'High',
    source: resourceSource,
    use: 'Used for Mobility Potion, Stamina Potion, Slingshot, and Blowgun.',
    advice: 'Save Chemicals when planning ranged gear or movement/stamina potion routing.',
    relatedItems: ['mobility-potion', 'stamina-potion', 'slingshot', 'blowgun'],
    sections: [
      {
        heading: 'How to get Chemicals',
        body:
          'Gather them from chemical-looking household loot or break suitable objects into resource drops, then bank the material before the next craft.',
      },
      { heading: 'Recipe uses', body: 'recipe uses are Mobility Potion, Stamina Potion, Slingshot, and Blowgun.' },
    ],
  }),
  makeItem({
    slug: 'fabric',
    name: 'Fabric',
    category: 'Materials',
    type: 'Core resource',
    priority: 'High',
    source: resourceSource,
    use: 'Used for Backpack, Flight Potion, Glider, Glue Gloves, and Boxing Gloves.',
    advice: 'Fabric feeds carry capacity and movement gear, so do not spend it all before deciding on Backpack or Glider.',
    relatedItems: ['backpack', 'flight-potion', 'glider', 'glue-gloves', 'boxing-gloves'],
    sections: [
      {
        heading: 'How to get Fabric',
        body:
          'Gather it from cloth-like and soft household objects, then bank it before spending it on carry gear or movement gear.',
      },
      { heading: 'Recipe uses', body: 'recipe uses are Backpack, Flight Potion, Glider, Glue Gloves, and Boxing Gloves.' },
    ],
  }),
  makeItem({
    slug: 'metal',
    name: 'Metal',
    category: 'Materials',
    type: 'Core resource',
    priority: 'High',
    source: resourceSource,
    use: 'Used for Metal Bat, Spring Shoes, Pickaxe, Grappling Hook, Marble Gun, and Sleep Potion.',
    advice: 'Metal is the main tool and weapon resource; reserve it when planning Pickaxe, Grappling Hook, or Marble Gun.',
    relatedItems: ['metal-bat', 'spring-shoes', 'pickaxe', 'grappling-hook', 'marble-gun', 'sleep-potion'],
    sections: [
      {
        heading: 'How to get Metal',
        body:
          'Gather it from metal household objects, kitchenware, tools, or breakable loot. Pickaxe routes can turn heavy objects into easier resource drops.',
      },
      {
        heading: 'Recipe uses',
        body:
          'recipe uses are Metal Bat, Spring Shoes, Pickaxe, Grappling Hook, Marble Gun, and Sleep Potion.',
      },
    ],
  }),
  makeItem({
    slug: 'plastic',
    name: 'Plastic',
    category: 'Materials',
    type: 'Core resource',
    priority: 'High',
    source: resourceSource,
    use: 'Used for Spring Shoes, Helmet, Glue Gloves, Marble Gun, and Confusion Potion.',
    advice: 'Plastic is the shared gate for several mobility, defense, and ranged recipes.',
    relatedItems: ['spring-shoes', 'helmet', 'glue-gloves', 'marble-gun', 'confusion-potion'],
    sections: [
      {
        heading: 'How to get Plastic',
        body:
          'Gather it from plastic household objects and storage loot, then carry the resource home or deposit it for crafting.',
      },
      { heading: 'Recipe uses', body: 'recipe uses are Spring Shoes, Helmet, Glue Gloves, Marble Gun, and Confusion Potion.' },
    ],
  }),
  makeItem({
    slug: 'gnomium',
    name: 'Gnomium',
    category: 'Materials',
    type: 'Rare resource',
    priority: 'Very high',
    source: 'Rare resource found during gnome-world and outdoor routes',
    use: 'Required for Gnomium Gloves and Grappling Hook.',
    advice: 'Do not spend Gnomium casually; it is reserved for expensive gear that changes how routes are played.',
    relatedItems: ['gnomium-gloves', 'grappling-hook'],
    sections: [
      {
        heading: 'How to get Gnomium',
        body:
          'Pick up Gnomium whenever you see it; it is rare enough that the route should bank it before spending it on expensive gear.',
      },
      {
        heading: 'Spawn properties',
        body:
          'Treat Gnomium as a rare route reward. If the squad finds it, bank it before pushing deeper into a risky house run.',
      },
    ],
  }),
  makeItem({
    slug: 'poopling',
    name: 'Poopling',
    category: 'Materials',
    type: 'Special potion ingredient',
    priority: 'Potion dependent',
    source: `${allItemsSource}`,
    use: 'Required with Ceramics to craft Fart Potion.',
    advice: 'Keep it if the route needs Fart Potion or Fart Darts.',
    relatedItems: ['fart-potion', 'fart-dart'],
    sections: [
      { heading: 'How to get Poopling', body: 'Keep it as special loot when the route is preparing the matching potion; exact room spawns can vary by house layout.' },
      { heading: 'Recipe use', body: 'Use 1 Poopling and 1 Ceramics to craft Fart Potion.' },
    ],
  }),
  makeItem({
    slug: 'scraplings',
    name: 'Scraplings',
    category: 'Materials',
    type: 'Special potion ingredient',
    priority: 'Potion dependent',
    source: `${allItemsSource}`,
    use: 'Required with Ceramics to craft Health Potion.',
    advice: 'Keep it for healing routes or Health Dart preparation.',
    relatedItems: ['health-potion', 'health-dart'],
    sections: [
      { heading: 'How to get Scraplings', body: 'Keep it as special loot when the route is preparing the matching potion; exact room spawns can vary by house layout.' },
      { heading: 'Recipe use', body: 'Use 1 Scraplings and 1 Ceramics to craft Health Potion.' },
    ],
  }),
  makeItem({
    slug: 'tusk',
    name: 'Tusk',
    category: 'Materials',
    type: 'Special potion ingredient',
    priority: 'Potion dependent',
    source: `${allItemsSource}`,
    use: 'Required with Ceramics to craft Strength Potion.',
    advice: 'Save it when a route needs Strength Potion or Strength Darts.',
    relatedItems: ['strength-potion', 'strength-dart'],
    sections: [
      { heading: 'How to get Tusk', body: 'Keep it as special loot when the route is preparing the matching potion; exact room spawns can vary by house layout.' },
      { heading: 'Recipe use', body: 'Use 1 Tusk and 1 Ceramics to craft Strength Potion.' },
    ],
  }),
]

const weapons = [
  recipeItem({
    slug: 'metal-bat',
    name: 'Metal Bat',
    category: 'Weapons',
    type: 'Hand weapon',
    priority: 'High after resource setup',
    materials: [{ slug: 'metal', name: 'Metal', quantity: 3 }],
    use: 'Melee equipment that sends MetalBat hit messages to hittable targets.',
    advice: 'Use it for close-range defense and object hits; do not confuse it with older guide names.',
    relatedItems: ['pickaxe', 'branch'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use it as a close-range hit tool for pests, fragile objects, and emergency space-making.',
      },
    ],
  }),
  makeItem({
    slug: 'branch',
    name: 'Branch',
    category: 'Weapons',
    type: 'Improvised hand item',
    priority: 'Situational',
    source: allItemsSource,
    use: 'Branch works as an improvised hit item when better weapons are not ready.',
    advice: 'Treat it as an improvised item unless a task or nearby target specifically makes it useful.',
    relatedItems: ['metal-bat'],
    sections: [
      { heading: 'How to get Branch', body: 'Look for Branch as loose loot or a special carried item during house routes.' },
      { heading: 'Use and properties', body: 'Use it as a quick improvised hit rather than a crafted weapon.' },
    ],
  }),
  recipeItem({
    slug: 'slingshot',
    name: 'Slingshot',
    category: 'Weapons',
    type: 'Ranged weapon',
    priority: 'Route dependent',
    materials: [{ slug: 'chemicals', name: 'Chemicals', quantity: 2 }],
    use: 'Crafted ranged item for planned distance play.',
    advice: 'Use when a run benefits from a light ranged option and you have spare Chemicals.',
    relatedItems: ['chemicals', 'blowgun', 'marble-gun'],
    sections: [{ heading: 'Use and properties', body: 'Use it when the squad needs a simple ranged option and has spare Chemicals.' }],
  }),
  recipeItem({
    slug: 'marble-gun',
    name: 'Marble Gun',
    category: 'Weapons',
    type: 'Ranged weapon',
    priority: 'High if you have Marble ammo',
    materials: [
      { slug: 'plastic', name: 'Plastic', quantity: 3 },
      { slug: 'metal', name: 'Metal', quantity: 2 },
    ],
    use: 'Shoots Marble ammo as a projectile and can damage or knock targets that accept hits.',
    advice: 'Craft it together with a Marble supply; it consumes one Marble per shot.',
    relatedItems: ['marble'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Each shot spends 1 Marble, hits hard for a small weapon, and can knock targets around enough to buy escape time.',
      },
    ],
  }),
  recipeItem({
    slug: 'boxing-gloves',
    name: 'Boxing Gloves',
    category: 'Weapons',
    type: 'Hand weapon',
    priority: 'Situational',
    materials: [{ slug: 'fabric', name: 'Fabric', quantity: 3 }],
    use: 'Hand equipment tied to punch-style close interaction.',
    advice: 'A Fabric-only combat craft is useful when Metal is reserved for tools.',
    relatedItems: ['fabric', 'metal-bat', 'gnomium-gloves'],
    sections: [{ heading: 'Use and properties', body: 'Use Boxing Gloves when the route needs close-range interaction and Fabric is easier to spend than Metal.' }],
  }),
  recipeItem({
    slug: 'blowgun',
    name: 'Blowgun',
    category: 'Weapons',
    type: 'Status ranged weapon',
    priority: 'High if preparing darts',
    materials: [{ slug: 'chemicals', name: 'Chemicals', quantity: 1 }],
    use: 'Fires potion darts and applies the dart potion status to valid blow-dart targets.',
    advice: 'Craft only after deciding which potion darts the route needs.',
    relatedItems: ['confusion-dart', 'sleep-dart', 'health-dart'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Blowgun spends one dart per shot. Pick the dart effect before the run so the weapon matches the target or route problem.',
      },
    ],
  }),
]

const houseWeapons = [
  makeItem({
    slug: 'gun',
    name: 'Gun',
    category: 'Weapons',
    type: 'House weapon',
    priority: 'Very high when found',
    source: 'House weapon: check drawers, cabinets, bathroom storage, weapon-safe routes, and random weapon spawns.',
    use: 'A firearm with 15 bullets. Shots kill valid health targets on hit, so it is one of the strongest emergency weapons in a run.',
    advice: 'Do not waste bullets on clutter. Save it for humans, late-run pressure, or a rescue route where one clean shot matters.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=GN',
    relatedItems: ['shotgun', 'grenade', 'taser', 'marble-gun'],
    areas: ['human-house', 'bathroom', 'cabinets-drawers', 'weapon-safe'],
    acquisition: [
      'Search drawers and cabinets before assuming a house has no gun.',
      'Weapon-safe routes can expose firearms when the safe is part of the generated house setup.',
      'Current spawn rules allow only one Gun in the house weapon pool.',
    ],
    stats: ['15 bullets', 'Single pellet', 'Kills valid HealthBase targets on hit'],
    sections: [
      {
        heading: 'Where to find Gun',
        body:
          'Check bathroom storage, drawers, cabinets, and weapon-safe paths. If the house layout does not roll the right storage, route time is usually better spent on tasks instead of forcing a gun search.',
      },
      {
        heading: 'How to use Gun',
        body:
          'Use it for clean threat removal or rescue windows. A gunshot is loud and limited by ammo, so every shot should either remove a threat or save a teammate.',
      },
    ],
  }),
  makeItem({
    slug: 'shotgun',
    name: 'Shotgun',
    category: 'Weapons',
    type: 'House weapon',
    priority: 'Very high when found',
    source: 'House weapon: rare heavy firearm from weapon-style spawns and storage routes.',
    use: 'A close-range firearm with 7 shells and 20 pellets per shot. It is stronger at short range than a normal gun but easier to waste.',
    advice: 'Use it only when the target is close and the escape line is known. Spread makes sloppy shots expensive.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=SG',
    relatedItems: ['gun', 'rocket-launcher', 'grenade'],
    areas: ['human-house', 'weapon-safe', 'garage-shed'],
    acquisition: [
      'Prioritize weapon-safe and storage routes if the task list already sends you through those rooms.',
      'Do not spend the whole day hunting it when three tasks are still unfinished.',
    ],
    stats: ['7 shells', '20 pellets per shot', 'Best at close range'],
    sections: [
      {
        heading: 'Where to find Shotgun',
        body:
          'Treat Shotgun as a rare house weapon. Check weapon-safe routes and heavy storage areas, then leave the search if the route becomes unsafe.',
      },
      {
        heading: 'How to use Shotgun',
        body:
          'Use it at close range against major threats. Because each shot consumes one of only seven shells, it is poor for random object testing.',
      },
    ],
  }),
  makeItem({
    slug: 'grenade',
    name: 'Grenade',
    category: 'Weapons',
    type: 'Explosive house weapon',
    priority: 'High, but risky',
    source: 'House weapon: random explosive spawn with a one-item cap and a chance to not appear in a run.',
    use: 'Starts a fuse and creates an explosion after activation. It can clear threats or complete explosion-style tasks, but it can also ruin a route.',
    advice: 'Call the throw before using it in co-op. A bad grenade is worse than no grenade.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=GR',
    relatedItems: ['gun', 'landmine', 'firework', 'rocket-launcher'],
    areas: ['human-house', 'cabinets-drawers', 'garage-shed'],
    acquisition: [
      'Current spawn rules cap Grenade at one.',
      'The same rule set gives it a 45.1% chance to be prevented completely for the run.',
      'Look in storage routes only if explosion tasks or threat control justify the time.',
    ],
    stats: ['Explosive', 'Fuse activation', 'Global spawn cap: 1'],
    sections: [
      {
        heading: 'Where to find Grenade',
        body:
          'Check storage-heavy routes and drawers when explosion tasks appear. If the run does not need explosives, avoid spending task time on a grenade hunt.',
      },
      {
        heading: 'How to use Grenade',
        body:
          'Use it for explosion tasks, threat removal, or a planned emergency clear. Keep teammates out of the blast path before lighting the fuse.',
      },
    ],
  }),
  makeItem({
    slug: 'taser',
    name: 'Taser',
    category: 'Weapons',
    type: 'Stun house weapon',
    priority: 'High for rescue routes',
    source: 'House weapon: random stun weapon spawn with a one-item cap and a chance to not appear in a run.',
    use: 'Stuns valid targets in a small radius while active and spends one charge per successful hit.',
    advice: 'Use it to create rescue and escape windows, not to start long fights.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=TS',
    relatedItems: ['gun', 'pepper-spray', 'sleep-dart', 'blowgun'],
    areas: ['human-house', 'cabinets-drawers', 'bathroom'],
    acquisition: [
      'Current spawn rules cap Taser at one.',
      'The same rule set gives it a 20.1% chance to be prevented completely for the run.',
      'Search small storage if a stun route would solve the current task list.',
    ],
    stats: ['10 charges', 'Stun effect', 'Small hit radius'],
    sections: [
      {
        heading: 'Where to find Taser',
        body:
          'Check drawers, cabinets, and bathroom-style storage. Taser is worth routing when the team needs safe rescues or non-lethal threat control.',
      },
      {
        heading: 'How to use Taser',
        body:
          'Turn it on close to the target and use the stun window immediately. The value is the escape timing, not raw damage.',
      },
    ],
  }),
  makeItem({
    slug: 'pepper-spray',
    name: 'Pepper Spray',
    category: 'Weapons',
    type: 'Control house weapon',
    priority: 'Rescue dependent',
    source: 'House weapon: small storage spawn with a one-item cap and a chance to not appear in a run.',
    use: 'Applies pepper-spray control behavior to valid AI targets and can interrupt pressure without killing.',
    advice: 'Use it like a panic tool: spray, move, regroup, and finish the task or extraction.',
    image: '/images/items/item-pepper-spray.png',
    relatedItems: ['taser', 'sleep-dart', 'confusion-dart'],
    areas: ['human-house', 'bathroom', 'cabinets-drawers'],
    acquisition: [
      'Current spawn rules cap Pepper Spray at one.',
      'The same rule set gives it a 40.5% chance to be prevented completely for the run.',
    ],
    stats: ['Control weapon', 'Global spawn cap: 1'],
    sections: [
      {
        heading: 'Where to find Pepper Spray',
        body:
          'Search small indoor storage when a control item would save the route. Do not assume every house can provide one.',
      },
      {
        heading: 'How to use Pepper Spray',
        body:
          'Use it to interrupt pressure, then leave. It is strongest when it turns a bad chase into a clean door, window, or extraction line.',
      },
    ],
  }),
  makeItem({
    slug: 'knife',
    name: 'Knife',
    category: 'Weapons',
    type: 'House weapon / utensil',
    priority: 'Task dependent',
    source: 'Kitchen and utensil storage loot.',
    use: 'Sharp house weapon used for stab-style tasks and close interaction routes.',
    advice: 'Useful when the task list asks for stabbing. Otherwise, avoid risky close contact.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=KN',
    relatedItems: ['fork', 'metal-bat', 'gun'],
    areas: ['kitchen', 'cabinets-drawers', 'human-house'],
    acquisition: ['Check kitchen counters, drawers, and utensil storage.'],
    stats: ['Weapon category', 'Utensil overlap', 'Close range'],
    sections: [
      {
        heading: 'Where to find Knife',
        body:
          'Start in kitchen storage and nearby drawers. Knife is most valuable when the current task list includes stab-style objectives.',
      },
      {
        heading: 'How to use Knife',
        body:
          'Use it for task completion or emergency close interaction. If you are not doing a stab task, safer weapons usually beat knife range.',
      },
    ],
  }),
  makeItem({
    slug: 'fork',
    name: 'Fork',
    category: 'Weapons',
    type: 'Utensil weapon',
    priority: 'Task dependent',
    source: 'Kitchen and dining loot.',
    use: 'Utensil item tied to ForkStab-style tasks and close-range interaction.',
    advice: 'Pick it up when ForkStab appears or when a nearby route already passes through kitchen or dining storage.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=FK',
    relatedItems: ['knife', 'spoon', 'metal-bat'],
    areas: ['kitchen', 'human-house'],
    acquisition: ['Check kitchen and dining surfaces, drawers, and utensil storage.'],
    stats: ['Utensil', 'Close range', 'Task item'],
    sections: [
      { heading: 'Where to find Fork', body: 'Search kitchen and dining areas first; do not detour for it unless the task list needs ForkStab.' },
      { heading: 'How to use Fork', body: 'Use it for ForkStab tasks or close interaction routes where the object is already on the path.' },
    ],
  }),
  makeItem({
    slug: 'spoon',
    name: 'Spoon',
    category: 'Weapons',
    type: 'Utensil item',
    priority: 'Low unless requested',
    source: 'Kitchen and dining loot.',
    use: 'Utensil loot that can overlap with kitchen, dining, and object-carry routes.',
    advice: 'Treat it as route clutter unless a task, trade, or nearby objective makes it useful.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=SP',
    relatedItems: ['fork', 'knife'],
    areas: ['kitchen', 'human-house'],
    acquisition: ['Check kitchen and dining surfaces or drawers.'],
    stats: ['Utensil', 'Carriable'],
    sections: [
      { heading: 'Where to find Spoon', body: 'Look in kitchen and dining areas while searching for more important utensil or food objectives.' },
      { heading: 'How to use Spoon', body: 'Carry it only when the route already needs utensil loot or nearby object interaction.' },
    ],
  }),
  makeItem({
    slug: 'rocket-launcher',
    name: 'Rocket Launcher',
    category: 'Weapons',
    type: 'Heavy house weapon',
    priority: 'Explosion route only',
    source: 'Rare heavy weapon route, usually tied to weapon-style storage or special house setups.',
    use: 'Heavy ranged explosive weapon for RPG shot and major threat-control routes.',
    advice: 'Only route it when explosive tasks or a planned combat route justify the time.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=RPG',
    relatedItems: ['grenade', 'shotgun', 'gun'],
    areas: ['weapon-safe', 'garage-shed', 'human-house'],
    acquisition: ['Check weapon-safe and heavy storage routes when the task list points toward explosive objectives.'],
    stats: ['Explosive weapon', 'Heavy', 'Task relevant'],
    sections: [
      {
        heading: 'Where to find Rocket Launcher',
        body:
          'Treat it as rare heavy weapon loot. Search only when the task list, safe route, or combat plan already sends the team toward weapon storage.',
      },
      {
        heading: 'How to use Rocket Launcher',
        body:
          'Use it for RPG shot objectives or planned explosive control. Keep teammates clear and know your exit before firing.',
      },
    ],
  }),
  makeItem({
    slug: 'landmine',
    name: 'Landmine',
    category: 'Weapons',
    type: 'Explosive trap',
    priority: 'Task dependent',
    source: 'Garage, shed, storage, or explosive loot routes.',
    use: 'Explosive hazard item connected to Mine Trigger and Mine Explode tasks.',
    advice: 'Use it for the task, then clear the area. Mines create as many problems as they solve.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=MIN',
    relatedItems: ['grenade', 'firework'],
    areas: ['garage-shed', 'human-house'],
    acquisition: ['Search heavy storage and outdoor-adjacent routes when mine tasks appear.'],
    stats: ['Explosive', 'Trap', 'Task relevant'],
    sections: [
      { heading: 'Where to find Landmine', body: 'Look in garage, shed, and storage routes when Mine Trigger or Mine Explode appears.' },
      { heading: 'How to use Landmine', body: 'Use it deliberately for task progress or bait. Do not leave it in the team path.' },
    ],
  }),
  makeItem({
    slug: 'firework',
    name: 'Firework',
    category: 'Weapons',
    type: 'Explosive object',
    priority: 'Task dependent',
    source: 'Storage or outdoor-adjacent loot.',
    use: 'Explosive-style object for route testing, task overlap, and chaos control.',
    advice: 'Use only when the task list or a planned distraction needs it.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=FW',
    relatedItems: ['grenade', 'landmine'],
    areas: ['garage-shed', 'outdoor-lawn', 'human-house'],
    acquisition: ['Check garage, shed, storage, and outdoor-adjacent areas.'],
    stats: ['Explosive object', 'Task overlap'],
    sections: [
      { heading: 'Where to find Firework', body: 'Search storage-heavy routes and outdoor-adjacent areas when explosive objects would help.' },
      { heading: 'How to use Firework', body: 'Use it as a planned explosive or distraction object, not as random noise during a clean route.' },
    ],
  }),
  makeItem({
    slug: 'chainsaw',
    name: 'Chainsaw',
    category: 'Weapons',
    type: 'Heavy tool weapon',
    priority: 'Task and route dependent',
    source: 'Garage, shed, and heavy tool storage.',
    use: 'Heavy cutting tool for dangerous close work, object routes, and tool-based task overlap.',
    advice: 'Only pick it up if the route already passes through heavy storage or needs cutting pressure.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=CS',
    relatedItems: ['gardening-shears', 'knife', 'metal-bat'],
    areas: ['garage-shed', 'greenhouse-garden'],
    acquisition: ['Check shed, garage, and garden-tool routes.'],
    stats: ['Heavy', 'Cutting tool', 'Close range'],
    sections: [
      { heading: 'Where to find Chainsaw', body: 'Search garage and shed routes first. It is a heavy route item, so do not carry it across the map without a reason.' },
      { heading: 'How to use Chainsaw', body: 'Use it for cutting pressure or route-specific objectives, then drop or store it before it slows the team.' },
    ],
  }),
  makeItem({
    slug: 'gardening-shears',
    name: 'Gardening Shears',
    category: 'Weapons',
    type: 'Garden tool weapon',
    priority: 'Task dependent',
    source: 'Garden, greenhouse, shed, and outdoor-tool routes.',
    use: 'Cutting tool tied to plant routes and Cut entity with shears tasks.',
    advice: 'Pick it up when plant, garden, or shears tasks appear; otherwise treat it as tool clutter.',
    image: 'https://placehold.co/40x40/ffdac1/6B9B7B?text=SH',
    relatedItems: ['chainsaw', 'knife', 'watering-can'],
    areas: ['greenhouse-garden', 'garage-shed', 'outdoor-lawn'],
    acquisition: ['Check greenhouse, garden, and shed routes.'],
    stats: ['Cutting tool', 'Task relevant'],
    sections: [
      {
        heading: 'Where to find Gardening Shears',
        body:
          'Search greenhouse, garden, shed, and other outdoor-tool routes when Cut Grass, Cut Plants, or shears objectives appear.',
      },
      {
        heading: 'How to use Gardening Shears',
        body:
          'Use them for plant and cutting tasks. Do not carry them through the house unless they solve the current task list.',
      },
    ],
  }),
]

const tools = [
  recipeItem({
    slug: 'pickaxe',
    name: 'Pickaxe',
    category: 'Tools',
    type: 'Resource / object tool',
    priority: 'High for resource farming',
    materials: [
      { slug: 'metal', name: 'Metal', quantity: 3 },
      { slug: 'plastic', name: 'Plastic', quantity: 1 },
    ],
    use: 'Hits eligible stealable objects and can break them into resource drops.',
    advice: 'Use it when extracting the whole object is slower than breaking it for materials.',
    relatedItems: ['metal', 'plastic'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use the Pickaxe on objects that are worth more as materials than as carried loot. It is strongest when the team needs resources and the object is too slow to haul.',
      },
    ],
  }),
  recipeItem({
    slug: 'eyeglass',
    name: 'Eyeglass',
    category: 'Tools',
    type: 'Inspection tool',
    priority: 'Information dependent',
    materials: [{ slug: 'ceramics', name: 'Ceramics', quantity: 2 }],
    use: 'Shows the resource reward values of a stealable object you are looking at.',
    advice: 'Use it before spending time moving or breaking objects, especially when farming a specific resource.',
    relatedItems: ['ceramics'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use Eyeglass before committing to heavy objects; it helps decide whether a target is worth hauling, breaking, or ignoring.',
      },
    ],
  }),
  recipeItem({
    slug: 'grappling-hook',
    name: 'Grappling Hook',
    category: 'Tools',
    type: 'Mobility tool',
    priority: 'High on vertical routes',
    materials: [
      { slug: 'metal', name: 'Metal', quantity: 3 },
      { slug: 'gnomium', name: 'Gnomium', quantity: 2 },
    ],
    use: 'Shoots a hook toward valid surfaces and holds an active grapple target while the use input is held.',
    advice: 'Save Gnomium for it when a route has strong vertical shortcuts or recovery lines.',
    relatedItems: ['gnomium', 'metal', 'glider'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use Grappling Hook for vertical shortcuts, recovery lines, and escapes that normal jumps cannot cover.',
      },
    ],
  }),
]

const gear = [
  recipeItem({
    slug: 'backpack',
    name: 'Backpack',
    category: 'Gear',
    type: 'Carry gear',
    priority: 'Top early craft',
    materials: [{ slug: 'fabric', name: 'Fabric', quantity: 2 }],
    use: 'Carry gear for reducing repeated trips through dangerous rooms.',
    advice: 'Craft early when repeated trips are the main risk.',
    relatedItems: ['fabric'],
    sections: [{ heading: 'Use and properties', body: 'Craft Backpack early when the team keeps losing time on repeated material trips.' }],
  }),
  recipeItem({
    slug: 'spring-shoes',
    name: 'Spring Shoes',
    category: 'Gear',
    type: 'Mobility gear',
    priority: 'Route dependent',
    materials: [
      { slug: 'metal', name: 'Metal', quantity: 1 },
      { slug: 'plastic', name: 'Plastic', quantity: 2 },
    ],
    use: 'Mobility gear for jumps, drops, and vertical routes.',
    advice: 'Use for routes where vertical movement is worth the Metal and Plastic cost.',
    relatedItems: ['metal', 'plastic', 'glider'],
    sections: [{ heading: 'Use and properties', body: 'Use Spring Shoes when the route rewards vertical movement, but practice noisy jumps and awkward landings first.' }],
  }),
  recipeItem({
    slug: 'gnomium-gloves',
    name: 'Gnomium Gloves',
    category: 'Gear',
    type: 'Hand gear',
    priority: 'High for Gnomium interaction routes',
    materials: [
      { slug: 'gnomium', name: 'Gnomium', quantity: 3 },
      { slug: 'ceramics', name: 'Ceramics', quantity: 2 },
    ],
    use: 'Lets the player push compatible objects and interact with Gnomium glove targets.',
    advice: 'Craft only when the route has objects or interactables that justify the Gnomium cost.',
    relatedItems: ['gnomium', 'ceramics'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use Gnomium Gloves when a route depends on pushing objects, precise hand control, or special interactions.',
      },
    ],
  }),
  recipeItem({
    slug: 'glider',
    name: 'Glider',
    category: 'Gear',
    type: 'Air mobility gear',
    priority: 'High on height-heavy routes',
    materials: [
      { slug: 'fabric', name: 'Fabric', quantity: 3 },
      { slug: 'ceramics', name: 'Ceramics', quantity: 2 },
    ],
    use: 'Enables gliding movement when airborne, jumping, unpinned, or under the Fart potion status.',
    advice: 'Pair it with high entry points, escape drops, or routes where controlled descent saves time.',
    relatedItems: ['fabric', 'ceramics', 'fart-potion'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use Glider from high points, exterior routes, or emergency drops where controlled descent saves more time than walking back.',
      },
    ],
  }),
  recipeItem({
    slug: 'helmet',
    name: 'Helmet',
    category: 'Gear',
    type: 'Protective wearable',
    priority: 'Threat dependent',
    materials: [{ slug: 'plastic', name: 'Plastic', quantity: 2 }],
    use: 'Wearable equipment that locks and stabilizes a helmet joint while active.',
    advice: 'Use when head/body stability matters more than spending Plastic on movement or ranged gear.',
    relatedItems: ['plastic'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use Helmet when the route has rough movement, grabs, impacts, or physics-heavy rooms.',
      },
    ],
  }),
  recipeItem({
    slug: 'glue-gloves',
    name: 'Glue Gloves',
    category: 'Gear',
    type: 'Climbing hand gear',
    priority: 'Route dependent',
    materials: [
      { slug: 'plastic', name: 'Plastic', quantity: 3 },
      { slug: 'fabric', name: 'Fabric', quantity: 1 },
    ],
    use: 'Allows wall sliding/climbing behavior on targets that would otherwise require the WallSlide tag.',
    advice: 'Use when the map route depends on walls, vertical recovery, or climbing without tagged surfaces.',
    relatedItems: ['plastic', 'fabric'],
    sections: [
      {
        heading: 'Use and properties',
        body:
          'Use Glue Gloves when windows, walls, or awkward vertical routes are slowing the squad down.',
      },
    ],
  }),
  makeItem({
    slug: 'fairywings',
    name: 'Fairywings',
    category: 'Gear',
    type: 'Special gear',
    priority: 'Special-source dependent',
    source: allItemsSource,
    use: 'Special route item.',
    advice: 'Keep it as special gear until your route proves where it pays off.',
    relatedItems: ['flight-potion', 'glider'],
    sections: [
      {
        heading: 'How to get Fairywings',
        body:
          'Treat Fairywings as rare or special loot. Keep it if the squad is testing vertical movement or Fairy rewards.',
      },
      {
        heading: 'Use and properties',
        body: 'Test it separately before relying on it in a clean route.',
      },
    ],
  }),
]

const taskItems = [
  makeItem({
    slug: 'music-box',
    name: 'Music Box',
    category: 'Task Items',
    type: 'Special carried item',
    priority: 'Task dependent',
    source: allItemsSource,
    use: 'Special route item.',
    advice: 'Treat it as objective or special loot until the current task list gives it a clear job.',
    relatedItems: ['papyrus', 'cigarette'],
    sections: [
      { heading: 'How to get Music Box', body: 'Look for Music Box as special loot during house runs, especially when the route is already checking shelves and carried valuables.' },
      { heading: 'Use and properties', body: 'Carry it for objectives, trades, or special loot value rather than crafting.' },
    ],
  }),
  makeItem({
    slug: 'cigarette',
    name: 'Cigarette',
    category: 'Task Items',
    type: 'Small carried item',
    priority: 'Task dependent',
    source: allItemsSource,
    use: 'Small carried item that can matter for tasks, trades, or drawer searches.',
    advice: 'Pick it up when the current task list or route specifically needs cigarette-related loot.',
    relatedItems: ['papyrus'],
    sections: [
      { heading: 'How to get Cigarette', body: 'Search drawers, cabinets, and small storage spots. Some houses may have several, while others may not show one.' },
      { heading: 'Use and properties', body: 'Keep it when the task list, Fairy request, or trade route needs cigarette-style loot.' },
    ],
  }),
  makeItem({
    slug: 'papyrus',
    name: 'Papyrus',
    category: 'Task Items',
    type: 'Special document item',
    priority: 'Task dependent',
    source: allItemsSource,
    use: 'Special carried item for task, trade, or valuable-loot routes.',
    advice: 'Route it as objective loot when the task list or a trade request makes it useful.',
    relatedItems: ['music-box', 'cigarette'],
    sections: [
      { heading: 'How to get Papyrus', body: 'Look for Papyrus in special loot spots and keep it if the route is collecting odd valuables.' },
      { heading: 'Use and properties', body: 'Use it as a carried objective or trade-style item rather than a crafting material.' },
    ],
  }),
]

const potionDefinitions = [
  {
    key: 'fart',
    ingredient: { slug: 'poopling', name: 'Poopling' },
    effectName: 'FART',
    priority: 'Route dependent',
    use: 'Creates a movement effect that can help with odd escape routes, air control, or glider-style movement.',
  },
  {
    key: 'health',
    ingredient: { slug: 'scraplings', name: 'Scraplings' },
    effectName: 'HEALTH',
    priority: 'High on risky routes',
    use: 'Improves survival during risky routes, failed escapes, rescues, and threat-heavy rooms.',
  },
  {
    key: 'confusion',
    ingredient: { slug: 'plastic', name: 'Plastic' },
    effectName: 'CONFUSION',
    priority: 'Target dependent',
    use: 'Applies the Confusion potion status.',
  },
  {
    key: 'mobility',
    ingredient: { slug: 'chemicals', name: 'Chemicals' },
    effectName: 'MOBILITY',
    priority: 'Route dependent',
    use: 'Applies the Mobility potion status.',
  },
  {
    key: 'sleep',
    ingredient: { slug: 'metal', name: 'Metal' },
    effectName: 'SLEEP',
    priority: 'Target dependent',
    use: 'Applies the Sleep potion status.',
  },
  {
    key: 'stamina',
    ingredient: { slug: 'chemicals', name: 'Chemicals' },
    effectName: 'STAMINA',
    priority: 'Route dependent',
    use: 'Applies the Stamina potion status.',
  },
  {
    key: 'strength',
    ingredient: { slug: 'tusk', name: 'Tusk' },
    effectName: 'STRENGTH',
    priority: 'Threat dependent',
    use: 'Applies the Strength potion status.',
  },
  {
    key: 'flight',
    ingredient: { slug: 'fabric', name: 'Fabric' },
    effectName: 'FLIGHT',
    priority: 'High on vertical routes',
    use: 'Applies the Flight potion status.',
  },
]

const potions = potionDefinitions.map(potionItem)

const ammo = [
  makeItem({
    slug: 'marble',
    name: 'Marble',
    category: 'Ammo',
    type: 'Projectile ammo',
    priority: 'High with Marble Gun',
    source: allItemsSource,
    use: 'Ammo consumed by Marble Gun shots.',
    advice: 'Collect it only when Marble Gun is part of the route.',
    relatedItems: ['marble-gun'],
    sections: [
      { heading: 'How to get Marble', body: 'Look for Marble as small loot during house runs, then save it for Marble Gun ammo instead of treating it as normal clutter.' },
      {
        heading: 'Use and properties',
        body:
          'Each Marble Gun shot spends 1 Marble. Bring extra ammo before entering the house if the route depends on ranged pressure.',
      },
    ],
  }),
  ...[
    { key: 'confusion', effectName: 'CONFUSION', priority: 'Target dependent' },
    { key: 'fart', effectName: 'FART', priority: 'Route dependent' },
    { key: 'flight', effectName: 'FLIGHT', priority: 'Vertical route dependent' },
    { key: 'health', effectName: 'HEALTH', priority: 'High on risky routes' },
    { key: 'mobility', effectName: 'MOBILITY', priority: 'Route dependent' },
    { key: 'sleep', effectName: 'SLEEP', priority: 'Target dependent' },
    { key: 'stamina', effectName: 'STAMINA', priority: 'Route dependent' },
    { key: 'strength', effectName: 'STRENGTH', priority: 'Threat dependent' },
  ].map(dartItem),
]

const defaultAreasByCategory = {
  Materials: ['human-house', 'cabinets-drawers'],
  Weapons: ['human-house'],
  Tools: ['gnome-world', 'well'],
  Gear: ['gnome-world', 'well'],
  'Task Items': ['human-house'],
  Potions: ['gnome-world', 'potion-table'],
  Ammo: ['gnome-world', 'repackager'],
}

const itemAreaOverrides = {
  ceramics: ['human-house', 'kitchen', 'bathroom'],
  chemicals: ['human-house', 'bathroom', 'garage-shed'],
  fabric: ['human-house', 'bedroom-living-room'],
  metal: ['human-house', 'kitchen', 'garage-shed'],
  plastic: ['human-house', 'kitchen', 'bathroom'],
  gnomium: ['gnome-world', 'outdoor-lawn'],
  poopling: ['human-house', 'bathroom'],
  scraplings: ['human-house', 'garage-shed'],
  tusk: ['outdoor-lawn', 'greenhouse-garden'],
  marble: ['human-house', 'bedroom-living-room'],
  'music-box': ['bedroom-living-room', 'human-house'],
  cigarette: ['cabinets-drawers', 'bathroom', 'bedroom-living-room'],
  papyrus: ['bedroom-living-room', 'human-house'],
}

function enrichItem(item) {
  const areas = item.areas?.length ? item.areas : itemAreaOverrides[item.slug] || defaultAreasByCategory[item.category] || ['human-house']

  return {
    ...item,
    areas,
  }
}

const items = [...materials, ...weapons, ...houseWeapons, ...tools, ...gear, ...taskItems, ...potions, ...ammo].map(enrichItem)

export default [
  {
    key: 'categories',
    items: ['Materials', 'Weapons', 'Tools', 'Gear', 'Task Items', 'Potions', 'Ammo'],
  },
  {
    key: 'items',
    items: withItemTdk(items),
  },
]
