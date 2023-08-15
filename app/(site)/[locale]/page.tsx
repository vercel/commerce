import HomePage from '@/components/pages/home-page';
import HomePagePreview from '@/components/pages/home-page-preview';
import PreviewProvider from '@/components/preview-provider';
import { homePageQuery } from 'lib/sanity/queries';
import { getCachedClient } from 'lib/sanity/sanity.client';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

export const runtime = draftMode().isEnabled ? 'node' : 'edge';

export async function generateMetadata({
  params
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const homePage = await getCachedClient()(homePageQuery, params);

  if (!homePage) return notFound();

  return {
    title: homePage.seo.title || homePage.title,
    description: homePage.seo.description || homePage.description
  };
}
interface HomePageParams {
  params: {
    locale: string;
  };
}

export default async function IndexPage({ params }: HomePageParams) {
  const preview = draftMode().isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : undefined;

  const data = await getCachedClient(preview)(homePageQuery, params);

  if (!data) return notFound();

  if (preview && preview.token) {
    return (
      <PreviewProvider token={preview.token}>
        <HomePagePreview initialData={data} params={params} />
      </PreviewProvider>
    );
  }

  return <HomePage data={data} />;
}
