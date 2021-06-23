import RichTextArea from "./RichTextArea"
import ProductMarquee from "./ProductMarquee"
import ProductDetails from "./ProductDetails"

import ProductListing from "./ProductListing"
import ProductSearch from "./ProductSearch"
import Hero from "./Hero"
import HomeAllProductsGrid from "./ProductListing"
import Cart from "./Cart"
import Orders from "./Orders"
import Profile from "./Profile"
import Wishlist from "./Wishlist"
import BlogPostListing from "./BlogPostListing"
import BlogPostDetails from "./BlogPostDetails"
import FeaturedProduct from "./FeaturedProduct"


const allModules = [
	{ name: "RichTextArea", module: RichTextArea },
	{ name: "ProductMarquee", module: ProductMarquee },
	{ name: "ProductListing", module: ProductListing },
	{ name: "ProductSearch", module: ProductSearch },
	{ name: "Hero", module: Hero },
	{ name: "ProductDetails", module: ProductDetails },
	{ name: "HomeAllProductsGrid", module: HomeAllProductsGrid },
	{ name: "Cart", module: Cart },
	{ name: "Orders", module: Orders },
	{ name: "Profile", module: Profile },
	{ name: "Wishlist", module: Wishlist },
	{ name: "BlogPostListing", module: BlogPostListing },
	{ name: "BlogPostDetails", module: BlogPostDetails },
	{ name: "FeaturedProduct", module: FeaturedProduct }

]

/**
 * Find the component for a module by name.
 * @param moduleName
 */
export const getModule = (moduleName: string): any | null => {
	const obj = allModules.find(m => m.name.toLowerCase() === moduleName.toLowerCase())
	if (!obj) return null
	return obj.module
}
