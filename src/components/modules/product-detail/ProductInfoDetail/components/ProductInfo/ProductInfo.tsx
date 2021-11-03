import { Product, ProductVariant } from '@commerce/types/product'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { ButtonCommon, LabelCommon, QuanittyInput } from 'src/components/common'
import { useCartDrawer, useMessage } from 'src/components/contexts'
import { useAddProductToCart } from 'src/components/hooks/cart'
import { IconBuy } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import { getProductVariant } from 'src/utils/funtion.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import { SelectedOptions } from 'src/utils/types.utils'
import ProductDetailOption from '../ProductDetailOption/ProductDetailOption'
import s from './ProductInfo.module.scss'

interface Props {
    productInfoDetail: Product
}

const ProductInfo = ({ productInfoDetail }: Props) => {
    const [option, setOption] = useState({})
    const [quanitty, setQuanitty] = useState(0)
    const [addToCartLoading, setAddToCartLoading] = useState(false)
    const [buyNowLoading, setBuyNowLoading] = useState(false)
	const {showMessageSuccess, showMessageError } = useMessage()
    const [currentVariant, setCurrentVariant] = useState<ProductVariant|undefined>(productInfoDetail.variants?productInfoDetail.variants[0]:undefined)
	useEffect(() => {
		let defaultOption:SelectedOptions = {}
		productInfoDetail.options.map((option)=>{
			defaultOption[option.displayName] = option.values[0].label
			return null
		})
	}, [productInfoDetail])
    
	const {addProduct} = useAddProductToCart()
	const { openCartDrawer } = useCartDrawer()

	function handleAddToCart() {
        if(quanitty>0){
            setAddToCartLoading(true)
            const variant = getProductVariant(productInfoDetail, option)
            if (variant) {
                addProduct({ variantId: variant.id.toString(), quantity: quanitty }, handleAddToCartCallback)
            }else{
            setAddToCartLoading(false)
        }
        }else{
            showMessageError("Quantity Must Be Greater Than 0")
        }
	}
  const handleAddToCartCallback = (isSuccess:boolean,message?:string) => {
		setAddToCartLoading(false)
		if(isSuccess){
			showMessageSuccess("Add to cart successfully!", 4000)
			openCartDrawer && openCartDrawer()
		}else{
			showMessageError(message||"Error")
		}
  }

  const handleBuyNowCallback = (success:boolean,message?:string) => {
		setBuyNowLoading(false)
    if(success){
        Router.push(ROUTE.CHECKOUT)
    }else{
			showMessageError(message||"Error")
		}
  }

  const handleBuyNow = () => {
    if(quanitty>0){
		setBuyNowLoading(true)
		const variant = getProductVariant(productInfoDetail, option)
		if (variant) {
			addProduct({ variantId: variant.id.toString(), quantity: quanitty }, handleBuyNowCallback)
		}else{
			setBuyNowLoading(false)
		}
    }else{
        showMessageError("Quantity Must Be Greater Than 0")
    }
  }

    const handleQuanittyChange = (value:number) => {
        setQuanitty(value)
    }
    const onSelectOption = (value:SelectedOptions) => {
        setOption({...option,...value})
        setCurrentVariant(getProductVariant(productInfoDetail,{...option,...value}))
    }
    return (
        <section className={s.productInfo}>
            <div className={s.info}>
                <LabelCommon shape='half'>{productInfoDetail.collection?.[0]}</LabelCommon>
                <h2 className={s.heading}>{productInfoDetail.name}</h2>
                <div className={s.price}>
                    {
                        currentVariant && currentVariant.customFields &&
                            <div className={s.old}>
                                {
                                    currentVariant.customFields.oldPrice &&
                                        <span className={s.number}>{currentVariant.customFields.oldPrice} {currentVariant.currencyCode}</span>
                                }
                                {
                                    currentVariant.customFields.discount &&
                                        <LabelCommon type='discount'>{currentVariant.customFields.discount}</LabelCommon>
                                }
                            </div>
                    }
                    <div className={s.current}>{currentVariant?currentVariant.price:productInfoDetail.price} {currentVariant?currentVariant.currencyCode:productInfoDetail.currencyCode}</div>
                </div>
                <div className={s.description}>
                    {productInfoDetail.description}
                </div>
                <div className={s.options}>
                    {
                        productInfoDetail.options.map((option)=>{
                            return <ProductDetailOption option={option} onChane={onSelectOption} key={option.displayName}/>
                        })
                    }

                </div>
            </div>
            <div className={s.actions}>
                <QuanittyInput value={quanitty} onChange={handleQuanittyChange}/>
                <div className={s.bottom}>
                    {/* <ButtonCommon size='large'>{LANGUAGE.BUTTON_LABEL.PREORDER}</ButtonCommon> */}
                    <ButtonCommon size='large' onClick={handleBuyNow} loading={buyNowLoading} disabled={addToCartLoading}>{LANGUAGE.BUTTON_LABEL.BUY_NOW}</ButtonCommon>

                    <ButtonCommon size='large' type='light' onClick={handleAddToCart} loading={addToCartLoading} disabled={buyNowLoading}>
                        <span className={s.buttonWithIcon}>
                            <IconBuy /><span className={s.label}>{LANGUAGE.BUTTON_LABEL.ADD_TO_CARD}</span>
                        </span>
                    </ButtonCommon>
                </div>
            </div>
        </section >
    )
}

export default ProductInfo
