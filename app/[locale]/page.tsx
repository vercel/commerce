import DynamicContentManager from 'components/layout/dynamic-content-manager/dynamic-content-manager';
import { homePageQuery } from 'lib/sanity/queries';
import { clientFetch } from 'lib/sanity/sanity.client';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, Sanity and Storm.',
  openGraph: {
    type: 'website'
  }
};

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
