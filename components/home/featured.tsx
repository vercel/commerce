import { ProductCard } from "components/product/product-card";
import { getCollectionProducts, getProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

/**
 * Featured roster: pulls the curated `hidden-homepage-featured-items`
 * collection when the merchant has set one up, otherwise falls back to
 * best sellers so a fresh store still gets a full homepage.
 */
async function featuredProducts(): Promise<Product[]> {
  const curated = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  if (curated.length) return curated.slice(0, 6);

  const bestSellers = await getProducts({ sortKey: "BEST_SELLING" });
  return bestSellers.slice(0, 6);
}

export async function FeaturedRoster() {
  const products = await featuredProducts();

  if (!products.length) return null;

  return (
    <section className="border-b border-seam">
      <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-6 py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] tracking-[0.35em] text-field uppercase">
              02
            </span>
            <h2 className="font-display text-3xl font-bold tracking-[0.14em] uppercase md:text-4xl">
              The Roster
            </h2>
          </div>
          <Link
            href="/search"
            prefetch={true}
            className="font-mono text-[11px] tracking-[0.3em] text-bone/50 uppercase transition-colors hover:text-field"
          >
            View all roasts →
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.handle} className="animate-fade-rise">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
