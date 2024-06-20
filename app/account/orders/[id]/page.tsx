import { CheckCircleIcon, TruckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Button } from 'components/button';
import { Card } from 'components/ui/card';
import Heading from 'components/ui/heading';
import Label from 'components/ui/label';
import { getCustomerOrder } from 'lib/shopify';
import { Fulfillment, Order } from 'lib/shopify/types';
import Text from 'components/ui/text';
import Price from 'components/price';
import Badge from 'components/ui/badge';

export const runtime = 'edge';

function toPrintDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function Unfulfilled({ order }: { order: Order }) {
  // Build a map of line item IDs to quantities fulfilled
  const fulfilledLineItems = order.fulfillments.reduce<Map<string, number>>((acc, fulfillment) => {
    fulfillment.fulfilledLineItems.forEach((lineItem) => {
      acc.set(lineItem.id, (acc.get(lineItem.id) || 0) + lineItem.quantity);
    });
    return acc;
  }, new Map<string, number>());

  // Filter out line items that have not been fulfilled
  const unfulfilledLineItems = order.lineItems.filter((lineItem) => {
    const fulfilledQuantity = fulfilledLineItems.get(lineItem.id) || 0;
    return lineItem.quantity! > fulfilledQuantity;
  });

  if (unfulfilledLineItems.length === 0) return null;

  return (
    <Card>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="h-4 w-4" />
          <Heading as="h3" size="sm">
            Confirmed
          </Heading>
        </div>
        <div className="flex gap-2">
          <div className="flex w-4 justify-center">
            <span className="border border-dashed border-content-subtle" />
          </div>
          <div className="flex flex-col gap-4">
            <Label>{toPrintDate(order.processedAt)}</Label>
            <Label>We&apos;ve received your order.</Label>
          </div>
        </div>
      </div>
    </Card>
  );
}

