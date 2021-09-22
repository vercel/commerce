import { ReactNode, useEffect, useState } from "react";
import { CartDrawerContext } from "./CartDrawerContext";

type Props = {
    children: ReactNode;
};

export function CartDrawerProvider({ children }: Props) {
    const [visible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        const bodyElement = document.getElementsByTagName('body')[0]
        if (bodyElement) {
            if (visible) {
                bodyElement.style.overflow = 'hidden'
            } else {
                bodyElement.style.overflow = 'auto'
                bodyElement.removeAttribute('scroll')
            }
        }
    }, [visible])

    const closeCartDrawer = () => {
        setVisible(false);
    };

    const openCartDrawer = () => {
        setVisible(true);
    };

    const toggleCartDrawer = () => {
        setVisible(!visible);
    };
    
    return (
        <>
            <CartDrawerContext.Provider value={{cartVisible: visible, closeCartDrawer, openCartDrawer, toggleCartDrawer}}>
                {children}
            </CartDrawerContext.Provider>
        </>
    );
}