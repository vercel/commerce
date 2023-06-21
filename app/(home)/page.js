import { HomeProductsList } from '/components/home.js';

export default async function HomePage() {
    return <HomeProductsList collection={process.env.HOMEPAGE_COLLECTION} />;
}
