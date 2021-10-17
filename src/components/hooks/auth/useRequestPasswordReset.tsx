import { useState } from 'react'
import useActiveCustomer from './useActiveCustomer'
import fetcher from 'src/utils/fetcher'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { requestPasswordReset } from '@framework/utils/mutations/request-password-reset-mutation'
import { RequestPasswordReset } from '@framework/schema'

interface ForgotPassword {
  email: string
}

const useRequestPasswordReset = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  // const { mutate } = useActiveCustomer()

  const requestPassword = (
    {email}: ForgotPassword,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    fetcher<RequestPasswordReset>({
      query: requestPasswordReset,
      variables: {
        emailAddress: email
      },
    })
      .then((data) => {
        if (data.requestPasswordReset.__typename !== 'Success') {
          throw CommonError.create(
            data.requestPasswordReset.message,
            data.requestPasswordReset.errorCode
          )
        }
        // mutate()
        fCallBack(true)
        return data
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, requestPassword, error }
}

export default useRequestPasswordReset
