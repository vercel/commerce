const METRICS = [
  {
    value: "48H",
    label: "Roast-to-ship window",
    detail: "Ordered today, roasted and moving inside two days.",
  },
  {
    value: "100%",
    label: "Roasted to order",
    detail: "No warehouse pallets. No stale inventory. Ever.",
  },
  {
    value: "1.5K+",
    label: "Meters of altitude",
    detail: "High-grown single origins picked for slow, dense development.",
  },
  {
    value: "0",
    label: "Shortcuts taken",
    detail: "No oils, no flavorings, no blends built to hide defects.",
  },
];

export function Metrics() {
  return (
    <section id="standard" className="border-b border-seam">
      <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-6 py-20">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] tracking-[0.35em] text-field uppercase">
            01
          </span>
          <h2 className="font-display text-3xl font-bold tracking-[0.14em] uppercase md:text-4xl">
            The Standard
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-px border border-seam bg-seam sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              className="group bg-night p-6 transition-colors duration-300 hover:bg-coal"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-bone/35 uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display mt-6 text-5xl font-bold tracking-[0.04em] text-bone transition-colors duration-300 group-hover:text-field md:text-6xl">
                {metric.value}
              </p>
              <p className="font-display mt-3 text-sm font-semibold tracking-[0.2em] text-bone/80 uppercase">
                {metric.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-bone/50">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
