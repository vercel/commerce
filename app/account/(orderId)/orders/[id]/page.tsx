import { ArrowLeftIcon, CheckCircleIcon, TruckIcon } from '@heroicons/react/24/outline';
import OrderConfirmation from 'components/orders/order-confirmation';
import PaymentsDetails from 'components/orders/payment-details';
import OrderSummary from 'components/orders/order-summary';
import OrderSummaryMobile from 'components/orders/order-summary-mobile';
import Badge from 'components/ui/badge';
import { Card } from 'components/ui';
import Heading from 'components/ui/heading';
import Label from 'components/ui/label';
import Text from 'components/ui/text';
import { getCustomerOrder } from 'lib/shopify';
import { Fulfillment, Order } from 'lib/shopify/types';
import { toPrintDate } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import ActivateWarranty from 'components/orders/activate-warranty';

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
                {order.shippingAddress!.firstName} {order.shippingAddress!.lastName}
              </Text>
              <Text>{order.shippingAddress!.address1}</Text>
              {order.shippingAddress!.address2 && <Text>{order.shippingAddress!.address2}</Text>}
              <Text>
                {order.shippingAddress!.city} {order.shippingAddress!.provinceCode}{' '}
                {order.shippingAddress!.zip}
              </Text>
              <Text>{order.shippingAddress!.country}</Text>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Shipping Method</Label>
            <Text>{order.shippingMethod!.name}</Text>
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
                {order.billingAddress!.firstName} {order.billingAddress!.lastName}
              </Text>
              <Text>{order.billingAddress!.address1}</Text>
              {order.billingAddress!.address2 && <Text>{order.billingAddress!.address2}</Text>}
              <Text>
                {order.billingAddress!.city} {order.billingAddress!.provinceCode}{' '}
                {order.billingAddress!.zip}
              </Text>
              <Text>{order.billingAddress!.country}</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await getCustomerOrder(params.id);

  return (
    <>
      <OrderSummaryMobile order={order} />
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex justify-between">
          <div className="flex items-start gap-2">
            <Link href="/account">
              <ArrowLeftIcon className="mt-1 h-6 w-6" />
            </Link>
            <div>
              <Heading as="h1">Order {order.name}</Heading>
              <Label>Confirmed {toPrintDate(order.processedAt)}</Label>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <OrderConfirmation order={order} />
            <ActivateWarranty order={order} />
          </div>
        </div>
        <div className="flex items-start gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <Fulfillments order={order} />
            <Unfulfilled order={order} />
            <OrderDetails order={order} />
          </div>
          <Card className="hidden lg:block lg:basis-5/12">
            <OrderSummary order={order} />
          </Card>
        </div>
      </div>
    </>
  );
}
