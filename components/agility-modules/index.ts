import {FC} from "react"
import * as AgilityTypes from "@agility/types"
import RichTextArea from "./RichTextArea"
import BestsellingProducts from "./BestsellingProducts"
import ProductDetails from "./ProductDetails"
import FeaturedProducts from "./FeaturedProducts"
import ProductListing from "./ProductListing"
import Hero from "./Hero"


const allModules =[
	{ name: "RichTextArea", module:RichTextArea },
	{ name: "BestsellingProducts", module: BestsellingProducts },
	{ name: "FeaturedProducts", module: FeaturedProducts},
	{ name: "ProductListing", module: ProductListing},
	{ name: "Hero", module: Hero},
	{ name: "ProductDetails", module: ProductDetails }
]

/**
 * Find the component for a module.
 * @param moduleName
 */
const getModule =  (moduleName:string):any | null => {
	const obj = allModules.find(m => m.name.toLowerCase() === moduleName.toLowerCase())
	if (!obj) return null
	return obj.module
}

export default getModule
