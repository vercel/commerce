import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import getAllProducts from 'lib/bigcommerce/api/operations/get-all-products';
import { Layout } from '@components/core';

export async function getStaticProps({ preview }: GetStaticPropsContext) {
  const { products } = await getAllProducts();

  return {
    props: { products },
  };
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('PRODUCTS', products);

  return (
    <Layout>
      <div className="h-full grid grid-cols-1 h-full lg:grid-cols-3 lg:grid-rows-2">
        <div className="lg:row-span-2 lg:col-span-2 bg-violet h-full"></div>
        <div className="lg:row-span-1 lg:col-span-1 bg-black h-full"></div>
        <div className="lg:row-span-1 lg:col-span-1 bg-pink"></div>
      </div>
    </Layout>
  );
}
