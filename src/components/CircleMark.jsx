// Evokes the brand's hand-drawn multi-ring circle mark — a few offset rings,
// slowly breathing. Used decoratively (the real lockups are the SVG logos).
export default function CircleMark({ size = 84, color = '#fff', stroke = 1.4 }) {
  const rings = [0, 1, 2, 3, 4];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <g style={{ transformOrigin: '50px 50px', animation: 'markspin 36s linear infinite' }}>
        {rings.map((i) => (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx={34 - i * 0.6}
            ry={34 - i * 1.1}
            stroke={color}
            strokeWidth={stroke}
            opacity={0.55 + i * 0.09}
            transform={`rotate(${i * 22} 50 50)`}
          />
        ))}
      </g>
      <style>{`@keyframes markspin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}
