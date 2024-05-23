import type { Metadata } from 'next';

import IconWithTextBlock, { IconBlockPlaceholder } from 'components/page/icon-with-text-block';
import ImageWithTextBlock from 'components/page/image-with-text-block';
import TextBlock from 'components/page/text-block';
import { getPage, getPageMetaObjects } from 'lib/shopify';
import { PageContent, PageMetafieldKey } from 'lib/shopify/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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

// eslint-disable-next-line no-unused-vars
const contentMap: Record<PageMetafieldKey, (content: PageContent) => JSX.Element> = {
  page_icon_section: (content) => (
    <Suspense fallback={<IconBlockPlaceholder />}>
      <IconWithTextBlock content={content} />
    </Suspense>
  ),
  page_image_content: (content) => <ImageWithTextBlock content={content} />,
  page_section: (content) => <TextBlock content={content} />
};

export default async function Page({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);

  if (!page) return notFound();

  const pageContents = (
    await Promise.allSettled(page.metafields.map((metafield) => getPageMetaObjects(metafield)))
  )
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<PageContent | null>).value)
    .filter(Boolean) as PageContent[];

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
            {pageContents.map((content) => (
              <div key={content.id}>{contentMap[content.key](content)}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
