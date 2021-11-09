import type {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import type { Page } from '@commerce/types/page'
import type { Category } from '@commerce/types/site'

import commerce from '@lib/api/commerce'
import { ParsedUrlQuery } from 'querystring'

export interface DefaultPageProps {
  pages: Page[]
  categories: Category[]
  brand: any
}

interface ContextWithDefaultProps<P extends ParsedUrlQuery = ParsedUrlQuery>
  extends GetStaticPropsContext<P> {
  defaultProps: DefaultPageProps
}

type WrappedGetStaticPropsResult<Q> =
  | GetStaticPropsResult<Q>
  | Promise<GetStaticPropsResult<Q>>

export function withDefaultStaticProps<
  T,
  P extends ParsedUrlQuery = ParsedUrlQuery
>(
  fn?: (context: ContextWithDefaultProps<P>) => WrappedGetStaticPropsResult<T>
): GetStaticProps<T & DefaultPageProps> {
  return async function wrapped(context) {
    const config = { locale: context.locale, locales: context.locales }
    const preview = context.preview

    const pages = await commerce.getAllPages({ config, preview })
    const { categories, brand = null } = await commerce.getSiteInfo({
      config,
      preview,
    })

    const defaultProps = {
      pages,
      categories,
      brand,
    }

    if (!fn) {
      return {
        props: {
          ...pages,
          categories,
          brand,
        },
      }
    }

    // @ts-ignore
    // TODO make types compatible
    const pageProps = await fn({
      defaultProps,
      ...context,
    })

    // narrow GetStaticPropsResult type
    if ('props' in pageProps) {
      return {
        ...pageProps,
        props: {
          ...pageProps.props,
          ...pages,
          categories,
          brand,
        },
      }
    }

    return {
      ...pageProps,
      props: {
        ...pages,
        categories,
        brand,
      },
    }
  }
}

export function withDefaultSearchStaticProps() {
  return withDefaultStaticProps(async function () {
    return {
      props: {},
      revalidate: 200,
    }
  })
}
