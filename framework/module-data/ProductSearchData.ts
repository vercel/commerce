import { getConfig } from '@framework/api'
import getSiteInfo from '@framework/api/operations/get-site-info'

const getCustomInitialProps = async ({ agility, channelName, languageCode }:any) => {

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

export default {
	getCustomInitialProps
}
