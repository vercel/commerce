import type { Metadata } from 'next';

import Prose from 'components/prose';
import { CHECKOUT_PAGE_PROPS } from 'lib/constants';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours

export async function generateMetadata({
  params
}: {
  params: { page: string };
}): Promise<Metadata> {
  let page;

  params.page === 'checkout' && (page = CHECKOUT_PAGE_PROPS);

  if (!page) return notFound();

  return {
    title: page.title,
    description: '',
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  let page;

  params.page === 'checkout' && (page = CHECKOUT_PAGE_PROPS);

  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
    </>
  );
}
