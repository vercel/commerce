import Footer from "components/layout/footer";
import Link from "next/link";
import { ClearCart } from "./clear-cart";

export const metadata = {
  title: "Order Confirmed",
  description:
    "Your order is locked in. Fresh-roasted on demand and headed your way.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return (
    <>
      <ClearCart />
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center border border-field/40 bg-coal">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-7 w-7 text-field"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
        <p className="font-display mt-8 text-xs font-semibold tracking-[0.35em] text-field uppercase">
          Mission Accomplished
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-[0.08em] text-bone uppercase md:text-6xl">
          Order Confirmed
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/70">
          Your beans hit the roaster next. Every order is fresh-roasted on
          demand, packed, and moving within 48 hours — a confirmation email with
          tracking is on its way.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/search"
            className="font-display border border-bone/20 bg-bone px-8 py-4 text-sm font-semibold tracking-[0.2em] text-night uppercase transition-colors hover:bg-field"
          >
            Back to the Roster
          </Link>
          <Link
            href="/"
            className="font-display border border-seam px-8 py-4 text-sm font-semibold tracking-[0.2em] text-bone uppercase transition-colors hover:border-bone/40"
          >
            Return to Base
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
