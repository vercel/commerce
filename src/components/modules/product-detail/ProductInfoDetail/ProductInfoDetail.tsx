import React from 'react'
import ProductImgs from './components/ProductImgs/ProductImgs'
import ProductInfo from './components/ProductInfo/ProductInfo'
import s from './ProductInfoDetail.module.scss'
import { GetStaticPropsContext, GetStaticPathsContext, InferGetStaticPropsType } from 'next'
import commerce from '@lib/api/commerce'
import { PromiseWithKey } from 'src/utils/types.utils'
import { getAllPromies } from 'src/utils/funtion.utils'
import { ProductCard } from '@commerce/types/product';
import { useRouter } from 'next/router'

interface Props {
    productDetail: ProductCard[],
}

const ProductInfoDetail = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(product)
    return (
        <section className={s.productInfoDetail}>
            <ProductImgs/>
            <ProductInfo/>
        </section >
    )
}

export async function getStaticProps({
    params,
    locale,
    locales,
    preview,
  }: GetStaticPropsContext<{ slug: string }>) {
    const config = { locale, locales }
    const pagesPromise = commerce.getAllPages({ config, preview })
    const siteInfoPromise = commerce.getSiteInfo({ config, preview })
    const productPromise = commerce.getProduct({
      variables: { slug: params!.slug },
      config,
      preview,
    })
  
    // const allProductsPromise = commerce.getAllProducts({
    //   variables: { first: 4 },
    //   config,
    //   preview,
    // })
    const { pages } = await pagesPromise
    const { categories } = await siteInfoPromise
    const { product } = await productPromise
    // const { products: relatedProducts } = await allProductsPromise
  
    if (!product) {
      throw new Error(`Product with slug '${params!.slug}' not found`)
    }
  
    return {
      props: {
        pages,
        product,
        // relatedProducts,
        categories,
      },
      revalidate: 200,
    }
    }
  
//   export async function getStaticPaths({ locales }: GetStaticPathsContext) {
//     const { products } = await commerce.getAllProductPaths()
  
//     return {
//       paths: locales
//         ? locales.reduce<string[]>((arr, locale) => {
//             // Add a product path for every locale
//             products.forEach((product: any) => {
//               arr.push(`/${locale}/product${product.path}`)
//             })
//             return arr
//           }, [])
//         : products.map((product: any) => `/product${product.path}`),
//       fallback: 'blocking',
//     }
//   }

export default ProductInfoDetail
