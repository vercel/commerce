
import { useGoogleLogin } from 'react-use-googlelogin'

const DEFAULT_CLIENT_ID:string = '752282827765-ph49sm1nqd559ad8vq5ft1hg0l80t42g.apps.googleusercontent.com';

const useLoginGoogle = () => {

    const googleAuth = useGoogleLogin({
        clientId: process.env.GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID,
    })
    
  return googleAuth 
}

export default useLoginGoogle
