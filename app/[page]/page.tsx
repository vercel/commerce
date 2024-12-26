import type { Metadata } from 'next';

import Prose from 'components/prose';

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;


  return {
    title: '',
    description: '',
    openGraph: {
      publishedTime: '',
      modifiedTime: '',
      type: 'article'
    }
  };
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  
  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{''}</h1>
      <Prose className="mb-8" html={''} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date())}.`}
      </p>
    </>
  );
}
