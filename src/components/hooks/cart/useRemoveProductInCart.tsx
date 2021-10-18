import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { AdjustOrderLineMutationVariables,AdjustOrderLineMutation, RemoveOrderLineMutation, RemoveOrderLineMutationVariables  } from '@framework/schema'
import { errorMapping } from 'src/utils/errrorMapping'
import { useGetActiveOrder } from '.'
import { adjustOrderLineMutation } from '@framework/utils/mutations/adjust-order-line-mutation'
import { removeOrderLineMutation } from '@framework/utils/mutations/remove-order-line-mutation'

const useRemoveProductInCart = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrder()

  const removeProduct = (options:RemoveOrderLineMutationVariables,
    fCallBack: (isSuccess: boolean, message?: string) => void
    ) => {
    setError(null)
    setLoading(true)
    rawFetcher<RemoveOrderLineMutation>({
      query: removeOrderLineMutation ,
      variables: options,
    })
      .then(({ data }) => {
        if (data.removeOrderLine.__typename !== "Order") {
          throw CommonError.create(errorMapping(data.removeOrderLine.message), data.removeOrderLine.errorCode)
        }
        mutate()
        fCallBack(true)
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, removeProduct, error }
}

export default useRemoveProductInCart
