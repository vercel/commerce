import LogoBadge from "components/logo";
import Link from "next/link";

export function Story() {
  return (
    <section className="border-b border-seam bg-coal">
      <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] tracking-[0.35em] text-field uppercase">
              03
            </span>
            <h2 className="font-display text-3xl font-bold tracking-[0.14em] uppercase md:text-4xl">
              Built for the Carry
            </h2>
          </div>
          <p className="font-display mt-10 text-3xl leading-tight font-semibold tracking-[0.04em] text-bone uppercase md:text-4xl">
            “Stale coffee is dead weight.
            <span className="text-field"> We don't ship dead weight.”</span>
          </p>
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-5 leading-relaxed text-bone/60">
            <p>
              Lone Elk exists for the mornings that start under load — ruck
              plates, trail miles, cold starts before first light. Coffee peaks
              in the days after roast, so nothing here is roasted until you
              order it. Your batch is fired, rested, packed, and moving within
              48 hours.
            </p>
            <p>
              Every roast is a high-altitude single origin or a purpose-built
              blend, cupped against one question: does it hold up black, at
              zero-dark-thirty, out of a dented mug? If not, it doesn't make the
              roster.
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-seam pt-6">
            <Link
              href="/search"
              prefetch={true}
              className="font-display bg-bone px-8 py-4 text-sm font-semibold tracking-[0.25em] text-night uppercase transition-colors hover:bg-field"
            >
              Load Your Pack
            </Link>
            <LogoBadge size={64} />
          </div>
        </div>
      </div>
    </section>
  );
}
