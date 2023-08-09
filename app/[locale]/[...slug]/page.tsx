import Footer from '@/components/layout/footer/footer';
import DynamicContentManager from 'components/layout/dynamic-content-manager';
import { pageQuery } from 'lib/sanity/queries';
import { clientFetch } from 'lib/sanity/sanity.client';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string[] };
}): Promise<Metadata> {
  let queryParams = {
    locale: params.locale,
    slug: ''
  };

  if (params.slug.length > 1) {
    queryParams = {
      locale: params.locale,
      slug: `${params.slug.join('/')}`
    };
  } else {
    queryParams = {
      locale: params.locale,
      slug: `${params.slug}`
    };
  }
  const page = await clientFetch(pageQuery, queryParams);

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

interface PageParams {
  params: {
    locale: string;
    slug: string[];
  };
}

export default async function Page({ params }: PageParams) {
  let queryParams = {
    locale: params.locale,
    slug: ''
  };

  if (params.slug.length > 1) {
    queryParams = {
      locale: params.locale,
      slug: `${params.slug.join('/')}`
    };
  } else {
    queryParams = {
      locale: params.locale,
      slug: `${params.slug}`
    };
  }

  const page = await clientFetch(pageQuery, queryParams);

  if (!page) return notFound();

  return (
    <>
      <DynamicContentManager content={page?.content} />
      <Suspense>
        {/* @ts-expect-error Server Component (https://github.com/vercel/next.js/issues/42292) */}
        <Footer locale={params.locale} />
      </Suspense>
    </>
  );
}
