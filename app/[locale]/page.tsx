import DynamicContentManager from 'components/layout/dynamic-content-manager/dynamic-content-manager';
import { homePageQuery } from 'lib/sanity/queries';
import { clientFetch } from 'lib/sanity/sanity.client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const homePage = await clientFetch(homePageQuery, params);

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

export default async function HomePage({ params }: HomePageParams) {
  const data = await clientFetch(homePageQuery, params);

  return (
    <>
      <DynamicContentManager content={data?.content} />
    </>
  );
}
