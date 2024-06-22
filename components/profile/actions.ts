'use server';

import {
  CUSTOMER_API_CLIENT_ID,
  CUSTOMER_API_URL,
  ORIGIN_URL,
  generateCodeChallenge,
  generateCodeVerifier,
  generateRandomString,
  removeAllCookiesServerAction
} from 'lib/shopify/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function doLogin() {
  const customerAccountApiUrl = CUSTOMER_API_URL;
  const clientId = CUSTOMER_API_CLIENT_ID;
  const origin = ORIGIN_URL;
  const loginUrl = new URL(`${customerAccountApiUrl}/auth/oauth/authorize`);

  try {
    loginUrl.searchParams.set('client_id', clientId);
    loginUrl.searchParams.append('response_type', 'code');
    loginUrl.searchParams.append('redirect_uri', `${origin}/api/authorize`);
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

export const doLogout = async () => {
  const idToken = cookies().get('shop_id_token');
  const idTokenValue = idToken?.value;

  await removeAllCookiesServerAction();
  //if there is no idToken, then sending to logout url will redirect shopify, so just
  //redirect to login here and delete cookies (presumably they don't even exist)
  if (!idTokenValue) {
    redirect(ORIGIN_URL);
  }

  const logoutUrl = new URL(
    `${CUSTOMER_API_URL}/auth/logout?id_token_hint=${idTokenValue}&post_logout_redirect_uri=${ORIGIN_URL}`
  );

  redirect(logoutUrl.toString());
};
