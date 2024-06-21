import Image from 'next/image';
import Link from 'next/link';
import { getCustomerOrders } from 'lib/shopify';
import Text from 'components/ui/text';
import Price from 'components/price';
import Divider from 'components/divider';
import { Button } from 'components/button';
import Heading from 'components/ui/heading';
import Label from 'components/ui/label';
import Badge from 'components/ui/badge';
import { Card } from 'components/ui/card';

export const runtime = 'edge';

export default async function AccountPage() {
  const orders = await getCustomerOrders();

  return (
    <div className="p-6">
      <Heading className="pb-4" as="h1">
        Orders
      </Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order, index) => (
          <div className="relative" key={index}>
            <Link
              className="peer absolute left-0 top-0 h-full w-full"
              href={`/account/orders/${order.id}`}
            />
            <Card className="flex h-full flex-col transition-shadow peer-hover:shadow-lg peer-active:shadow-lg">
              <div className="flex flex-col gap-4">
                {order.lineItems.map((lineItem, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <Badge content={lineItem.quantity!}>
                        <Image
                          src={lineItem?.image?.url}
                          alt={lineItem?.image?.altText}
                          width={80}
                          height={80}
                          className="rounded border"
                        />
                      </Badge>
                      <Text>{lineItem.title}</Text>
                    </div>
                  </div>
                ))}
              </div>
              <Divider />
              <div className="flex flex-1 flex-col justify-end gap-4">
                <div>
                  <Text>
                    {order.lineItems.length} item{order.lineItems.length > 1 && 's'}
                  </Text>
                  <Label>Order {order.name}</Label>
                </div>
                <Price
                  amount={order.totalPrice!.amount}
                  currencyCode={order.totalPrice!.currencyCode}
                />
              </div>
              <Button size="lg" className="mt-4">
                Activate Warranty
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
