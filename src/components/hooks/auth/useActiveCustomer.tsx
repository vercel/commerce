import { ActiveCustomerQuery } from '@framework/schema'
import { gql } from 'graphql-request'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const query = gql`
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
    }
  }
`

const useActiveCustomer = () => {
  const { data, ...rest } = useSWR<ActiveCustomerQuery>([query], gglFetcher)
  return { customer: data?.activeCustomer, ...rest }
}

export default useActiveCustomer
