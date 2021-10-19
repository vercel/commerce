import { ApplyCouponCodeMutation } from '@framework/schema'
import { applyCouponCodeMutation } from '@framework/utils/mutations/apply-coupon-code-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrder } from '../cart'


const useApplyCouponCode = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrder()
  
  const applyCouponCode = (couponCode: string,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<ApplyCouponCodeMutation>({
      query: applyCouponCodeMutation,
      variables: { couponCode },
    })
      .then(({ data }) => {
        if (data.applyCouponCode.__typename === 'Order') {
          fCallBack(true)
          mutate()
        } else {
          fCallBack(false, data.applyCouponCode.message)
        }
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, applyCouponCode, error }
}

export default useApplyCouponCode
