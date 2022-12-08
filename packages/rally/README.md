
## Rally <sub><sup>♥</sup></sub> Next.js

To successfully integrate the Rally Checkout Button follow the steps below.
#### **1. Install the Rally Checkout Button**

```bash
npm install @rallycommerce/checkout-button
```

<br />

#### **2. Create a Rally Checkout Button component**

Create a `RallyCheckoutButton.tsx` component in the project with the following content 👇. Structure example 👉 `lib/rally/RallyCheckoutButton.tsx`

```javascript
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
```

<br />

#### **3. Use the Rally Checkout Button component**

The component can now be imported (ex. on the cart page) like this 👇.

```javascript
import dynamic from 'next/dynamic';
const RallyCheckoutButton = dynamic(() => import('@lib/rally/RallyCheckoutButton'), {
  ssr: false,
})

import { Context } from '../../lib/xy/storefront-data-hooks/src/Context'; 
const { cart } = useContext(Context)


 <RallyCheckoutButton cart={cart} customText="Custom text" customClass="custom-css-class"></RallyCheckoutButton>

```

To learn more about Rally's Checkout Button capabilities visit our [Developer's portal](https://developers.rallyon.com/docs/jssdk/checkout-button/integrating-the-checkout-button/).