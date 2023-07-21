import 'server-only';

import Link from 'next/link';
import Image from 'next/image';

import { getCollectionProducts, getMenu } from 'lib/shopify';

import { PriceRanges } from '/components/price.js';
import styles from './styles.module.scss';

export async function HomeProduct({ product }) {
    const featuredImage = product?.images?.[0];
    const collections = product?.collections?.nodes;

    return (
        <Link
            href={`/product/${product?.handle}`}
            className={styles.homeProduct}
        >
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

const productIsFeatured = product =>
    product?.collections?.nodes
        ?.map(collection => collection?.handle)
        .includes('featured');

//TODO: suspense
export async function HomeProductsList({ collection }) {
    const products = await getCollectionProducts({
        collection,
    });

    return (
        <>
            {products.length === 0 ? (
                <p>{`No products found`}</p>
            ) : (
                <ul className={styles.homeProductsList}>
                    {products?.map(product => (
                        <li
                            key={product?.handle}
                            className={
                                productIsFeatured(product)
                                    ? styles.featured
                                    : null
                            }
                        >
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

    return (
        <p className={styles.typesNav}>
            <span className={styles.filter}>Filter: </span>
            {typesMenu?.map((menuItem, i) => (
                <span key={menuItem?.path}>
                    <Link
                        href={menuItem?.path}
                        className={styles.link}
                    >{`${menuItem?.title}`}</Link>
                    <span className={styles.notLink}>{`${
                        i == typesMenu.length - 1 ? '.' : ','
                    } `}</span>
                </span>
            ))}
        </p>
    );
}

export const HomeNav = () => (
    <div className={styles.homeNav}>
        <Link href='/information' className='information'>
            Information
        </Link>
        <TypesNav />
    </div>
);
