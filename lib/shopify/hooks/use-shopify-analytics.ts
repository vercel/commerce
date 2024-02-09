import { usePathname } from 'next/navigation';
import {
  AnalyticsEventName,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  ShopifyAnalyticsProduct,
  ShopifyPageViewPayload,
  ShopifySalesChannel,
  useShopifyCookies
} from '@shopify/hydrogen-react';
import { currency, defaultLanguage } from 'lib/constants';

const SHOP_ID = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID!;

type SendPageViewPayload = {
  pageType?: string;
  products?: ShopifyAnalyticsProduct[];
  collectionHandle?: string;
  searchString?: string;
  totalValue?: number;
  cartId?: string;
};

type SendAddToCartPayload = {
  cartId: string;
  products?: ShopifyAnalyticsProduct[];
  totalValue?: ShopifyPageViewPayload['totalValue'];
};

export function useShopifyAnalytics() {
  const pathname = usePathname();
  // send page view event
  const sendPageView = (
    eventName: keyof typeof AnalyticsEventName,
    payload?: SendPageViewPayload
  ) =>
    sendShopifyAnalytics({
      eventName,
      payload: {
        ...getClientBrowserParameters(),
        hasUserConsent: true,
        shopifySalesChannel: ShopifySalesChannel.headless,
        shopId: `gid://shopify/Shop/${SHOP_ID}`,
        currency,
        acceptedLanguage: defaultLanguage,
        ...payload
      }
    });

  // send add to cart event
  const sendAddToCart = ({ cartId, totalValue, products }: SendAddToCartPayload) =>
    sendPageView(AnalyticsEventName.ADD_TO_CART, {
      cartId,
      totalValue,
      products
    });

  // setup cookies for shopify analytics & enable user consent
  useShopifyCookies({
    hasUserConsent: true
  });

  return {
    sendPageView,
    sendAddToCart,
    pathname
  };
}
