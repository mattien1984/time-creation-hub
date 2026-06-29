// The Time Block / Frame Language system — six ways the grid frames content.
// Real frame artwork exported from Figma (inverted to white line-art on transparent).

import { asset } from '../lib/asset';

const FRAMES = [
  { n: '01', name: 'Quarter Hashes', src: asset('/assets/graphics/frames/quarter-hashes.png'), body: 'Minimal corner indicators used to gently frame content while maintaining openness and flexibility.' },
  { n: '02', name: 'Quarter Hashes + Lines', src: asset('/assets/graphics/frames/quarter-hashes-lines.png'), body: 'Combines minimal corner marks with light boundary lines, giving subtle containment and compositional focus.' },
  { n: '03', name: 'Full Hashes', src: asset('/assets/graphics/frames/full-hashes.png'), body: 'Strong crosshair-style markers on all edges, used to imply calibration, alignment, or intentional targeting.' },
  { n: '04', name: 'Full Hashes + Lines', src: asset('/assets/graphics/frames/full-hashes-lines.png'), body: 'A fully bounded, high-precision treatment conveying maximum structure — ideal for anchoring key visual moments.' },
  { n: '05', name: 'Full Grid 1x', src: asset('/assets/graphics/frames/full-grid-1x.png'), body: 'A technical grid overlay at 1x density, representing structure, order, and foundational logic within a layout.' },
  { n: '06', name: 'Full Grid 3x', src: asset('/assets/graphics/frames/full-grid-3x.png'), body: 'A denser grid pattern used for advanced layouts or to heighten the feeling of systemization, complexity, or energetic intensity.' },
];

export default function FrameLanguage() {
  return (
    <div className="frames">
      {FRAMES.map((f) => (
        <div className="frame-card" key={f.n}>
          <div className="frame-card__viz"><img src={f.src} alt={f.name} loading="lazy" /></div>
          <div className="frame-card__meta">
            <span className="nm"><i>{f.n}</i> {f.name}</span>
            <p>{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
