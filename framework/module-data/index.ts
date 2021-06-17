import BestsellingProductsData from "./BestsellingProductsData"
import FeaturedProductsData from "./FeaturedProductsData"
import HomeAllProductsGridData from "./HomeAllProductsGridData"
import ProductSearchData from "./ProductSearchData"

const allModules:any =[
	{ name: "BestsellingProducts", init: BestsellingProductsData },
	{ name: "FeaturedProducts", init: FeaturedProductsData},
	{ name: "HomeAllProductsGrid", init: HomeAllProductsGridData},
	{ name: "ProductSearch", init: ProductSearchData}
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
