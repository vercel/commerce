'use client';

import { Accordion, AccordionItem, Checkbox, Radio, RadioGroup } from '@nextui-org/react';
import { useCart } from 'components/cart/cart-context';
import CartItemView from 'components/cart/cart-item';
import Price from 'components/price';
import ShippingForm from 'components/shipping/form';
import { PaymentGateways } from 'lib/woocomerce/models/payment';
import { OrderPayload } from 'lib/woocomerce/storeApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const shippingSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  address_1: z.string().min(3),
  address_2: z.string().optional(),
  city: z.string().min(3),
  state: z.string().min(3),
  postcode: z.string().min(3),
  country: z.string().min(3),
  company: z.string().optional()
});

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const initialState: OrderPayload = {
    shipping_address: {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: ''
    },
    billing_address: {
      first_name: '',
      last_name: '',
      company: '',
      email: '',
      phone: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postcode: '',
      country: ''
    },
    payment_method: '',
    payment_data: []
  };
  const [formData, setFormData] = useState(initialState);
  const [sameBilling, setSameBilling] = useState(true);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateways[]>([]);

  useEffect(() => {
    const fetchPaymentGateways = async () => {
      const paymentGateways = await (await fetch('/api/payments')).json();
      setPaymentGateways(paymentGateways);
    };
    fetchPaymentGateways();
  }, []);

  const handleChangeShipping = (e: any) => {
    setFormData({ ...formData, shipping_address: e });
    if (sameBilling) {
      setFormData({
        ...formData,
        billing_address: { ...formData.billing_address, ...e }
      });
    }
  };

  const handleChangeBilling = (e: any) => {
    setFormData({ ...formData, billing_address: e });
  };

  return (
    <section className="mx-auto grid h-full gap-4 px-4 pb-4">
      <p>Checkout</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          try {
            if (sameBilling) {
              setFormData({
                ...formData,
                billing_address: { ...formData.billing_address, ...formData.shipping_address }
              });
            }
            shippingSchema.parse(formData.shipping_address);
          } catch (error) {
            console.log(error);
          }
        }}
        className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="order-1 md:order-2 md:w-1/3">
            {cart && (
              <div className="ms-4 flex flex-col justify-between overflow-hidden">
                <ul className="flex-grow overflow-auto">
                  {cart.items?.length &&
                    cart.items
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item, i) => {
                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          >
                            <CartItemView item={item} />
                          </li>
                        );
                      })}
                </ul>
                <div className="mb-3 flex items-center justify-between pb-4 pt-4 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart?.totals?.total_price}
                    needSplit
                    currencyCode={cart?.totals.currency_code}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="order-2 md:order-1 md:w-2/3">
            <Accordion
              defaultExpandedKeys={['1']}
              disabledKeys={sameBilling ? ['2'] : []}
              selectionMode="multiple"
              className="text-white sm:w-full md:w-2/3"
            >
              <AccordionItem key="1" title="Shipping Info" className="text-white">
                <ShippingForm handleChangeAction={handleChangeShipping} />
                <Checkbox defaultSelected onValueChange={(v) => setSameBilling(v)} className="mt-2">
                  Use same address for billing?
                </Checkbox>
              </AccordionItem>
              <AccordionItem key="2" title="Billing Info" className="text-white">
                <ShippingForm handleChangeAction={handleChangeBilling} />
              </AccordionItem>
              <AccordionItem key="3" title="Payment" className="text-white">
                <div className="flex flex-col justify-between overflow-hidden">
                  <div className="flex flex-col gap-4">
                    <RadioGroup
                      defaultValue={paymentGateways?.[0]?.id}
                      className="flex flex-col gap-4"
                    >
                      {paymentGateways.map((gateway: any) => (
                        <Radio
                          key={gateway.id}
                          value={gateway.id}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              payment_method: e.target.value,
                              payment_title: gateway.title
                            }));
                          }}
                        >
                          {gateway.title}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button className="rounded-md bg-indigo-500 p-2 text-white" onClick={() => router.back()}>
            Back
          </button>
          <button type="submit" className="rounded-md bg-indigo-500 p-2 text-white">
            Next
          </button>
        </div>
      </form>
    </section>
  );
}
