import { RemoveOrderLineMutation, RemoveOrderLineMutationVariables } from '@framework/schema'
import { removeOrderLineMutation } from '@framework/utils/mutations/remove-order-line-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { errorMapping } from 'src/utils/errrorMapping'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrder } from '.'

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
        fCallBack(true)
        mutate()
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
