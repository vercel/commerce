'use server';

import { CUSTOMER_API_URL, ORIGIN_URL, removeAllCookiesServerAction } from 'lib/shopify/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function doLogout() {
  const origin = ORIGIN_URL;
  const customerAccountApiUrl = CUSTOMER_API_URL;
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
  } catch (e) {
    console.log('Error', e);
    //you can throw error here or return - return goes back to form b/c of state, throw will throw the error boundary
    //throw new Error ("Error")
    return 'Error logging out. Please try again';
  }

  redirect(`${logoutUrl}`); // Navigate to the new post page
}
