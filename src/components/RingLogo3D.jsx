// The 3-ring Time Creation mark — exact geometry from the Figma logo
// (three equal circles, r=17.68, offset in a triangular arrangement).
// Each ring rotates in 3D about its own centre, on a staggered axis/timing so
// they cascade through the edge-on "atom" tumble and drift back into the logo.
// Recreated from "COMP - TC Logos.mp4".

const VB = 41.4; // square viewBox

const RINGS = [
  { cx: 20.70, cy: 18.39, r: 17.68, anim: 'tcSeq1' },
  { cx: 18.39, cy: 22.19, r: 17.68, anim: 'tcSeq2' },
  { cx: 23.01, cy: 22.19, r: 17.68, anim: 'tcSeq3' },
];

export default function RingLogo3D({ size = 340, duration = 16, stroke = 1.42 }) {
  return (
    <div className="rl" style={{ width: size, height: size }} aria-label="Time Creation mark">
      <div className="rl__scene">
        {RINGS.map((g, i) => (
          <div
            key={i}
            className="rl__ring"
            style={{
              animationName: g.anim,
              animationDuration: `${duration}s`,
              // rotate about this ring's own centre
              transformOrigin: `${((g.cx / VB) * 100).toFixed(2)}% ${((g.cy / VB) * 100).toFixed(2)}%`,
            }}
          >
            <svg className="rl__art" viewBox={`0 0 ${VB} ${VB}`}>
              <circle cx={g.cx} cy={g.cy} r={g.r} fill="none" stroke="#fff" strokeWidth={stroke} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
