import DynamicContentManager from '@/components/layout/dynamic-content-manager/dynamic-content-manager';

export type SinglePageParams = {
  data: object | any;
};

export default function SinglePage({ data }: SinglePageParams) {
  return (
    <>
      <DynamicContentManager content={data?.content} />
    </>
  );
}
