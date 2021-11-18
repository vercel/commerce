import { RemoveCouponCodeMutation } from '@framework/schema'
import { removeCouponCodeMutation } from '@framework/utils/mutations/remove-coupon-code-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrderForCheckout } from '.'


const useRemoveCouponCode = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrderForCheckout()
  
  const removeCouponCode = (couponCode: string,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<RemoveCouponCodeMutation>({
      query: removeCouponCodeMutation,
      variables: { couponCode },
    })
      .then(({ data }) => {
        if (data.removeCouponCode.__typename === 'Order') {
          fCallBack(true)
          mutate()
        } else {
          fCallBack(false)
        }
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, removeCouponCode, error }
}

export default useRemoveCouponCode
