import { getConfig } from '@framework/api'
import getSiteInfo from '@framework/api/operations/get-site-info'
import getAllProducts from '@framework/api/operations/get-all-products'



import rangeMap from '@lib/range-map'

const nonNullable = (v: any) => v

const HomeAllProductsGridData = async function ({ item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem }: any) {
	//TODO: pass the locale and preview mode as props...

	const locale = "en-US"
	const preview = false


	const config = getConfig({ locale })
	const { categories, brands } = await getSiteInfo({ config, preview })

	// Get Best Newest Products
	const { products: newestProducts } = await getAllProducts({
		variables: { field: 'newestProducts', first: 12 },
		config,
		preview,
	  })


	return {
		newestProducts: newestProducts,
		categories,
		brands
	}


}

export default HomeAllProductsGridData