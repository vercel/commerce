import { ProductCard } from '@commerce/types/product';
import { Collection, Facet } from '@framework/schema';
import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { BannerItemProps } from 'src/components/common/Banner/BannerItem/BannerItem';
import { ViewedProducts } from 'src/components/modules/product-detail';
import ProductListFilter from 'src/components/modules/product-list/ProductListFilter/ProductListFilter';
import { CODE_FACET_BRAND, CODE_FACET_FEATURED, DEFAULT_PAGE_SIZE_PRODUCT_LIST, REVALIDATE_TIME } from 'src/utils/constanst.utils';
import { getAllPromies } from 'src/utils/funtion.utils';
import { PageName, PromiseWithKey, SortOrder } from 'src/utils/types.utils';
import ProductListBanner from '../src/components/modules/product-list/ProductListBanner/ProductListBanner';

interface Props {
  facets: Facet[],
  collections: Collection[],
  productsResult: { products: ProductCard[], totalItems: number },
  banners: BannerItemProps[]
}

export default function Products({ facets, collections, productsResult, banners }: Props) {

  return (
    <>
      <ProductListBanner banners={banners}/>
      <ProductListFilter
        collections={collections}
        facets={facets}
        products={productsResult.products}
        total={productsResult.totalItems} />
      <ViewedProducts/>
      {/* <ViewedProducts /> */}
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
      first: DEFAULT_PAGE_SIZE_PRODUCT_LIST,
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'productsResult', promise: productsPromise })

  
  // banner
  const homeBannersPromise = commerce.getBannersByPage({ 
    variables: {
        page: PageName.PRODUCT_LIST,
        options:{
          sort: {
            order: SortOrder.Asc
            }
          }  
        } 
    }
  )
  promisesWithKey.push({ key: 'banners', promise: homeBannersPromise })

  try {
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

Products.Layout = Layout
