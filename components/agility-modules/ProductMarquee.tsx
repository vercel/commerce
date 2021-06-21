import React, { FC } from 'react'

import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import { ModuleWithInit } from '@agility/nextjs'

interface ICustomData {
	products: any
}

interface IModule {
}


const ProductMarqueeModule: ModuleWithInit<IModule, ICustomData> = ({ customData }) => {

	const products = customData.products

	return (
		<Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
	)
}


export default ProductMarqueeModule

