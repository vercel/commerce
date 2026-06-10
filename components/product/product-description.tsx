import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
              {/* Buy Now Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            // ফর্ম সাবমিট করে চেকআউট পেজে নিয়ে যাবে
            const form = document.querySelector('form');
            if (form) {
              form.requestSubmit();
              setTimeout(() => {
                window.location.href = '/checkout';
              }, 500);
            }
          }}
          className="w-full !bg-blue-600 !text-white p-4 rounded-full font-semibold hover:!bg-blue-700 transition shadow-lg"
        >
          Buy Now
        </button>
      </div>

    </>
  );
}
