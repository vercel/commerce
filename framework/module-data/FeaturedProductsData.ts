import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'



import rangeMap from '@lib/range-map'

const nonNullable = (v: any) => v

const getCustomInitialProps = async function ({ item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem }: any) {
	//TODO: pass the locale and preview mode as props...


	const locale = "en-US"
	const preview = false

	const config = getConfig({ locale })

	// Get Featured Products
	const { products: featuredProducts } = await getAllProducts({
		variables: { field: 'featuredProducts', first: 6 },
		config,
		preview,
	})


	return {
		featured: featuredProducts
	}


}

export default { getCustomInitialProps }