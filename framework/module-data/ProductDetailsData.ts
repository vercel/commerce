import commerce from '@lib/api/commerce'

const getCustomInitialProps = async function ({ item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem }: any) {
	//TODO: pass the locale and preview mode as props...


	const locale = "en-us"
	const preview = false

	const config = { locale, locales: [locale] }
	const productsPromise = commerce.getAllProducts({
		variables: { first: 4 },
		config,
		preview,
	  })


	const { products } = await productsPromise

	return {
		products
	}

}

export default { getCustomInitialProps }