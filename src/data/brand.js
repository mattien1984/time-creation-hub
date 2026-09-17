// Time Creation — unified brand system data
// Copy sourced from the Figma file and corrected to be vertical-specific
// (the source had copy-pasted "Time Creationism" references in the Existence
// and Project columns, plus XX placeholders).

import { asset } from '../lib/asset';

export const PALETTE = [
  { hex: '#123A7E', name: 'Navy', role: 'Dawn' },
  { hex: '#2F6FD0', name: 'Blue', role: 'Dawn' },
  { hex: '#249EA1', name: 'Teal', role: 'Mind' },
  { hex: '#008083', name: 'Deep Teal', role: 'Mind' },
  { hex: '#005F61', name: 'Deep Green', role: 'Mind' },
  { hex: '#FD5900', name: 'Sunrise', role: 'Energy' },
  { hex: '#F78105', name: 'Orange', role: 'Energy' },
  { hex: '#FAAB35', name: 'Gold', role: 'Energy' },
  { hex: '#FFFFFF', name: 'White', role: 'Page' },
  { hex: '#000000', name: 'Black', role: 'Ground' },
];

export const UMBRELLA = {
  name: 'Time Creation',
  mission: "Most of us are taught to manage time. We're here to help you author it — to shape your hours, on purpose, into a life you mean to live.",
  intro:
    'One principle expressed three ways — a belief, an instrument, and a foundation. Same coordinates, same palette, same mark; each layer registered to the others, each carrying its own weight of the idea that time is not spent or found, but made.',
};

