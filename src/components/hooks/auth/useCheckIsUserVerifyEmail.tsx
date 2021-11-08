import { CheckIsUserVerifyEmailMutation, MutationCheckIsUserVerifyEmailArgs, UserVerifyEmailResult } from '@framework/schema'
import { checkIsUserVerifyEmailMutation } from '@framework/utils/mutations/check-is-user-verify-email'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import rawFetcher from 'src/utils/rawFetcher'
import useActiveCustomer from './useActiveCustomer'

interface VerifyInput {
  token: string
  password?: string
}

const useCheckIsUserVerifyEmail = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useActiveCustomer()

  const checkIsUserVerifyEmail = (
    input: MutationCheckIsUserVerifyEmailArgs,
    fCallBack: (isSuccess: boolean, rs: UserVerifyEmailResult | string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<CheckIsUserVerifyEmailMutation>({
      query: checkIsUserVerifyEmailMutation,
      variables: input,
    })
      .then(({ data }) => {
        fCallBack(true, data.checkIsUserVerifyEmail)
        mutate()
        return data
      })
      .catch((err) => {
        setError(err)
        fCallBack(false, err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { loading, checkIsUserVerifyEmail, error }
}

export default useCheckIsUserVerifyEmail
