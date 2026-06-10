export default [
  {
    key: 'facts',
    items: [
      { label: 'Release', value: 'June 10, 2026', note: 'Steam launch date' },
      { label: 'Platform', value: 'PC / Steam', note: 'Windows only on the store page' },
      { label: 'Party size', value: '1-6 players', note: 'You plus up to five friends' },
      { label: 'Developer', value: 'Fobri', note: 'Online co-op action-adventure' },
    ],
  },
  {
    key: 'quickLinks',
    items: [
      { label: 'Beginner', path: '/beginner/', note: 'First route, tasks, doors and windows, revive rules, and co-op fixes.' },
      { label: 'Wiki', path: '/wiki/', note: 'Every guide topic in one index when you need a fast answer mid-run.' },
      { label: 'Items & Loot', path: '/items/', note: 'What to grab, what to skip, and what still needs in-game checks.' },
      { label: 'Crafting', path: '/crafting/', note: 'Gear, home upgrades, and which crafts we prioritize first.' },
      { label: 'NPCs & Enemies', path: '/bestiary/', note: 'Humans, cats, pests, and hazards that can end a run.' },
      { label: 'Updates', path: '/updates/', note: 'Release facts and what we recheck after patches land.' },
    ],
  },
  {
    key: 'runPlan',
    items: [
      { step: '01', title: 'Read the High-Gnome task list', detail: 'Tasks are not flavor text. They decide whether the run is worth continuing.' },
      { step: '02', title: 'Enter through a low-friction route', detail: 'Prefer windows, vines, and exterior paths that let you leave fast.' },
      { step: '03', title: 'Chain small objectives first', detail: 'Forks, rag strips, toilet interactions, and break tasks are safer than hauling valuables.' },
      { step: '04', title: 'Upgrade for fewer trips', detail: 'Carry capacity and useful equipment reduce repeated exposure to humans and animals.' },
      { step: '05', title: 'Treat enemies as route blockers', detail: 'Save weapon and grab tests for throwaway runs, not your first clean route.' },
    ],
  },
  {
    key: 'searchIntent',
    items: [
      { title: "What is Burglin' Gnomes?", detail: 'A first-person online co-op heist game where tiny gnomes break into human homes, complete High-Gnome jobs, steal loot, craft gear, and survive cats, humans, and household chaos.' },
      { title: 'How do tasks work?', detail: 'The High-Gnome gives job objectives. Finish enough of them or the run can fail even if your backpack looks profitable.' },
      { title: 'What should I craft first?', detail: 'We craft carry upgrades and route tools before chasing damage. Exact recipes are marked when we still need more playtime in the full release.' },
      { title: 'What can kill a run?', detail: 'Humans, cats, heavy loot, bad exits, noisy mistakes, and AI changes after patches are the main risks we plan around.' },
    ],
  },
  {
    key: 'priorityTable',
    items: [
      { target: 'Task sheet', room: 'Spawn / start area', action: 'Read before looting', status: 'Confirmed' },
      { target: 'Small household items', room: 'Bathroom, kitchen, clutter rooms', action: 'Use for early objectives', status: 'Confirmed' },
      { target: 'Crafting materials', room: 'Loot path', action: 'Bank likely upgrade parts', status: 'Needs Testing' },
      { target: 'Backpack upgrade', room: 'Crafting station', action: 'Prioritize carry capacity', status: 'Needs Testing' },
      { target: 'Enemy counters', room: 'Any hostile route', action: 'Practice outside progression runs', status: 'Patch Sensitive' },
    ],
  },
  {
    key: 'firstTasks',
    items: [
      { task: 'Collect Rag Strips', target: '5', route: 'Bathroom and cloth clutter', note: 'Finish before hauling heavy loot.', status: 'Observed' },
      { task: 'Break Any Items', target: '4', route: 'Cheap clutter rooms', note: 'Use disposable objects, not possible task items.', status: 'Observed' },
      { task: 'Stab a Cockroach', target: '1', route: 'Pest spawn room', note: 'Clear floor space and stop fighting once it counts.', status: 'Observed' },
      { task: 'Flush an Item', target: '1', route: 'Bathroom', note: 'Use a small junk object so the interaction does not jam.', status: 'Observed' },
      { task: 'Steal a Fork', target: '1', route: 'Kitchen or dining area', note: 'Check counters, drawers, tables, and utensil clutter.', status: 'Observed' },
    ],
  },
  {
    key: 'toolsToLearn',
    items: [
      { name: 'Vine Window', role: 'Entry route', image: '/images/vine-entry.jpg', note: 'Our favorite early landmark for getting in and getting out.' },
      { name: 'Crowbar', role: 'Door tool', image: '/images/tool-crowbar.jpg', note: 'Opens blocked paths — note which doors it works on in your house variant.' },
      { name: 'Expanded Backpack', role: 'Carry upgrade', image: '/images/crafting-board.jpg', note: 'Usually our first craft because fewer trips mean fewer deaths.' },
      { name: 'Smoke Tool', role: 'Utility', image: '/images/smoke-tool.jpg', note: 'We are still timing how long smoke lasts and what enemies ignore.' },
      { name: 'Cat', role: 'Major threat', image: '/images/threat-cat.jpg', note: 'Give floor space a wide berth until you know its grab range.' },
      { name: 'Outdoor Map Leads', role: 'Release content', image: '/images/new-map.jpg', note: 'New exterior routes in the full game — test vertical exits with your squad.' },
    ],
  },
  {
    key: 'faq',
    items: [
      { question: "Is Burglin' Gnomes co-op?", answer: 'Yes. Steam lists online co-op for up to six players, including solo play with friends.' },
      { question: "When did Burglin' Gnomes release?", answer: 'The Steam release date is June 10, 2026. We update guides as the live game changes.' },
      { question: 'Is Burglin Gnomes on console or mobile?', answer: 'Steam currently lists Windows PC only. We have not seen official console or mobile versions announced.' },
      { question: 'What should new players do first?', answer: 'Read the task list, pick a forgiving entry like the vine window, finish small bathroom and kitchen jobs, then loot once your exit is clear.' },
    ],
  },
]
