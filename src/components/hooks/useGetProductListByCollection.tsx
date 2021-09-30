// import { gql } from 'graphql-request'
import { useMemo, useState } from 'react'
// import useActiveCustomer from './useActiveCustomer'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import {
  CollectionList,
  CollectionListOptions,
  GetCollectionsQuery,
  GetCollectionsQueryVariables,
  LoginMutation,
} from '@framework/schema'
import { gql } from 'graphql-request'

import { getCollectionsQuery } from '@framework/utils/queries/get-collections-query'
import useSWR from 'swr'
import gglFetcher from 'src/utils/gglFetcher'

const query = gql`
  query getCollections($option: CollectionListOptions) {
    collections(options:$option) {
      items {
        id
        name
        description
        slug
        productVariants {
          totalItems
        }
        parent {
          id
        }
        children {
          id
        }
      }
    }
  }
`

const useGetProductListByCollection = (options: any) => {

  const { data, ...rest } = useSWR<GetCollectionsQuery>([query, options], gglFetcher)
  return { collections: data?.collections, ...rest }
}

export default useGetProductListByCollection
