const PHRASES = [
  "Fresh-Roasted on Demand",
  "Zero Shelf Time",
  "Shipped Within 48 Hours",
  "Carry the Weight",
  "Earn the Cup",
];

/** Continuously scrolling brand strip; the track is duplicated for a seamless loop. */
export function Marquee() {
  const strip = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex min-w-full flex-none items-center"
    >
      {PHRASES.map((phrase) => (
        <li
          key={phrase}
          className="font-display flex items-center px-8 text-sm font-semibold tracking-[0.3em] whitespace-nowrap text-bone/50 uppercase"
        >
          {phrase}
          <span aria-hidden="true" className="ml-16 text-field">
            ▲
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-b border-seam bg-coal py-3">
      <div className="animate-marquee flex w-max">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
