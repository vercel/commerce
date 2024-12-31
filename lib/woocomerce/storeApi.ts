import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios';
import { Billing } from './models/billing';
import { Cart } from './models/cart';
import { Order } from './models/orders';
import { Shipping } from './models/shipping';

/**
 * WooCommerce Store API Client for server-side requests.
 * To use this in the client-side, you need to create a new route of api endpoint in your Next.js app.
 */

export type OrderPayload = {
  billing_address: Billing;
  shipping_address: Shipping;
  payment_method: string;
  payment_data?: PaymentMethodData[];
  customer_note?: string;
}

export type PaymentMethodData = {
  key: string;
  value: string;
}

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

  async createOrder(order: OrderPayload): Promise<Order> {
    return this.client.post('/checkout', order).then((response) => response.data);
  }

  async getOrders(params?: Record<string, string | number>): Promise<Order[]> {
    return this.client.get<Order[]>('/checkout', { params }).then((response) => response.data);
  }

  async getOrder(id: string | number): Promise<Order> {
    return this.client.get<Order>(`/checkout/${id}`).then((response) => response.data);
  }
}

// Example usage.
const baseURL = process.env.WOOCOMMERCE_STORE_API_URL ?? 'http://wordpress.localhost/wp-json/wc/store/v1';

export const storeApi = new WooCommerceStoreApiClient(baseURL);