// Per-vertical usage weighting of the shared Sunrise palette (0–1),
// recreated from the "USAGE LEVEL" bar charts (updated with the two blues).
export const VERTICALS = [
  {
    id: 'existence',
    name: 'Existence',
    role: 'The Instrument',
    accent: '#FD5900',
    shape: 'clock',
    photo: asset('/assets/photography/existence-clock.jpg'),
    logo: asset('/assets/logos/existence.svg'),
    grid: asset('/assets/grids/block.svg'),
    gridKind: 'block',
    statement:
      "Existence is the instrument of time creation — not a place to schedule your days, but a place to author your life. It turns your intentions into something you can see and shape, then shows you whether the time you're actually living adds up to the life you mean to create.",
    gridTitle: 'The Time Block',
    gridName: 'The Grid of Time',
    gridBody:
      "A single square is a time block — the atomic unit of time, and the smallest place a life is actually lived. Each block holds everything a moment contains: what you did and how, why it mattered and who you shared it with, how it felt, and — after — a reflection of how it went. Together, they make up the existence grid: a life rendered in full, moment by moment. This grid is not a schedule, it is a mirror — the life you intended set against the life you lived.",
    shapeNote:
      'The clock is the most iconic symbol of time — measuring the rhythm of our lives in a never-ending loop.',
    colorNote:
      "Existence weights the palette for the lived moment — the place where time is felt and authored. Orange to Gold runs highest, the sun's arc from the spark of sunrise to the glow of golden hour. Black rises with it: the surface a life is authored on. Teal and white sit in support — thought held in the background, feeling carried to the front.",
    // weighting per palette index (navy,blue, teal,deepteal,deepgreen, sunrise,orange,gold, white, black)
    // rank: black > teals > blues > oranges > white
    weights: [0.73, 0.7, 0.91, 0.83, 0.76, 0.67, 0.6, 0.51, 0.42, 1.0],
    logoScale: 1,
  },
  {
    id: 'time-creationism',
    name: 'Time Creationism',
    role: 'The Belief',
    accent: '#249EA1',
    shape: 'moon',
    photo: asset('/assets/photography/time-creationism-moon.jpg'),
    logo: asset('/assets/logos/time-creationism.svg'),
    grid: asset('/assets/grids/fabric.svg'),
    gridKind: 'fabric',
    statement:
      'Time Creationism is the belief that time is not a resource to be managed but a medium to be authored — that a life is not spent or found, but made. It replaces the scarcity of "time management" with the agency of creation: you are the author of your hours, and every block you place is a deliberate act of making your life.',
    gridTitle: 'Time Fabric',
    gridName: 'The Fabric of Time',
    gridBody:
      "The subtle matrix of small squares represents the fabric of time — the latent structure waiting to be activated by the individual. Each square is a potential moment, a unit of time not yet lived. On their own they're neutral; quiet, ordered, empty. But when intention, energy, and thought are applied, they come alive. This grid is not rigid, it is receptive — the canvas on which you imprint meaning, order, and growth.",
    shapeNote:
      'The moon cycles through phases, marking months and emotional tides.',
    colorNote:
      'As the parent philosophy, Time Creationism carries the whole palette at equal weight — no phase favored, Mind and Energy held in balance across the full cycle of time. White and black appear less often: the neutral ground that lets the living colors speak. This is time as a living system — not measured, but made.',
    // eight living colors equal/full, white & black low
    weights: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.35, 0.35],
    logoScale: 1,
  },
  {
    id: 'time-creation-project',
    name: 'Time Creation Project',
    role: 'The Foundation',
    accent: '#FAAB35',
    shape: 'sun',
    photo: asset('/assets/photography/time-creation-project-sun.jpg'),
    logo: asset('/assets/logos/time-creation-project.svg'),
    grid: asset('/assets/grids/foundation.svg'),
    gridKind: 'foundation',
    statement:
      'The Time Creation Project is the foundation beneath it all — the principles, language, and research that turn Time Creationism from a conviction into a system anyone can build on. It exists so the practice of creating time can be studied, taught, and carried forward: the bedrock that gives Existence its meaning and the movement its ground.',
    gridTitle: "Time's Foundation",
    gridName: 'The Foundation of Time',
    gridBody:
      'The dense field of small squares represents the foundation of time — the deep substrate of principles, language, and research that everything else is built on. Each mark is a fragment of the thinking: an idea tested, a term defined, a pattern found. On their own they are quiet, unseen groundwork; together they are the ground a life can stand on. This foundation is not finished, it is living — it deepens as the work does.',
    shapeNote:
      'The sun rises and sets in a daily arc, governing our circadian rhythm and the passage of days.',
    colorNote:
      'The Time Creation Project weights the palette for study and clarity — the bedrock beneath the practice, running cool and clear. Teal to Deep Green leads, the colors of the Mind: studied, evolving thought. White rises with them — the open page where principles are set down. Orange, Gold, and black are kept in reserve, quiet and rigorous.',
    // rank: white > oranges > teals > blues > black
    weights: [0.49, 0.45, 0.67, 0.6, 0.55, 0.91, 0.83, 0.76, 1.0, 0.42],
    // The TCP lockup SVG is 219 units tall for the same 154.5-unit ring the
    // other two carry in a 155-unit canvas — scale up so all rings render equal.
    logoScale: 219 / 155,
  },
];

export const ARCHITECTURE = {
  title: 'Time Architecture',
  name: 'The Layers of Time',
  intro:
    "The exploded grid is the brand architecture made visible. Three planes, one structure — each tier of the movement is its own layer, all registered to the same coordinates. Pull them apart to see how it's built; let them fall together and they become a single lived grid.",
  layers: [
    {
      vertical: 'Existence',
      label: 'the Existence Grid',
      position: 'top',
      body: 'The frame and its anchor-crosses: where intention, energy, and thought are imprinted and made visible. The crosses are alignment marks — they show whether the time you\'re living adds up to the life you mean to create. This is the foundation activated and the belief enacted: time, authored.',
    },
    {
      vertical: 'Time Creationism',
      label: 'the Fabric of Time',
      position: 'middle',
      body: 'The organizing belief. Where the foundation is raw potential, Time Creationism gives it form — the conviction that time is not spent or found but authored, the grid of agency along which moments can be arranged, measured, and made.',
    },
    {
      vertical: 'Time Creation Project',
      label: 'the Foundation of Time',
      position: 'bottom',
      body: "The raw fabric of small squares: the principles, language, and research. Latent and neutral, it's the bedrock beneath it all — the field of potential that gives the layers above their meaning and the movement its ground.",
    },
  ],
};

