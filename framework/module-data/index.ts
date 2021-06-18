import BestsellingProductsData from "./BestsellingProductsData"
import CartData from "./CartData"
import FeaturedProductsData from "./FeaturedProductsData"
import HomeAllProductsGridData from "./HomeAllProductsGridData"
import ProductSearchData from "./ProductSearchData"
import ProductDetailsData from "./ProductDetailsData"

const allModules:any =[
	{ name: "BestsellingProducts", init: BestsellingProductsData },
	{ name: "FeaturedProducts", init: FeaturedProductsData},
	{ name: "HomeAllProductsGrid", init: HomeAllProductsGridData},
	{ name: "ProductSearch", init: ProductSearchData},
	{ name: "Cart", init: CartData},
	{ name: "ProductDetails", init: ProductDetailsData}
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
