import { AddItemsToOrderMutation, AddItemToOrderResult, MutationAddItemsToOrderArgs } from '@framework/schema'
import { addItemsToOrderMutation } from '@framework/utils/mutations/add-items-to-order-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'

function isAddedAllItems(data: AddItemsToOrderMutation) {
  const errorItem = data.addItemsToOrder.find(item => item.__typename !== 'Order')
  return !errorItem
}

const useAddMutiProductsToCart = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)

  const addProductsToCart  = (input: MutationAddItemsToOrderArgs,
    fCallBack: (isSuccess: boolean, message?: AddItemToOrderResult[] | string) => void
  ) => {
    setError(null)
    setLoading(true)

    rawFetcher<AddItemsToOrderMutation>({
      query: addItemsToOrderMutation,
      variables: input,
    })
      .then(async ({ data }) => {
        if (isAddedAllItems(data)) {
          fCallBack(true)
        } else {
          fCallBack(false, data.addItemsToOrder as AddItemToOrderResult[])
        }
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, addProductsToCart, error }
}

export default useAddMutiProductsToCart
