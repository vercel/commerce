import { getCustomer } from 'lib/shopify';
import { cookies } from 'next/headers';
import SignOutSection from './component/SignOutSection';

async function AccountPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const token = cookies().get('customerAccessToken')?.value as string;
  const customer = await getCustomer(token);
  console.log('customer', customer);
  console.log('token', token);

  return (
    <div>
      <SignOutSection />
      Account Detail
    </div>
  );
}

export default AccountPage;
