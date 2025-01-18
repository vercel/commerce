'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Billing } from 'lib/woocomerce/models/billing';
import { Shipping } from 'lib/woocomerce/models/shipping';
import React, { createContext, useContext, useState } from 'react';

type Checkout = {
  shipping: Shipping;
  billing: Billing;
  payment_method: string;
  payment_method_title: string;
};
type CheckoutContextType = {
  checkout: Checkout | undefined;
  setShipping: (shipping: Shipping) => void;
  setBilling: (billing: Billing) => void;
  setPayment: (paymentMethod: string, paymentMethodTitle: string) => void;
};

const initialState: Checkout = {
  shipping: {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    company: ''
  },
  billing: {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    company: '',
    phone: '',
    email: ''
  },
  payment_method: '',
  payment_method_title: ''
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [checkout, setCheckout] = useState<Checkout>(initialState);

  const setShipping = (shipping: Shipping) => {
    setCheckout({ ...checkout, shipping: { ...checkout.shipping, ...shipping } });
  };

  const setBilling = (billing: Billing) => {
    setCheckout({ ...checkout, billing: { ...checkout.billing, ...billing } });
  };

  const setPayment = (paymentMethod: string, paymentMethodTitle: string) => {
    setCheckout({
      ...checkout,
      payment_method: paymentMethod,
      payment_method_title: paymentMethodTitle
    });
  };

  return (
    <NextUIProvider>
      <CheckoutContext.Provider
        value={{
          checkout,
          setShipping,
          setBilling,
          setPayment
        }}
      >
        {children}
      </CheckoutContext.Provider>
    </NextUIProvider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
