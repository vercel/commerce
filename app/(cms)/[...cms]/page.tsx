import type { Metadata } from 'next';

import Prose from 'components/prose';
import { getPage } from 'lib/shopware';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({ params }: { params: { cms: string } }): Promise<Metadata> {
  const page = await getPage(params.cms);

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

export default async function Page({ params }: { params: { cms: string } }) {
  const page = await getPage(params.cms);

  if (!page) return notFound();
  let date = page.createdAt;
  if (page.updatedAt !== '') {
    date = page.updatedAt;
  }

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(date))}.`}
      </p>
    </>
  );
}
