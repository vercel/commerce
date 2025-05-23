import axios, { RawAxiosRequestHeaders } from 'axios';
import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { Billing } from './models/billing';
import { Cart } from './models/cart';
import { Order } from './models/orders';
import { Shipping } from './models/shipping';

export type OrderPayload = {
  billing_address: Billing;
  shipping_address: Shipping;
  payment_method: string;
  payment_data?: PaymentMethodData[];
  customer_note?: string;
};

export type PaymentMethodData = {
  key: string;
  value: string;
};

function createStoreApiClient({
  baseURL = process.env.WOOCOMMERCE_STORE_API_URL ?? 'http://localhost/wp-json/wc/store/v1',
  authToken,
  cartToken
}: {
  baseURL?: string;
  authToken?: string;
  cartToken?: string;
}) {
  const headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(cartToken ? { 'cart-token': cartToken } : {})
  };

  const client = axios.create({ baseURL, headers });

  async function _request(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any) {
    try {
      console.debug('Request', method, url, data, headers);
      const response = await axios({
        method,
        url: baseURL + url,
        data,
        headers
      });

      return response;
    } catch (error: any) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        if (error.response.data.code === 'jwt_auth_invalid_token') {
          console.debug('Token expired, regenerating...');
          const newAuthToken = await regenerateAuthToken();
          headers.Authorization = `Bearer ${newAuthToken}`;
          return _request(method, url, data); // Retry the request with the new token
        }

        throw new Error(
          `Request failed with status ${error.response.status}: ${error.response.data.message}`
        );
      }
      throw error;
    }
  }

  async function regenerateAuthToken(): Promise<string> {
    console.debug('Regenerating auth token...');
    const res = await axios.post(`${baseURL}/auth/refresh`, {}, { headers });
    return res.data.token;
  }

  return {
    async getCart(
      params?: Record<string, string | number>
    ): Promise<{ cart: Cart; cartToken?: string }> {
      const res = await _request('get', '/cart', { params });

      return { cart: res.data, cartToken: res.headers['cart-token'] };
    },

    async addToCart(payload: {
      id: string | number;
      quantity: number;
      variation: { attribute: string; value: string }[];
    }): Promise<Cart> {
      const res = await _request('post', '/cart/add-item', payload);
      return res.data;
    },
    async updateItem(payload: { key: string | number; quantity: number }): Promise<Cart> {
      const res = await _request('post', '/cart/update-item', payload);
      return res.data;
    },
    async removeFromCart(payload: { key: string | number }): Promise<Cart> {
      const res = await _request('post', `/cart/remove-item?key=${payload.key}`);
      return res.data;
    },
    createOrder(order: OrderPayload): Promise<Order> {
      return _request('post', '/checkout', order).then((res) => res.data);
    },
    async getOrders(): Promise<Order[]> {
      const res = await _request('get', '/checkout');
      return res.data;
    },
    async getOrder(id: string | number): Promise<Order> {
      const res = await _request('get', `/checkout/${id}`);
      return res.data;
    }
  };
}

export async function getStoreApiFromRequest(req?: NextRequest) {
  const cartToken = (await cookies()).get('cart-token')?.value;
  const authToken = req ? (await getToken({ req }))?.user?.token : undefined;

  return createStoreApiClient({ cartToken, authToken });
}
