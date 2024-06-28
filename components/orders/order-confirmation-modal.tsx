import Image from 'next/image';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Text from 'components/ui/text';
import { Input } from 'components/ui/input';
import { InputLabel } from 'components/ui/input-label';
import Skeleton from 'components/ui/skeleton';
import { toPrintDate } from 'lib/utils';
import Label from 'components/ui/label';
import Heading from 'components/ui/heading';
import PaymentsDetails from './payment-details';
import Price from 'components/price';
import Divider from 'components/divider';
import Markdown from 'markdown-to-jsx';
import { Order, OrderConfirmationContent } from 'lib/shopify/types';
import { FormEventHandler, useEffect, useRef, useState, useTransition } from 'react';
import { confirmOrder } from 'components/orders/actions';
import { Button } from 'components/ui';

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
  const [, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchOrderConfirmationContent = async () => {
      const res = await fetch('/api/orders/confirmation');
      const data = await res.json();

      setOrderConfirmationContent(data);

      setLoading(false);
    };

    // If the order has already been confirmed, don't fetch the content
    if (order.orderConfirmation) return;

    fetchOrderConfirmationContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);

    startTransition(async () => {
      await confirmOrder({
        order,
        content: orderConfirmationContent!,
        formData
      });
      form.reset();
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
            className="max-w-3xl space-y-4 rounded bg-white p-12 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {loading ? (
              <Skeleton />
            ) : (
              <OrderConfirmationDetails content={orderConfirmationContent!} order={order} />
            )}
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
              <div className="space-y-2">
                <InputLabel htmlFor="date">Today&apos;s date</InputLabel>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  readOnly
                  value={new Date().toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                />
              </div>
              <div className="space-y-2">
                <InputLabel htmlFor="signature1">Print your name to sign</InputLabel>
                <Input id="signature1" name="signature1" required />
              </div>
              <div className="space-y-2">
                <InputLabel htmlFor="signature2">
                  Credit card holder&apos;s electronic signature
                </InputLabel>
                <Input id="signature2" name="signature2" required />
              </div>
              <div className="space-x-2">
                <Button variant="outlined" color="content">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
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
