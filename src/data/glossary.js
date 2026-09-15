// Time Creation — glossary of terms
// One source of truth: /glossary renders everything; each brand hub embeds
// its own filtered subset (a brand with no terms simply omits the section).
// brand: 'existence' | 'time-creationism' | 'umbrella'
// Definitions mined from the real properties (research pass, Sep 2026):
// Existence HIW (index-v3), the Founding Member page, TCP foundation/daylight
// pages, robdyrdek.com, and the hub's canonical brand.js. Quoted fragments
// are verbatim site copy. TCP deliberately has no glossary.

export const slugifyTerm = (term) =>
  term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const GLOSSARY = [
  // ---- Umbrella ----
  {
    term: 'Time Creation',
    brand: 'umbrella',
    definition:
      'The foundational life skill the whole universe exists to establish: time is not spent or found, but made — expressed three ways, as a belief (Time Creationism), an instrument (Existence), and a foundation (Time Creation Project).',
  },
  {
    term: 'Sunrise Palette',
    brand: 'umbrella',
    definition:
      'The shared color system — Navy and Blue (Dawn), Teal through Deep Green (Mind), Sunrise through Gold (Energy), on White and Black — carried by all three brands and re-weighted per vertical.',
  },
  {
    term: 'The Layers of Time',
    brand: 'umbrella',
    definition:
      'The brand architecture made visible as an exploded grid — three planes registered to the same coordinates: the Existence Grid (top), the Fabric of Time (middle, Time Creationism), and the Foundation of Time (bottom, Time Creation Project).',
  },

  // ---- Time Creationism ----
  {
    term: 'Time Creationism',
    brand: 'time-creationism',
    definition:
      'The belief that time is not a resource to be managed but a medium to be authored — that a life is not spent or found, but made. It replaces the scarcity of "time management" with the agency of creation.',
  },
  {
    term: 'Time Fabric',
    brand: 'time-creationism',
    definition:
      'The belief’s grid: "the subtle matrix of small squares represents the fabric of time — the latent structure waiting to be activated by the individual." Not rigid but receptive — the canvas on which you imprint meaning, order, and growth.',
  },
  {
    term: 'Creation Color',
    brand: 'time-creationism',
    definition:
      'The belief’s signature graphic element: Creationism Orange used selectively, only on solid filled circles marking key nodes and events — full-opacity dots denote clarity and intentional force; blurred forms suggest potential, memory, or unresolved energy.',
  },
  {
    term: 'The Author',
    brand: 'time-creationism',
    definition:
      'The stance the belief confers on the individual: "you are the author of your hours, and every block you place is a deliberate act of making your life."',
  },

  // ---- Existence ----
  {
    term: 'Time Block',
    brand: 'existence',
    definition:
      'The atomic unit of the practice — a block of intended or lived time on the week, assigned to a pillar and carrying energy, reflections, and media. "Together, your Time Blocks reveal the Real You."',
  },
  {
    term: 'Pillars',
    brand: 'existence',
    definition:
      'The four categories that hold all 168 hours of a week — Work, Life, Health, Sleep. Every Time Block lands in exactly one.',
  },
  {
    term: 'Weekly Intent',
    brand: 'existence',
    definition:
      'The Sunday design ritual: define how you want to distribute your time across the four pillars — target hours summing to 168. "This becomes your intention for the week, and the basis for your Time Alignment Score." (Shipped UI calls this Pillar Intent.)',
  },
  {
    term: 'Time Alignment Score',
    brand: 'existence',
    definition:
      'The primary measurement of the cycle: a single number that shows how closely the time you actually lived matched the time you intended to create. It has no sensors and guesses nothing — you authored both halves.',
  },
  {
    term: 'Time Creation Cycle',
    brand: 'existence',
    definition:
      'The weekly practice at the heart of Existence, built around your Time Blocks, with three phases: Design, Account, Optimize. "Design the person you want to be. Account for who you actually are. Optimize what your time reveals to continuously realize your potential."',
  },
  {
    term: 'Design',
    brand: 'existence',
    definition:
      'Phase 01 — "Design the week you intend to create": set your intention across Work, Life, Health, and Sleep, then build your week in Time Blocks, shaping each part of it before you live it.',
  },
  {
    term: 'Account',
    brand: 'existence',
    definition:
      'Phase 02 — "Account for the week you actually lived": as the week unfolds, update each Time Block to reflect what actually happened — rate your energy, reflect on your experience, preserve moments with media. Rob’s framing: "what you stamp is what you live."',
  },
  {
    term: 'Optimize',
    brand: 'existence',
    definition:
      'Phase 03 — "Optimize what your time reveals": Existence uses Time Intelligence to read your Time Blocks and reveal the insights and patterns within your week. Use what you learn to shape your next Design.',
  },
  {
    term: 'Real You / Ideal You',
    brand: 'existence',
    definition:
      'The identity pair the practice converges: "Together, your Time Blocks reveal the Real You"; "Over time, the Real You and Ideal You move into greater alignment." Real You is always capitalized as a proper noun.',
  },
  {
    term: 'Time Intelligence',
    brand: 'existence',
    definition:
      'Existence’s reading layer: it reads your Time Blocks to reveal the insights and patterns within your week, and surfaces the activities, routines, and commitments that already shape your life.',
  },
  {
    term: 'Time Intelligence Platform',
    brand: 'existence',
    definition:
      'The product category Existence claims for itself: "a Time Intelligence Platform that transforms your created time into the data of the Real You, making who you are actually creating visible and measurable."',
  },
  {
    term: 'Created time',
    brand: 'existence',
    definition:
      'The raw material Existence works on — time you have already lived, treated as measurable material: "transforms your created time into the data of the Real You."',
  },
  {
    term: 'The record',
    brand: 'existence',
    definition:
      'The accumulated lived Time Blocks — the practice’s central noun: "the record reflects the week you actually lived, not the one you planned"; "Every week, the record deepens."',
  },
  {
    term: 'Time Disconnect',
    brand: 'existence',
    definition:
      'The gap between intended and lived time; the Time Alignment Score is where Time Disconnect becomes measurable.',
  },
  {
    term: 'Reflection',
    brand: 'existence',
    definition:
      'A short written first-person capture attached to a lived block — "Reflect on your experience." Rare by design, reserved for moments that earn one.',
  },
  {
    term: 'Energy rating',
    brand: 'existence',
    definition:
      'A per-block rating paired with felt-emotion words (Pride, Excitement, Hope, Serenity…) — "Rate your energy." Insights later reveal what gives and drains your energy.',
  },
  {
    term: 'Time Insights',
    brand: 'existence',
    definition:
      '"Summarizes your lived experience across a day, week, month, or year — through time, energy, reflection, and media. The record of your Time Blocks becomes the story of your week."',
  },
  {
    term: 'Time Grid',
    brand: 'existence',
    definition:
      '"The Time Grid lets you traverse your entire record day by day, week by week, month by month, and year by year" — the moments and patterns that make up the full story of your created time.',
  },
  {
    term: 'Existence AI',
    brand: 'existence',
    definition:
      '"An assistant trained on your time. Ask about your patterns, habits, decisions, and the way you are creating yourself." (In-product label: Assistant.)',
  },
  {
    term: 'Saved Blocks',
    brand: 'existence',
    definition:
      '"Quickly place the time you create repeatedly — and build your week in seconds."',
  },
  {
    term: 'Recurring Blocks',
    brand: 'existence',
    definition:
      '"Anchor the consistent parts of your life — set once, repeated across the weeks."',
  },
  {
    term: 'Suggested Blocks',
    brand: 'existence',
    definition:
      '"Time Intelligence surfaces the activities, routines, and commitments that already shape your life."',
  },
  {
    term: 'Unaccounted',
    brand: 'existence',
    definition:
      'Time not captured in any Time Block, shown as its own row in the explorer and barcode views.',
  },
  {
    term: 'Existence Grid',
    brand: 'existence',
    definition:
      'The blocks together: "a life rendered in full, moment by moment. This grid is not a schedule, it is a mirror — the life you intended set against the life you lived."',
  },
  {
    term: 'Founding Member',
    brand: 'existence',
    definition:
      '"A select group joining the first public release" of Existence — early access pricing, live sessions with founder Rob Dyrdek, and priority support.',
  },
];

export const glossaryForBrand = (brand) => GLOSSARY.filter((t) => t.brand === brand);
