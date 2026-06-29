// Auto-scrolling marquee of art-directed posters. Track is the list duplicated
// once and translated -50% for a seamless loop (CSS animation, compositor-driven).
export default function PosterMarquee({ posters, duration = 60, reverse = false }) {
  const items = [...posters, ...posters];
  return (
    <div className="marquee">
      <div
        className={`marquee__track ${reverse ? 'is-rev' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((src, i) => (
          <div className="marquee__card" key={i}>
            <img src={src} alt="" loading="lazy" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
}
