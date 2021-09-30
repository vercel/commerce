import { LogoutMutation } from '@framework/schema'
import { logoutMutation } from '@framework/utils/mutations/log-out-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { LOCAL_STORAGE_KEY } from 'src/utils/constanst.utils'
import rawFetcher from 'src/utils/rawFetcher'
import useActiveCustomer from './useActiveCustomer'

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useActiveCustomer()

  const logout = () => {
    setError(null)
    setLoading(true)
    rawFetcher<LogoutMutation>({
      query: logoutMutation,
    })
      .then(({ data }) => {
        if (!data.logout.success) {
          throw CommonError.create('Logout fail')
        }
        localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, '')
        mutate()
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return { loading, logout, error }
}

export default useLogout
