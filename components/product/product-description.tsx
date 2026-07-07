import { AddToCart } from "components/cart/add-to-cart";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";
import { VariantSpec } from "./variant-spec";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b border-seam pb-6">
        <p className="font-mono text-[11px] tracking-[0.35em] text-field uppercase">
          Field Roast
        </p>
        <h1 className="font-display mt-3 mb-2 text-4xl font-bold tracking-[0.06em] uppercase md:text-5xl">
          {product.title}
        </h1>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <VariantSpec product={product} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-relaxed text-bone/70"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}
