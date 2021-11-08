import { AddItemToOrderInput, AddItemToOrderResult } from '@framework/schema'
import React from 'react'
import ButtonCommon from 'src/components/common/ButtonCommon/ButtonCommon'
import HeadingCommon from 'src/components/common/HeadingCommon/HeadingCommon'
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard'
import ProductCarousel from 'src/components/common/ProductCarousel/ProductCarousel'
import ViewAllItem from 'src/components/common/ViewAllItem/ViewAllItem'
import { useAddMutiProductsToCart } from 'src/components/hooks/cart'
import { ROUTE } from 'src/utils/constanst.utils'
import s from './RecipeIngredient.module.scss'

interface Props {
    className?: string
    children?: any,
    data: ProductCardProps[],
}

// function getDetailErrorMessage(input: MutationAddItemsToOrderArgs, data: AddItemsToOrderMutation) {
//     let content = '' as React.ReactNode
//     data.addItemsToOrder.map(item => {
//       if (item.__typename !== 'Order') {
//         content += `Fail to add product `
//       }
//     })

//   }

const RecipeIngredient = ({ data }: Props) => {
    const { addProductsToCart } = useAddMutiProductsToCart()

    const handleBuyAll = () => {
        console.log("RecipeIngredient ", data)
        const input = data.map(item => {
            return {
                productVariantId: item.productVariantId,
                quantity: 1, // TODO: quanity get from recipe data
            } as AddItemToOrderInput
        })
        addProductsToCart({input}, handleBuyAllCallback)
    }

    const handleBuyAllCallback = (isSuccess: boolean, message?: AddItemToOrderResult[] | string) => {
        console.log("RecipeIngredient ", data)
        
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
                <ButtonCommon type='ghost' size='large' onClick={handleBuyAll}>Buy all</ButtonCommon>
            </div>
        </section>
    )
}

export default RecipeIngredient
