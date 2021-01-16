import { getConfig } from '@framework/api'
import getSiteInfo from '@framework/api/operations/get-site-info'

const ProductSearchData = async function ({ item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem }: any) {
	//TODO: pass the locale and preview mode as props...

	const locale = "en-US"
	const preview = false

	const config = getConfig({ locale })
	const { categories, brands } = await getSiteInfo({ config, preview })

	return {
		categories,
		brands
	}


}

export default ProductSearchData