import { getCookie } from './cookies'

export default function getCredentials() {
  const endpoint = process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT as string
  const accessToken = getCookie('CL_TOKEN') as string
  return { accessToken, endpoint }
}