export const DESIGN_SYSTEM = {
  title: 'The Design System',
  intro:
    'The Time Creation design system is built from four interconnected elements — each carrying its own meaning while working in harmony to tell a single story.',
  elements: [
    { name: 'Color System', body: 'Grounds the visuals in the rhythm of nature, shifting from teals of clarity to oranges and golds of energy — the emotional arc of a day.' },
    { name: 'Enlightenment Glare', body: 'A moment of awakening — a warm, radiant treatment that focuses attention and conveys insight, emergence, and light.' },
    { name: 'Time Fabric', body: 'The structural foundation: a flexible grid symbolizing latent potential, waiting to be activated with intention.' },
    { name: 'Circular Language', body: 'Symbolic geometry woven through the system, communicating continuity, unity, and the movement of time through pure form.' },
  ],
  circle:
    'Time in nature is circular, not linear — clocks, the sun, the moon, and the seasons all move in cycles, marked by rhythm, repetition, and return. While squares divide and segment, circles unify. The circle reflects continuity, presence, and the creative force of your being — the quiet geometry that underpins the whole visual language.',
};

// Each brand's signature graphic element (chapters 5–7).
export const GRAPHIC = {
  'existence': {
    element: 'The Time Block',
    kind: 'block',
    lede: "Existence's signature graphic element — the atomic square, built into compositions.",
    body:
      "A single square is a time block: the atomic unit of time, and the smallest place a life is actually lived. In composition the block becomes a building material — stacked, subdivided, and arranged into the existence grid, a life rendered moment by moment. Build within the block and you build a life.",
  },
  'time-creationism': {
    element: 'Creation Color',
    kind: 'creation-color',
    lede: "Time Creationism's signature graphic element — selective orange that activates meaning.",
    body:
      "Creationism Orange is used selectively to highlight focal points, activate meaning, or signal energetic presence. It appears only on solid, filled circles — marking key nodes and events. These orange moments are not uniform: full-opacity, crisp dots denote clarity and intentional force; semi-transparent or blurred forms suggest potential, memory, or unresolved energy. When a moment matters, it's illuminated; when its status shifts, so does its intensity.",
  },
  'time-creation-project': {
    element: 'Enlightenment Glare',
    kind: 'glare',
    lede: "The Time Creation Project's signature graphic element — a language of light.",
    body:
      "Our light language communicates insight, emergence, and awakening. Warm sun glows, lens leaks, soft flares, blooming light, and atmospheric overexposure create emotional momentum and signal moments of clarity or transformation. Crisp sun glares deliver immediacy; diffused glows provide comfort; directional leaks suggest movement and time; hazy overexposure signals transcendence. Light becomes a narrative device that guides emotion, focus, and meaning.",
  },
};

// Graphic-element example cards (8 each), extracted from the Figma panels.
export const ELEMENT_CARDS = {
  'time-creationism': Array.from({ length: 8 }, (_, i) => asset(`/assets/graphics/cards/cc-${i}.jpg`)),
  'time-creation-project': Array.from({ length: 8 }, (_, i) => asset(`/assets/graphics/cards/eg-${i}.jpg`)),
};

// Art-directed application posters (the "Expanded Circular Language" showcase),
// extracted from the Figma design-system frames and downscaled for web.
const posterList = (b, spec) =>
  spec.flatMap(([r, n]) => Array.from({ length: n }, (_, i) => asset(`/assets/posters/${b}-${r}-${i}.jpg`)));
export const POSTERS = {
  'existence': posterList('ex', [[0, 5], [1, 5], [2, 5]]),
  'time-creationism': posterList('tc', [[0, 5], [1, 5], [2, 5]]),
  'time-creation-project': posterList('tcp', [[0, 4], [1, 4]]),
};
export const ALL_POSTERS = [
  ...POSTERS['existence'], ...POSTERS['time-creationism'], ...POSTERS['time-creation-project'],
];

// Download library — grouped per the user's chosen scope (logos, color, grid/graphic)
export const DOWNLOADS = {
  logos: VERTICALS.map((v) => ({
    name: `${v.name} — logo`,
    file: v.logo,
    kind: 'SVG',
    note: 'Transparent · vector',
  })),
  grids: VERTICALS.map((v) => ({
    name: v.gridName,
    file: v.grid,
    kind: 'SVG',
    note: `${v.name} · ${v.gridTitle}`,
  })),
};
