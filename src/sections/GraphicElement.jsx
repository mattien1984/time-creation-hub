import Reveal from '../components/Reveal';
import Logo from '../components/Logo';
import DownloadButton from '../components/DownloadButton';
import PosterMarquee from '../components/PosterMarquee';
import FrameLanguage from '../components/FrameLanguage';
import { downloadBlob, swatchSVG } from '../lib/download';
import { GRAPHIC, VERTICALS, PALETTE, POSTERS, ELEMENT_CARDS } from '../data/brand';
import { asset } from '../lib/asset';

const wordOf = (v) => (v.id === 'existence' ? 'existence' : v.name);

// Time Block feature photo (block kind)
const BLOCK_PHOTO = asset('/assets/graphics/time-block-photo.jpg');

export default function GraphicElement({ vid }) {
  const v = VERTICALS.find((x) => x.id === vid);
  const g = GRAPHIC[vid];

  let downloads = null;
  if (g.kind === 'block') {
    downloads = <DownloadButton file={v.grid} label="Time Block grid (SVG)" />;
  } else if (g.kind === 'creation-color') {
    const oranges = PALETTE.filter((c) => c.role === 'Energy');
    downloads = (
      <DownloadButton label="Creation colors (SVG)" onClick={() => oranges.forEach((c) => downloadBlob(swatchSVG(c), `${c.name.toLowerCase()}.svg`, 'image/svg+xml'))} />
    );
  }

  return (
    <section className="ch wrap" id={`graphic-${vid}`}>
      <Reveal className="ch__head"><span className="ch__kicker">Graphic Elements</span></Reveal>

      {/* Overt brand identifier */}
      <Reveal>
        <Logo word={wordOf(v)} markSize={46} fontSize="2rem" wordScale={vid === 'existence' ? 1.5 : 1} className="ge__brandbig" />
      </Reveal>

      <Reveal className="ge2">
        <div className="ge2__text">
          <h2 className="ch__title">{g.element}.</h2>
          <p className="ch__lede">{g.lede}</p>
        </div>
        <p className="ge2__body">{g.body}</p>
      </Reveal>

      {/* Examples */}
      {g.kind === 'block' ? (
        <Reveal className="ge__feature">
          <img src={BLOCK_PHOTO} alt={`${v.name} — Time Block applied`} loading="lazy" />
        </Reveal>
      ) : (
        <Reveal className="circ-cards" delay={120}>
          {ELEMENT_CARDS[vid].map((src, i) => (
            <div className="circ-card" key={i}><img src={src} alt="" loading="lazy" /></div>
          ))}
        </Reveal>
      )}

      {downloads && <div className="dl-row" style={{ marginTop: 22 }}>{downloads}</div>}

      {g.kind === 'block' && (
        <Reveal className="frame-sub">
          <h3 className="frame-sub__head">Grid / Frame Language</h3>
          <p className="frame-sub__lede">
            One level down: the grid resolves into a frame language — six treatments,
            from the lightest corner hashes to a full technical grid, that frame a
            moment with as much or as little structure as it needs.
          </p>
          <FrameLanguage />
        </Reveal>
      )}

      {POSTERS[vid] && POSTERS[vid].length > 0 && (
        <div className="gallery">
          <Reveal className="gallery__label">
            <span className="t">In application</span>
            <Logo word={wordOf(v)} markSize={22} fontSize="1rem" wordScale={vid === 'existence' ? 1.5 : 1} />
          </Reveal>
          <PosterMarquee posters={POSTERS[vid]} duration={POSTERS[vid].length * 5} />
        </div>
      )}
    </section>
  );
}
