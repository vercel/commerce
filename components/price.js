export const formatPrice = ({ amount, currencyCode }) => {
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    });

    return USDollar.format(amount);
};

export const formatPriceRange = ({ maxVariantPrice, minVariantPrice }) => {
    if (maxVariantPrice.amount == minVariantPrice.amount) {
        return `${formatPrice(maxVariantPrice)}`;
    } else {
        return `${formatPrice(minVariantPrice)} - ${formatPrice(
            maxVariantPrice
        )}`;
    }
};

//TODO: might be safer not to destructure keys from `product`, use nullish coalescing instead
export const productAvailableForSale = product =>
    product?.availableForSale ?? false;
export const productOnSale = product =>
    (product?.compareAtPriceRange?.minVariantPrice?.amount ?? 0) >
        (product?.priceRange?.minVariantPrice?.amount ?? 0) ||
    (product?.compareAtPriceRange?.maxVariantPrice?.amount ?? 0) >
        (product?.priceRange?.maxVariantPrice?.amount ?? 0);
export const productIsForSale = product =>
    (product?.priceRange?.maxVariantPrice?.amount ?? 0) > 0;
export const productHasOptions = product =>
    product?.options?.[0]?.values?.length > 1 ?? false;

export const PriceRanges = ({ product }) => {
    const availableForSale = productAvailableForSale(product);
    const onSale = productOnSale(product);
    const isForSale = productIsForSale(product);

    return (
        <p>
            {availableForSale ? (
                isForSale && (
                    <>
                        <>
                            {onSale && (
                                <span className={'original-price'}>
                                    {formatPriceRange(
                                        product?.compareAtPriceRange
                                    )}{' '}
                                </span>
                            )}
                        </>
                        <span>{formatPriceRange(product?.priceRange)}</span>
                    </>
                )
            ) : (
                <span>Sold Out</span>
            )}
        </p>
    );
};

export const variantAvailableForSale = variant =>
    variant?.availableForSale ?? false;
export const variantOnSale = variant =>
    (variant?.compareAtPrice?.amount ?? 0) > (variant?.price?.amount ?? 0);

export const VariantPrice = ({ variant, quantity }) => {
    const availableForSale = variantAvailableForSale(variant);
    const onSale = variantOnSale(variant);

    return variant ? (
        <div>
            {availableForSale ? (
                <>
                    <>
                        {onSale && (
                            <p className={'original-price'}>
                                {formatPrice({
                                    amount:
                                        (variant?.compareAtPrice?.amount ?? 0) *
                                        quantity,
                                    currencyCode:
                                        variant?.compareAtPrice?.currencyCode,
                                })}
                            </p>
                        )}
                    </>
                    <p>
                        {formatPrice({
                            amount: (variant?.price?.amount ?? 0) * quantity,
                            currencyCode: variant?.price?.currencyCode,
                        })}
                    </p>
                </>
            ) : (
                // TODO: this can just say "Sold Out" in the future
                <p>Variant Sold Out</p>
            )}
        </div>
    ) : (
        <p>Sorry, the price can't be found</p>
    );
};
