// Time Creation — per-brand hub content, structured to Charlie's outline:
// What It Is · Its Role in TCU · What It Believes · Who It Comes From/For/
// We Serve · How It Sounds · How It Looks (+ role-in-the-whole at the bottom
// of each page). Identity data (logo, grid, shape, color weighting) comes
// straight from VERTICALS in brand.js — one data source, two renderings.
// Narrative content assembled from the real properties (research pass,
// Sep 2026). Rob Dyrdek's sacred copy is verbatim — never paraphrase it.
// Naming ruled Sep 15: the philosophy is "Time Creationist" (internal ids
// and asset filenames keep the legacy time-creationism slug).
// Open questions live in BRAND-QUESTIONS.md.

import { VERTICALS } from './brand';
import { CREATOR } from './story';

const vertical = (id) => VERTICALS.find((v) => v.id === id);

export const HUBS = {
  existence: {
    slug: 'existence',
    route: '/existence',
    roleLabel: 'The Instrument',
    tagline:
      'Existence is a Time Intelligence Platform that transforms your created time into the data of the Real You, making who you are actually creating visible and measurable so you can design your time with greater intention and continuously realize your limitless potential.',
    identity: vertical('existence'),
    // UI highlight: Sunrise Gold on all three hubs (per Sep 16 note) —
    // per-brand accents read wrong as highlights (Existence's orange = red).
    accent: '#FAAB35',
    // The black instrument: technical grid, mono details, gold live-rows.
    theme: { mode: 'dark' },
    whatItIs: {
      headline: 'The instrument of time creation',
      paragraphs: [
        "Existence is a Time Intelligence Platform that transforms your created time into the data of the Real You, making who you are actually creating visible and measurable so you can design your time with greater intention and continuously realize your limitless potential. It is not a place to schedule your days, but a place to author your life — it turns your intentions into something you can see and shape, then shows you whether the time you're actually living adds up to the life you mean to create.",
      ],
    },
    beliefs: {
      copy: [
        'At its heart is the Time Creation Cycle — a weekly practice built around your Time Blocks. Design the person you want to be. Account for who you actually are. Optimize what your time reveals to continuously realize your potential.',
        'You design the week you intend to create: set your intention across Work, Life, Health, and Sleep, then build your week in Time Blocks, shaping each part of it before you live it. As the week unfolds, update each Time Block to reflect what actually happened. Together, your Time Blocks reveal the Real You.',
        'Your Time Alignment Score shows how closely the time you lived matched the time you intended to create. Small adjustments, repeated weekly, create massive change. Every week, the record deepens. Over time, the Real You and Ideal You move into greater alignment.',
      ],
    },
    who: {
      label: "Who It's For",
      body: 'High-agency achievers, 30s–40s, who already plan and want their lived week to match their intended self. The demo persona "Alex" carries real career weight, protected family life, and a physical practice — the premium quantified-self buyer measured on alignment and meaning-per-block rather than biometrics. The aspirational unit is the person you set out to be. The launch cohort is Founding Members: invited early believers, many following Rob Dyrdek personally, welcomed intimately ("Welcome. You’re one of the first.") with honest scarcity.',
    },
    universeRole:
      'The instrument in the three-brand architecture — the layer where Time Creationist (the belief) and the Time Creation Project (the foundation) become daily practice. In the Layers of Time, Existence is the top plane: the foundation activated and the belief enacted — time, authored.',
    voice: {
      principles: [
        'Second-person imperative built on the three verbs: Design the person you want to be. Account for who you actually are. Optimize what your time reveals. Identity words (Real You, Ideal You, intention) carry serif-italic emphasis.',
        'Antithesis does the persuading — "not a place to schedule your days, but a place to author your life"; "the week you actually lived, not the one you planned." No hype, no exclamation points; conviction through parallelism and repetition.',
        'Cause-and-effect chains compound like the practice itself: "The more completely you account for your time, the clearer the record becomes." "The clearer the record, the more precise your next Design."',
        'Proprietary nouns are capitalized mid-sentence and do the branding work: Time Block, Time Creation Cycle, Time Alignment Score, Time Intelligence, Real You, the record.',
        'Gospel copy is verbatim-only — narrative lines from the Time Creation Cycle gospel text are never paraphrased; even a one-word adaptation needs approval.',
        'The villain is the unchanged calendar grid — never a competitor brand. Avoid: "make time for what matters," life-in-weeks math, "take back your time," countdowns, fake scarcity.',
      ],
      examples: [
        'Design the person you want to be. Account for who you actually are. Optimize what your time reveals to continuously realize your potential.',
        'Together, your Time Blocks reveal the Real You.',
        'Every week, the record deepens.',
        'The clearer the record, the more precise your next Design.',
        'Welcome. You’re one of the first.',
        'what you stamp is what you live — Rob Dyrdek, internal directive',
      ],
    },
    positioning: {
      oneLiner:
        'Existence is a Time Intelligence Platform that transforms your created time into the data of the Real You.',
      boilerplate:
        'Existence is a Time Intelligence Platform that transforms your created time into the data of the Real You, making who you are actually creating visible and measurable so you can design your time with greater intention and continuously realize your limitless potential. It is the instrument of time creation — not a place to schedule your days, but a place to author your life. At its heart is the Time Creation Cycle, a weekly practice built around your Time Blocks: Design. Account. Optimize. Now available for desktop web and as an iPhone app, with seamless Google Calendar integration.',
    },
  },

  'time-creationism': {
    slug: 'time-creationism',
    route: '/time-creationist',
    roleLabel: 'The Belief',
    tagline:
      'Time Creationist is a philosophy for intentionally creating your life through time, showing how every action, thought, and feeling shapes who you become.',
    identity: vertical('time-creationism'),
    accent: '#FAAB35', // Sunrise Gold — shared hub highlight
    // The belief in living color: wave wash, fabric hairlines, serif italic.
    theme: { mode: 'dark' },
    whatItIs: {
      headline: 'A life is not spent or found, but made.',
      paragraphs: [
        'Time Creationist is the belief that time is not a resource to be managed but a medium to be authored — that a life is not spent or found, but made. It replaces the scarcity of "time management" with the agency of creation: you are the author of your hours, and every block you place is a deliberate act of making your life.',
        'Its canvas is the Time Fabric — the subtle matrix of small squares representing the latent structure waiting to be activated by the individual. Each square is a potential moment, a unit of time not yet lived; when intention, energy, and thought are applied, they come alive.',
      ],
    },
    // The 5–10 core beliefs — curated from verbatim source copy for Rob's
    // sign-off (sacred: true = his foundation/production lines, untouchable).
    beliefs: {
      list: [
        { text: 'Time isn’t spent. It’s created.', sacred: true },
        { text: 'Time is not a resource to be managed but a medium to be authored.' },
        { text: 'A life is not spent or found, but made.' },
        { text: 'You are the author of your hours, and every block you place is a deliberate act of making your life.' },
        { text: 'We believe that nearly every challenge people face—and nearly every opportunity they pursue—is ultimately expressed through time.', sacred: true },
        { text: 'Every action, thought, and feeling shapes who you become.', sacred: true },
        { text: 'This is time as a living system — not measured, but made.' },
        { text: 'Every person creates their life through the way they create their time.', sacred: true },
      ],
    },
    who: {
      label: 'Who It Comes From',
      body: `The belief comes from its founder. ${CREATOR.body}`,
    },
    universeRole:
      'The parent philosophy of the Time Creation universe — the Belief, alongside Existence (the Instrument) and the Time Creation Project (the Foundation). In the Layers of Time it is the middle plane, the Fabric of Time: the foundation below is raw potential, Time Creationist gives it form, and the Existence Grid above enacts it.',
    voice: {
      principles: [
        'Antithesis is the engine. Every core idea turns on the "not A, but B" construction: "not spent or found, but made"; "not rigid, it is receptive"; "not measured, but made."',
        'State the term, then unfold it in a long em-dash appositive — "the fabric of time — the latent structure waiting to be activated by the individual." Vocabulary itself does the branding work.',
        'Speak to "you" with agency verbs — author, create, shape, imprint, place, make. Never manage, spend, save, or optimize: the belief speaks philosophy language, not product language.',
        'Draw metaphors from material and nature — fabric, canvas, ground, the moon’s phases and tides — never from machinery, hustle, or scarcity.',
        'Aphoristic restraint: short declaratives, periods only, no feature-benefit selling. The register is a philosophy primer crossed with a design manifesto.',
        'When Rob’s foundation lines are used, they are used verbatim — anaphora and mirrored constructions intact.',
      ],
      examples: [
        'Time isn’t spent. It’s created.',
        'A life is not spent or found, but made.',
        'You are the author of your hours.',
        'This is time as a living system — not measured, but made.',
        'Every person creates their life through the way they create their time.',
      ],
    },
    positioning: {
      oneLiner:
        'The belief behind the practice: why time is something you author, not something that happens to you.',
      boilerplate:
        'Time Creationist is the belief that time is not a resource to be managed but a medium to be authored — that a life is not spent or found, but made. It replaces the scarcity of "time management" with the agency of creation: you are the author of your hours, and every block you place is a deliberate act of making your life. It is the parent philosophy of the Time Creation universe: Existence is the instrument that puts it into practice, and the Time Creation Project is the foundation that establishes it as a foundational life skill for all.',
    },
  },

  'time-creation-project': {
    slug: 'time-creation-project',
    route: '/time-creation-project',
    roleLabel: 'The Foundation',
    tagline:
      'Teaching Time Creation as a foundational life skill that turns possibility into progress',
    identity: vertical('time-creation-project'),
    // Daylight: TCP is the white-dominant vertical — ink on daylight with
    // the canon deep-teal accent (gold fails contrast on white).
    accent: '#008083',
    theme: { mode: 'light' },
    // Rob's sacred foundation copy — VERBATIM, em dashes and all. Never edit.
    whatItIs: {
      headline: 'The Time Creation Project exists to establish Time Creation as a foundational life skill.',
      paragraphs: [
        'The Time Creation Project serves as a catalyst for this transformation by developing frameworks, tools, education, research, and partnerships that make Time Creation accessible to all. Through collaboration with organizations already creating positive change, we aim to strengthen human development efforts and help individuals create greater alignment between who they want to become and how they spend their lives. Every person creates their life through the way they create their time.',
      ],
    },
    beliefs: {
      copy: [
        'We believe that nearly every challenge people face—and nearly every opportunity they pursue—is ultimately expressed through time. Health requires time. Learning requires time. Relationships require time. Personal growth requires time. Purpose requires time.',
        'By teaching people how to create time intentionally, we help them create a better future intentionally. When people learn how to intentionally create their time, they gain a powerful ability to align their actions with their aspirations and transform possibility into progress.',
        'Our mission is to advance the understanding, practice, and adoption of Time Creation. We integrate Time Creation into the existing work of charities, nonprofits, educational institutions, human development organizations, and community programs around the world. By embedding Time Creation into programs that improve health, education, workforce readiness, family stability, personal development, and community well-being, we believe we can amplify impact at scale and help millions of people build lives with greater intention, clarity, and fulfillment.',
      ],
    },
    who: {
      label: 'Who We Serve',
      body: 'Primary: leaders of mission-driven organizations — charities, nonprofits, educational institutions, human development organizations, and community programs — working in health, education, workforce readiness, family stability, personal development, and community well-being, courted with "Partner with us." Secondary: funders and donors ("Support the work — fund frameworks, research, and education that reach more people"). Tertiary: individuals, deliberately handed off through the ecosystem dock. End beneficiary: millions of people building lives with greater intention, clarity, and fulfillment.',
    },
    universeRole:
      'The foundation beneath it all — the principles, language, and research that turn Time Creationist from a conviction into a system anyone can build on. In the Layers of Time it is the bottom plane, the Foundation of Time: proof and legitimacy for everything above it. It faces organizations and funders directly, and hands individuals off to Existence (practice) and Time Creationist (belief).',
    voice: {
      principles: [
        'Declarative, institutional-yet-human mission language — conviction stated as fact, never hype. Periods, never exclamation points; "time" is often the final word of the argument.',
        'Anaphora and mirrored constructions carry the argument: "Health requires time. Learning requires time. Relationships require time..." and "create time intentionally... create a better future intentionally."',
        'Latinate verbs of scale — establish, advance, integrate, embed, amplify, catalyze — paired with aspiration-vs-action framing: "alignment between who they want to become and how they spend their lives."',
        'Humility toward partners: TCP is a catalyst, not a competitor. "We don’t replace the work that’s changing lives. We amplify it."',
        'Two registers, one voice: Rob’s sacred foundation copy for the story (verbatim only — even punctuation preserved); a plainspoken register for supporting surfaces ("We all live in time. Almost no one is taught to create it.").',
      ],
      examples: [
        'We believe that nearly every challenge people face—and nearly every opportunity they pursue—is ultimately expressed through time.',
        'By teaching people how to create time intentionally, we help them create a better future intentionally.',
        'We all live in time. Almost no one is taught to create it.',
        'We don’t replace the work that’s changing lives. We amplify it.',
        'Every person creates their life through the way they create their time.',
      ],
    },
    positioning: {
      oneLiner:
        'The foundation bringing Time Creation to the world — establishing it as a foundational life skill for all.',
      boilerplate:
        'The Time Creation Project exists to establish Time Creation as a foundational life skill. It works as a catalyst, developing the five offerings an organization needs to make Time Creation real — 01 Frameworks: a common, proven way to teach and practice creating time. 02 Tools: practical tools that help people plan, track, and reflect. 03 Education: curriculum and training to embed the skill in programs. 04 Research: evidence on what works, shared openly to improve practice. 05 Partnerships: hands-on collaboration to integrate it into your mission. We don’t replace the work that’s changing lives. We amplify it.',
    },
  },
};

export const HUB_ORDER = ['existence', 'time-creationism', 'time-creation-project'];
