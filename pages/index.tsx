import { Layout } from '@components/common'
import { Grid, Marquee, Hero } from '@components/ui'
import { BagelCard } from '@components/product'
import { ProductCard } from '@components/product'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'

import styles from '../styles/Home.module.scss'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.row}>
            <div className={styles.square}>
              <img src={products[0].images[0].url} alt="" />
            </div>
            <div className={styles.info}>
              <h1>
                Featuring <i>Grain</i>changing Technology
              </h1>
              <button>
                <h5>Try The Better Bagel</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
