import { ClientConfig, Customer } from 'commerce-sdk'

// client configuration parameters
export const clientConfig: ClientConfig = {
  headers: {
    authorization: ``,
  },
  parameters: {
    clientId: process.env.SFCC_CLIENT_ID || '',
    organizationId: process.env.SFCC_ORG_ID || '',
    shortCode: process.env.SFCC_SHORT_CODE || '',
    siteId: process.env.SFCC_SITE_ID || '',
  },
}

/**
 * Get the shopper or guest JWT/access token, along with a refresh token, using client credentials
 *
 * @returns guest user authorization token
 */
export async function getGuestUserAuthToken(): Promise<Customer.ShopperLogin.TokenResponse> {
  const credentials = `${process.env.SFCC_CLIENT_ID}:${process.env.SFCC_CLIENT_SECRET}`
  const base64data = Buffer.from(credentials).toString('base64')
  const headers = { Authorization: `Basic ${base64data}` }
  const client = new Customer.ShopperLogin(clientConfig)

  return await client.getAccessToken({
    headers,
    body: {
      grant_type: 'client_credentials',
    },
  })
}

export const getConfigAuth = async () => {
  const shopperToken = await getGuestUserAuthToken()
  const configAuth = {
    ...clientConfig,
    headers: { authorization: `Bearer ${shopperToken.access_token}` },
  }
  return configAuth
}
