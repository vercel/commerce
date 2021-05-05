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
          {/* BagelCard Component */}
          {products.slice(0, 1).map((product, i) => (
            <BagelCard
              key={product.id}
              product={product}
              imgProps={{
                width: i === 0 ? 1080 : 540,
                height: i === 0 ? 1080 : 540,
              }}
            />
          ))}
          {/* Featured Component */}
          {/* Banana Component */}
          <div className={styles.banana}>
            <h2>
              The Better Bagel features the same net carb content as{' '}
              <u>two banana slices</u>.
            </h2>
            <div className={styles.bananagif}></div>
          </div>
          {/* Nutrition Component */}
          <div className={styles.nutrition}>
            <h2>
              Featuring Less Carbs. More Protein. Chef-Crafted Flavor.
              Plant-Based Ingredients. Proprietary Food Technology.
            </h2>
            <button className={styles.btn}>
              <h5>Nutrition</h5>
            </button>
            <div className={styles.table}></div>
          </div>
          {/* Mission Hero */}
          <div className={styles.mission}>
            <h2>
              We are on a mission to make the most carb-heavy foods into the
              least and allow you to indulge, and feel good about it.
            </h2>
            <div className="expand"></div>
          </div>
          {/* Instagram Component */}
          <div className={styles.instagram}>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
          </div>
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
