import {
  CartProvider as CommerceCartProvider,
  useCart as useCommerceCart,
} from '../commerce/cart';
import { Cart } from './index';

export function CartProvider({ children }) {
  return <CommerceCartProvider>{children}</CommerceCartProvider>;
}

export function useCart() {
  return useCommerceCart<Cart>();
}
