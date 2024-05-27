import Hero from 'components/hero';
import HomePageContent from 'components/home-page-content';
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
      <Hero />
      <div className="mt-3">
        <Suspense>
          <HomePageContent />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
