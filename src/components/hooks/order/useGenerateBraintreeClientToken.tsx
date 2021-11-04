import { APIResponse } from '@commerce/api/utils/types'
import { GenerateBraintreeClientToken, MutationGenerateBraintreeClientTokenArgs } from '@framework/schema'
import { generateBraintreeClientTokenMutation } from '@framework/utils/mutations/generate-braintree-client-token-mutation'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { convertErrorFromApiResponse } from 'src/utils/funtion.utils'
import rawFetcher from 'src/utils/rawFetcher'

const useGenerateBraintreeClientToken = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)

  const generateBraintreeClientToken = (input: MutationGenerateBraintreeClientTokenArgs,
    fCallBack: (isSuccess: boolean, rs: string) => void
  ) => {
    setError(null)
    setLoading(true)
    rawFetcher<GenerateBraintreeClientToken>({
      query: generateBraintreeClientTokenMutation,
      variables: input,
    })
      .then(({ data }) => {
        if (data.generateBraintreeClientToken?.__typename === 'ClientToken' && data.generateBraintreeClientToken.token) {
          fCallBack(true, data.generateBraintreeClientToken.token)
        } else {
          fCallBack(false, '')
        }
      })
      .catch((error) => {
        setError(error)
        const errorCommon = convertErrorFromApiResponse(error.response)
        fCallBack(false, errorCommon.message)
      })
      .finally(() => setLoading(false))
  }

  return { loading, generateBraintreeClientToken, error }
}

export default useGenerateBraintreeClientToken
