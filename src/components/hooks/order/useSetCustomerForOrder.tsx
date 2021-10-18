import { CreateCustomerInput, SetCustomerForOrderMutation } from '@framework/schema'
import { setCustomerForOrderMutation } from '@framework/utils/mutations/set-customer-order-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrder } from '../cart'


const useSetCustomerForOrder = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrder()

  const setCustomerForOrder = (input: CreateCustomerInput,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<SetCustomerForOrderMutation>({
      query: setCustomerForOrderMutation,
      variables: {input},
    })
      .then(({ data, headers }) => {
        console.log("data here: ", data)
        if (data.setCustomerForOrder.__typename === 'ActiveOrderCustomerFragment') {
          console.log("success: ")

          fCallBack(true)
          mutate()
        } else {
          console.log("fail ")

          fCallBack(false, data.setCustomerForOrder.message)
        }

      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, setCustomerForOrder, error }
}

export default useSetCustomerForOrder
