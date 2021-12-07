import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { ButtonCommon, ModalInfo } from "src/components/common"
import Link from 'next/link'
import s from './ReOrder.module.scss'
import { OrderLine, AddItemToOrderInput, AddItemToOrderResult} from "@framework/schema"
import { useAddMutiProductsToCart } from 'src/components/hooks/cart'
import { useCartDrawer, useMessage } from 'src/components/contexts'
import { getDetailErrorMessage } from "src/components/common/RecipeDetail/components/RecipeIngredient/RecipeIngredient"
import { useModalCommon } from "src/components/hooks"

interface ReOrderProps {
    products?: OrderLine[];
    visible: boolean;
    showModelError?:()=>void,
    messageErr?: (value?:React.ReactNode)=>void
}

const ReOrder = ({products, visible=false, showModelError, messageErr} : ReOrderProps) => {
    const { addProductsToCart, loading } = useAddMutiProductsToCart();
    const { showMessageSuccess, showMessageError } = useMessage()
    const { openCartDrawer } = useCartDrawer()


    function reOrder(products: OrderLine[]){
        console.log(products)
        const input = products.map(item => {
            return {
                productVariantId: item.productVariant.id,
                quantity: item.quantity
            } as AddItemToOrderInput
        })
        addProductsToCart({ input }, handleBuyAllCallback)
    }
    function handleBuyAllCallback(isSuccess: boolean, rs?: AddItemToOrderResult[] | string){

        if (isSuccess) {
            showMessageSuccess("Re order successfully!")
            openCartDrawer()

        } else if (typeof (rs) === 'string') {
            if(rs.includes('No ProductVariant with the id')){
                showMessageError("Can't re-order. Some products in this order don't exist.");
            }
        } else {
            if(messageErr){
                messageErr(getDetailErrorMessage(products, rs as AddItemToOrderResult[]))
            }
            if(showModelError){
                showModelError();
            }
            openCartDrawer();
        }
    }

    return (
        <>
        <div className={classNames(s.reOrder, {
            [s.visible]: visible
        })}>
            <div onClick={()=>reOrder(products || [])}>Re-Order</div>
        </div>
       
        </>
    )
}

export default ReOrder