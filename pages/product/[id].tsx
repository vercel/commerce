import { useRouter } from "next/router";
import { Featurebar, Button, Container } from "ui";
import { Navbar, Footer, ProductView } from "components";
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
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Home({ productData }) {
  const router = useRouter();
  return (
    <>
      <Featurebar
        title="Free Standard Shipping on orders over $99.99"
        description="Due to COVID-19, some orders may experience processing and delivery delays."
      />
      <Navbar />
      <Container className="h-screen">
        {router.isFallback ? (
          <h1>Loading...</h1>
        ) : (
          <ProductView productData={productData} />
        )}
      </Container>
      <Footer></Footer>
    </>
  );
}
