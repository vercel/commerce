import { TransitionOrderToStateMutation } from '@framework/schema'
import { transitionToArrangingPaymentMutation } from '@framework/utils/mutations/transition-to-arranging-payment'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrderForCheckout } from '.'


const useTransitionToArrangingPayment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrderForCheckout()
  
  const transitionToArrangingPayment = ( fCallBack: (isSuccess: boolean, message?: string) => void) => {
    setError(null)
    setLoading(true)
    rawFetcher<TransitionOrderToStateMutation>({
      query: transitionToArrangingPaymentMutation
    })
      .then(({ data }) => {
        if (data.transitionOrderToState.__typename === 'Order') {
          fCallBack(true)
          mutate()
        } else {
          fCallBack(false, data.transitionOrderToState.message)
        }
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, transitionToArrangingPayment, error }
}

export default useTransitionToArrangingPayment
