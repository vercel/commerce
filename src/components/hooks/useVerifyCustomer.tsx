import { VerifyCustomerAccountMutation } from '@framework/schema'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { VERIFY_CUSTOMER_ACCOUNT } from '../../graphql/mutation'
import useActiveCustomer from './useActiveCustomer'

interface VerifyInput {
  token: string
  password?: string
}

const useVerifyCustomer = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useActiveCustomer()

  const verify = (
    options: VerifyInput,
    fCallBack?: (isSuccess: boolean) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<VerifyCustomerAccountMutation>({
      query: VERIFY_CUSTOMER_ACCOUNT,
      variables: options,
    })
      .then(({ data }) => {
        if (data.verifyCustomerAccount.__typename !== 'CurrentUser') {
          throw CommonError.create(
            data.verifyCustomerAccount.message,
            data.verifyCustomerAccount.errorCode
          )
        }
        fCallBack && fCallBack(true)
        mutate()
        return data
      })
      .catch((err) => {
        setError(err)
        fCallBack && fCallBack(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { loading, verify, error }
}

export default useVerifyCustomer
