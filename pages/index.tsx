import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';

interface Props {
  products: any
}
export default function Home({ products }: Props) {
  return (
    <>
      <p>
        TOTAL: {products?.length}
      </p>

      {JSON.stringify(products[0])}
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <HomeCollection />
      <HomeVideo />
      <HomeSpice />
      <FeaturedProductsCarousel />
      <HomeCTA />
      <HomeRecipe />
      <HomeSubscribe />

      {/* // todo: uncomment
      {/* <ModalCreateUserInfo/> */}
    </>
  )
}


export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    // const productsPromise = commerce.getAllFacets({
    variables: {
      first: 70,
      //  filter: {
      //   name: {
      //     contains: 'ca'
      //   }
      // }
    },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })

  const { products } = await productsPromise


  return {
    props: { products },
    revalidate: 60,
  }
}


Home.Layout = Layout
