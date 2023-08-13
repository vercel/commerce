import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/shopify';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage({ handle: params.page });
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
