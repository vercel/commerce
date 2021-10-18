import { useState } from 'react'
import useActiveCustomer from './useActiveCustomer'
import fetcher from 'src/utils/fetcher'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { resetPasswordMutation } from '@framework/utils/mutations/reset-password-mutation'
import { ResetPasswordMutation } from '@framework/schema'

interface Props {
  token?: string| string[] ,
  password:string
}

const useResetPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
//   const { mutate } = useActiveCustomer()

  const resetPassword = (
    {token,password}: Props,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    fetcher<ResetPasswordMutation>({
      query: resetPasswordMutation,
      variables: {
        token: token,
        password:password
      },
    })
      .then((data) => {
        if (data.resetPassword.__typename !== 'CurrentUser') {
          throw CommonError.create(
            data.resetPassword.message,
            data.resetPassword.errorCode
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

  return { loading, resetPassword, error }
}

export default useResetPassword
