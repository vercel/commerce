import { Address } from '@framework/schema'
import { createAddress } from '@framework/utils/mutations/create-customer-address-mutation'
import { useState } from 'react'
import fetcher from 'src/utils/fetcher'
import { useActiveCustomer } from '../auth'

interface Props {
    address?:string,
    city?:string|null,
    postalCode?:string|null,
    state?:string,
    countryCode?:string|null
}

const useCreateCustomerAddress = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const {customer,mutate} = useActiveCustomer();

  const createCustomerAddress = (
    { address,city,postalCode,state,countryCode}: Props,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)

    fetcher<Address>({
        query: createAddress,
        variables: {
          input: {
            streetLine1:address,
            city,
            postalCode,
            province:state,
            countryCode:countryCode
          },
        },
      }) .then((data) => {
        if(data.createCustomerAddress.__typename == 'Address'){
          mutate();
          fCallBack(true)
          return data
        }
    
      }) .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))

  }
  return { loading, createCustomerAddress, error }
}

export default useCreateCustomerAddress
