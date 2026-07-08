import Link from "next/link";

/** Faint topographic contour lines — pure decoration behind the hero. */
function TopoLines() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g className="stroke-seam" strokeWidth="1">
        <path d="M-60 620C180 560 260 470 420 470s260 90 430 90 300-130 470-130 240 60 240 60" />
        <path d="M-60 560C160 500 260 400 430 400s250 90 420 90 300-140 470-140 240 70 240 70" />
        <path d="M-60 500C140 440 260 330 440 330s240 90 410 90 300-150 470-150 240 80 240 80" />
        <path d="M-60 440C120 380 260 260 450 260s230 90 400 90 300-160 470-160 240 90 240 90" />
        <path d="M-60 380C100 320 260 190 460 190s220 90 390 90 300-170 470-170 240 100 240 100" />
        <path d="M-60 320C80 260 260 120 470 120s210 90 380 90 300-180 470-180 240 110 240 110" />
      </g>
      <g
        className="fill-seam"
        fontSize="9"
        fontFamily="monospace"
        letterSpacing="3"
      >
        <text x="180" y="452">
          1500M
        </text>
        <text x="980" y="248">
          1800M
        </text>
      </g>
    </svg>
  );
}

function RegistrationMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute font-mono text-sm text-bone/20 select-none ${className}`}
    >
      +
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-seam">
      <TopoLines />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-night/40 via-transparent to-night" />
      <RegistrationMark className="top-6 left-6" />
      <RegistrationMark className="top-6 right-6" />
      <RegistrationMark className="bottom-6 left-6" />
      <RegistrationMark className="right-6 bottom-6" />

      <div className="relative mx-auto flex min-h-[82vh] w-full max-w-(--breakpoint-2xl) flex-col justify-center px-6 py-24 md:py-32">
        <p
          className="animate-fade-rise font-mono text-[11px] tracking-[0.42em] text-field uppercase"
          style={{ animationDelay: "0ms" }}
        >
          Small-Batch Specialty Coffee — Lone Elk, MO
        </p>
        <h1
          className="font-display animate-fade-rise mt-6 max-w-5xl text-6xl leading-[0.95] font-bold tracking-[0.02em] text-bone uppercase md:text-8xl lg:text-9xl"
          style={{ animationDelay: "120ms" }}
        >
          Fresh-Roasted
          <br />
          <span className="text-field">on Demand</span>
        </h1>
        <p
          className="animate-fade-rise mt-8 max-w-xl text-base leading-relaxed text-bone/70 md:text-lg"
          style={{ animationDelay: "240ms" }}
        >
          Zero shelf time. Your order hits the roaster after you place it —
          built for ruckers, trail crews, and anyone who treats coffee as
          mission-critical fuel.
        </p>
        <div
          className="animate-fade-rise mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "360ms" }}
        >
          <Link
            href="/search"
            prefetch={true}
            className="font-display bg-bone px-10 py-4 text-center text-sm font-semibold tracking-[0.25em] text-night uppercase transition-colors hover:bg-field"
          >
            Shop the Roster
          </Link>
          <a
            href="#standard"
            className="font-display border border-seam px-10 py-4 text-center text-sm font-semibold tracking-[0.25em] text-bone uppercase transition-colors hover:border-bone/40"
          >
            The Standard
          </a>
        </div>

        <dl
          className="animate-fade-rise mt-16 grid max-w-md grid-cols-3 gap-px border border-seam bg-seam font-mono"
          style={{ animationDelay: "480ms" }}
        >
          {[
            ["Roast window", "48 hrs"],
            ["Batch size", "Small"],
            ["Origin alt.", "1500m+"],
          ].map(([label, value]) => (
            <div key={label} className="bg-night px-3 py-3">
              <dt className="text-[9px] tracking-[0.22em] text-bone/40 uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-sm tracking-[0.1em] text-bone uppercase">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
