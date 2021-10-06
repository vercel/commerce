import { ProductCard } from '@commerce/types/product';
import { ProductVariables } from '@framework/api/operations/get-all-products';
import { Facet, Product } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { ifError } from 'assert';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, FreshProducts, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';
import { FACET } from 'src/utils/constanst.utils';
import { getAllFeaturedFacetId, getFacetIdByName, getFreshProductFacetId } from 'src/utils/funtion.utils';

interface Props {
  veggie: ProductCard[],
  facets:Facet[]
  freshProducts: ProductCard[],
  featuredProducts: ProductCard[],
}
export default function Home({ freshProducts, featuredProducts, veggie }: Props) {
  // console.log("veggie",veggie)
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <FreshProducts data={freshProducts}/>
      <HomeCollection data = {veggie}/>
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

  const veggieProductvariables: ProductVariables = {}
  const veggieId = getFacetIdByName(facets,FACET.CATEGORY.PARENT_NAME,FACET.CATEGORY.VEGGIE)
  if (veggieId) {
    veggieProductvariables.facetValueIds = [veggieId]
  }
  const veggieProductsPromise = commerce.getAllProducts({
    variables: veggieProductvariables,
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
    const rs = await Promise.all([veggieProductsPromise,featuredProductsPromise,freshProductsPromise])

    return {
      props: {
        veggie: veggieId ? rs[0].products : [],
        featuredProducts: rs[1].products,
        freshProducts: freshFacetId ? rs[2].products : [],
      },
      revalidate: 60,
    }
  } catch (err) {

  }



}


Home.Layout = Layout
