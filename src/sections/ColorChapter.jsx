import { useState } from 'react';
import Reveal from '../components/Reveal';
import Logo from '../components/Logo';
import { DownloadIcon } from '../components/icons';
import { downloadBlob, swatchSVG } from '../lib/download';
import { PALETTE, VERTICALS } from '../data/brand';

const wordOf = (v) => (v.id === 'existence' ? 'existence' : v.name);

export default function ColorChapter() {
  const [copied, setCopied] = useState(null);
  const copy = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1200);
  };

  return (
    <section className="ch wrap" id="color">
      <Reveal className="ch__head"><span className="ch__kicker">Color</span></Reveal>

      <div className="color__top">
        <Reveal>
          <h2 className="ch__title">The Sunrise palette.</h2>
          <p className="ch__lede"><span className="ch__shared">Shared across all three</span> — drawn from the sky, the sun's arc, and the living world. One palette; each vertical disperses it differently.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="pal">
            {PALETTE.map((c) => (
              <button className="pal__sw" key={c.hex} onClick={() => copy(c.hex)} title={`Copy ${c.hex}`}>
                <div className="pal__chip" style={{ background: c.hex }} />
                <div className="pal__hex">
                  <span>{c.name}</span>
                  <span className={copied === c.hex ? 'copied' : ''}>{copied === c.hex ? '✓ copied' : c.hex}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="dl-row">
            <button className="dlbtn" onClick={() => PALETTE.forEach((c) => downloadBlob(swatchSVG(c), `${c.name.toLowerCase().replace(/ /g, '-')}.svg`, 'image/svg+xml'))}>
              <DownloadIcon /> Download all swatches
            </button>
          </div>
        </Reveal>
      </div>

      {/* Level matrix: how each color is weighted across the three brands */}
      <Reveal className="palmatrix" delay={120}>
        <div className="palmatrix__row palmatrix__row--head">
          <span className="palmatrix__hex" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>Usage level</span>
          {VERTICALS.map((v) => (
            <div className="palmatrix__brandcol" key={v.id}>
              <Logo word={wordOf(v)} markSize={20} fontSize="0.85rem" wordScale={v.id === 'existence' ? 1.5 : 1} />
            </div>
          ))}
        </div>
        {PALETTE.map((c, i) => (
          <div className="palmatrix__row" key={c.hex}>
            <div className="palmatrix__lbl">
              <span className="palmatrix__sw" style={{ background: c.hex }} />
              <div>
                <div className="palmatrix__name">{c.name}</div>
                <div className="palmatrix__hex">{c.hex}</div>
              </div>
            </div>
            {VERTICALS.map((v) => (
              <div className="palbar" key={v.id} title={`${v.name}: ${Math.round((v.weights[i] || 0) * 100)}%`}>
                <div
                  className="palbar__fill"
                  style={{
                    width: `${(v.weights[i] || 0) * 100}%`,
                    background: c.hex,
                    border: c.hex === '#000000' ? '1px solid rgba(255,255,255,0.4)' : 'none',
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
