import React, { FC } from 'react'
import { ModuleWithInit } from '@agility/nextjs'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'


interface ICustomData {

	products: any

}

interface IModule {
	numItems: string,
	layout?: 'A' | 'B' | 'C' | 'D' | 'normal'
  	variant?: 'default' | 'filled'
}


const ProductListingModule: ModuleWithInit<IModule, ICustomData> = ( { customData, module, languageCode, isDevelopmentMode, isPreview }) => {


	const products = customData.products

	return (
		<Grid layout={module.fields.layout} variant={module.fields.variant}>
        {products.map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
	)


}

export default ProductListingModule

