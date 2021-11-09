import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import type { Page } from '@commerce/types/page'
import type { Category } from '@commerce/types/site'

import commerce from '@lib/api/commerce'

export interface DefaultPageProps {
  pages: Page[]
  categories: Category[]
  brand: string
}

export function withDefaultStaticProps<T = { [key: string | number]: any }>(
  fn?: ({
    defaultProps,
    ...context
  }: GetStaticPropsContext & {
    defaultProps: DefaultPageProps
  }) => GetStaticPropsResult<T>
): GetStaticProps<T & DefaultPageProps> {
  return async function wrapped(context) {
    const config = { locale: context.locale, locales: context.locales }
    const preview = context.preview

    const pages = await commerce.getAllPages({ config, preview })
    const { categories, brand } = await commerce.getSiteInfo({
      config,
      preview,
    })

    if (!fn) {
      return {
        props: {
          pages,
          categories,
          brand,
        },
      }
    }

    const pageProps = await fn({
      ...context,
      defaultprops: { pages, categories, brand },
    })

    // narrow GetStaticPropsResult type
    if ('props' in pageProps) {
      return {
        ...pageProps,
        props: {
          ...pageProps.props,
          pages,
          categories,
          brand,
        },
      }
    }

    return {
      ...pageProps,
      props: {
        pages,
        categories,
        brand,
      },
    }
  }
}
