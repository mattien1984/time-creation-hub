import Reveal from '../components/Reveal';
import { DownloadIcon } from '../components/icons';
import { DOWNLOADS, PALETTE, VERTICALS } from '../data/brand';

function downloadFile(href, filename) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename || href.split('/').pop();
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function downloadBlob(text, filename, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  downloadFile(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function swatchSVG(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="${c.hex}"/></svg>`;
}

const paletteCSS = () =>
  `:root{\n${PALETTE.map((c) => `  --${c.name.toLowerCase().replace(/ /g, '-')}: ${c.hex};`).join('\n')}\n}`;

const paletteJSON = () =>
  JSON.stringify(
    PALETTE.map((c) => ({ name: c.name, hex: c.hex, role: c.role })),
    null,
    2
  );

function FileCard({ name, file, kind, note, preview }) {
  const filename = file.split('/').pop();
  return (
    <div className="dl-card">
      <div className="dl-card__preview">{preview}</div>
      <div className="dl-card__foot">
        <div className="dl-card__meta">
          <div className="n">{name}</div>
          <div className="k">{kind}{note ? ` · ${note}` : ''}</div>
        </div>
        <button className="dl-card__dl" onClick={() => downloadFile(file, filename)} aria-label={`Download ${name}`}>
          <DownloadIcon />
        </button>
      </div>
    </div>
  );
}

export default function Downloads() {
  return (
    <section id="downloads" className="section wrap">
      <Reveal className="lib__head">
        <p className="eyebrow">Asset library</p>
        <h2 className="display" style={{ fontSize: 'clamp(2.4rem,6vw,4.6rem)', margin: '16px 0 22px' }}>
          Download the system
        </h2>
        <p className="body">
          Every shared and vertical-specific asset, ready to use. Logos as transparent
          vectors, the full Sunset palette, and the grid language at all three densities.
        </p>
      </Reveal>

      {/* Logos */}
      <div className="lib__group">
        <Reveal className="lib__group-title">
          <h3>Logos</h3>
          <span>Transparent SVG · one per vertical</span>
        </Reveal>
        <Reveal className="cards" delay={60}>
          {DOWNLOADS.logos.map((d) => (
            <FileCard
              key={d.file}
              {...d}
              preview={<img src={d.file} alt={d.name} />}
            />
          ))}
        </Reveal>
      </div>

      {/* Color */}
      <div className="lib__group">
        <Reveal className="lib__group-title">
          <h3>Color</h3>
          <span>Sunset palette · per-swatch & full sets</span>
        </Reveal>
        <Reveal className="cards" delay={60}>
          {PALETTE.map((c) => (
            <div className="dl-card" key={c.hex}>
              <div className="dl-card__preview dl-card__preview--swatch" style={{ background: c.hex }} />
              <div className="dl-card__foot">
                <div className="dl-card__meta">
                  <div className="n">{c.name}</div>
                  <div className="k">{c.hex} · {c.role}</div>
                </div>
                <button
                  className="dl-card__dl"
                  onClick={() => downloadBlob(swatchSVG(c), `${c.name.toLowerCase().replace(/ /g, '-')}.svg`, 'image/svg+xml')}
                  aria-label={`Download ${c.name} swatch`}
                >
                  <DownloadIcon />
                </button>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="palette-dl" delay={80}>
          <button className="btn" onClick={() => downloadBlob(paletteCSS(), 'sunset-palette.css', 'text/css')}>
            <DownloadIcon /> palette.css
          </button>
          <button className="btn" onClick={() => downloadBlob(paletteJSON(), 'sunset-palette.json', 'application/json')}>
            <DownloadIcon /> palette.json
          </button>
        </Reveal>
      </div>

      {/* Grids */}
      <div className="lib__group">
        <Reveal className="lib__group-title">
          <h3>Grid &amp; graphic elements</h3>
          <span>The time grid at three densities</span>
        </Reveal>
        <Reveal className="cards" delay={60}>
          {DOWNLOADS.grids.map((d, i) => (
            <FileCard
              key={d.file}
              {...d}
              preview={
                <img
                  src={d.file}
                  alt={d.name}
                  style={{ filter: 'invert(1)', opacity: 0.85, maxWidth: '100%', maxHeight: '100%' }}
                />
              }
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
