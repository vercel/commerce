import { ProductReviews } from 'lib/aspire/types';
import { Product } from 'lib/shopify/types';
import ReviewStars from './content-review-stars';

export default function ContentFooter({
  product,
  reviews
}: {
  product: Product;
  reviews: ProductReviews;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[40%] flex flex-col items-center justify-end gap-3 bg-gradient-to-t from-black/90 p-4">
      <a className="group/link pointer-events-auto w-full" href="#content">
        <div className="flex w-full items-center gap-2 text-sm text-white transition-colors md:text-base">
          <div className="shrink-0">
            <img
              src={product.featuredImage.url}
              className="size-12 rounded-sm bg-neutral-100 object-contain"
              alt="Shore Thing"
            />
          </div>
          <div className="flex min-w-0 grow flex-col gap-1 px-1">
            <div className="truncate group-hover/link:underline">{product.title}</div>
            <div className="flex flex-wrap items-center justify-between gap-x-2 text-xs">
              <div className="flex gap-x-1">
                <span>From ${product.priceRange.minVariantPrice.amount}</span>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-x-[0.2em]">
                  <ReviewStars reviews={reviews} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      <a className="group/link pointer-events-auto w-full" href="#content">
        <div className="flex flex-col items-center gap-1 text-sm font-medium text-white drop-shadow">
          <div className="[@media(hover:none)]:hidden">Scroll down to shop</div>
          <div className="animate-bounce">
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="[@media(hover:hover)]:rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 9.74a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="[@media(hover:hover)]:hidden">Swipe up to shop</div>
        </div>
      </a>
    </div>
  );
}
