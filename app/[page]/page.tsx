import type { Metadata } from 'next';

import PageContent from 'components/page/page-content';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <div className="mx-auto mb-2 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {page.title}
        </h1>
      </div>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-16">
            {page.metaobjects?.map((content) => (
              <div key={content.id}>
                <PageContent block={content} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
