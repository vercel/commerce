//See https://react.dev/reference/react-dom/hooks/useFormState
//https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms
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

  redirect(`${loginUrl}`); // Navigate to the new post page
}
