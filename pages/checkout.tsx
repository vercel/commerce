import { Layout } from 'src/components/common';
import { CheckoutPage } from 'src/components/modules/checkout';
import { HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';

export default function Checkout() {
  return (
    <>
        <CheckoutPage/>
    </>
  )
}

Checkout.Layout = Layout
