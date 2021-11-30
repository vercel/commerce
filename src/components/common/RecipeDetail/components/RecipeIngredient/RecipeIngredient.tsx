import { AddItemToOrderInput, AddItemToOrderResult, ErrorResult } from '@framework/schema'
import React, { useState } from 'react'
import { ModalInfo } from 'src/components/common'
import ButtonCommon from 'src/components/common/ButtonCommon/ButtonCommon'
import HeadingCommon from 'src/components/common/HeadingCommon/HeadingCommon'
import ProductCarousel from 'src/components/common/ProductCarousel/ProductCarousel'
import ViewAllItem from 'src/components/common/ViewAllItem/ViewAllItem'
import { useCartDrawer, useMessage } from 'src/components/contexts'
import { useModalCommon } from 'src/components/hooks'
import { useAddMutiProductsToCart } from 'src/components/hooks/cart'
import { ErrorMessage } from 'src/domains/enums/ErrorCode'
import { ROUTE } from 'src/utils/constanst.utils'
import { RecipeIngredientProps } from 'src/utils/types.utils'
import s from './RecipeIngredient.module.scss'

interface Props {
    className?: string
    children?: any,
    data: RecipeIngredientProps[],
}

function getDetailErrorMessage(input: RecipeIngredientProps[], data: AddItemToOrderResult[]) {
    const addedItemNames = [] as string[]

    data.map((item: AddItemToOrderResult, index: number) => {
        if (item.__typename === 'Order') {
            addedItemNames.push(input[index].productVariantName || input[index].name || '')
        }
        return null
    })


    return <ul className={s.messageDetail}>
        {
            addedItemNames.length > 0 && <li className={s.success}>Added <b>{addedItemNames.join(", ")}</b> to cart successfully.</li>
        }
        {
            data.map((item: AddItemToOrderResult, index: number) => {
                if (item.__typename !== 'Order') {
                    const message = (item as ErrorResult).message === ErrorMessage.NegativeQuantityError ? 'Out of stock' : (item as ErrorResult).message
                    return <li>Add <b>{input[index].productVariantName}</b> to cart failed with this error message: <div className={s.error}>{message}</div></li>
                }
                return null
            })
        }
    </ul>
}

const RecipeIngredient = ({ data }: Props) => {
    
    const { addProductsToCart, loading } = useAddMutiProductsToCart()
    const { showMessageSuccess, showMessageError } = useMessage()
    const { visible: visibleModalErrorDetail, openModal: openModalErrorDetail, closeModal: closeModalErrorDetail } = useModalCommon({ initialValue: false })
    const [messageError, setMessageError] = useState<React.ReactNode>()
    const { openCartDrawer } = useCartDrawer()

    const handleBuyAll = () => {
        const input = data.map(item => {
            return {
                productVariantId: item.productVariantId,
                quantity: item.quantity
            } as AddItemToOrderInput
        })
        addProductsToCart({ input }, handleBuyAllCallback)
    }

    const handleBuyAllCallback = (isSuccess: boolean, rs?: AddItemToOrderResult[] | string) => {
        if (isSuccess) {
            showMessageSuccess("Add all ingredients to the cart")
            openCartDrawer()

        } else if (typeof (rs) === 'string') {
            showMessageError(rs)
        } else {
            setMessageError(getDetailErrorMessage(data, rs as AddItemToOrderResult[]))
            openModalErrorDetail()
        }
    }

    return (
        <section className={s.recipeIngredient}>
            <div className={s.top}>
                <HeadingCommon>Ingredients</HeadingCommon>
                <div>
                    <ViewAllItem link={ROUTE.PRODUCTS} />
                </div>
            </div>
            <ProductCarousel data={data} itemKey="recipe-ingredient" />
            <div className={s.bottom}>
                <ButtonCommon type='ghost' size='large' onClick={handleBuyAll} loading={loading}>Buy all</ButtonCommon>
            </div>
            <ModalInfo visible={visibleModalErrorDetail} onClose={closeModalErrorDetail}>{messageError}</ModalInfo>
        </section>
    )
}

export default RecipeIngredient
