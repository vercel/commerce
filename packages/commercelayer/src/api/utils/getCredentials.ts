import { getCookie } from './cookies'
import { ENDPOINT } from '../../const'

export default function getCredentials() {
  const accessToken = getCookie('CL_TOKEN') as string
  return { accessToken, ENDPOINT }
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
  if (ENDPOINT) {
    if (ENDPOINT.search('commercelayer.io') === -1)
      org.domain = 'commercelayer.co'
    org.organization = ENDPOINT
      .replace('https://', '')
      .replace(`.${org.domain}`, '')
  }
  return org
}
