import { LayoutCheckout } from 'src/components/common';
import CheckoutSuccess from 'src/components/modules/checkout/CheckoutSuccess/CheckoutSuccess';

export default function Checkout() {
  return (
    <>
      <CheckoutSuccess />
    </>
  )
}

Checkout.Layout = LayoutCheckout
