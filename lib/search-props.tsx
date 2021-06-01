import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import getSiteInfo from '@framework/common/get-site-info'

export async function getSearchStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const pagesPromise = getAllPages({ config, preview })
  const siteInfoPromise = getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      pages,
      categories,
      brands,
    },
  }
}

export type SearchPropsType = InferGetStaticPropsType<
  typeof getSearchStaticProps
>
