
## Rally <sub><sup>♥</sup></sub> Next.js

For successfully integrating the Rally checkout button follow the steps bellow.
#### **1. Install the Rally checkout button**

```bash
npm install @rallycommerce/checkout-button
```

<br />

#### **2. Create a Cart Button component**

Create a `CartButton.tsx` component in the project with the following content 👇. Structure example 👉 `lib/rally/CartButton.tsx`

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
interface CartButtonProps {
  customText?: string | undefined;
  customClass?: string | undefined;
  cart?: any;
}

const CartButton = (props: CartButtonProps) => {
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

export default CartButton;
```

<br />

#### **3. Import the Cart Button component**

The component can now be imported (ex. on the cart page) like this 👇.

```javascript
import dynamic from 'next/dynamic';
const CartButton = dynamic(() => import('@lib/rally/CartButton'), {
  ssr: false,
})

import { Context } from '../../lib/xy/storefront-data-hooks/src/Context'; 
const { cart } = useContext(Context)


 <CartButton cart={cart} customText="Custom text" customClass="custom-css-class"></CartButton>

```

To learn more about Rally's checkout button capabilities visit our [Developer's portal](https://developers.rallyon.com/docs/jssdk/checkout-button/integrating-the-checkout-button/).