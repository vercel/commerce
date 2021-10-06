import { ProductCard } from '@commerce/types/product';
import { ProductVariables } from '@framework/api/operations/get-all-products';
import { Collection, FacetValue } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, FreshProducts, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';
import { CODE_FACET_DISCOUNT, CODE_FACET_FEATURED } from 'src/utils/constanst.utils';
import { getAllFacetValueIdsByParentCode, getAllFacetValuesForFeatuedProducts, getAllPromies, getFreshFacetId } from 'src/utils/funtion.utils';
import { PromiseWithKey } from 'src/utils/types.utils';

interface Props {
  featuredAndDiscountFacetsValue: FacetValue[],
  freshProducts: ProductCard[],
  featuredProducts: ProductCard[],
  collections: Collection[]

}
export default function Home({ featuredAndDiscountFacetsValue,
  freshProducts, featuredProducts,
  collections }: Props) {
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <FreshProducts data={freshProducts} collections={collections} />
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
  let promisesWithKey = [] as PromiseWithKey[]
  let props = {} as any

  const { facets } = await commerce.getAllFacets({
    variables: {},
    config,
    preview,
  })
  props.featuredAndDiscountFacetsValue = getAllFacetValuesForFeatuedProducts(facets)
  
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
  promisesWithKey.push({ key: 'freshProducts', promise: freshProductsPromise, keyResult: 'products' })


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
  promisesWithKey.push({ key: 'featuredProducts', promise: featuredProductsPromise, keyResult: 'products'  })

  // collection
  const collectionsPromise = commerce.getAllCollections({
    variables: {},
    config,
    preview,
  })
  promisesWithKey.push({ key: 'collections', promise: collectionsPromise, keyResult: 'collections'  })


  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })

    return {
      props,
      revalidate: 60,
    }
  } catch (err) {

  }
}


Home.Layout = Layout
