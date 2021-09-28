import { LoginMutation } from '@framework/schema'
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
  // const { mutate } = useActiveCustomer()

  const verify = (options: VerifyInput) => {
    setError(null)
    setLoading(true)
    rawFetcher<LoginMutation>({
      query: VERIFY_CUSTOMER_ACCOUNT,
      variables: options,
    })
      .then(({ data, headers }) => {
        console.log("data: ", data)
        // if (data.login.__typename !== 'CurrentUser') {
        //   throw CommonError.create(data.login.message, data.login.errorCode)
        // }
        // const authToken = headers.get('vendure-auth-token')
        // if (authToken != null) {
        //   localStorage.setItem('token', authToken)
        //   return mutate()
        // }
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return { loading, verify, error }
}

export default useVerifyCustomer
