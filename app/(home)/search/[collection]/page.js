import { getCollections } from 'lib/shopify';

import { HomeProductsList } from '/components/home.js';

export async function generateStaticParams() {
    const collections = await getCollections();

    const params = collections
        .map(collection => ({
            collection: collection.handle,
        }))
        .filter(param => param.collection.length > 0);

    return params;
}

export default async function CollectionPage({ params: { collection } }) {
    return <HomeProductsList collection={collection} />;
}
