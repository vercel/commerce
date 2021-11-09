import { getSearchStaticProps } from '@lib/search-props'
import type { GetStaticPropsContext } from 'next'
import Search from '@components/search'
import { withDefaultStaticProps } from '@lib/default-props'

export const getStaticProps = withDefaultStaticProps(
  async function getStaticProps(context: GetStaticPropsContext) {
    return getSearchStaticProps(context)
  }
)

export default Search
