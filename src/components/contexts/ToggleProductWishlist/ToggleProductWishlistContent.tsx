import { createContext, useContext } from 'react';
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard';

export type ToggleProductWishlistContextType = {
    itemsWishlist?:ProductCardProps[] | null,
    wishlistIds?: string[],
    totalItems?:number
    mutateProductWishlist: () => void;
};
export const DEFAULT_TOGGLE_PRODUCT_WISHLIST_CONTEXT: ToggleProductWishlistContextType = {
    itemsWishlist:null,
    wishlistIds: undefined,
    totalItems:0,
    mutateProductWishlist: () => { },
};

export const ToggleProductWishlistContext = createContext<ToggleProductWishlistContextType>(DEFAULT_TOGGLE_PRODUCT_WISHLIST_CONTEXT)

export function useToggleWishlist() {
    return useContext(ToggleProductWishlistContext);
}
