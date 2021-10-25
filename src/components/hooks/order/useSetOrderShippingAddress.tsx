import { CreateAddressInput, SetOrderShippingAddressMutation } from '@framework/schema'
import { setOrderShippingAddressMutation } from '@framework/utils/mutations/set-order-shipping-address-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { useGetActiveOrderForCheckout } from '.'


const useSetOrderShippingAddress = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useGetActiveOrderForCheckout()
  
  const setOrderShippingAddress = (input: CreateAddressInput,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<SetOrderShippingAddressMutation>({
      query: setOrderShippingAddressMutation,
      variables: { input },
    })
      .then(({ data }) => {
        if (data.setOrderShippingAddress.__typename === 'Order') {
          fCallBack(true)
          mutate()
        } else {
          fCallBack(false, data.setOrderShippingAddress.message)
        }

      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, setOrderShippingAddress, error }
}

export default useSetOrderShippingAddress
