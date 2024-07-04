import Image from 'next/image';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { toPrintDate } from 'lib/utils';
import PaymentsDetails from './payment-details';
import Price from 'components/price';
import Divider from 'components/divider';
import Markdown from 'markdown-to-jsx';
import { Order, OrderConfirmationContent } from 'lib/shopify/types';
import { FormEventHandler, useEffect, useRef, useState, useTransition } from 'react';
import { confirmOrder, fetchOrderConfirmationContent } from 'components/orders/actions';
import { Button, Heading, Text, Label, Input, Skeleton } from 'components/ui';
import LoadingDots from 'components/loading-dots';

function OrderConfirmationDetails({
  content,
  order
}: {
  content: OrderConfirmationContent;
  order: Order;
}) {
  return (
    <div className="space-y-4">
      <figure>
        <Image
          src={content?.logo?.url}
          alt={content?.logo?.altText || 'Logo'}
          width={content?.logo?.width || 400}
          height={content?.logo?.height || 400}
        />
      </figure>
      <Heading className="text-primary" size="sm">
        ORDER INFORMATION:
      </Heading>
      <div>
        <Text>Order number: {order.name}</Text>
        <Text>Email: {order.customer?.emailAddress}</Text>
        <Text>Date: {toPrintDate(order.processedAt)}</Text>
      </div>
      <div className="flex">
        <div className="flex-1 space-y-2">
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
        <div className="flex-1 space-y-2">
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
      <div className="flex flex-col gap-2">
        <Label>Payment</Label>
        <PaymentsDetails order={order} hideIcon />
      </div>
      <div className="mb-4">
        <Heading size="sm">Products</Heading>
        <Divider />
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-start">
                <Label>Product</Label>
              </th>
              <th className="text-start">
                <Label>Quantity</Label>
              </th>
              <th className="text-start">
                <Label>Price</Label>
              </th>
            </tr>
          </thead>
          <tbody>
            {order.lineItems.map((lineItem, index) => (
              <tr key={index}>
                <td className="py-4 text-start">
                  <Text className="max-w-sm">{lineItem.title}</Text>
                </td>
                <td className="text-start">
                  <Text>{lineItem.quantity}</Text>
                </td>
                <td className="text-start">
                  <Price
                    className="text-sm"
                    amount={lineItem.totalPrice!.amount}
                    currencyCode={lineItem.totalPrice!.currencyCode}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Divider />
        <div className="ml-auto flex w-60 flex-col gap-4">
          <div className="flex justify-between">
            <Text>Subtotal</Text>
            <Price
              className="text-sm font-semibold"
              amount={order.subtotal!.amount}
              currencyCode={order.subtotal!.currencyCode}
            />
          </div>
          <div className="flex items-center justify-between">
            <Text>Shipping</Text>
            {order.shippingMethod.price.amount !== '0.0' ? (
              <Price
                className="text-sm font-semibold"
                amount={order.shippingMethod!.price.amount}
                currencyCode={order.shippingMethod!.price.currencyCode}
              />
            ) : (
              <Text className="font-semibold">Free</Text>
            )}
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
      <Markdown
        options={{
          overrides: {
            h1: {
              props: {
                className: 'text-primary font-semibold mt-4 mb-2 text-xl'
              }
            },
            h2: {
              props: {
                className: 'text-primary font-semibold mt-4 mb-2'
              }
            },
            h3: {
              props: {
                className: 'text-primary text-sm font-semibold mt-4 mb-2'
              }
            },
            p: {
              props: {
                className: 'text-sm'
              }
            },
            a: {
              props: {
                className: 'text-sm, text-primary underline'
              }
            }
          }
        }}
      >
        {content?.body || ''}
      </Markdown>
    </div>
  );
}
export default function OrderConfirmationModal({
  order,
  isOpen,
  onClose
}: {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [orderConfirmationContent, setOrderConfirmationContent] =
    useState<OrderConfirmationContent>();
  const [submitting, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // If the order has already been confirmed, don't fetch the content
    if (order.orderConfirmation) return;

    if (!isOpen) return;

    (async () => {
      const data = await fetchOrderConfirmationContent();
      setOrderConfirmationContent(data);
      setLoading(false);
    })();
  }, [isOpen, order.orderConfirmation]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    startTransition(async () => {
      const formData = new FormData(form);
      await confirmOrder({
        order,
        content: orderConfirmationContent!,
        formData
      });
    });
  };

  if (!loading && !orderConfirmationContent) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full max-w-3xl space-y-4 rounded bg-white p-5 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="mb-2 font-bold">Confirm Order</DialogTitle>
            {loading ? (
              <LoadingDots size="lg" rootClassName="flex justify-center" />
            ) : (
              <OrderConfirmationDetails content={orderConfirmationContent!} order={order} />
            )}
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="max-w-md space-y-4">
                <Input
                  type="date"
                  readOnly
                  label="Date"
                  value={new Date().toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                />
                <Input required label="Print your name to sign" />
                <Input required label="Credit card holder's electronic signature" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="text" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  disabled={submitting || loading}
                  isLoading={submitting}
                  loadingText="Submitting"
                >
                  Submit
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
