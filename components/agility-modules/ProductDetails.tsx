import React, { FC } from 'react'
import { Hero } from '@components/ui'
import * as AgilityTypes from "@agility/types"
import { GetProductResult } from '@framework/api/operations/get-product'
import { ProductView } from '@components/product'
import { Module } from '@agility/nextjs'

interface Fields {
}


const HeroModule:Module<Fields> = ({ dynamicPageItem }) => {
	const product:any = dynamicPageItem
	return (
		<ProductView product={product} />
	)
}

export default HeroModule

