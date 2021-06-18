import React, { FC } from 'react'
import Search from '@components/search'
import { ModuleWithInit } from '@agility/nextjs'

interface ICustomData {
	categories: any
	brands: any
}

interface IModule {
}


const ProductSearch: ModuleWithInit<IModule, ICustomData> = ({ customData }) => {

	const categories:[any]  = customData.categories
	const brands:[any]  = customData.brands

	return <Search brands={brands} categories={categories} pages={[]} />

}



export default ProductSearch