import commerce from '@lib/api/commerce'

const getCustomInitialProps = async function ({ item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem }: any) {
	//TODO: pass the locale and preview mode as props...

	const locale = "en-US"
	const preview = false

	const numItems = parseInt(item.fields.numItems) || 10

	const config = { locale, locales: [locale] }
	const productsPromise = commerce.getAllProducts({
		variables: { first: numItems },
		config,
		preview,
		// Saleor provider only
		...({ featured: true } as any),
	})

	const { products } = await productsPromise

	return {
		products
	}

}

export default { getCustomInitialProps }