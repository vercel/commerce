import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios';
import { Cart } from './models/cart';

/**
 * WooCommerce Store API Client for server-side requests.
 * To use this in the client-side, you need to create a new route of api endpoint in your Next.js app.
 */
class WooCommerceStoreApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    const headers: RawAxiosRequestHeaders = {
      'Content-Type': 'application/json',
      Accept: '*/*'
    };

    this.client = axios.create({
      baseURL,
      headers
    });
  }

  _setAuthorizationToken(token: string) {
    if (token) {
      this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      this._deleteAuthorizationToken();
    }
  }

  _deleteAuthorizationToken() {
    this.client.defaults.headers['Authorization'] = '';
  }

  _seCartToken(cartToken: string) {
    this.client.defaults.headers['cart-token'] = cartToken;
  }


  async getCart(params?: Record<string, string | number>): Promise<Cart> {
    return this.client.get<Cart>('/cart', { params }).then(async (response) => {
      this._seCartToken(response.headers['cart-token']);

      return response.data;
    });
  }

  async addToCart(payload: {
    id: string | number;
    quantity: number;
    variation: { attribute: string; value: string }[];
  }): Promise<Cart> {
    return this.client.post<Cart>('/cart/add-item', payload).then((response) => response.data);
  }

  async updateItem(payload: { key: string | number; quantity: number }): Promise<Cart> {
    return this.client.post<Cart>('/cart/update-item', payload).then((response) => response.data);
  }

  async removeFromCart(payload: { key: string | number }): Promise<Cart> {
    return this.client
      .post<Cart>(`/cart/remove-item?key=${payload.key}`)
      .then((response) => response.data);
  }
}

// Example usage.
const baseURL = 'http://wordpress.localhost/wp-json/wc/store/v1';

export const storeApi = new WooCommerceStoreApiClient(baseURL);
