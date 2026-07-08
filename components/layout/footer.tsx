import Link from "next/link";

import FooterMenu from "components/layout/footer-menu";
import LogoBadge from "components/logo";
import { getMenu } from "lib/shopify";
import { Suspense } from "react";

const COMPANY_NAME = process.env.COMPANY_NAME || "Lone Elk Coffee Company";
const SITE_NAME = process.env.SITE_NAME || "Lone Elk Coffee Company";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2026 + (currentYear > 2026 ? `-${currentYear}` : "");
  const skeleton = "w-full h-6 animate-pulse bg-coal";
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="border-t border-seam bg-night text-sm text-bone/50">
      <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col gap-10 px-6 py-16 md:flex-row md:justify-between md:gap-12">
        <div className="max-w-sm">
          <Link className="flex items-center gap-3 text-bone" href="/">
            <LogoBadge size={44} />
            <span className="leading-none">
              <span className="font-display block text-2xl font-bold tracking-[0.22em] uppercase">
                Lone Elk
              </span>
              <span className="mt-1 block font-mono text-[10px] tracking-[0.38em] text-bone/50 uppercase">
                Coffee Company
              </span>
            </span>
          </Link>
          <p className="mt-6 leading-relaxed text-bone/50">
            Premium small-batch coffee, fresh-roasted on demand for the people
            who put in the miles under load.
          </p>
          <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-bone/35 uppercase">
            38.53° N / 90.54° W — Lone Elk, MO
          </p>
        </div>
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <nav aria-label="Shop">
            <h3 className="font-display mb-4 text-xs font-semibold tracking-[0.3em] text-bone uppercase">
              Shop
            </h3>
            <ul>
              <li>
                <Link
                  href="/search"
                  className="block py-2 font-mono text-sm tracking-[0.14em] text-bone/50 uppercase transition-colors hover:text-bone md:text-xs"
                >
                  All Roasts
                </Link>
              </li>
            </ul>
            <Suspense
              fallback={
                <div className="flex h-[120px] w-[160px] flex-col gap-2">
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </nav>
          <div>
            <h3 className="font-display mb-4 text-xs font-semibold tracking-[0.3em] text-bone uppercase">
              The Standard
            </h3>
            <ul className="space-y-2 font-mono text-xs tracking-[0.14em] uppercase">
              <li>Roasted to order</li>
              <li>Shipped within 48 hrs</li>
              <li>Small batch, always</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-seam py-6">
        <div className="mx-auto flex w-full max-w-(--breakpoint-2xl) flex-col items-center gap-2 px-6 font-mono text-[11px] tracking-[0.14em] uppercase md:flex-row md:gap-0">
          <p>
            © {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <p className="md:ml-auto">Carry the weight. Earn the cup.</p>
        </div>
      </div>
    </footer>
  );
}
