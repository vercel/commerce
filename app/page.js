import Link from 'next/link';
import Image from 'next/image';

import { getCollectionProducts } from 'lib/shopify';

const formatPrice = ({ amount, currencyCode }) => {
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    });

    return USDollar.format(amount);
};

const formatPriceRange = ({ maxVariantPrice, minVariantPrice }) => {
    if (maxVariantPrice.amount == minVariantPrice.amount) {
        return `${formatPrice(maxVariantPrice)}`;
    } else {
        return `${formatPrice(minVariantPrice)} - ${formatPrice(
            maxVariantPrice
        )}`;
    }
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
            {product?.availableForSale ? (
                (product?.priceRange?.maxVariantPrice?.amount ?? 0) > 0 && (
                    <p>{formatPriceRange(product.priceRange)}</p>
                )
            ) : (
                <p>Sold Out</p>
            )}
        </Link>
    );
}

export default async function HomePage() {
    const collection = process.env.HOMEPAGE_COLLECTION;
    const products = await getCollectionProducts({
        collection,
    });

    console.log({ collection, products });
    // console.log({ price: products[0].priceRange, tile: products[0].title });

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
