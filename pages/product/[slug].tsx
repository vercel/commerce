import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import getProduct from "lib/bigcommerce/api/operations/get-product";
import { Layout } from "@components/core";
import { ProductView } from "@components/product";

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const { product } = await getProduct({ variables: { slug: params!.slug } });

  console.log("PRODUCT", product);

  const productData = {
    title: "T-Shirt",
    description: `
      Nothing undercover about this tee. Nope. This is the official Bad
      Boys tee. Printed in white or black ink on Black, Brown, or Oatmeal.
      Like everything in this collection, it is extremely limited edition
      and available for 10 days only. This is a limited edition production
      run. Printing starts when the drop ends. Reminder: Bad Boys For
      Life. Shipping may take 10+ days due to COVID-19.
    `,
    price: "$50",
    colors: ["black", "white", "pink"],
    sizes: ["s", "m", "l", "xl", "xxl"],
  };
  return {
    props: {
      productData,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "unstable_blocking",
  };
}

export default function Home({
  productData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <ProductView productData={productData} />
      )}
    </Layout>
  );
}
