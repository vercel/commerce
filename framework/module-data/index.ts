import {FC} from "react"
import * as AgilityTypes from "@agility/types"

import BestsellingProductsData from "./BestsellingProductsData"
import FeaturedProductsData from "./FeaturedProductsData"

const allModules:any =[
	{ name: "BestsellingProducts", init: BestsellingProductsData },
	{ name: "FeaturedProducts", init: FeaturedProductsData}
]

/**
 * Find the data method for a module.
 * @param moduleName
 */
const getInitMethod =  (moduleName:string):any => {
	const obj = allModules.find((m: { name: string }) => m.name.toLowerCase() === moduleName.toLowerCase())
	if (!obj) return null
	return obj.init
}

export default getInitMethod
