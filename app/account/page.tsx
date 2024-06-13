import { headers } from 'next/headers';
import { AccountProfile } from 'components/account/account-profile';
import { AccountOrdersHistory } from 'components/account/account-orders-history';
import { redirect } from 'next/navigation';
import { shopifyCustomerFetch } from 'lib/shopify/customer/index';
import { CUSTOMER_DETAILS_QUERY } from 'lib/shopify/customer/queries/customer';
import { CustomerDetailsData } from 'lib/shopify/customer/types';
import { TAGS } from 'lib/shopify/customer/constants';
export const runtime = 'edge';
export default async function AccountPage() {
  const headersList = headers();
  const access = headersList.get('x-shop-customer-token');
  if (!access) {
    console.log('ERROR: No access header account');
    //I'm not sure what's better here. Throw error or just log out??
    //redirect gets rid of call cookies
    redirect('/logout');
    //throw new Error("No access header")
  }
  //console.log("Authorize Access code header:", access)
  if (access === 'denied') {
    console.log('Access Denied for Auth account');
    redirect('/logout');
    //throw new Error("No access allowed")
  }
  const customerAccessToken = access;

  //this is needed b/c of strange way server components handle redirects etc.
  //see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#redirecting
  //can only redirect outside of try/catch!
  let success = true;
  let errorMessage;
  let customerData;
  let orders;

  try {
    const responseCustomerDetails = await shopifyCustomerFetch<CustomerDetailsData>({
      customerToken: customerAccessToken,
      cache: 'no-store',
      query: CUSTOMER_DETAILS_QUERY,
      tags: [TAGS.customer]
    });
    //console.log("userDetails", responseCustomerDetails)
    const userDetails = responseCustomerDetails.body;
    if (!userDetails) {
      throw new Error('Error getting actual user data Account page.');
    }
    customerData = userDetails?.data?.customer;
    orders = customerData?.orders?.edges;
    //console.log ("Details",orders)
  } catch (e) {
    //they don't recognize this error in TS!
    //@ts-ignore
    errorMessage = e?.error?.toString() ?? 'Unknown Error';
    console.log('error customer fetch account', e);
    if (errorMessage !== 'unauthorized') {
      throw new Error('Error getting actual user data Account page.');
    } else {
      console.log('Unauthorized access. Set to false and redirect');
      success = false;
    }
  }
  if (!success && errorMessage === 'unauthorized') redirect('/logout');
  //revalidateTag('posts') // Update cached posts //FIX

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full">
            <div> Welcome: {customerData?.emailAddress.emailAddress}</div>
          </div>
          <div className="h-full w-full">
            <div className="mt-5">
              <AccountProfile />
            </div>
          </div>
          <div className="h-full w-full">
            <div className="mt-5">{orders && <AccountOrdersHistory orders={orders} />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
