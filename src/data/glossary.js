// Time Creation — glossary of terms
// One source of truth: /glossary renders everything; each brand hub embeds
// its own filtered subset (a brand with no terms simply omits the section).
// brand: 'existence' | 'time-creationism' | 'umbrella'
// Seeded from brand.js + the Existence platform model; the research pass
// extends and refines definitions from real site copy.

export const slugifyTerm = (term) =>
  term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const GLOSSARY = [
  // ---- Umbrella ----
  {
    term: 'Time Creation',
    brand: 'umbrella',
    definition:
      'The foundational life skill of authoring your hours on purpose — the umbrella idea the whole universe exists to establish. Time is not spent or found, but made.',
  },
  {
    term: 'Sunrise Palette',
    brand: 'umbrella',
    definition:
      'The shared color system — Navy and Blue (Dawn), Teal through Deep Green (Mind), Sunrise through Gold (Energy), on White and Black — re-weighted per vertical.',
  },
  {
    term: 'Layers of Time',
    brand: 'umbrella',
    definition:
      'The brand architecture made visible: three planes registered to the same coordinates — the Foundation of Time beneath, the Fabric of Time above it, the Existence Grid on top.',
  },

  // ---- Time Creationism ----
  {
    term: 'Time Creationism',
    brand: 'time-creationism',
    definition:
      'The belief that time is not a resource to be managed but a medium to be authored — replacing the scarcity of time management with the agency of creation.',
  },
  {
    term: 'Time Fabric',
    brand: 'time-creationism',
    definition:
      'The latent structure of time — a subtle matrix of small squares, each a potential moment not yet lived, waiting to be activated by intention, energy, and thought.',
  },

  // ---- Existence ----
  {
    term: 'Time Block',
    brand: 'existence',
    definition:
      'The atomic unit of time, and the smallest place a life is actually lived. Each block holds what you did, why it mattered, who you shared it with, how it felt — and, after, a reflection.',
  },
  {
    term: 'Existence Grid',
    brand: 'existence',
    definition:
      'A life rendered in full, moment by moment — time blocks composed into a mirror: the life you intended set against the life you lived.',
  },
  {
    term: 'Pillars',
    brand: 'existence',
    definition:
      'The four categories a life divides into — Sleep, Work, Health, Life. Together they account for all 168 hours of a week; every event lands in exactly one.',
  },
  {
    term: 'Weekly Intent',
    brand: 'existence',
    definition:
      'The foundational Sunday ritual: setting target hours across the four pillars for the week ahead, summing to all 168 hours.',
  },
  {
    term: 'Time Alignment Score',
    brand: 'existence',
    definition:
      'The weekly measure of how the time you actually lived compared against your Weekly Intent, pillar by pillar.',
  },
  {
    term: 'Reality Block',
    brand: 'existence',
    definition:
      'A recorded block of lived time — the actual, as opposed to the intended, entry on the grid.',
  },
  {
    term: 'Reflection',
    brand: 'existence',
    definition:
      'A short look back attached to a moment after it is lived — rare by design, reserved for the moments that earn one.',
  },
  {
    term: 'Energy Rating',
    brand: 'existence',
    definition:
      'A 0–100 read of how a moment felt, paired with the emotions tied to it.',
  },
  {
    term: 'Time Creation Cycle',
    brand: 'existence',
    definition:
      'The practice loop — Design, Account, Improve. Design the time you intend, account for the time you live, improve the next cycle with what you learn.',
  },
];

export const glossaryForBrand = (brand) => GLOSSARY.filter((t) => t.brand === brand);
