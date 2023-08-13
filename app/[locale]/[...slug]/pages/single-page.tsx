import DynamicContentManager from '@/components/layout/dynamic-content-manager/dynamic-content-manager';

interface SinglePageParams {
  data: object | any;
}

export default async function SinglePage({ data }: SinglePageParams) {
  return (
    <>
      <DynamicContentManager content={data?.content} />;
    </>
  );
}
