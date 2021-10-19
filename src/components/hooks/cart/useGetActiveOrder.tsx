import { Cart } from '@commerce/types/cart'
import { ActiveOrderQuery } from '@framework/schema'
import { cartFragment } from '@framework/utils/fragments/cart-fragment'
import { normalizeCart } from '@framework/utils/normalize'
import { gql } from 'graphql-request'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'
const query = gql`
  query activeOrder {
    activeOrder {
			...Cart
    }
  }
	${ cartFragment }
`

const useGetActiveOrder = () => {
  const { data, ...rest } = useSWR<ActiveOrderQuery>([query], gglFetcher)
  return { order: data?.activeOrder ? normalizeCart(data!.activeOrder) : null, ...rest }
  
}

export default useGetActiveOrder
