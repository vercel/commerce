import DynamicContentManager from '@/components/layout/dynamic-content-manager/dynamic-content-manager';
import { clientFetch } from '@/lib/sanity/sanity.client';
import { notFound } from 'next/navigation';

interface HomePageParams {
  query: string;
  queryParams: {
    slug: string;
    locale: string;
  };
}

export default async function HomePage({ query = '', queryParams }: HomePageParams) {
  const homePage = await clientFetch(query, queryParams);

  if (!homePage) return notFound();

  return (
    <div>
      <DynamicContentManager content={homePage?.content} />;
    </div>
  );
}
