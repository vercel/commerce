import Image from 'next/image';

import xss from 'xss';

import { getProducts, getProduct } from 'commerce/shopify';

import styles from './styles.module.scss';
import PurchaseInput from '/components/product/purchase-input.js';
import { getTags, listTags } from '/util';

//TODO: NumberInput

const ImageScroll = ({ images }) => (
    <div className={styles.imageScroll}>
        <div className={styles.horizScroll}>
            {images?.length > 1 && (
                <p className={styles.scrollMessage}>Scroll to right ( → )</p>
            )}
            <div className={styles.imageContainer}>
                {images?.map(image => (
                    <Image
                        key={image?.url}
                        src={image?.url}
                        alt={image?.altText}
                        width={image?.width}
                        height={image?.height}
                    />
                ))}
                <div>
                    <div className={styles.spacer} />
                </div>
            </div>
        </div>
    </div>
);

const ProductPane = async ({ product }) => {
    const tags = await getTags({ product });

    return (
        <div className={styles.productPane}>
            {product?.handle ? (
                <div className={styles.topBottom}>
                    <div className={styles.description}>
                        <h1>{product?.title}</h1>
                        {tags && tags.length > 0 && (
                            <h2 className={styles.collections}>
                                {listTags({ tags })}
                            </h2>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: xss(product.descriptionHtml),
                            }}
                        />
                    </div>
                    <PurchaseInput product={product} />
                </div>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};

export default async function ProductPage({ params: { handle } }) {
    const product = await getProduct(handle);

    return (
        <div className={styles.productPage}>
            <ImageScroll images={product.images} />
            <ProductPane {...{ product }} />
        </div>
    );
}

export async function generateStaticParams() {
    const products = await getProducts({
        sortKey: 'UPDATED_AT',
        reverse: false,
        query: '',
    });

    return products.map(product => ({ product: product.handle }));
}
