import { cookies } from 'next/headers';
import { LoginShopify } from 'components/auth/login-form';
import { UserIcon } from 'components/auth/user-icon';

export default async function Login() {
  const customerToken = cookies().get('shop_customer_token')?.value;
  const refreshToken = cookies().get('shop_refresh_token')?.value;
  let isLoggedIn;
  //obviously just checking for the cookies without verifying the cookie itself is not ideal. However, the cookie is validated on the
  //account page, so a "fake" cookie does nothing, except show the UI and then it would be deleted when clicking on account
  //so for now, just checking the cookie for the UI is sufficient. Alternatively, we can do a query here, or a custom JWT
  if (!customerToken && !refreshToken) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }
  console.log('LoggedIn', isLoggedIn);
  return isLoggedIn ? <UserIcon /> : <LoginShopify />;
}
