
import { Product } from '@framework/schema'
import commerce from '@lib/api/commerce'
import { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Layout, RecipeDetail, RecommendedRecipes, RelevantBlogPosts } from 'src/components/common'
import { ProductInfoDetail, ReleventProducts, ViewedProducts } from 'src/components/modules/product-detail'
import { BLOGS_DATA_TEST, INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data'

export default function Slug({ product } : InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("product: ", product)

  return <>
    <ProductInfoDetail />
    <RecipeDetail ingredients={INGREDIENT_DATA_TEST} />
    <RecommendedRecipes data={RECIPE_DATA_TEST} />
    <ReleventProducts />
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
  const productPromise = commerce.getProduct({
    variables: { slug: params!.slug },
    config,
    preview,
  })

  console.log('slug: ', params!.slug)


  const { product } = await productPromise

  if (!product) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      product,
    },
    revalidate: 60,
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
