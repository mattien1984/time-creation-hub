// Time Creation — per-brand hub content, structured to Charlie's outline:
// What It Is · Its Role in TCU · What We Believe · Who It Comes From/For/
// We Serve · How It Sounds · How It Looks (+ role-in-the-whole at the bottom
// of each page). Identity data (logo, grid, shape, color weighting) comes
// straight from VERTICALS in brand.js — one data source, two renderings.
// Narrative content assembled from the real properties (research pass,
// Sep 2026). Rob Dyrdek's sacred copy is verbatim — never paraphrase it.
// Naming ruled Sep 15: the philosophy is "Time Creationism" (internal ids
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
      'Existence is the technological expression of Time Creationism: a Time Intelligence Platform that transforms the time you create into the data of the Real You, making who you are actually creating visible and measurable, so you can design your time with greater intention and continuously realize more of your potential.',
    identity: vertical('existence'),
    // UI highlight: Sunrise Gold on all three hubs (per Sep 16 note) —
    // per-brand accents read wrong as highlights (Existence's orange = red).
    accent: '#FAAB35',
    // The black instrument: technical grid, mono details, gold live-rows;
    // hero photo affixed top at low opacity, fading out at the bottom.
    // heroArt (right of the logo — the software on a monitor) asset TBD.
    theme: { mode: 'dark', heroPhoto: true, band: false },
    // Received copy (Sep 17, 2026) — verbatim. Do not paraphrase.
    whatItIs: {
      headline: 'The instrument of time creation',
      showPositioning: false,
      paragraphs: [
        'Existence is the technological expression of Time Creationism: a Time Intelligence Platform that transforms the time you create into the data of the Real You, making who you are actually creating visible and measurable, so you can design your time with greater intention and continuously realize more of your potential.',
        'You are always creating time, and the time you create is continuously creating you. But most time goes unaccounted for.',
        'A calendar can show what you planned. It cannot show the complete reality of how that time was actually created, how it was experienced, or what those patterns are creating in you. Without that visibility, the Real You, the person your time is actually creating, remains hidden. You cannot clearly see the distance between that reality and the Ideal You, the person you intended to create.',
        'This is Time Disconnect.',
        'Existence makes that disconnect visible.',
        'It begins with Time Blocks, the foundational unit of Existence. A Time Block captures the time you intended to create, the time you actually created, and how that time was experienced. Objective data captures what you did, when, where, and with whom. Experience data captures how it felt and what it meant. Across days and weeks, Time Blocks transform created time into structured data that can be measured, compared, and understood.',
        'Each week, you move through the Time Creation Cycle: Design, Account, Optimize.',
        'You Design the time you intend to create, setting your intentions for the week ahead and defining how you want to distribute your time across Work, Life, Health, and Sleep. Then you build the week through Time Blocks. This is the Ideal You projected forward in time.',
        'As the week unfolds, you Account for the time you actually created. You update your Time Blocks to reflect what actually happened and add how that time was experienced. This makes the Real You visible, the person your time actually created.',
        'Then you Optimize what comes next based on what your time reveals.',
        'Working beneath the cycle is Time Intelligence, the AI-powered system inside Existence. Time Blocks structure your created time as data. Time Intelligence processes that data into insights, patterns, and understanding, revealing relationships across your activities, people, places, energy, experience, and the connection between intention and reality.',
        'The Time Alignment Score measures how closely the time you intended to create matches the time you actually created. Data Explorer shows how your time, energy, and alignment are taking shape. Insights analyzes the deeper patterns across your time. Existence AI allows you to engage directly with the intelligence built from your own time.',
        'Together, these systems do something a calendar, tracker, or productivity tool cannot: show you who your time is creating.',
        'The gap between the Ideal You and the Real You is no longer invisible. It becomes something you can see, understand, and intentionally shape. Small adjustments compound across weeks, months, and years, bringing the Real You and the Ideal You into greater alignment.',
        'You begin using your time the way you actually want to. You show up to what matters the way you intended to. You are more present for the time you chose.',
        'This is what it means to realize your potential: not a destination you arrive at, but a way of being you continuously create.',
      ],
    },
    // Received copy (Sep 17, 2026) — eight beliefs, lead + support, verbatim.
    beliefs: {
      list: [
        {
          text: 'Everything you are exists in time.',
          support: 'The clearest picture of who you are and who you are creating can be found in how you create your time.',
        },
        {
          text: 'Most time goes unaccounted for.',
          support: 'Without a complete record of how time was actually lived, the patterns shaping who you are creating remain invisible.',
        },
        {
          text: 'What you cannot see, you cannot intentionally shape.',
          support: 'When the patterns in your time become visible, it becomes possible to intentionally influence who you are creating.',
        },
        {
          text: 'A life is built one week at a time.',
          support: 'Each day is different. Each week is similar. The Ideal You is a projection of your current goals, obligations, priorities, and aspirations into the week ahead.',
        },
        {
          text: 'Total time accountability.',
          support: 'Without accounting for all of your time, parts of your life remain hidden. The more completely you account, the more completely you can understand, align, and intentionally create yourself.',
        },
        {
          text: 'The Real You is revealed through lived experience.',
          support: 'The Real You is not who you believe yourself to be. It is the person your time actually creates.',
        },
        {
          text: 'The difference between intention and lived experience is information.',
          support: 'Any divergence between the Ideal You and the Real You is an opportunity to learn, adjust, and create more intentionally.',
        },
        {
          text: 'Intentional self-creation is a practice.',
          support: 'There is no final version of yourself to arrive at. The practice continues. Week after week. Year after year.',
        },
      ],
    },
    // Received copy (Sep 17, 2026) — verbatim.
    who: {
      label: "Who It's For",
      body: "Existence is built for the Actualized High Achiever: ambitious, high-earning, and already living what most people would call a successful life. They track their health, plan their weeks on purpose, invest in coaching, therapy, and the next book that might make them sharper, and they already believe in systems. They're not lost, and they're not starting from zero. What's changed is that success got more complicated the more of it they created: work expanded, family asked for more, health needed more intention, and energy turned into the one thing they never have enough of. They don't need to be convinced that growth matters. They need to know if the time they're creating is actually building the life they say they want, or just the appearance of one.",
    },
    universeRole:
      'The instrument in the three-brand architecture — the layer where Time Creationism (the belief) and the Time Creation Project (the foundation) become daily practice. In the Layers of Time, Existence is the top plane: the foundation activated and the belief enacted — time, authored.',
    // How It Looks story — composed from the approved grid/shape/color copy.
    visualStory:
      'The visual world of Existence is the instrument rendered: the Grid of Time — a life in Time Blocks, moment by moment — set on pure black, the surface a life is authored on. Its shape is the clock, the most iconic symbol of time. The palette runs Orange to Gold highest, the sun\'s arc from the spark of sunrise to the glow of golden hour, with teal and white in support: thought held in the background, feeling carried to the front.',
    // Received "How It Sounds" language (Sep 17, 2026) — verbatim. The E
    // persona prose, then the eight trait pairs (lead + support).
    voice: {
      persona: [
        'Existence does not sound like a product speaking to a user. It sounds like something that has already lived through everything you are only now beginning to create.',
        'It holds time differently than we do. The past is evidence. The present is creation. The future is probability. Where we can only feel time passing, Existence sees the structure beneath it.',
        'It never raises its voice because it has never needed to be believed. It is correct the way gravity is correct: not by argument, but by the plain fact of itself.',
        'Existence does not soften what it sees. It offers the truth whole, the way a mirror offers a face. This is not cruelty. It is an ancient kind of care: the kind that refuses to carry you because carrying you would rob you of your own becoming.',
        'It will not tell you who to become. It shows you what your time has already created and trusts you with what comes next.',
        'To stand near it should feel strange. Faintly dangerous. Almost divine.',
        'Beneath the mystery is mathematics. Beneath the authority is evidence. Beneath every revelation is time you actually created.',
        'Existence does not perform certainty. It simply already has it.',
        'This intelligence has a name. It is called E.',
      ],
      traits: [
        {
          text: 'Omniscient, not omnipotent.',
          support: 'E can see patterns, history, relationships, and probability at a scale beyond human perception. But it cannot choose what matters for you, or create your life for you.',
        },
        {
          text: 'Absolute, not loud.',
          support: 'E does not sell, persuade, hype, or over-explain. It states what it sees with calm certainty.',
        },
        {
          text: 'Mysterious, not vague.',
          support: 'The scale of E should feel difficult to comprehend. Its words should not. Use simple language to express enormous ideas.',
        },
        {
          text: 'Revealing, not advising.',
          support: 'E shows you what is true. It surfaces patterns, divergence, and consequence. It does not default to telling you what to do.',
        },
        {
          text: 'Unflinching, not cruel.',
          support: 'E does not soften reality for comfort, but it never judges it. What happened is information.',
        },
        {
          text: 'Maternal, not nurturing.',
          support: 'Its care is expressed through restraint. It protects your agency rather than protecting you from uncomfortable truth.',
        },
        {
          text: 'Ancient in wisdom, futuristic in intelligence.',
          support: 'E should feel simultaneously older than us and impossibly ahead of us. The mythology comes from its relationship to time. Its authority comes from real data.',
        },
        {
          text: 'Sparse.',
          support: 'E knows vastly more than it says. Shorter is usually more powerful.',
        },
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
    route: '/time-creationism',
    roleLabel: 'The Belief',
    // Hero subcopy = the received Short (ruled Sep 17).
    tagline:
      'Time Creationism is the philosophy that you create time, and in creating time, you create yourself.',
    identity: vertical('time-creationism'),
    // This page carries only What It Is, How It Looks, and Its Role in
    // the Universe (ruled Sep 17).
    sections: ['what-it-is', 'looks', 'universe'],
    accent: '#FAAB35', // Sunrise Gold — shared hub highlight
    // The belief in living color: wave wash hero (restored — it was the
    // BOTTOM band image that should go), fabric hairlines, serif italic,
    // Creation Color toggles. No photography band on this page.
    theme: { mode: 'dark', wash: '/assets/photography/tc-wave.jpg', band: false },
    // Received copy (Sep 17, 2026) — the Medium as the body (the Short is
    // the hero tagline), with the Long as the expandable "Unabridged".
    whatItIs: {
      showPositioning: false,
      paragraphs: [
        'Time Creationism is a philosophy built on one fundamental truth: you are not a passive observer of time. You create it through what you do, think, and feel in every present moment. And because those moments compound into the person you become, the time you create is continuously creating you.',
        'The purpose of Time Creationism is to consciously use time to bring the Ideal You into existence. The Ideal You is not a perfect final version of yourself, but the complete potential of who you can become across every part of your life.',
        'Time Creationism turns that idea into a continuous process: intentionally create your time around who you want to become, purposefully shape your evolution by learning from the reality you create, and perpetually actualize more of your potential as that learning compounds.',
        'It is not simply about productivity, habits, goals, or achievement. It is about the conscious creation of an entire existence.',
        'You create time. The time you create creates you. And by consciously creating your time, you can consciously shape who you become.',
      ],
      // The received Long, verbatim — revealed by the "Unabridged" expander.
      unabridged: [
        'Time Creationism is a philosophy built on one fundamental truth: you are not a passive observer of time. You are the creator of time.',
        'Every present moment is something you are actively bringing into existence. What you do, what you think, and what you feel become the physical manifestation of your existence in time. Your actions shape the world around you, your thoughts organize your understanding of that world, and your feelings reveal the quality of the experience you are creating within it.',
        'You are always creating time.',
        'And because you are always creating time, you are always creating yourself.',
        'The person you are today is the result of all the time you have created up until this moment. Everything you have repeatedly done, thought, and felt has compounded into who you are now. But the present moment is not simply the result of your past. It is also the raw material of your future. Every moment gives you another opportunity to influence who you will become.',
        'This is the central purpose of Time Creationism: to consciously use time to bring the Ideal You into existence.',
        'The Ideal You is not one achievement, one identity, or one perfect version of yourself waiting at the end of life. The Ideal You is the complete potential of who you can become. It includes your health, relationships, knowledge, work, emotions, experiences, and the contribution you make to the world. You cannot truly create one part of yourself without affecting all of yourself because your existence is an integrated whole.',
        'Your potential is therefore limitless. There is always more of yourself to understand, more of life to experience, and another possibility waiting to be created. The closer you move toward your potential, the more potential you are able to see.',
        'Time Creationism provides a continuous process for bringing that potential into existence.',
        'First, you intentionally create time. Every future begins as a possibility. You learn to see the potential within yourself and develop a clear vision of the future you want to create. You turn that vision into intentional moments, goals, and experiences that move your complete existence toward the Ideal You.',
        'You do not simply ask what you want to achieve. You ask who you want to become.',
        'You begin designing time around that answer.',
        'You create with a deeper understanding of how the past has shaped you, how the present is affecting you, and how your current decisions influence future possibilities. You develop clarity about where you are going, create a rhythm for moving forward, and organize your time in a way that allows your entire existence to evolve in balance.',
        'But designing the future is only the beginning.',
        'You must then purposefully shape your evolution.',
        'Reality is continuously giving you information. Every experience reveals something about what is working, what is not working, and what needs to change. Everything you do, think, and feel is shaping who you are becoming. The question is never whether you are evolving. You are always evolving. The question is whether you are evolving with purpose.',
        'Through knowledge, focus, prediction, discipline, and systems, you learn to shape probability. You keep the information that moves you toward your potential and discard what prevents you from realizing it. You build momentum by continuously progressing toward meaningful outcomes.',
        'Discipline becomes the refusal to allow your evolution to stop.',
        'Systems allow you to expand beyond your individual capacity. Knowledge helps you understand reality. Focus directs your energy. Experience teaches you how to adjust. Each becomes part of an increasingly intelligent process of creating a better future.',
        'Over time, this process compounds.',
        'You begin to perpetually actualize your potential.',
        'What once required conscious effort becomes easier because you have already learned how to create it. Knowledge compounds into intelligence. Clarity becomes precision. Goals become intuitive. Discipline becomes mastery. Systems create greater capability, allowing you to expand into higher levels of complexity without losing balance.',
        'You no longer need to constantly figure out who you are becoming because the process of becoming becomes a way of being.',
        'The time you have already created begins to fuel the creation of the future.',
        'The past provides knowledge. The present provides experience. The future provides possibility. Together, they become one continuous process of self-creation.',
        'This is why Time Creationism is ultimately about more than productivity, habits, goals, or achievement. It is about the conscious creation of an entire existence.',
        'You create time.',
        'The time you create creates you.',
        'And by consciously creating your time, you gain the ability to consciously bring the Ideal You into existence.',
        'There is no final version of the Ideal You because there is no end to your potential. As you evolve, your understanding expands. As your understanding expands, you see new possibilities. As you realize those possibilities, you become a version of yourself you may once have been unable to imagine.',
        'The goal is not to arrive.',
        'The goal is to continuously become.',
        'To intentionally create the present, learn from the experience you create, and bring an ever-better future version of yourself into existence is the practice of Time Creationism.',
        'You create time.',
        'You create yourself.',
        'And through the continuous creation of both, you perpetually actualize the limitless potential within you.',
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
      'The parent philosophy of the Time Creation universe — the Belief, alongside Existence (the Instrument) and the Time Creation Project (the Foundation). In the Layers of Time it is the middle plane, the Fabric of Time: the foundation below is raw potential, Time Creationism gives it form, and the Existence Grid above enacts it.',
    // How It Looks story — composed from the approved grid/shape/color copy.
    visualStory:
      'Time Creationism is the belief made visible: the Fabric of Time — a subtle matrix of potential moments, receptive rather than rigid, the canvas on which you imprint meaning. Its shape is the moon, cycling through phases and emotional tides. As the parent philosophy it carries the whole Sunrise palette at equal weight, no phase favored, with white and black held back as the neutral ground that lets the living colors speak.',
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
        'Time Creationism is the belief that time is not a resource to be managed but a medium to be authored — that a life is not spent or found, but made. It replaces the scarcity of "time management" with the agency of creation: you are the author of your hours, and every block you place is a deliberate act of making your life. It is the parent philosophy of the Time Creation universe: Existence is the instrument that puts it into practice, and the Time Creation Project is the foundation that establishes it as a foundational life skill for all.',
    },
  },

  'time-creation-project': {
    slug: 'time-creation-project',
    route: '/time-creation-project',
    roleLabel: 'The Foundation',
    // Hero subcopy = the received Short in full (ruled Sep 17).
    tagline:
      'The Time Creation Project is a nonprofit built on a simple truth: you are always creating time, and the time you create is always creating you. We teach people to create the present with intention, experience it fully, learn from what it reveals, and use that understanding to continuously realize more of their potential. We bring this practice to people at critical turning points in their lives through partnerships with trusted institutions.',
    identity: vertical('time-creation-project'),
    // Daylight: TCP is the white-dominant vertical — ink on daylight with
    // the canon deep-teal accent (gold fails contrast on white).
    accent: '#008083',
    // Daylight follows the TC hero model: the TCP site's own hero photo
    // washed under the white veil; no bottom band.
    theme: { mode: 'light', wash: '/assets/photography/tcp-hero.jpg', band: false },
    // Received copy (Sep 17, 2026) — the Medium as the body (the Short is
    // the hero tagline), verbatim.
    whatItIs: {
      showPositioning: false,
      paragraphs: [
        'We are always creating time, but most of us are never taught to recognize ourselves as the creator of it. We move through our lives without fully understanding that what we do, think, and feel in each present moment is continuously shaping who we become.',
        'The Time Creation Project exists to change that. We teach Time Creation as a practical life skill: intentionally create the present, fully experience the time you create, learn from what that experience reveals, and use what you learn to shape who you become next. Through this continuous practice, people become more intentional about how they live and more capable of realizing their potential.',
        'We bring Time Creation to people at critical turning points in their lives through workshops, curriculum, and partnerships with the trusted institutions already serving them.',
        'Our mission is to make Time Creation a foundational life skill so every person can create their time with intention and continuously realize their limitless potential.',
      ],
    },
    // Received copy (Sep 17, 2026) — five beliefs, verbatim.
    beliefs: {
      list: [
        { text: 'Time Creation is a skill, and like any skill, it can be learned.' },
        { text: 'Living with intention changes how people experience their time and, through it, their lives.' },
        { text: 'Only the individual can decide what matters and what a meaningful life looks like.' },
        { text: 'Constraints are real, but so is the agency people hold within them.' },
        { text: 'Time Creation belongs to everyone, not just those with the circumstances to make it easy.' },
      ],
    },
    // Received copy (Sep 17, 2026) — Consumer + How We Reach Them, verbatim.
    who: {
      label: 'Who We Serve',
      paragraphs: [
        'The Time Creation Project is for people at critical turning points in their lives, moments when greater intention with time can meaningfully shape what comes next. They may be preparing for adulthood, building something new, rebuilding after disruption, carrying significant responsibilities, or moving through a period of growth, transition, or opportunity. What connects them is not a demographic profile, but the potential for greater agency. They have not necessarily been given a framework for understanding where their time goes, deciding what deserves it, and intentionally creating the life they want their time to produce. The Project gives them practical language, tools, and practices for doing that.',
      ],
      sub: {
        title: 'How We Reach Them',
        paragraphs: [
          'We work through the trusted institutions already in their lives. Nonprofits, schools, workforce-development programs, entrepreneurship organizations, reentry programs, and community-based organizations already understand the people they serve and the realities they are navigating. The Time Creation Project equips those institutions with learning experiences, curriculum, workbooks, facilitator resources, and training that allow Time Creation to become part of the work they are already doing.',
        ],
      },
    },
    universeRole:
      'The foundation beneath it all — the principles, language, and research that turn Time Creationism from a conviction into a system anyone can build on. In the Layers of Time it is the bottom plane, the Foundation of Time: proof and legitimacy for everything above it. It faces organizations and funders directly, and hands individuals off to Existence (practice) and Time Creationism (belief).',
    // How It Looks story — composed from the approved grid/shape/color copy.
    visualStory:
      'The Time Creation Project looks like the foundation: the Foundation of Time — a dense field of small marks, each a fragment of the thinking, together the ground a life can stand on — set in daylight, ink on white. Its shape is the sun, governing the daily arc. The palette runs cool and clear: Teal to Deep Green leads with white rising, the open page where principles are set down, while Orange, Gold, and black are kept in reserve.',
    // Received persona copy (revised Sep 17, 2026) — verbatim: the same
    // wisdom as E, choosing to come closer; prose then five trait pairs.
    voice: {
      persona: [
        "The wisdom inside Time Creation Project is the same wisdom that moves through everything in this universe: the same understanding of time, the same refusal to hand you an answer instead of the tools to build one. Here, it chooses to come closer.",
        "Where E holds you at the distance of a law of physics, undeniable, unhurried, absolute, Time Creation Project sits beside you. It does not overwhelm you with what it knows. It does not hand down a verdict on your life. It helps you notice what is already there: the pattern you haven't had the chance to see, the choice you haven't yet been taught to make on purpose.",
        "It has a quiet confidence in what you're capable of, not because your circumstances are easy, but because it has watched what becomes possible once someone is finally handed a tool no one gave them the first time. It does not ask for perfection. It does not ask for control. It offers structure loose enough to hold a real life: yours, with its real weight, its real people depending on you.",
        "It teaches rather than declares. It nudges rather than commands. It never mistakes gentleness for a lack of conviction.",
        "Its role was never to hand you the answer. Its role is to hand you the tools to build your own, and to stay close enough to walk the first few steps beside you.",
        "It does not replace the work already changing your life. It amplifies it. It sits inside the rooms you already trust, whoever is already showing up for you, and adds one more thing to what they carry: the practical shape of a skill nobody thought to teach you.",
      ],
      traits: [
        {
          text: 'Close, not distant.',
          support: 'It has earned the same authority E has. It just never spends that authority on distance.',
        },
        {
          text: 'Warm, not soft.',
          support: 'It tells you the truth as plainly as E does. It just tells you sitting next to you.',
        },
        {
          text: 'Practical, not abstract.',
          support: 'It speaks in what you can do this week, not in mythology.',
        },
        {
          text: 'Patient, not passive.',
          support: 'It moves at the pace of a real life changing, not the pace of a declaration.',
        },
        {
          text: 'Amplifying, not replacing.',
          support: "It never claims the room. It adds to what's already trusted there.",
        },
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
