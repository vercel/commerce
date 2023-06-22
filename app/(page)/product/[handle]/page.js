import xss from 'xss';

import { getProducts, getProduct } from 'lib/shopify';

import PurchaseInput from '/components/product/purchase-input.js';

export async function generateStaticParams() {
    const products = await getProducts({
        sortKey: 'UPDATED_AT',
        reverse: false,
        query: '',
    });

    return products.map(product => ({ product: product.handle }));
}

//TODO: NumberInput

export default async function ProductPage({ params: { handle } }) {
    const product = await getProduct(handle);
    return (
        <>
            {product?.handle ? (
                <>
                    <h1>{product?.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: xss(product.descriptionHtml),
                        }}
                    />
                    <PurchaseInput product={product} />
                </>
            ) : (
                <p>Product not found</p>
            )}
        </>
    );
}
