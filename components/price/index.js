import styles from './styles.module.scss';

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
export const variantAvailableForSale = variant =>
    variant?.availableForSale ?? false;
export const variantOnSale = variant =>
    (variant?.compareAtPrice?.amount ?? 0) > (variant?.price?.amount ?? 0);

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

export const PriceRanges = ({ product }) => {
    const availableForSale = productAvailableForSale(product);
    const onSale = productOnSale(product);
    const isForSale = productIsForSale(product);

    return (
        <p className={styles.priceRanges}>
            {availableForSale ? (
                isForSale && (
                    <>
                        <>
                            {onSale && (
                                <span className={styles.originalPrice}>
                                    {formatPriceRange(
                                        product?.compareAtPriceRange
                                    )}{' '}
                                </span>
                            )}
                        </>
                        <span>{`${formatPriceRange(product?.priceRange)} ${
                            product?.priceRange?.maxVariantPrice?.currencyCode
                        }`}</span>
                    </>
                )
            ) : (
                <span>Sold Out</span>
            )}
        </p>
    );
};

export const VariantPrice = ({ variant, quantity }) => {
    const availableForSale = variantAvailableForSale(variant);
    const onSale = variantOnSale(variant);

    return variant ? (
        <div className={styles.variantPrice}>
            {availableForSale ? (
                <>
                    <>
                        {onSale && (
                            <p className={styles.originalPrice}>
                                Retail:{' '}
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
                    <p className={styles.actualPrice}>
                        {formatPrice({
                            amount: (variant?.price?.amount ?? 0) * quantity,
                            currencyCode: variant?.price?.currencyCode,
                        })}
                    </p>
                </>
            ) : (
                <p className={styles.actualPrice}>Sold Out</p>
            )}
        </div>
    ) : (
        <p>Sorry, the price can't be found</p>
    );
};
