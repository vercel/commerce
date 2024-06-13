//See https://react.dev/reference/react-dom/hooks/useFormState
//https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms
'use server';

import { TAGS } from 'lib/shopify/customer/constants';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
//import { getOrigin } from 'lib/shopify/customer'
import {
  generateCodeVerifier,
  generateCodeChallenge,
  generateRandomString
} from 'lib/shopify/customer/auth-utils';
import {
  SHOPIFY_CUSTOMER_ACCOUNT_API_URL,
  SHOPIFY_CLIENT_ID,
  SHOPIFY_ORIGIN
} from 'lib/shopify/customer/constants';

export async function doLogin(prevState: any) {
  const customerAccountApiUrl = SHOPIFY_CUSTOMER_ACCOUNT_API_URL;
  const clientId = SHOPIFY_CLIENT_ID;
  const origin = SHOPIFY_ORIGIN;
  const loginUrl = new URL(`${customerAccountApiUrl}/auth/oauth/authorize`);
  //console.log ("previous", prevState)

  try {
    //await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    loginUrl.searchParams.set('client_id', clientId);
    loginUrl.searchParams.append('response_type', 'code');
    loginUrl.searchParams.append('redirect_uri', `${origin}/authorize`);
    loginUrl.searchParams.set(
      'scope',
      'openid email https://api.customers.com/auth/customer.graphql'
    );
    const verifier = await generateCodeVerifier();
    //const newVerifier = verifier.replace("+", '_').replace("-",'_').replace("/",'_').trim()
    const challenge = await generateCodeChallenge(verifier);
    cookies().set('shop_verifier', verifier as string, {
      // @ts-ignore
      //expires: auth?.expires, //not necessary here
    });
    const state = await generateRandomString();
    const nonce = await generateRandomString();
    cookies().set('shop_state', state as string, {
      // @ts-ignore
      //expires: auth?.expires, //not necessary here
    });
    cookies().set('shop_nonce', nonce as string, {
      // @ts-ignore
      //expires: auth?.expires, //not necessary here
    });
    loginUrl.searchParams.append('state', state);
    loginUrl.searchParams.append('nonce', nonce);
    loginUrl.searchParams.append('code_challenge', challenge);
    loginUrl.searchParams.append('code_challenge_method', 'S256');
    //console.log ("loginURL", loginUrl)
    //throw new Error ("Error") //this is how you throw an error, if you want to. Then the catch will execute
  } catch (e) {
    console.log('Error', e);
    //you can throw error here or return - return goes back to form b/c of state, throw will throw the error boundary
    //throw new Error ("Error")
    return 'Error logging in. Please try again';
  }

  revalidateTag(TAGS.customer);
  redirect(`${loginUrl}`); // Navigate to the new post page
}
