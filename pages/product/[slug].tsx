
import { Product } from '@framework/schema'
import commerce from '@lib/api/commerce'
import { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Layout, RecipeDetail, RecommendedRecipes, RelevantBlogPosts } from 'src/components/common'
import { ProductInfoDetail, ReleventProducts, ViewedProducts } from 'src/components/modules/product-detail'
import { MAX_PRODUCT_CAROUSEL, REVALIDATE_TIME } from 'src/utils/constanst.utils'
import { BLOGS_DATA_TEST, INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data'
import { getAllPromies } from 'src/utils/funtion.utils'
import { PromiseWithKey } from 'src/utils/types.utils'

export default function Slug({ product, relevantProducts }: InferGetStaticPropsType<typeof getStaticProps>) {

  return <>
    <ProductInfoDetail />
    <RecipeDetail ingredients={INGREDIENT_DATA_TEST} />
    <RecommendedRecipes data={RECIPE_DATA_TEST} />
    <ReleventProducts data={relevantProducts}/>
    <ViewedProducts />
    <RelevantBlogPosts data={BLOGS_DATA_TEST} title="relevent blog posts" />
  </>
}

export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }
  let promisesWithKey = [] as PromiseWithKey[]
  let props = {} as any

  const product = await commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })
  props.product = product


  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  // relevant product
  const relevantFacetIds = product.facetValueIds
  if (relevantFacetIds && relevantFacetIds.length > 0) {
    const relevantProductsPromise = commerce.getAllProducts({
      variables: {
        first: MAX_PRODUCT_CAROUSEL,
        facetValueIds: relevantFacetIds,
      },
      config,
      preview,
    })
    promisesWithKey.push({ key: 'relevantProducts', promise: relevantProductsPromise, keyResult: 'products' })
  } else {
    props.relevantProducts = []
  }


  try {
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })

    if (props.relevantProducts.length > 0) {
      const relevantProducts = props.relevantProducts.filter((item: Product) => item.id !== product.id)
      props.relevantProducts = relevantProducts
    }

    return {
      props,
      revalidate: REVALIDATE_TIME,
    }
  } catch (err) {
    console.log('err: ', err)
  }
}


export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { products } = await commerce.getAllProductPaths()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
        // Add a product path for every locale
        products.forEach((product: any) => {
          arr.push(`/${locale}/product${product.path}`)
        })
        return arr
      }, [])
      : products.map((product: any) => `/product${product.path}`),
    fallback: 'blocking',
  }
}


Slug.Layout = Layout
