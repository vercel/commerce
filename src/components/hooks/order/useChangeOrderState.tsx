import { TransitionOrderToStateMutation } from '@framework/schema'
import { changeOrderStatetMutation } from '@framework/utils/mutations/change-order-state'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { OrderState } from 'src/utils/types.utils'
import { useGetActiveOrderForCheckout } from '.'


const useChangeOrderState = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrderForCheckout()
  
  const changeOrderState = ( state:OrderState, fCallBack?: (isSuccess: boolean, message?: string) => void) => {
    setError(null)
    setLoading(true)
    rawFetcher<TransitionOrderToStateMutation>({
      query: changeOrderStatetMutation,
      variables:{state}
    })
      .then(({ data }) => {
        if (data.transitionOrderToState.__typename === 'Order') {
          fCallBack && fCallBack(true)
          mutate()
        } else {
          fCallBack && fCallBack(false, data.transitionOrderToState.message)
        }
      })
      .catch((error) => {
        setError(error)
        fCallBack && fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, changeOrderState, error }
}

export default useChangeOrderState
