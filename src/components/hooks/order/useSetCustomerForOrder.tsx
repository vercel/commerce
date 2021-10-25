import { CreateCustomerInput, SetCustomerForOrderMutation } from '@framework/schema'
import { setCustomerForOrderMutation } from '@framework/utils/mutations/set-customer-order-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrderForCheckout } from '.'


const useSetCustomerForOrder = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrderForCheckout()

  const setCustomerForOrder = (input: CreateCustomerInput,
    fCallBack: (isSuccess: boolean, message?: CommonError) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<SetCustomerForOrderMutation>({
      query: setCustomerForOrderMutation,
      variables: { input },
    })
      .then(({ data }) => {
        if (data.setCustomerForOrder.__typename === 'Order') {
          fCallBack(true)
          mutate()
        } else {
          fCallBack(false, data.setCustomerForOrder)
        }

      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error)
      })
      .finally(() => setLoading(false))
  }

  return { loading, setCustomerForOrder, error }
}

export default useSetCustomerForOrder
