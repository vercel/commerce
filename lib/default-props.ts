import type {
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
  brands: any[]
}

interface ContextWithDefaultProps extends GetStaticPropsContext {
  defaultProps: DefaultPageProps
}

type WrappedGetStaticPropsResult<Q> =
  | GetStaticPropsResult<Q>
  | Promise<GetStaticPropsResult<Q>>

export function withDefaultStaticProps<T>(
  fn?: (context: ContextWithDefaultProps) => WrappedGetStaticPropsResult<T>
): GetStaticProps<T & DefaultPageProps> {
  return async function wrapped(context) {
    const config = { locale: context.locale, locales: context.locales }
    const preview = context.preview

    const pages = await commerce.getAllPages({ config, preview })
    const { categories, brands = [] } = await commerce.getSiteInfo({
      config,
      preview,
    })

    const defaultProps = {
      pages,
      categories,
      brands,
    }

    if (!fn) {
      return {
        props: {
          ...pages,
          categories,
          brands,
        },
      }
    }

    // TODO add QueryParam generic
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
          brands,
        },
      }
    }

    return {
      ...pageProps,
      props: {
        ...pages,
        categories,
        brands,
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
