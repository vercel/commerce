import { getCollections } from 'lib/shopify';

import { HomeProductsList } from '/components/home.js';

export async function generateStaticParams() {
    const collections = await getCollections();

    return collections.map(collection => ({ collection: collection.handle }));
}

export default async function CollectionPage({ params: { collection } }) {
    return <HomeProductsList collection={collection} />;
}
