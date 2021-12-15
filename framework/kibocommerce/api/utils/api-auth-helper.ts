import getNextConfig from 'next/config'
import type { KiboCommerceConfig } from '../index'
import type { FetchOptions } from '@vercel/fetch'
import fetch from './fetch'

interface AppAuthTicket {
  access_token: string
  token_type: string
  expires_in: number
  expires_at: number
  refresh_token: string | null
}

interface AuthTicketCache {
  getAuthTicket: () => Promise<AppAuthTicket>
  setAuthTicket: (kiboAuthTicket: AppAuthTicket) => void
}

class RuntimeMemCache implements AuthTicketCache {
  constructor() {}
  async getAuthTicket() {
    const { serverRuntimeConfig } = getNextConfig()
    return serverRuntimeConfig.kiboAuthTicket
  }
  setAuthTicket(kiboAuthTicket: AppAuthTicket) {
    const { serverRuntimeConfig } = getNextConfig()
    serverRuntimeConfig.kiboAuthTicket = kiboAuthTicket
  }
}

export class APIAuthenticationHelper {
  private _clientId: string
  private _sharedSecret: string
  private _authUrl: string
  private _authTicketCache!: AuthTicketCache

  constructor(
    { clientId = '', sharedSecret = '', authUrl = '' }: KiboCommerceConfig,
    authTicketCache?: AuthTicketCache
  ) {
    this._clientId = clientId
    this._sharedSecret = sharedSecret
    this._authUrl = authUrl
    if(!authTicketCache) {
      this._authTicketCache = new RuntimeMemCache();
    }
  }
  private _buildFetchOptions(body: any = {}): FetchOptions {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  }
  private _calculateTicketExpiration(kiboAuthTicket: AppAuthTicket) {
    //calculate how many milliseconds until auth expires
    const millisecsUntilExpiration = kiboAuthTicket.expires_in * 1000
    kiboAuthTicket.expires_at = Date.now() + millisecsUntilExpiration

    return kiboAuthTicket
  }
  public async authenticate(): Promise<AppAuthTicket> {
    // create oauth fetch options
    const options = this._buildFetchOptions({
      client_id: this._clientId,
      client_secret: this._sharedSecret,
      grant_type: 'client_credentials',
    })
    // perform authentication
    const authTicket = await fetch(
      `${this._authUrl}/api/platform/applications/authtickets/oauth`,
      options
    ).then((response) => response.json())
    // set expiration time in ms on auth ticket
    this._calculateTicketExpiration(authTicket)
    // set authentication ticket on next server runtime object
    this._authTicketCache.setAuthTicket(authTicket)

    return authTicket
  }
  public async refreshTicket(kiboAuthTicket: AppAuthTicket) {
    // create oauth refresh fetch options
    const options = this._buildFetchOptions({
      refreshToken: kiboAuthTicket?.refresh_token,
    })
    // perform auth ticket refresh
    const refreshedTicket = await fetch(
      `${this._authUrl}/api/platform/applications/authtickets/refresh-ticket`,
      options
    ).then((response) => response.json())

    return refreshedTicket
  }
  public async getAccessToken(): Promise<string> {
    // get current Kibo API auth ticket
    let authTicket = await this._authTicketCache.getAuthTicket()

    // if no current ticket, perform auth
    // or if ticket expired, refresh auth
    if (!authTicket) {
      authTicket = await this.authenticate()
    } else if (authTicket.expires_at < Date.now()) {
      authTicket = await this.refreshTicket(authTicket)
    }

    return authTicket.access_token
  }
}
