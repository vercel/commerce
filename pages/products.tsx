import { ProductCard } from '@commerce/types/product';
import { Collection, Facet } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { ViewedProducts } from 'src/components/modules/product-detail';
import ProductListFilter from 'src/components/modules/product-list/ProductListFilter/ProductListFilter';
import { CODE_FACET_BRAND, CODE_FACET_FEATURED, DEFAULT_PAGE_SIZE } from 'src/utils/constanst.utils';
import { getAllPromies } from 'src/utils/funtion.utils';
import { PromiseWithKey, SortOrder } from 'src/utils/types.utils';
import ProductListBanner from '../src/components/modules/product-list/ProductListBanner/ProductListBanner';

interface Props {
  facets: Facet[],
  collections: Collection[],
  productsResult: { products: ProductCard[], totalItems: number },

}

export default function Products({ facets, collections, productsResult }: Props) {
  return (
    <>
      <ProductListBanner />
      <ProductListFilter
        collections={collections}
        facets={facets}
        products={productsResult.products}
        total={productsResult.totalItems} />
      <ViewedProducts />
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

  const facetsPromise = commerce.getAllFacets({
    variables: {
      sort: {
        code: SortOrder.Asc
      },
      filter: {
        code: {
          in: [CODE_FACET_FEATURED, CODE_FACET_BRAND]
        }
      }
    },
    config,
    preview,
  })

  promisesWithKey.push({ key: 'facets', promise: facetsPromise, keyResult: 'facets' })

  // collection
  const collectionsPromise = commerce.getAllCollections({
    variables: {},
    config,
    preview,
  })
  promisesWithKey.push({ key: 'collections', promise: collectionsPromise, keyResult: 'collections' })

  // products
  const productsPromise = commerce.getAllProducts({
    variables: {
      first: DEFAULT_PAGE_SIZE,
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'productsResult', promise: productsPromise })


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

Products.Layout = Layout
