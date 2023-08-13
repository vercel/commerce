import DynamicContentManager from '@/components/layout/dynamic-content-manager/dynamic-content-manager';
import { clientFetch } from '@/lib/sanity/sanity.client';
import { notFound } from 'next/navigation';

interface SinglePageParams {
  query: string;
  queryParams: {
    slug: string;
    locale: string;
  };
}

export default async function SinglePage({ query = '', queryParams }: SinglePageParams) {
  const page = await clientFetch(query, queryParams);

  if (!page) return notFound();

  return (
    <div>
      <DynamicContentManager content={page?.content} />;
    </div>
  );
}
