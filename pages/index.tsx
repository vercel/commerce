import { ProductVariables } from '@framework/api/operations/get-all-products';
import { Product } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, FreshProducts, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';
import { getAllFeaturedFacetId, getFreshProductFacetId } from 'src/utils/funtion.utils';

interface Props {
  freshProducts: Product[],
  featuredProducts: Product[],

}
export default function Home({ freshProducts, featuredProducts }: Props) {
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <FreshProducts data={freshProducts}/>
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
  const { facets } = await commerce.getAllFacets({
    variables: {},
    config,
    preview,
  })


  const freshProductvariables: ProductVariables = {}
  const freshFacetId = getFreshProductFacetId(facets)

  if (freshFacetId) {
    freshProductvariables.facetValueIds = [freshFacetId]
  }
  const freshProductsPromise = commerce.getAllProducts({
    variables: freshProductvariables,
    config,
    preview,
  })

  const allFeaturedFacetId = getAllFeaturedFacetId(facets)
  const featuredProductsPromise = commerce.getAllProducts({
    variables: {
      facetValueIds: allFeaturedFacetId
    },
    config,
    preview,
  })


  try {
    const rs = await Promise.all([freshProductsPromise, featuredProductsPromise])

    return {
      props: {
        freshProducts: rs[0].products,
        featuredProducts: rs[1].products
      },
      revalidate: 60,
    }
  } catch (err) {

  }



}


Home.Layout = Layout
