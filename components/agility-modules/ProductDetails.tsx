import React, { FC } from 'react'

import { ProductView } from '@components/product'
import { Module, ModuleWithInit } from '@agility/nextjs'

interface IFields {
}
interface ICustomData {
	products: any
}


const ProductDetails:ModuleWithInit<IFields, ICustomData> = ({ dynamicPageItem, customData }) => {
	const product:any = dynamicPageItem

	const relatedProducts:[] = customData.products


	return (
		<ProductView product={product} relatedProducts={relatedProducts} />
	)
}

export default ProductDetails

