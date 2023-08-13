import OpengraphImage from 'components/opengraph-image';
import { getCollection } from 'lib/shopify';

export const runtime = 'edge';

export default async function Image({ params }: { params: { collection: string } }) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
