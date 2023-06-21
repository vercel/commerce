import Link from 'next/link';
import Image from 'next/image';

import { getCollectionProducts } from 'lib/shopify';

export async function HomeProduct({ product }) {
    const featuredImage = product?.images?.[0];

    return (
        <Link href={`/${product?.handle}`}>
            <Image
                src={featuredImage?.url}
                alt={featuredImage?.altText}
                width={featuredImage?.width}
                height={featuredImage?.height}
            />
            <p>{product?.title}</p>
        </Link>
    );
}

export default async function HomePage() {
    const collection = process.env.HOMEPAGE_COLLECTION;
    const products = await getCollectionProducts({
        collection,
    });

    console.log({ collection, products });
    // console.log({ img: products[1].images });

    return (
        <>
            {products.length === 0 ? (
                <p>{`No products found`}</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product?.handle}>
                            <HomeProduct {...{ product }} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
