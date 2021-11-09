import type { GetStaticPathsResult } from 'next'
import Search from '@components/search'
import { withDefaultSearchStaticProps } from '@lib/default-props'

export const getStaticProps = withDefaultSearchStaticProps()

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default Search
