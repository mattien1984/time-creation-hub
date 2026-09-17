// The creator bio — under the film's end state on the homepage. The
// robdyrdek.com About portrait over a sunrise bloom, the received bio
// verbatim: first paragraph in the open, Read More reveals the rest and
// the social links.

import { useState } from 'react';
import Reveal from '../components/Reveal';
import { ROB_BIO } from '../data/story';
import { asset } from '../lib/asset';

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.01" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 4v9.8a3.8 3.8 0 1 1-3.8-3.8" />
      <path d="M14.5 4c.4 2.6 2.2 4.3 4.9 4.6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

export default function RobBio() {
  const [open, setOpen] = useState(false);
  return (
    <section className="robbio" id="creator">
      <div className="wrap robbio__inner">
        <Reveal>
          <div className="robbio__portrait">
            <img src={asset('/assets/photography/rob-portrait.jpg')} alt="Rob Dyrdek" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="robbio__headline">{ROB_BIO.headline}</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="robbio__p">{ROB_BIO.paragraphs[0]}</p>
        </Reveal>
        <div className={`robbio__more${open ? ' is-open' : ''}`}>
          <div className="robbio__clip">
            <div className="robbio__rest">
              {ROB_BIO.paragraphs.slice(1).map((p, i) => (
                <p key={i} className="robbio__p">{p}</p>
              ))}
              <div className="robbio__rule" aria-hidden="true" />
              <div className="robbio__socials">
                {ROB_BIO.socials.map((s) => (
                  <a key={s.id} href={s.href} target="_blank" rel="noreferrer">
                    {SOCIAL_ICONS[s.id]}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`robbio__toggle${open ? ' is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span className="acc__toggle" aria-hidden="true">
            <span className="acc__plus" />
          </span>
          <span>{open ? 'Read Less' : 'Read More'}</span>
        </button>
      </div>
    </section>
  );
}
