
import CartData from "./CartData"
import ProductListing from "./ProductListing"
import ProductMarquee from "./ProductMarquee"
import ProductSearchData from "./ProductSearchData"
import ProductDetailsData from "./ProductDetailsData"
import BlogPostListing from "./BlogPostListing"

const allModules:any =[

	{ name: "ProductListing", init: ProductListing},
	{ name: "ProductMarquee", init: ProductMarquee},
	{ name: "ProductSearch", init: ProductSearchData},
	{ name: "Cart", init: CartData},
	{ name: "ProductDetails", init: ProductDetailsData},
	{ name: "BlogPostListing", init: BlogPostListing}
]

/**
 * Find the data method for a module by module reference name.
 * @param moduleName
 */
export default (moduleName:string):any => {
	const obj = allModules.find((m: { name: string }) => m.name.toLowerCase() === moduleName.toLowerCase())
	if (!obj) return null
	return obj.init
}
