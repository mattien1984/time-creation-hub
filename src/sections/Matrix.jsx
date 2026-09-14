import { useState } from 'react';
import GridField from '../components/GridField';
import CircleMark from '../components/CircleMark';
import { DownloadIcon } from '../components/icons';
import { downloadFile, downloadBlob, swatchSVG } from '../lib/download';
import { UMBRELLA, VERTICALS, PALETTE, ARCHITECTURE, DESIGN_SYSTEM } from '../data/brand';

function DL({ onClick, label }) {
  return (
    <button className="cell__dl" onClick={onClick} aria-label={label}>
      <DownloadIcon />
    </button>
  );
}

function Row({ id, label, tag, shared, children }) {
  return (
    <div id={id} className={`row ${shared ? 'row--shared' : ''}`}>
      <div className="row__label">
        <span className="t">{label}</span>
        <span className={`tag ${shared ? 'tag--shared' : ''}`}>{tag}</span>
      </div>
      {children}
    </div>
  );
}

export default function Matrix() {
  const [copied, setCopied] = useState(null);
  const copy = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1200);
  };

  return (
    <>
      {/* Matrix lead-in */}
      <section className="wrap mx-intro" id="system">
        <p className="eyebrow">The unified system, side by side</p>
        <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', marginTop: 18 }}>
          One principle, three expressions.
        </h2>
        <p className="body" style={{ maxWidth: '54ch', marginTop: 20 }}>{UMBRELLA.intro}</p>
        <div className="mx-legend">
          <span><i className="key key--v" /> Read a column for one vertical</span>
          <span><i className="key key--s" /> Gold rows are shared across all three</span>
        </div>
      </section>

      {/* Matrix */}
      <div className="mx-scroll">
        <div className="wrap">
          <div className="mx">
            {/* Sticky header */}
            <div className="mx-head">
              <div className="mx-head__corner">
                <CircleMark size={26} />
                <span className="nm">Time<br />Creation</span>
              </div>
              {VERTICALS.map((v) => (
                <div className="mx-head__col" key={v.id}>
                  <span className="role"><i className="pip" style={{ background: v.accent }} />{v.role}</span>
                  <span className="nm">{v.name}</span>
                </div>
              ))}
            </div>

            {/* Logo */}
            <Row id="logo" label="Logo" tag="Per vertical">
              {VERTICALS.map((v) => (
                <div className="cell cell--logo" key={v.id}>
                  <GridField className="grid-mini" kind={v.gridKind} color="rgba(255,255,255,0.12)" />
                  <img src={v.logo} alt={`${v.name} logo`} style={v.logoScale && v.logoScale !== 1 ? { maxHeight: Math.round(46 * v.logoScale) } : undefined} />
                  <DL label={`Download ${v.name} logo`} onClick={() => downloadFile(v.logo, v.logo.split('/').pop())} />
                </div>
              ))}
            </Row>

            {/* Essence */}
            <Row id="essence" label="Essence" tag="Per vertical">
              {VERTICALS.map((v) => (
                <div className="cell" key={v.id}>
                  <p className="cell__statement">{v.statement}</p>
                </div>
              ))}
            </Row>

            {/* Symbol */}
            <Row id="symbol" label="Symbol" tag="Per vertical">
              {VERTICALS.map((v) => (
                <div className="cell cell--symbol" key={v.id}>
                  <div className="cell__photo">
                    <img src={v.photo} alt={`${v.name} — ${v.shape}`} loading="lazy" />
                    <span className="cap" style={{ textTransform: 'capitalize' }}>{v.shape}</span>
                  </div>
                  <div className="cell__symbol-note">
                    <p className="cell__note">{v.shapeNote}</p>
                  </div>
                </div>
              ))}
            </Row>

            {/* Grid */}
            <Row id="grid" label="The grid" tag="Per vertical">
              {VERTICALS.map((v) => (
                <div className="cell" key={v.id}>
                  <div className="cell__gridbox">
                    <GridField className="gf" kind={v.gridKind} color="rgba(255,255,255,0.5)" />
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(80% 80% at 50% 50%, ${v.accent}1f, transparent 70%)` }} />
                  </div>
                  <p className="cell__statement" style={{ fontSize: '1.05rem' }}>{v.gridTitle}</p>
                  <p className="cell__note" style={{ marginTop: 8 }}>{v.gridBody}</p>
                  <DL label={`Download ${v.gridName} grid`} onClick={() => downloadFile(v.grid, v.grid.split('/').pop())} />
                </div>
              ))}
            </Row>

            {/* Color weighting */}
            <Row id="color" label="Color weighting" tag="Per vertical">
              {VERTICALS.map((v) => (
                <div className="cell" key={v.id}>
                  <div className="minibars">
                    {PALETTE.map((c, i) => (
                      <div
                        key={c.hex}
                        className="b"
                        style={{
                          height: `${(v.weights[i] || 0) * 100}%`,
                          background: c.hex,
                          border: c.hex === '#000000' ? '1px solid var(--line)' : 'none',
                        }}
                        title={`${c.name} ${c.hex}`}
                      />
                    ))}
                  </div>
                  <p className="cell__note">{v.colorNote}</p>
                </div>
              ))}
            </Row>

            {/* Architecture (maps per column) */}
            <Row id="architecture" label="Architecture layer" tag="Per vertical">
              {ARCHITECTURE.layers.map((l, i) => (
                <div className="cell" key={l.vertical}>
                  <span className="row__label-pos" style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--faint)' }}>{l.position} layer</span>
                  <p className="cell__statement" style={{ fontSize: '1.05rem', margin: '8px 0 6px' }}>{l.label}</p>
                  <p className="cell__note">{l.body}</p>
                </div>
              ))}
            </Row>

            {/* SHARED — Sunrise palette */}
            <Row id="palette" label="Sunrise palette" tag="Shared" shared>
              <div className="cell-full">
                <p className="cell__note" style={{ marginBottom: 20, maxWidth: '60ch' }}>
                  One palette across all three verticals — each re-weights it (see the Color weighting row). Click a swatch to copy, or download any as SVG below.
                </p>
                <div className="pal">
                  {PALETTE.map((c) => (
                    <button className="pal__sw" key={c.hex} onClick={() => copy(c.hex)} title={`Copy ${c.hex}`}>
                      <div className="pal__chip" style={{ background: c.hex }} />
                      <div className="pal__hex">
                        <span>{c.name}</span>
                        <span className={copied === c.hex ? 'copied' : ''}>{copied === c.hex ? '✓' : c.hex}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="palette-dl" style={{ marginTop: 22 }}>
                  {PALETTE.map((c) => (
                    <button key={c.hex} className="btn" style={{ padding: '7px 12px' }}
                      onClick={() => downloadBlob(swatchSVG(c), `${c.name.toLowerCase().replace(/ /g, '-')}.svg`, 'image/svg+xml')}>
                      <DownloadIcon /> {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </Row>

            {/* SHARED — Design system */}
            <Row id="system" label="Design system" tag="Shared" shared>
              <div className="cell-full">
                <p className="cell__note" style={{ marginBottom: 22, maxWidth: '60ch' }}>{DESIGN_SYSTEM.intro}</p>
                <div className="dsf">
                  {DESIGN_SYSTEM.elements.map((el, i) => (
                    <div className="dsf__c" key={el.name}>
                      <span className="num">0{i + 1}</span>
                      <div className="nm">{el.name}</div>
                      <p className="cell__note">{el.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Row>

            {/* SHARED — Circular language */}
            <Row id="circle" label="Circular language" tag="Shared" shared>
              <div className="cell-full">
                <p className="cell__statement" style={{ fontSize: 'clamp(1.1rem,1.6vw,1.5rem)', maxWidth: '60ch' }}>
                  {DESIGN_SYSTEM.circle}
                </p>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
