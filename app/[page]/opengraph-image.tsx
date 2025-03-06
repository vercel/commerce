import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/sfcc/content';

export default async function Image({ params }: { params: { page: string } }) {
  const page = getPage(params.page);

  if (!page) return;

  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
