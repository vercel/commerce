import DynamicContentManager from '@/components/layout/dynamic-content-manager/dynamic-content-manager';
import type { HomePagePayload } from '@/lib/sanity/sanity.types';
interface IndexPageParams {
  data: HomePagePayload | null;
}

export default function HomePage({ data }: IndexPageParams) {
  // console.log(data);

  return (
    <>
      <DynamicContentManager content={data?.content} />;
    </>
  );
}
