import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { AddItemToOrderMutation, AddItemToOrderMutationVariables  } from '@framework/schema'
import { errorMapping } from 'src/utils/errrorMapping'
import { useGetActiveOrder, useRecommendedProductsInCart } from '.'
import { addItemToOrderMutation } from '@framework/utils/mutations/add-item-to-order-mutation'

const useAddProductToCart = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrder()
  const { mutate: mutateRecommendedProductsInCart } = useRecommendedProductsInCart()

  const addProduct = (options:AddItemToOrderMutationVariables,
    fCallBack: (isSuccess: boolean, message?: string) => void
    ) => {
    setError(null)
    setLoading(true)
    rawFetcher<AddItemToOrderMutation>({
      query: addItemToOrderMutation ,
      variables: options,
    })
      .then(({ data }) => {
        if (data.addItemToOrder.__typename !== "Order") {
          throw CommonError.create(errorMapping(data.addItemToOrder.message), data.addItemToOrder.errorCode)
        }
        fCallBack(true)
        mutate()
        mutateRecommendedProductsInCart()
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, addProduct, error }
}

export default useAddProductToCart
