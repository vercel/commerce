import ContentLandingPage from 'components/content-landing-page';

export default async function Page({
  params
}: {
  params: { ContentLandingPage: string; ProductId: string; VariantId: string };
}) {
  return (
    <ContentLandingPage
      contentLandingPage={params.ContentLandingPage}
      productId={params.ProductId}
      variantId={params.VariantId}
    />
  );
}
