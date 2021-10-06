import { useState } from 'react'
import useActiveCustomer from './useActiveCustomer'
import { SignupMutation } from '@framework/schema'
import fetcher from 'src/utils/fetcher'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { signupMutation } from '@framework/utils/mutations/sign-up-mutation'
interface SignupInput {
  email: string
  firstName?: string
  lastName?: string
  password: string
}

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { mutate } = useActiveCustomer()

  const signup = (
    { firstName, lastName, email, password }: SignupInput,
    fCallBack: (isSuccess: boolean, message?: string) => void
  ) => {
    setError(null)
    setLoading(true)
    fetcher<SignupMutation>({
      query: signupMutation,
      variables: {
        input: {
          firstName,
          lastName,
          emailAddress: email,
          password,
        },
      },
    })
      .then((data) => {
        if (data.registerCustomerAccount.__typename !== 'Success') {
          throw CommonError.create(
            data.registerCustomerAccount.message,
            data.registerCustomerAccount.errorCode
          )
        }
        
        mutate()
        fCallBack(true)
        return data
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, signup, error }
}

export default useSignup
