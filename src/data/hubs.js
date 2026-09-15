// Time Creation — per-brand hub content
// Identity data (logo, grid, shape, color weighting) comes straight from
// VERTICALS in brand.js — one data source, two renderings (/system shows the
// comparative logic, a hub shows just its own application).
// Narrative fields marked `pending: true` are being filled from the research
// pass over the real properties (TCP foundation page, Rob's gateway site,
// Existence HIW + marketing pages); the hub template renders a quiet
// placeholder for them until they land.

import { VERTICALS } from './brand';

const vertical = (id) => VERTICALS.find((v) => v.id === id);

export const HUBS = {
  existence: {
    slug: 'existence',
    roleLabel: 'The Instrument',
    tagline: 'The app — belief turned into daily practice.',
    identity: vertical('existence'),
    accent: '#FD5900',
    story: { pending: true, headline: '', paragraphs: [] },
    universeRole:
      'Existence is where the belief becomes daily practice — the instrument the philosophy plays through.',
    persona: { pending: true, body: '' },
    voice: { pending: true, principles: [], examples: [] },
    positioning: { pending: true, oneLiner: '', boilerplate: '' },
  },
  'time-creationism': {
    slug: 'time-creationism',
    roleLabel: 'The Belief',
    tagline: 'The philosophy — parent of the universe.',
    identity: vertical('time-creationism'),
    accent: '#249EA1',
    story: { pending: true, headline: '', paragraphs: [] },
    universeRole:
      'Time Creationism is the organizing conviction — the belief the instrument enacts and the foundation studies.',
    persona: { pending: true, body: '' },
    voice: { pending: true, principles: [], examples: [] },
    positioning: { pending: true, oneLiner: '', boilerplate: '' },
  },
  'time-creation-project': {
    slug: 'time-creation-project',
    roleLabel: 'The Foundation',
    tagline: 'The research foundation — proof and legitimacy.',
    identity: vertical('time-creation-project'),
    accent: '#FAAB35',
    story: { pending: true, headline: '', paragraphs: [] },
    universeRole:
      'The Time Creation Project is the bedrock — the principles, language, and research that give the practice its ground.',
    persona: { pending: true, body: '' },
    voice: { pending: true, principles: [], examples: [] },
    positioning: { pending: true, oneLiner: '', boilerplate: '' },
  },
};

export const HUB_ORDER = ['time-creationism', 'existence', 'time-creation-project'];
