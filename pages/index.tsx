import { ProductVariables } from '@framework/api/operations/get-all-products';
import { Facet, Product } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { ifError } from 'assert';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';
import { FACET } from 'src/utils/constanst.utils';
import { getAllFeaturedFacetId, getFacetIdByName, getFreshProductFacetId } from 'src/utils/funtion.utils';

interface Props {
  veggie: Product[],
  facets:Facet[]
}
export default function Home({ veggie, facets }: Props) {
  // console.log("total: ", freshProducts.length, featuredProducts.length)
  console.log("rs: ", veggie)
  return (
    <>
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
  const { facets } = await commerce.getAllFacets({
    variables: {},
    config,
    preview,
  })
  
  const freshProductvariables: ProductVariables = {}
  // const freshFacetId = getFreshProductFacetId(facets)
  const veggieId = getFacetIdByName(facets,FACET.CATEGORY.PARENT_NAME,FACET.CATEGORY.VEGGIE)
  console.log("veggieId",veggieId)
  console.log("facets",facets)
  if (veggieId) {
    freshProductvariables.facetValueIds = [veggieId]
  }
  // if (freshFacetId) {
  //   freshProductvariables.facetValueIds = [freshFacetId]
  // }
  const freshProductsPromise = commerce.getAllProducts({
    variables: freshProductvariables,
    config,
    preview,
  })

  // const allFeaturedFacetId = getAllFeaturedFacetId(facets)
  // const featuredProductsPromise = commerce.getAllProducts({
  //   variables: {
  //     facetValueIds: allFeaturedFacetId
  //   },
  //   config,
  //   preview,
  // })


  try {
    const rs = await Promise.all([freshProductsPromise])
    // const rs = await Promise.all([freshProductsPromise, featuredProductsPromise])

    return {
      props: {
        veggie: rs[0].products,
        // featuredProducts: rs[1].products
        facets
      },
      revalidate: 60,
    }
  } catch (err) {

  }



}


Home.Layout = Layout
