import { createContext, useContext } from 'react';

export type ProductFilterContextType = {
    productFilterVisible: boolean;
    toggleProductFilter: (visible?: boolean) => void;
    openProductFilter: () => void;
    closeProductFilter: () => void;
};
const DEFAULT_VALUE: ProductFilterContextType = {
    productFilterVisible: false,
    toggleProductFilter: () => { },
    openProductFilter: () => { },
    closeProductFilter: () => { },
};

export const ProductFilterContext = createContext<ProductFilterContextType>(DEFAULT_VALUE)

export function useProductFilter() {
    return useContext(ProductFilterContext);
}
