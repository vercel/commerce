import { getCategory, getCategoryProducts } from 'lib/medusa';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  console.log({ params });
  const collection = await getCategory(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(collection.title)}`,
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default async function CategoryPage({ params }: { params: { collection: string } }) {
  console.log({ collection: params.collection });
  const products = await getCategoryProducts(params.collection);

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
