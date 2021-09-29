import { gql } from 'graphql-request'
import { useState } from 'react'
import useActiveCustomer from './useActiveCustomer'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { LoginMutation } from '@framework/schema'

const query = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      __typename
      ... on CurrentUser {
        id
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

interface LoginInput {
  username: string
  password: string
}

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useActiveCustomer()

  const login = (options: LoginInput) => {
    setError(null)
    setLoading(true)
    rawFetcher<LoginMutation>({
      query,
      variables: options,
    })
      .then(({ data, headers }) => {
        if (data.login.__typename !== 'CurrentUser') {
          throw CommonError.create(data.login.message, data.login.errorCode)
        }
        const authToken = headers.get('vendure-auth-token')
        console.log("auth token: ", authToken)
        if (authToken != null) {
          localStorage.setItem('token', authToken)
          return mutate()
        }
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return { loading, login, error }
}

export default useLogin
