
import { Collection } from '@commerce/types/collection'
import { Product, ProductCard } from '@commerce/types/product'
import commerce from '@lib/api/commerce'
import { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import { Layout, RecipeDetail, RecommendedRecipes, RelevantBlogPosts } from 'src/components/common'
import { useLocalStorage } from 'src/components/hooks/useLocalStorage'
import { ProductInfoDetail, ReleventProducts, ViewedProducts } from 'src/components/modules/product-detail'
import { LOCAL_STORAGE_KEY, MAX_PRODUCT_CAROUSEL, REVALIDATE_TIME } from 'src/utils/constanst.utils'
import { BLOGS_DATA_TEST, INGREDIENT_DATA_TEST, RECIPE_DATA_TEST } from 'src/utils/demo-data'
import { getAllPromies } from 'src/utils/funtion.utils'
import { normalizeProductCard } from '@framework/utils/normalize';
import { PromiseWithKey } from 'src/utils/types.utils'
interface Props {
  relevantProducts: ProductCard[],
  product: Product,
  collections: Collection[]
}
export default function Slug({ product, relevantProducts, collections }: Props) {
  const [local,setLocal] = useLocalStorage<Product[]>(LOCAL_STORAGE_KEY.VIEWEDPRODUCT, []);
  const [viewed, setViewed] = useState<ProductCard[]>([])
  useEffect(() => {
    if(local){
      if(!local.find(p => p.id === product.id)){
        setLocal([...local, product])
      }else{
        setViewed(local.filter((p)=>p.id !== product.id).map((p)=>normalizeProductCard(p)))
      }
    }else{
      setLocal([product])
    }
  }, [product])
  
  return <>
    <ProductInfoDetail productDetail={product}/>
    <RecipeDetail ingredients={INGREDIENT_DATA_TEST} />
    <RecommendedRecipes data={RECIPE_DATA_TEST} />
    <ReleventProducts data={relevantProducts} collections={collections}/>
    <ViewedProducts data={viewed}/>
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

  // relevant product (filter by product detail's facetIds)
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


  // collection
  const collectionsPromise = commerce.getAllCollections({
    variables: {},
    config,
    preview,
  })
  promisesWithKey.push({ key: 'collections', promise: collectionsPromise, keyResult: 'collections' })

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
