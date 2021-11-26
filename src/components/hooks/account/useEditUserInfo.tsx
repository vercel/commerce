import { useState } from 'react'
import { Customer } from '@framework/schema'
import fetcher from 'src/utils/fetcher'
import { updateCustomer } from '@framework/utils/mutations/update-customer-mutation'
import { useActiveCustomer } from '../auth'

interface Props {
    firstName?: string;
    lastName?: string,
    phoneNumber?:string,
}

const useEditUserInfo = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const {mutate} = useActiveCustomer();

  const editUserInfo = (
    { firstName,lastName,phoneNumber}: Props,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)

    fetcher<Customer>({
      query: updateCustomer,
      variables: {
        input: {
          firstName,
          lastName,
          phoneNumber
        },
      },
    })
      .then((data) => {
        if (data.updateCustomer.__typename == 'Customer') {
          mutate();
          fCallBack(true)
          return data 
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

  return { loading, editUserInfo, error }
}

export default useEditUserInfo
