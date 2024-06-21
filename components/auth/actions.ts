'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import {
  generateCodeVerifier,
  generateCodeChallenge,
  generateRandomString,
  CUSTOMER_API_CLIENT_ID,
  ORIGIN_URL,
  CUSTOMER_API_URL
} from 'lib/shopify/auth';

export async function doLogin(_: any) {
  const customerAccountApiUrl = CUSTOMER_API_URL;
  const clientId = CUSTOMER_API_CLIENT_ID;
  const origin = ORIGIN_URL;
  const loginUrl = new URL(`${customerAccountApiUrl}/auth/oauth/authorize`);

  try {
    loginUrl.searchParams.set('client_id', clientId);
    loginUrl.searchParams.append('response_type', 'code');
    loginUrl.searchParams.append('redirect_uri', `${origin}/authorize`);
    loginUrl.searchParams.set(
      'scope',
      'openid email https://api.customers.com/auth/customer.graphql'
    );
    const verifier = await generateCodeVerifier();

    const challenge = await generateCodeChallenge(verifier);
    cookies().set('shop_verifier', verifier as string, {});
    const state = await generateRandomString();
    const nonce = await generateRandomString();
    cookies().set('shop_state', state as string, {});
    cookies().set('shop_nonce', nonce as string, {});

    loginUrl.searchParams.append('state', state);
    loginUrl.searchParams.append('nonce', nonce);
    loginUrl.searchParams.append('code_challenge', challenge);
    loginUrl.searchParams.append('code_challenge_method', 'S256');
  } catch (e) {
    console.log('Error', e);
    return 'Error logging in. Please try again';
  }

  redirect(`${loginUrl}`); // Navigate to the new post page
}

export async function isLoggedIn() {
  const customerToken = cookies().get('shop_customer_token')?.value;
  const refreshToken = cookies().get('shop_refresh_token')?.value;

  if (!customerToken && !refreshToken) {
    return false;
  } else {
    return true;
  }
}
