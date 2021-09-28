import { gql } from 'graphql-request'
import { useState } from 'react'
import useActiveCustomer from './useActiveCustomer'
import { SignupMutation } from '@framework/schema'
import fetcher from 'src/utils/fetcher'
import { CommonError } from 'src/domains/interfaces/CommonError'

const query = gql`
  mutation signup($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

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

  const signup = ({ firstName, lastName, email, password }: SignupInput) => {
    setError(null)
    setLoading(true)
    fetcher<SignupMutation>({
      query,
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
        console.log(data)
        mutate()
        return data
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return { loading, signup, error }
}

export default useSignup
