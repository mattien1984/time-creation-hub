// Brand lockup: the shared 3-ring mark (identical size everywhere) + wordmark.
// Mark geometry is the exact Figma logo (three equal circles, r=17.68, offset).
const MARK = [
  { cx: 20.70, cy: 18.39 },
  { cx: 18.39, cy: 22.19 },
  { cx: 23.01, cy: 22.19 },
];

export function LogoMark({ size = 32, stroke = 1.6 }) {
  return (
    <svg className="logo__mark" width={size} height={size} viewBox="0 0 41.4 41.4" aria-hidden="true">
      {MARK.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={17.68} fill="none" stroke="#fff" strokeWidth={stroke} />
      ))}
    </svg>
  );
}

export default function Logo({ word, markSize = 32, fontSize, wordScale = 1, className = '' }) {
  const base = fontSize || '1.25rem';
  const style = wordScale !== 1 ? { fontSize: `calc(${base} * ${wordScale})` } : (fontSize ? { fontSize } : undefined);
  return (
    <span className={`logo ${className}`}>
      <LogoMark size={markSize} />
      <span className="logo__word" style={style}>{word}</span>
    </span>
  );
}
