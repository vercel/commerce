'use server';

import { TAGS } from 'lib/shopify/customer/constants';
import { removeAllCookiesServerAction } from 'lib/shopify/customer/auth-helpers';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { SHOPIFY_ORIGIN, SHOPIFY_CUSTOMER_ACCOUNT_API_URL } from 'lib/shopify/customer/constants';
//import {generateCodeVerifier,generateCodeChallenge,generateRandomString} from 'lib/shopify/customer/auth-utils'

export async function doLogout(prevState: any) {
  //let logoutUrl = '/logout'
  const origin = SHOPIFY_ORIGIN;
  const customerAccountApiUrl = SHOPIFY_CUSTOMER_ACCOUNT_API_URL;
  let logoutUrl;
  try {
    const idToken = cookies().get('shop_id_token');
    const idTokenValue = idToken?.value;
    if (!idTokenValue) {
      //you can also throw an error here with page and middleware
      //throw new Error ("Error No Id Token")
      //if there is no idToken, then sending to logout url will redirect shopify, so just
      //redirect to login here and delete cookies (presumably they don't even exist)
      logoutUrl = new URL(`${origin}/login`);
    } else {
      logoutUrl = new URL(
        `${customerAccountApiUrl}/auth/logout?id_token_hint=${idTokenValue}&post_logout_redirect_uri=${origin}`
      );
    }
    await removeAllCookiesServerAction();
    revalidateTag(TAGS.customer);
  } catch (e) {
    console.log('Error', e);
    //you can throw error here or return - return goes back to form b/c of state, throw will throw the error boundary
    //throw new Error ("Error")
    return 'Error logging out. Please try again';
  }

  redirect(`${logoutUrl}`); // Navigate to the new post page
}
