import { cookies } from 'next/headers';
import { LoginShopify } from 'components/auth/login-form';
import { UserIcon } from 'components/auth/user-icon';

export default async function Login() {
  const customerToken = cookies().get('shop_customer_token')?.value;
  const refreshToken = cookies().get('shop_refresh_token')?.value;
  let isLoggedIn;
  if (!customerToken && !refreshToken) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }
  console.log('LoggedIn', isLoggedIn);
  return isLoggedIn ? <UserIcon /> : <LoginShopify />;
}
