import OpengraphImage from 'components/opengraph-image';
// import { getPage } from 'lib/medusa';

export const runtime = 'edge';

export default async function Image({ params }: { params: { page: string } }) {
  // Medusa doesn't support content pages right now
  // const page = await getPage(params.page);
  // const title = page.seo?.title || page.title;
  const title = process.env.SITE_NAME || 'Medusa Store';

  return await OpengraphImage({ title });
}
