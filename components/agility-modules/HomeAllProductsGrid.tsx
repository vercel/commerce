import React, { FC } from 'react'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import { ModuleWithInit } from '@agility/nextjs'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'


interface ICustomData {

	products: any

}

interface IModule {
}


const HomeAllProductsGridModule: ModuleWithInit<IModule, ICustomData> = ({ customData }) => {


	const products = customData.products

	return (
		<Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
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

export default HomeAllProductsGridModule

