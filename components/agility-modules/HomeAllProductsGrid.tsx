import React, { FC } from 'react'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import { ModuleWithInit } from '@agility/nextjs'



interface ICustomData {
	categories: any
	newestProducts: any
	brands: any
}

interface IModule {
}


const HomeAllProductsGridModule: ModuleWithInit<IModule, ICustomData> = ({ customData }) => {

	const categories  = customData.categories
	const newestProducts  = customData.newestProducts
	const brands  = customData.brands

	if (!categories) return <div>No data</div>

	return (
		<HomeAllProductsGrid
			categories={categories}
			brands={brands}
			newestProducts={newestProducts}
      />
	)
}

export default HomeAllProductsGridModule

