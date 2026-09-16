// The homepage narrative — the film's beats plus the footer creator credit.
// Assembled from the real properties (research pass, Sep 2026):
// - Beat 01: verbatim from THE GAP (time-creation-project/index-daylight.html)
// - Beat 02: Rob's SACRED foundation copy, verbatim (index-foundation.html)
// - Beat 03: brand.js statements + Rob's sacred establishing line
// - Beat 04: UMBRELLA.intro + architecture copy; flywheel synthesized
// - Beat 05 (doorways): Rob's sacred closer + mined doorway copy
// - CREATOR (footer credit): verbatim from the robdyrdek.com About overlay
// Sacred lines (Rob's own words) must never be paraphrased.

export const BEATS = [
  {
    num: '01',
    id: 'problem',
    title: 'The Problem',
    headline: 'We all live in time. Almost no one is taught to create it.',
    body: 'Every day of your life happens in time, yet most of us were never taught how to consciously design it, understand it, or improve it. We learn to read, to add, to work. But the one skill underneath every other, shaping the hours a life is actually made of, is left to chance.',
  },
  {
    num: '02',
    id: 'mission',
    title: 'The Mission',
    headline: 'Our mission is to advance the understanding, practice, and adoption of Time Creation.',
    body: 'When people learn how to intentionally create their time, they gain a powerful ability to align their actions with their aspirations and transform possibility into progress. By teaching people how to create time intentionally, we help them create a better future intentionally.',
  },
  {
    num: '03',
    id: 'universe',
    title: 'The Universe',
    headline: 'One principle expressed three ways — a tool, a philosophy, and a foundation.',
    body: 'Time Creationist is the belief that time is not a resource to be managed but a medium to be authored — that a life is not spent or found, but made. Existence is the instrument of time creation — not a place to schedule your days, but a place to author your life. The Time Creation Project exists to establish Time Creation as a foundational life skill.',
  },
  {
    num: '04',
    id: 'together',
    title: 'Coming Together',
    headline: 'Same coordinates, same palette, same mark.',
    body: 'Each layer is registered to the others, each carrying its own weight of the idea that time is not spent or found, but made. The belief gives the instrument its form; the instrument turns conviction into a weekly practice; the foundation turns Time Creationist from a conviction into a system anyone can build on — and what it studies feeds back into the belief. One ring mark, one Sunrise palette, one grid at three densities: the Time Block, the Time Fabric, the Foundation of Time.',
    flywheel: {
      steps: [
        'The belief shapes the instrument — Time Creationist gives Existence its form: the conviction that time is not spent or found, but made.',
        'The instrument turns belief into daily practice — Existence renders the philosophy as a weekly cycle: Design. Account. Optimize.',
        'The foundation researches and legitimizes — the Time Creation Project turns conviction into frameworks, tools, education, research, and partnerships anyone can build on.',
        'The proof feeds back into the belief — every studied week deepens the philosophy, and the cycle turns again.',
      ],
      caption: 'One principle in orbit: the belief gives the instrument its meaning, the instrument makes the belief livable, the foundation makes it legitimate — and everything it learns returns to the belief.',
    },
  },
];

// The creator credit — relegated from the film to the footer (Sep 15 note).
// Verbatim from the About overlay shipped on robdyrdek.com.
export const CREATOR = {
  name: 'Rob Dyrdek',
  headline: 'Serial entrepreneur, media magnate, CEO of Existence and Founder of Time Creationist.',
  body: "Over the past decade, Rob Dyrdek has redefined what it means to build meaningful ventures, blending storytelling, systems thinking, and relentless execution. Through his venture studio Dyrdek Machine, he built 18 brands, with six exits totaling over $550M. Now he's focused on bringing to market his category-defining software called Existence and changing the way the world views time with his philosophy Time Creationist.",
};

// Rob's sacred closer — now the footer's opening line, above the creator
// credit, on every page. Never paraphrase.
export const CLOSER = 'Every person creates their life through the way they create their time.';

// The three entities — the section after the film releases (Charlie's TCU
// outline: short description and link out). Headline is the gateway hint
// from Rob's own site; body assembled from mined doorway copy.
export const DOORWAYS_BEAT = {
  num: '03',
  title: 'The Three Entities',
  headline: 'Choose an endeavor.',
  body: 'Put Time Creation into practice with Existence, the instrument. Enter the belief behind the practice — time isn’t spent, it’s created. Or stand on the foundation bringing Time Creation to the world. Wherever you begin, it is the same idea: a life is not spent or found, but made.',
};
