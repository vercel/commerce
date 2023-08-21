import DynamicContentManager from '@/components/layout/dynamic-content-manager/dynamic-content-manager';
import type { HomePagePayload } from '@/lib/sanity/sanity.types';

export type IndexPageParams = {
  data: HomePagePayload | null;
};

export default function HomePage({ data }: IndexPageParams) {
  return (
    <>
      <DynamicContentManager content={data?.content} />;
    </>
  );
}
