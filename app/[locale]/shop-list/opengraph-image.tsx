import { SupportedLocale } from 'components/layout/navbar/language-control';
import OpengraphImage from 'components/opengraph-image';
import { getPage } from 'lib/shopify';

export default async function Image({
  params
}: {
  params: { page: string; locale?: SupportedLocale };
}) {
  const page = await getPage({
    handle: params.page,
    language: params?.locale?.toUpperCase() || 'JA'
  });
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
