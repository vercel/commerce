import xss from 'xss';

import { getProducts, getProduct } from 'lib/shopify';

export async function generateStaticParams() {
    const products = await getProducts({
        sortKey: 'UPDATED_AT',
        reverse: false,
        query: '',
    });

    return products.map(product => ({ product: product.handle }));
}

export async function Option({ value, children, selected }) {
    return <option {...{ value, selected }}>{children}</option>;
}

export async function Select({ id, label, children }) {
    return (
        <div>
            <select name={label} id={id}>
                {children}
            </select>
            {/* TODO: parentheses around label w/ css */}
            <label for={id}>{label}</label>
        </div>
    );
}

//TODO: NumberInput

export default async function ProductPage({ params: { handle } }) {
    const product = await getProduct(handle);

    const hasOptions = product?.options?.[0]?.values.length > 1 ?? false;
    //TODO: turn these checks into shared functions
    // const onSale =
    //     (compareAtPriceRange?.minVariantPrice?.amount ?? 0) >
    //         (priceRange?.minVariantPrice?.amount ?? 0) ||
    //     (compareAtPriceRange?.maxVariantPrice?.amount ?? 0) >
    //         (priceRange?.maxVariantPrice?.amount ?? 0);
    const isForSale = (product?.priceRange?.maxVariantPrice?.amount ?? 0) > 0;

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
                    {product?.availableForSale && isForSale && (
                        <>
                            <div>
                                <input
                                    type='number'
                                    id='quantity'
                                    name='quantity'
                                    min='1'
                                />

                                <label for='quantity'>Qty</label>
                            </div>
                            <>
                                {hasOptions &&
                                    product?.options?.map(option => (
                                        <Select
                                            key={option?.id}
                                            id={option?.name}
                                            label={option?.name}
                                        >
                                            {option?.values?.map((value, i) => (
                                                <Option
                                                    key={value}
                                                    value={value}
                                                    selected={i == 0}
                                                >
                                                    {value}
                                                </Option>
                                            ))}
                                        </Select>
                                    ))}
                            </>
                        </>
                    )}
                </>
            ) : (
                <p>Product not found</p>
            )}
        </>
    );
}
