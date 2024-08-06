import { ProductReviews } from 'lib/aspire/types';
import { ProductVariant } from 'lib/shopify/types';
import ReviewStars from './content-review-stars';

export default function ProductHeader({
  productVariant,
  reviews
}: {
  productVariant: ProductVariant;
  reviews: ProductReviews;
}) {
  return (
    <div className="flex flex-col gap-2 text-black">
      <h1 className="text-2xl font-bold">{productVariant.title}</h1>
      <div className="flex items-center">
        <div className="flex grow items-center gap-x-2">
          <span className="text-lg font-bold">${productVariant.price.amount}</span>
          <span className="line-through opacity-60">
            <span className="sr-only">Compare at:</span>
            {productVariant.compareAtPrice?.amount}
          </span>
        </div>
        <div className="shrink-0 text-sm">
          <div className="flex items-center gap-x-[0.2em]">
            <ReviewStars reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
