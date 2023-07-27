import 'server-only';

import Link from 'next/link';
import Image from 'next/image';

import { getCollectionProducts, getMenu } from 'lib/shopify';

import styles from './styles.module.scss';
import { PriceRanges } from '/components/price';

export async function HomeProduct({ product }) {
    const typesMenu = await getMenu('types-nav');

    const types = typesMenu?.map(item => /search\/(\w+)/.exec(item?.path)?.[1]);
    const featuredImage = product?.images?.[0];
    const collections = product?.collections?.nodes
        ?.map(col => col?.title)
        ?.filter(col => types?.includes(col?.toLowerCase()));

    return (
        <Link
            href={`/product/${product?.handle}`}
            className={styles.homeProduct}
        >
            {/* TODO: optimize srcset (adjusting based on featured status) */}
            <Image
                src={featuredImage?.url}
                alt={featuredImage?.altText}
                width={featuredImage?.width}
                height={featuredImage?.height}
            />
            <div>
                <p className={styles.title}>{product?.title}</p>
                {collections && collections.length > 0 && (
                    <p className={styles.collections}>{`(${collections.join(
                        ', '
                    )})`}</p>
                )}
            </div>
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

//TODO: finish styling, populate links from footerMenu, add rest of footer
export async function HomeFooter() {
    const footerMenu = await getMenu('footer');

    return (
        <div className={styles.homeFooter}>
            <div className={styles.top}>
                <p>
                    For additional creative resources, visit the following:
                    <br />
                    {/* Moodboard, Soundtrack, Twitter, Instagram. */}
                    <>
                        {footerMenu?.map(item => (
                            <a href={item?.path} key={item?.path}>
                                {item?.title}
                            </a>
                        ))}
                    </>
                </p>
                <p>
                    To discuss creative opportunities and potential
                    <br />
                    collaborations, visit{' '}
                    <a href='https://aug.services'>Aug.Services</a> for more
                    information.
                </p>
                <div>
                    <button type='button'>return to top ( ↑ )</button>
                </div>
            </div>
            <img src='/logo.svg' alt='shop.aug.svcs' />
        </div>
    );
}
