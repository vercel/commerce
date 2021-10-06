import { Address } from '@framework/schema'
import { updateCustomerAddress } from '@framework/utils/mutations/update-customer-address-mutation'
import { useState } from 'react'
import fetcher from 'src/utils/fetcher'
import { useActiveCustomer } from '../auth'

interface Props {
    address?:string,
    city?:string|null,
    postalCode?:string|null,
    state?:string 
}

const useEditCustomerAddress = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const {customer,mutate} = useActiveCustomer();

  const editCustomerAddress = (
    { address,city,postalCode,state}: Props,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)

    fetcher<Address>({
        query: updateCustomerAddress,
        variables: {
          input: {
            id:customer?.id,
            streetLine1:address,
            city,
            postalCode,
            province:state
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
