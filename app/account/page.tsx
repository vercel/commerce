import Image from 'next/image';
import Link from 'next/link';
import { getCustomerOrders } from 'lib/shopify';
import Price from 'components/price';
import Divider from 'components/divider';
import { Button } from 'components/button';

export const runtime = 'edge';

export default async function AccountPage() {
  // if (!access) {
  //   redirect('/logout');
  // }
  // if (access === 'denied') {
  //   redirect('/logout');
  // }
  //
  // const customerAccessToken = access;
  //
  // //this is needed b/c of strange way server components handle redirects etc.
  // //see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#redirecting
  // //can only redirect outside of try/catch!
  // let success = true;
  // let errorMessage;
  // let customerData;
  // let orders;
  //
  // try {
  //   const responseCustomerDetails = await shopifyCustomerFetch<CustomerDetailsData>({
  //     customerToken: customerAccessToken,
  //     query: CUSTOMER_DETAILS_QUERY,
  //     tags: [TAGS.customer]
  //   });
  //   const userDetails = responseCustomerDetails.body;
  //   if (!userDetails) {
  //     throw new Error('Error getting actual user data Account page.');
  //   }
  //   customerData = userDetails?.data?.customer;
  //   orders = customerData?.orders?.edges;
  //   //console.log ("Details",orders)
  // } catch (e) {
  //   //they don't recognize this error in TS!
  //   //@ts-ignore
  //   errorMessage = e?.error?.toString() ?? 'Unknown Error';
  //   console.log('error customer fetch account', e);
  //   if (errorMessage !== 'unauthorized') {
  //     throw new Error('Error getting actual user data Account page.');
  //   } else {
  //     console.log('Unauthorized access. Set to false and redirect');
  //     success = false;
  //   }
  // }
  // if (!success && errorMessage === 'unauthorized') redirect('/logout');
  // // revalidateTag('posts') // Update cached posts //FIX
  const orders = await getCustomerOrders();

  return (
    <div className="mx-auto mt-4 max-w-screen-2xl px-4">
      <h3 className="pb-4 text-2xl font-bold">Orders</h3>
      {orders.map((order, index) => (
        <div className="relative" key={index}>
          <Link
            className="absolute left-0 top-0 h-full w-full"
            href={`/account/orders/${order.id}`}
          ></Link>
          <div className="flex w-full flex-col rounded border bg-white p-6 md:w-fit">
            <div className="flex flex-col gap-2">
              {order.lineItems.slice(0, 2).map((lineItem, index) => (
                <div key={index}>
                  <div className="flex gap-2">
                    <Image
                      src={lineItem?.image?.url}
                      alt={lineItem?.image?.altText}
                      width={80}
                      height={80}
                    />
                    <div>
                      <p>{lineItem.title}</p>
                    </div>
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-bold">
                  {order.lineItems.length} item{order.lineItems.length > 1 && 's'}
                </p>
                <p className="text-gray-500">Order {order.name}</p>
              </div>
              <Price
                className="text-lg font-medium text-gray-900"
                amount={order.totalPrice!.amount}
                currencyCode={order.totalPrice!.currencyCode}
              />
            </div>
            <Button size="lg">Activate Warranty</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
