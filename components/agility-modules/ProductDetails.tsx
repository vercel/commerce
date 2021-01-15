import React, { FC } from 'react'
import { Hero } from '@components/ui'
import * as AgilityTypes from "@agility/types"
import { GetProductResult } from '@framework/api/operations/get-product'
import { ProductView } from '@components/product'

interface Fields {
}

interface Props {
	fields: Fields,
	dynamicPageItem:any
  }

const HeroModule:FC<Props> = ({fields, dynamicPageItem}) => {

	return (
		<ProductView product={dynamicPageItem} />
	)
}

export default HeroModule

