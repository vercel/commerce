
import { useGoogleLogin } from 'react-use-googlelogin'
import { useState } from 'react'
import { CommonError } from 'src/domains/interfaces/CommonError'
import { LoginGoogleMutation } from '@framework/schema'
import rawFetcher from 'src/utils/rawFetcher'
import { errorMapping } from 'src/utils/errrorMapping'
const DEFAULT_CLIENT_ID:string = '752282827765-ph49sm1nqd559ad8vq5ft1hg0l80t42g.apps.googleusercontent.com';
import { loginGoogleMutation } from '@framework/utils/mutations/log-in-google-mutation'
import { LOCAL_STORAGE_KEY } from 'src/utils/constanst.utils'
import useActiveCustomer from './useActiveCustomer'
interface LoginGoogleInput {
  token: string
}

const useLoginGoogle = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<CommonError | null>(null)
  const { mutate } = useActiveCustomer()

    const { signIn, isSignedIn, googleUser,signOut } = useGoogleLogin({
        clientId: process.env.GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID,
    })

    const loginGoogle = (options: LoginGoogleInput,
      fCallBack: (isSuccess: boolean, message?: string) => void
      ) => {
      setError(null)
      setLoading(true)
      rawFetcher<LoginGoogleMutation>({
        query: loginGoogleMutation,
        variables: options,
      })
        .then(({ data, headers }) => {
          if(data.authenticate){
            const authToken = headers.get('vendure-auth-token')
            if (authToken != null) {
              localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, authToken)
              mutate()
            }
          }
          fCallBack(true)
        })
        .catch((error) => {
          setError(error)
          fCallBack(false, error.message)
        })
        .finally(() => setLoading(false))
    }
  return { loginGoogle, isSignedIn,signIn,googleUser,signOut,loading,error }
}

export default useLoginGoogle
