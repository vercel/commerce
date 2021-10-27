import { AddPaymentToOrderMutation, PaymentInput } from '@framework/schema'
import { addPaymentToOrderMutation } from '@framework/utils/mutations/add-payment-to-order-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrderForCheckout } from '.'


const useAddPaymentToOrder = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrderForCheckout()

  const addPaymentToOrder = (input: PaymentInput,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<AddPaymentToOrderMutation>({
      query: addPaymentToOrderMutation,
      variables: { input },
    })
      .then(({ data }) => {
        if (data.addPaymentToOrder.__typename === 'Order') {
          fCallBack(true, data.addPaymentToOrder.id)
          mutate()
        } else {
          fCallBack(false, data.addPaymentToOrder.message)
        }

      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error)
      })
      .finally(() => setLoading(false))
  }

  return { loading, addPaymentToOrder, error }
}

export default useAddPaymentToOrder
