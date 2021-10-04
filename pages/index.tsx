import { ProductCard } from '@commerce/types/product';
import { ProductVariables } from '@framework/api/operations/get-all-products';
import { FacetValue } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, FreshProducts, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';
import { CODE_FACET_DISCOUNT, CODE_FACET_FEATURED } from 'src/utils/constanst.utils';
import { getAllFacetValueIdsByParentCode, getAllFacetValuesForFeatuedProducts, getFreshFacetId } from 'src/utils/funtion.utils';

interface Props {
  featuredAndDiscountFacetsValue: FacetValue[],
  freshProducts: ProductCard[],
  featuredProducts: ProductCard[],

}
export default function Home({ featuredAndDiscountFacetsValue,
  freshProducts, featuredProducts }: Props) {
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <FreshProducts data={freshProducts} />
      <HomeCollection />
      <HomeVideo />
      <HomeSpice />
      <FeaturedProductsCarousel data={featuredProducts} featuredFacetsValue={featuredAndDiscountFacetsValue} />
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
  const featuredAndDiscountFacetsValue = getAllFacetValuesForFeatuedProducts(facets)

  
  // fresh products
  const freshProductvariables: ProductVariables = {}
  const freshFacetId = getFreshFacetId(facets)
  if (freshFacetId) {
    freshProductvariables.facetValueIds = [freshFacetId]
  }
  const freshProductsPromise = commerce.getAllProducts({
    variables: freshProductvariables,
    config,
    preview,
  })

  // featured products
  const allFeaturedFacetIds = getAllFacetValueIdsByParentCode(facets, CODE_FACET_FEATURED)
  const allDiscountFacetIds = getAllFacetValueIdsByParentCode(facets, CODE_FACET_DISCOUNT)
  const facetValueIdsForFeaturedProducts = [...allFeaturedFacetIds, ...allDiscountFacetIds]
  const featuredProductsPromise = commerce.getAllProducts({
    variables: {
      facetValueIds: facetValueIdsForFeaturedProducts
    },
    config,
    preview,
  })


  try {
    const rs = await Promise.all([
      freshProductsPromise,
      featuredProductsPromise,
    ])

    return {
      props: {
        featuredAndDiscountFacetsValue,
        freshProducts: freshFacetId ? rs[0].products : [],
        featuredProducts: facetValueIdsForFeaturedProducts.length > 0 ? rs[1].products : []
      },
      revalidate: 60,
    }
  } catch (err) {

  }



}


Home.Layout = Layout
