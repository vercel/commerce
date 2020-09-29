import { useRouter } from "next/router";
import { ProductView, Layout } from "components";
import ErrorPage from "next/error";

export async function getStaticProps() {
  const productData = {
    description: `
      Nothing undercover about this tee. Nope. This is the official Bad
      Boys tee. Printed in white or black ink on Black, Brown, or Oatmeal.
      Like everything in this collection, it is extremely limited edition
      and available for 10 days only. This is a limited edition production
      run. Printing starts when the drop ends. Reminder: Bad Boys For
      Life. Shipping may take 10+ days due to COVID-19.
    `,
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

export default function Home({ productData }) {
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
