type MarqueeProps = {
  items: string[];
  className?: string;
  separator?: string;
};

/**
 * Duplicated track so the CSS translate loop reads as continuous. The
 * animation is disabled wholesale under prefers-reduced-motion in globals.css.
 */
export function Marquee({ items, className = "", separator = "·" }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {track.map((item, i) => (
          <span key={i} className="label flex items-center gap-10">
            {item}
            <span aria-hidden className="text-taupe">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
