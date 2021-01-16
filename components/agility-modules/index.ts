import { FC } from "react"
import * as AgilityTypes from "@agility/types"
import RichTextArea from "./RichTextArea"
import BestsellingProducts from "./BestsellingProducts"
import ProductDetails from "./ProductDetails"
import FeaturedProducts from "./FeaturedProducts"
import ProductListing from "./ProductListing"
import ProductSearch from "./ProductSearch"
import Hero from "./Hero"
import HomeAllProductsGrid from "./HomeAllProductsGrid"
import Cart from "./Cart"
import Orders from "./Orders"
import Profile from "./Profile"
import Wishlist from "./Wishlist"


const allModules = [
	{ name: "RichTextArea", module: RichTextArea },
	{ name: "BestsellingProducts", module: BestsellingProducts },
	{ name: "FeaturedProducts", module: FeaturedProducts },
	{ name: "ProductListing", module: ProductListing },
	{ name: "ProductSearch", module: ProductSearch },
	{ name: "Hero", module: Hero },
	{ name: "ProductDetails", module: ProductDetails },
	{ name: "HomeAllProductsGrid", module: HomeAllProductsGrid },
	{ name: "Cart", module: Cart },
	{ name: "Orders", module: Orders },
	{ name: "Profile", module: Profile},
	{ name: "Wishlist", module: Wishlist}
]

/**
 * Find the component for a module by name.
 * @param moduleName
 */
const getModule = (moduleName: string): any | null => {
	const obj = allModules.find(m => m.name.toLowerCase() === moduleName.toLowerCase())
	if (!obj) return null
	return obj.module
}

export default getModule
