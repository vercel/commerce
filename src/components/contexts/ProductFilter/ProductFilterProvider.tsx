import { ReactNode, useState } from "react";
import { ProductFilterContext } from "./ProductFilterContext";

type Props = {
    children: ReactNode;
};

export function ProductFilterProvider({ children }: Props) {
    const [visible, setVisible] = useState<boolean>(false);

    const closeProductFilter = () => {
        setVisible(false);
    };

    const openProductFilter = () => {
        setVisible(true);
    };

    const toggleProductFilter = () => {
        setVisible(!visible);
    };
    
    return (
        <>
            <ProductFilterContext.Provider value={{productFilterVisible: visible, closeProductFilter, openProductFilter, toggleProductFilter}}>
                {children}
            </ProductFilterContext.Provider>
        </>
    );
}