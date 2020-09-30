import {
  CartProvider as CommerceCartProvider,
  useCart as useCommerceCart,
} from 'lib/commerce/cart';

export type Cart = any;

export function CartProvider({ children }) {
  return <CommerceCartProvider>{children}</CommerceCartProvider>;
}

export function useCart() {
  return useCommerceCart<Cart>();
}
