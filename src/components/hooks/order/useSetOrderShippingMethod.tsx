import { SetShippingMethodMutation } from '@framework/schema'
import { setShippingMethodMutation } from '@framework/utils/mutations/set-order-shipping-method-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrder } from '../cart'


const useSetOrderShippingMethod = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrder()
  
  const setOrderShippingMethod = (id: string,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<SetShippingMethodMutation>({
      query: setShippingMethodMutation,
      variables: { id },
    })
      .then(({ data }) => {
        if (data.setOrderShippingMethod.__typename === 'Order') {
          fCallBack(true)
          mutate()
        } else {
          fCallBack(false, data.setOrderShippingMethod.message)
        }
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, setOrderShippingMethod, error }
}

export default useSetOrderShippingMethod
