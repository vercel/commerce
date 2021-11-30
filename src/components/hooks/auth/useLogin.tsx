import { useState } from 'react'
import useActiveCustomer from './useActiveCustomer'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import { LoginMutation } from '@framework/schema'
import { LOCAL_STORAGE_KEY } from 'src/utils/constanst.utils'
import { errorMapping } from 'src/utils/errrorMapping'
import { loginMutation } from '@framework/utils/mutations/log-in-mutation'
import { useGetActiveOrder } from '../cart'

interface LoginInput {
  username: string
  password: string
}

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useActiveCustomer()
  const { mutate: mutateOrder } = useGetActiveOrder()

  const login = (options: LoginInput,
    fCallBack: (isSuccess: boolean, message?: string) => void
    ) => {
    setError(null)
    setLoading(true)
    rawFetcher<LoginMutation>({
      query: loginMutation,
      variables: options,
    })
      .then(({ data, headers }) => {
        if (data.login.__typename !== 'CurrentUser') {
          throw CommonError.create(errorMapping(data.login.errorCode), data.login.errorCode)
        }
        const authToken = headers.get('vendure-auth-token')
        if (authToken != null) {
          localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, authToken)
          mutate()
          mutateOrder()
        }
        fCallBack(true)
      })
      .catch((error) => {
        setError(error)
        fCallBack(false, error.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, login, error }
}

export default useLogin