import React, { FC } from 'react'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'

interface Fields {
}

interface Props {
	fields: Fields,
	customData: any
}

const HomeAllProductsGridModule:FC<Props> = ({fields, customData}) => {

	const categories  = customData.categories
	const newestProducts  = customData.newestProducts
	const brands  = customData.brands

	return (
		<HomeAllProductsGrid
			categories={categories}
			brands={brands}
			newestProducts={newestProducts}
      />
	)
}

export default HomeAllProductsGridModule

