import { getProducts } from 'lib/shopify';

export async function generateStaticParams() {
    const products = await getProducts({
        sortKey: 'UPDATED_AT',
        reverse: false,
        query: '',
    });

    console.log({ products });

    return products.map(product => ({ product: product.handle }));
}

export default async function ProductPage({ params: { handle } }) {
    return <h1>{handle}</h1>;
}
