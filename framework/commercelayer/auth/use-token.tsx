import Cookies from 'js-cookie'
import { getSalesChannelToken } from '@commercelayer/js-auth'
import { useEffect, useState } from 'react'

export default function useToken() {
  const [token, setToken] = useState('')
  useEffect(() => {
    const cookieToken = Cookies.get('CL_TOKEN')
    const getToken = async () => {
      const credentials = await getSalesChannelToken({
        endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT as string,
        clientId: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID as string,
        scope: process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE as string,
      })
      Cookies.set('CL_TOKEN', credentials.accessToken, {
        expires: credentials.expires,
      })
      setToken(credentials.accessToken)
    }
    if (!cookieToken) getToken()
    else setToken(cookieToken)
  }, [token])
  return token
}
