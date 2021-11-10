import { Collection } from '@commerce/types/collection';
import { ProductCard } from '@commerce/types/product';
import { RecipeCollection } from '@commerce/types/recipe-collection';
import { ProductVariables } from '@framework/api/operations/get-all-products';
import { FacetValue } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { FeaturedProductsCarousel, FreshProducts, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';
import { CODE_FACET_DISCOUNT, CODE_FACET_FEATURED, COLLECTION_SLUG_SPICE, REVALIDATE_TIME } from 'src/utils/constanst.utils';
import { checkIsRecipeInCollectionsEmpty, FilterOneVatiant, getAllFacetValueIdsByParentCode, getAllFacetValuesForFeatuedProducts, getAllPromies, getFreshFacetId } from 'src/utils/funtion.utils';
import { CollectionsWithData, PromiseWithKey } from 'src/utils/types.utils';


interface Props {
  featuredAndDiscountFacetsValue: FacetValue[],
  freshProducts: ProductCard[],
  featuredProducts: ProductCard[],
  collections: Collection[]
  spiceProducts:ProductCard[]
  collectionProps:CollectionsWithData[]
  recipesCollection:any[]
}
export default function Home({ featuredAndDiscountFacetsValue, collectionProps,
  freshProducts, featuredProducts,recipesCollection,
  collections, spiceProducts }: Props) {
  return (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeCategories />
      <FreshProducts data={freshProducts} collections={collections} />
      <HomeCollection data={collectionProps} />
      <HomeVideo />
      {spiceProducts.length > 0 && <HomeSpice data={spiceProducts} />}
      {
        featuredProducts.length > 0 &&
        <FeaturedProductsCarousel data={featuredProducts} featuredFacetsValue={featuredAndDiscountFacetsValue} />
      }
      <HomeCTA />
      {!checkIsRecipeInCollectionsEmpty(recipesCollection) && <HomeRecipe recipesCollection={recipesCollection} />}
      
      <HomeSubscribe />
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

  // collection
  const { collections } = await commerce.getAllCollections({
    variables: {},
    config,
    preview,
  })

  props.collections = collections
  let collectionsPromisesWithKey = [] as PromiseWithKey[]
  collections.map((collection) => {
    const promise = commerce.getAllProducts({
      variables: { collectionSlug: collection.slug },
      config,
      preview,
    })
    collectionsPromisesWithKey.push({ key: `${collection.slug}`, promise: promise, keyResult: 'products' })
  })
  // fresh products
  const freshProductvariables: ProductVariables = {}
  const freshFacetId = getFreshFacetId(facets)
  if (freshFacetId) {
    freshProductvariables.facetValueIds = [freshFacetId]
    const freshProductsPromise = commerce.getAllProducts({
      variables: freshProductvariables,
      config,
      preview,
    })
    promisesWithKey.push({ key: 'freshProducts', promise: freshProductsPromise, keyResult: 'products' })
  } else {
    props.freshProducts = []
  }

  // featured products
  const allFeaturedFacetIds = getAllFacetValueIdsByParentCode(facets, CODE_FACET_FEATURED)
  const allDiscountFacetIds = getAllFacetValueIdsByParentCode(facets, CODE_FACET_DISCOUNT)
  const facetValueIdsForFeaturedProducts = [...allFeaturedFacetIds, ...allDiscountFacetIds]

  if (facetValueIdsForFeaturedProducts.length > 0) {
    const featuredProductsPromise = commerce.getAllProducts({
      variables: {
        facetValueIds: facetValueIdsForFeaturedProducts
      },
      config,
      preview,
    })
    promisesWithKey.push({ key: 'featuredProducts', promise: featuredProductsPromise, keyResult: 'products' })
  } else {
    props.featuredProducts = []
  }



  // spiceProducts
  const spiceProducts = commerce.getAllProducts({
    variables: {
      collectionSlug: COLLECTION_SLUG_SPICE,
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'spiceProducts', promise: spiceProducts, keyResult: 'products' })
  
  // recipe 
  try {
    const recipesCollection =await commerce.getAllRecipeCollections({variables:{first:3}})
    props.recipesCollection = recipesCollection.recipeCollections.filter((collection)=>collection.recipes.items.length>0)
  }catch(err){
    console.log(err)
  }
  try {
    const collectionPromises = getAllPromies(collectionsPromisesWithKey)
    const collectionResult = await Promise.all(collectionPromises)
    let collectionProps: CollectionsWithData[] = []
    collectionsPromisesWithKey.map((item, index) => {
      collectionProps.push({
        ...collections[index],
        items: item.keyResult ? FilterOneVatiant(collectionResult[index][item.keyResult]) : collectionResult[index]
      })
      return null
    })
    props.collectionProps = collectionProps
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
    return {
      props,
      revalidate: REVALIDATE_TIME,
    }
  } catch (err) {

  }
}


Home.Layout = Layout
