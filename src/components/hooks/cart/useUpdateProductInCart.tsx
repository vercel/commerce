import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { AdjustOrderLineMutationVariables,AdjustOrderLineMutation  } from '@framework/schema'
import { errorMapping } from 'src/utils/errrorMapping'
import { useGetActiveOrder } from '.'
import { adjustOrderLineMutation } from '@framework/utils/mutations/adjust-order-line-mutation'

const useUpdateProductInCart = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrder()

  const updateProduct = (options:AdjustOrderLineMutationVariables,
    fCallBack: (isSuccess: boolean, message?: string) => void
    ) => {
    setError(null)
    setLoading(true)
    rawFetcher<AdjustOrderLineMutation>({
      query: adjustOrderLineMutation ,
      variables: options,
    })
      .then(({ data }) => {
        if (data.adjustOrderLine.__typename !== "Order") {
          throw CommonError.create(errorMapping(data.adjustOrderLine.errorCode), data.adjustOrderLine.errorCode)
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

  return { loading, updateProduct, error }
}

export default useUpdateProductInCart
