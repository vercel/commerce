import 'server-only';

import Link from 'next/link';
import Image from 'next/image';

import { getCollectionProducts, getMenu } from 'lib/shopify';

import { PriceRanges } from '/components/price.js';

export async function HomeProduct({ product }) {
    const featuredImage = product?.images?.[0];
    const collections = product?.collections?.nodes;

    return (
        <Link href={`/product/${product?.handle}`}>
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
            <PriceRanges product={product} />
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