function FulfillmentCard({
  fulfillment,
  processedAt,
  isPartial
}: {
  fulfillment: Fulfillment;
  processedAt: string;
  isPartial: boolean;
}) {
  return (
    <Card>
      {isPartial && (
        <div className="mb-6 flex flex-wrap gap-2">
          {fulfillment.fulfilledLineItems.map((lineItem, index) => (
            <Badge key={index} content={lineItem.quantity}>
              <Image
                alt={lineItem.image.altText}
                src={lineItem.image.url}
                width={62}
                height={62}
                className="flex flex-col gap-2 rounded border"
              />
            </Badge>
          ))}
        </div>
      )}
      <div className="mb-6 flex flex-col gap-2">
        {fulfillment.trackingInformation.map((tracking, index) => (
          <div key={index} className="flex w-fit flex-col">
            <Label>Courier: {tracking.company}</Label>
            <Label>
              {' '}
              Tracking number: <span className="text-primary">{tracking.number}</span>
            </Label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4" />
            <Heading size="sm">On its way</Heading>
          </div>
          <div className="flex gap-2">
            <div className="flex w-4 justify-center">
              <span className="border border-dashed border-content-subtle" />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Updated {toPrintDate(fulfillment.createdAt)}</Label>
              <Label>This shipment is on its way.</Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4" />
            <Heading as="h3" size="sm">
              Confirmed
            </Heading>
          </div>
          <div className="flex gap-2">
            <div className="flex w-4 justify-center">
              <span className="border border-dashed border-content-subtle" />
            </div>
            <div className="flex flex-col gap-4">
              <Label>{toPrintDate(processedAt)}</Label>
              <Label>We&apos;ve received your order.</Label>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Fulfillments({ order }: { order: Order }) {
  return (
    <div className="flex flex-col gap-6">
      {order.fulfillments.map((fulfillment, index) => (
        <FulfillmentCard
          key={index}
          fulfillment={fulfillment}
          processedAt={order.processedAt}
          isPartial={order.fulfillments.length > 1}
        />
      ))}
    </div>
  );
}

function PaymentsDetails({ order }: { order: Order }) {
  return (
    <>
      {order.transactions.map((transaction, index) => (
        <div key={index} className="flex items-start gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={transaction.paymentIcon.url} alt={transaction.paymentIcon.altText} width={36} />
          <div>
            <Text>
              Ending with {transaction.paymentDetails.last4} -
              <Price
                as="span"
                amount={transaction.transactionAmount.amount}
                currencyCode={transaction.transactionAmount.currencyCode}
              />
            </Text>
            <Label>{toPrintDate(transaction.processedAt)}</Label>
          </div>
        </div>
      ))}
    </>
  );
}

function OrderDetails({ order }: { order: Order }) {
  return (
    <Card className="flex flex-col gap-4">
      <Heading size="sm">Order Details</Heading>
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Contact Information</Label>
            <div>
              <Text>{order.customer!.displayName}</Text>
              <Text>{order.customer!.emailAddress}</Text>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Shipping Address</Label>
            <div>
              <Text>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </Text>
              <Text>{order.shippingAddress.address1}</Text>
              {order.shippingAddress.address2 && <Text>{order.shippingAddress.address2}</Text>}
              <Text>
                {order.shippingAddress.city} {order.shippingAddress.provinceCode}{' '}
                {order.shippingAddress.zip}
              </Text>
              <Text>{order.shippingAddress.country}</Text>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Shipping Method</Label>
            <Text>{order.shippingMethod.name}</Text>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Payment</Label>
            <PaymentsDetails order={order} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Billing Address</Label>
            <div>
              <Text>
                {order.billingAddress.firstName} {order.billingAddress.lastName}
              </Text>
              <Text>{order.billingAddress.address1}</Text>
              {order.billingAddress.address2 && <Text>{order.billingAddress.address2}</Text>}
              <Text>
                {order.billingAddress.city} {order.billingAddress.provinceCode}{' '}
                {order.billingAddress.zip}
              </Text>
              <Text>{order.billingAddress.country}</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function OrderSummary({ order }: { order: Order }) {
  return (
    <div className="flex flex-col gap-6">
      <Heading size="sm">Order Summary</Heading>
      <div className="flex flex-col gap-6">
        {order.lineItems.map((lineItem, index) => (
          <div key={index} className="flex items-center gap-4">
            <Badge content={lineItem.quantity!}>
              <Image
                src={lineItem.image.url}
                alt={lineItem.image.altText}
                width={lineItem.image.width}
                height={lineItem.image.height}
                className="rounded border"
              />
            </Badge>
            <div className="flex flex-col gap-2">
              <Text>{lineItem.title}</Text>
              <Label>{lineItem.sku}</Label>
            </div>
            <Price
              className="text-sm"
              amount={lineItem.price!.amount}
              currencyCode={lineItem.price!.currencyCode}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Text>Subtotal</Text>
            <Price
              className="text-sm font-semibold"
              amount={order.totalPrice.amount}
              currencyCode={order.totalPrice.currencyCode}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>Shipping</Text>
            {order.shippingMethod?.price.amount !== '0.0' ? (
              <Price
                className="text-sm font-semibold"
                amount={order.shippingMethod!.price.amount}
                currencyCode={order.shippingMethod!.price.currencyCode}
              />
            ) : (
              <Text className="font-semibold">Free</Text>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Heading as="span" size="sm">
            Total
          </Heading>
          <Price
            className="font-semibold"
            amount={order.totalPrice.amount}
            currencyCode={order.totalPrice.currencyCode}
          />
        </div>
      </div>
    </div>
  );
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getCustomerOrder(params.id);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex justify-between">
        <div>
          <Heading as="h1">Order {order.name}</Heading>
          <Label>Confirmed {toPrintDate(order.processedAt)}</Label>
        </div>
        <div>
          <Button>Activate Warranty</Button>
        </div>
      </div>
      <div className="flex items-start gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <Fulfillments order={order} />
          <Unfulfilled order={order} />
          <OrderDetails order={order} />
        </div>
        <Card className="hidden md:block md:basis-5/12">
          <OrderSummary order={order} />
        </Card>
      </div>
    </main>
  );
}
