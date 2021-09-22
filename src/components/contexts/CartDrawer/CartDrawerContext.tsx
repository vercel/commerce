import { createContext, useContext } from 'react';

export type CartDrawerContextType = {
    cartVisible: boolean;
    toggleCartDrawer: (visible?: boolean) => void;
    openCartDrawer: () => void;
    closeCartDrawer: () => void;
};
export const DEFAULT_CART_DRAWER_CONTEXT: CartDrawerContextType = {
    cartVisible: false,
    toggleCartDrawer: () => { },
    openCartDrawer: () => { },
    closeCartDrawer: () => { },
};

export const CartDrawerContext = createContext<CartDrawerContextType>(DEFAULT_CART_DRAWER_CONTEXT)

export function useCartDrawer() {
    return useContext(CartDrawerContext);
}
