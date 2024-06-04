import Hero from 'components/hero';
import About from 'components/home-page/about';
import Footer from 'components/layout/footer';
import { getPage } from 'lib/shopify';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home-page');

  return {
    title: page?.seo?.title || page?.title,
    description: page?.seo?.description || page?.bodySummary,
    openGraph: {
      type: 'website'
    }
  };
}

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <Hero />
      </Suspense>
      <div className="mx-auto flex min-h-96 max-w-7xl flex-col space-y-16 px-6 py-12 lg:px-8">
        <About />
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
