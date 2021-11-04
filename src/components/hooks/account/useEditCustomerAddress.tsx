import { Address } from '@framework/schema'
import { updateCustomerAddress } from '@framework/utils/mutations/update-customer-address-mutation'
import { useState } from 'react'
import fetcher from 'src/utils/fetcher'
import { useActiveCustomer } from '../auth'

interface Props {
    id?:string,
    address?:string,
    city?:string|null,
    postalCode?:string|null,
    state?:string,
    countryCode?:string|null
}

const useEditCustomerAddress = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const {mutate} = useActiveCustomer();

  const editCustomerAddress = (
    {id,address,city,postalCode,state,countryCode}: Props,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    fetcher<Address>({
        query: updateCustomerAddress,
        variables: {
          input: {
            id:id,
            streetLine1:address,
            city,
            postalCode,
            province:state,
            countryCode:countryCode
          },
        },
      }) .then((data) => {
       
        if(data.updateCustomerAddress.__typename == 'Address'){
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
  return { loading, editCustomerAddress, error }
}

export default useEditCustomerAddress
