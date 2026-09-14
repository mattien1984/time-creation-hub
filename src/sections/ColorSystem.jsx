import { useState } from 'react';
import Reveal from '../components/Reveal';
import { PALETTE, VERTICALS } from '../data/brand';

export default function ColorSystem() {
  const [copied, setCopied] = useState(null);
  const [active, setActive] = useState(VERTICALS[0].id);
  const vertical = VERTICALS.find((v) => v.id === active);

  const copy = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1200);
  };

  return (
    <section id="color" className="section wrap">
      <Reveal className="colors__head">
        <div>
          <p className="eyebrow">Shared foundation</p>
          <h2 className="display" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', marginTop: 16 }}>
            Sunrise Color System
          </h2>
        </div>
        <p className="body" style={{ maxWidth: '40ch' }}>
          One palette, drawn from the sky and the sun's arc. Every vertical shares
          it — and each re-weights it. Click any swatch to copy its value.
        </p>
      </Reveal>

      <Reveal className="swatches" delay={80}>
        {PALETTE.map((c) => (
          <button key={c.hex} className="swatch" onClick={() => copy(c.hex)} title={`Copy ${c.hex}`}>
            <div className="swatch__chip" style={{ background: c.hex }} />
            <div className="swatch__hex">
              <span>{c.name}</span>
              <span className={copied === c.hex ? 'copied' : ''}>
                {copied === c.hex ? 'Copied' : c.hex}
              </span>
            </div>
          </button>
        ))}
      </Reveal>

      <div className="usage">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Usage level by vertical</p>
          <div className="usage__toggle">
            {VERTICALS.map((v) => (
              <button
                key={v.id}
                className={active === v.id ? 'active' : ''}
                onClick={() => setActive(v.id)}
              >
                {v.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="usage__chart" once={false}>
          {PALETTE.map((c, i) => (
            <div key={c.hex} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
              <div
                className="bar"
                style={{
                  height: `${(vertical.weights[i] || 0) * 100}%`,
                  background: c.hex,
                  border: c.hex === '#000000' ? '1px solid var(--line)' : 'none',
                }}
              />
              <span className="bar__label">{c.hex.replace('#', '')}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="usage__note">
          <p className="body">{vertical.colorNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
