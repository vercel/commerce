import { getCookie } from './cookies'

export default function getCredentials() {
  const endpoint = process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT as string
  const accessToken = getCookie('CL_TOKEN') as string
  return { accessToken, endpoint }
}

type ReturnObj = {
  organization: string
  domain: string
}

export function getOrganizationSlug<E extends string>(endpoint: E): ReturnObj {
  const org = {
    organization: '',
    domain: 'commercelayer.io',
  }
  if (endpoint) {
    if (endpoint.search('commercelayer.io') === -1)
      org.domain = 'commercelayer.co'
    org.organization = endpoint
      .replace('https://', '')
      .replace(`.${org.domain}`, '')
  }
  return org
}
