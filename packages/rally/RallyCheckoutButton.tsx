import React from 'react'
import { Rally, RallyCheckoutButtonConfig } from '@rallycommerce/checkout-button';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'rally-checkout-button': any;
    }
  }
}
interface RallyCheckoutButtonProps {
  customText?: string | undefined;
  customClass?: string | undefined;
  cart?: any;
}

const RallyCheckoutButton = (props: RallyCheckoutButtonProps) => {
  const customClass = props.customClass || "rally-custom-button-class";
  const cart = props?.cart;

  if (cart) {
    const configuration: RallyCheckoutButtonConfig = {
      cartData: { content: cart, id: cart.id, currency: cart.currency }
    };

    Rally.init('clientId', configuration);
  }

  return (<>
    {<rally-checkout-button suppressHydrationWarning={true} custom-class={customClass} custom-text={props.customText} loader="true">
    </rally-checkout-button>}
  </>)
}

export default RallyCheckoutButton;
