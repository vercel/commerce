import Link from 'next/link';
import Image from 'next/image';

import { getCollectionProducts, getMenu } from 'lib/shopify';

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

export const PriceRanges = ({
    priceRange,
    compareAtPriceRange,
    availableForSale,
}) => {
    const onSale =
        (compareAtPriceRange?.minVariantPrice?.amount ?? 0) >
            (priceRange?.minVariantPrice?.amount ?? 0) ||
        (compareAtPriceRange?.maxVariantPrice?.amount ?? 0) >
            (priceRange?.maxVariantPrice?.amount ?? 0);
    const isForSale = (priceRange?.maxVariantPrice?.amount ?? 0) > 0;

    return (
        <p>
            {availableForSale ? (
                isForSale && (
                    <>
                        <>
                            {onSale && (
                                <span className={'original-price'}>
                                    {formatPriceRange(compareAtPriceRange)}{' '}
                                </span>
                            )}
                        </>
                        <span>{formatPriceRange(priceRange)}</span>
                    </>
                )
            ) : (
                <span>Sold Out</span>
            )}
        </p>
    );
};

export async function HomeProduct({ product }) {
    const featuredImage = product?.images?.[0];
    const collections = product?.collections?.nodes;

    return (
        <Link href={`/${product?.handle}`}>
            <Image
                src={featuredImage?.url}
                alt={featuredImage?.altText}
                width={featuredImage?.width}
                height={featuredImage?.height}
            />
            <p>{product?.title}</p>
            {collections && collections.length > 0 && (
                <p>{`(${collections
                    ?.map(collection => collection?.title)
                    .join(', ')})`}</p>
            )}
            <PriceRanges {...product} />
        </Link>
    );
}

//TODO: suspense
export async function HomeProductsList({ collection }) {
    const products = await getCollectionProducts({
        collection,
    });

    // console.log({ collection, products });
    // const num = 4;
    // console.log({
    //     price: products[num].priceRange,
    //     compareAt: products[num].compareAtPriceRange,
    //     title: products[num].title,
    // });

    return (
        <>
            {products.length === 0 ? (
                <p>{`No products found`}</p>
            ) : (
                <ul>
                    {products?.map(product => (
                        <li key={product?.handle}>
                            <HomeProduct {...{ product }} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

//TODO: suspense
export async function TypesNav() {
    const typesMenu = await getMenu('types-nav');

    // console.log({ typesMenu });

    return (
        <ul>
            {typesMenu?.map(menuItem => (
                <li key={menuItem?.path}>
                    <Link href={menuItem?.path}>{menuItem?.title}</Link>
                </li>
            ))}
        </ul>
    );
}
