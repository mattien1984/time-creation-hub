// The signature motif: the time grid rendered procedurally at three densities.
// block = sparse cells with anchor-crosses (Existence)
// fabric = medium uniform grid (Time Creationism)
// foundation = dense field of small squares (Time Creation Project)

const CONFIG = {
  block: { cell: 116, cross: true, square: false, stroke: 0.6 },
  fabric: { cell: 58, cross: false, square: false, stroke: 0.5 },
  foundation: { cell: 24, cross: false, square: true, stroke: 0.5 },
};

let uid = 0;

export default function GridField({
  kind = 'fabric',
  color = 'rgba(255,255,255,0.4)',
  opacity = 1,
  className = '',
  style = {},
}) {
  const cfg = CONFIG[kind] || CONFIG.fabric;
  const id = `grid-${kind}-${(uid += 1)}`;
  const c = cfg.cell;

  return (
    <svg
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, ...style }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width={c} height={c} patternUnits="userSpaceOnUse">
          {cfg.square ? (
            <rect
              x="1.5" y="1.5"
              width={c - 3} height={c - 3}
              fill="none" stroke={color} strokeWidth={cfg.stroke}
            />
          ) : (
            <path
              d={`M ${c} 0 L 0 0 0 ${c}`}
              fill="none" stroke={color} strokeWidth={cfg.stroke}
            />
          )}
          {cfg.cross && (
            /* arm stubs at all four tile corners — the pattern clips at its
               bounds, so a plus drawn with negative coords loses half its
               arms; tiling these stubs composes a FULL plus at every
               grid intersection */
            <path
              d={[
                'M 0 0 H 7 M 0 0 V 7',
                `M ${c} 0 H ${c - 7} M ${c} 0 V 7`,
                `M 0 ${c} H 7 M 0 ${c} V ${c - 7}`,
                `M ${c} ${c} H ${c - 7} M ${c} ${c} V ${c - 7}`,
              ].join(' ')}
              stroke={color}
              strokeWidth={cfg.stroke * 2}
            />
          )}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
