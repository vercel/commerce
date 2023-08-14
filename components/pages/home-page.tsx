import DynamicContentManager from '@/components/layout/dynamic-content-manager/dynamic-content-manager';

interface IndexPageParams {
  data: object | any;
}

export default function HomePage({ data }: IndexPageParams) {
  return (
    <>
      <DynamicContentManager content={data?.content} />;
    </>
  );
}
