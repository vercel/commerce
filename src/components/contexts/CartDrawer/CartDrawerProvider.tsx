import { ReactNode, useEffect, useState } from "react";
import { useGetActiveOrder, useRecommendedProductsInCart } from "src/components/hooks/cart";
import { CartDrawerContext } from "./CartDrawerContext";

type Props = {
    children: ReactNode;
};

export function CartDrawerProvider({ children }: Props) {
    const [visible, setVisible] = useState<boolean>(false);
    const { mutate: mutateGetActiveOrder } = useGetActiveOrder()
    const { mutate: mutateRecommendedProductsInCart } = useRecommendedProductsInCart()

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

    useEffect(() => {
        if (visible) {
            mutateGetActiveOrder()
            mutateRecommendedProductsInCart()
        }
    }, [visible, mutateGetActiveOrder, mutateRecommendedProductsInCart])

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
            <CartDrawerContext.Provider value={{ cartVisible: visible, closeCartDrawer, openCartDrawer, toggleCartDrawer }}>
                {children}
            </CartDrawerContext.Provider>
        </>
    );
}