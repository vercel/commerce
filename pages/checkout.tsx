import { LayoutCheckout } from 'src/components/common';
import { CheckoutPage } from 'src/components/modules/checkout';

export default function Checkout() {
  return (
    <>
        <CheckoutPage/>
    </>
  )
}

Checkout.Layout = LayoutCheckout
