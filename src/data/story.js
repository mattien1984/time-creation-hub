// The homepage narrative — the film's beats plus the footer creator credit.
// Assembled from the real properties (research pass, Sep 2026):
// - Beat 01: verbatim from THE GAP (time-creation-project/index-daylight.html)
// - Beat 02: Rob's SACRED foundation copy, verbatim (index-foundation.html)
// - Beat 03: brand.js statements + Rob's sacred establishing line
// - Beat 04: UMBRELLA.intro + architecture copy; flywheel synthesized
// - Beat 05 (doorways): Rob's sacred closer + mined doorway copy
// - CREATOR (footer credit): verbatim from the robdyrdek.com About overlay
// Sacred lines (Rob's own words) must never be paraphrased.

// The film's four intro beats — received copy (Sep 17, 2026), verbatim.
export const INTRO_LINES = [
  'You create time.',
  'In creating time, you are creating yourself.',
  'Yet most of us are never taught to create our time with intention.',
  'Our mission is to make Time Creation a foundational life skill.',
];

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
    body: 'Time Creationism is the belief that time is not a resource to be managed but a medium to be authored — that a life is not spent or found, but made. Existence is the instrument of time creation — not a place to schedule your days, but a place to author your life. The Time Creation Project exists to establish Time Creation as a foundational life skill.',
  },
  {
    num: '04',
    id: 'together',
    title: 'Coming Together',
    headline: 'Same coordinates, same palette, same mark.',
    body: 'Each layer is registered to the others, each carrying its own weight of the idea that time is not spent or found, but made. The belief gives the instrument its form; the instrument turns conviction into a weekly practice; the foundation turns Time Creationism from a conviction into a system anyone can build on — and what it studies feeds back into the belief. One ring mark, one Sunrise palette, one grid at three densities: the Time Block, the Time Fabric, the Foundation of Time.',
    flywheel: {
      steps: [
        'The belief shapes the instrument — Time Creationism gives Existence its form: the conviction that time is not spent or found, but made.',
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
  headline: 'Serial entrepreneur, media magnate, CEO of Existence and Founder of Time Creationism.',
  body: "Over the past decade, Rob Dyrdek has redefined what it means to build meaningful ventures, blending storytelling, systems thinking, and relentless execution. Through his venture studio Dyrdek Machine, he built 18 brands, with six exits totaling over $550M. Now he's focused on bringing to market his category-defining software called Existence and changing the way the world views time with his philosophy Time Creationism.",
};

// The full Rob Dyrdek bio — received Sep 17, 2026, verbatim from the
// robdyrdek.com About overlay. The homepage bio section under the film's
// end state; first paragraph shows collapsed, Read More reveals the rest.
export const ROB_BIO = {
  headline:
    'Rob Dyrdek is a serial entrepreneur, media magnate, CEO of Existence, and founder of Time Creationism.',
  paragraphs: [
    'For more than two decades, Rob has dedicated himself to mastering one of the most fundamental resources of human existence: time. Through entrepreneurship, media creation, and the intentional design of his own life, he has explored how to create more, experience more, and build more with the time he has.',
    'That pursuit has shaped his career. In television, Rob built a production system for Ridiculousness that allowed him to shoot an unprecedented 336 episodes a year while requiring only 4% of his time. Through his venture studio, Dyrdek Machine, he built 18 brands and six exits totaling more than $550 million in less than five years.',
    'Over time, Rob became less interested in simply achieving more with his time and more interested in understanding what time actually is and what it is creating. In 2015, he created the Rhythm of Existence, a personal operating system that mapped his time across Work, Life, Health, and Sleep. It gave him a way to see his life as something he was continuously creating, while pursuing his ambitions alongside the balance, health, relationships, and experiences that make life fulfilling.',
    'That led to a simple realization: you are continuously creating time, and the time you create is continuously creating you. This became the foundation of Time Creationism, a philosophy centered on the idea that time is the medium through which we create our existence.',
    'Today, Rob is building Time Creation into a foundational life skill through three connected pillars: philosophy, technology, and philanthropy. Through his book series and Time Creationist, a 100-part podcast series, he is codifying the philosophy. The Time Creation Project extends it through nonprofit and community partnerships. And Existence, the technological expression of Time Creationism, is a time intelligence platform that transforms the time you create into the data of the Real You, making the patterns of your life visible so you can intentionally design your time and continuously realize your potential.',
    'Together, these three pillars represent the convergence of what Rob has learned through building companies, creating media, and designing his own existence — as well as his passion for helping others realize their potential while creating a life that is balanced, meaningful, and fulfilling.',
  ],
  socials: [
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/robdyrdek' },
    { id: 'x', label: 'X', href: 'https://x.com/robdyrdek' },
    { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@robdyrdek' },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@robdyrdek' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/robdyrdek' },
  ],
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
