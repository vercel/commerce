import commerce from '@lib/api/commerce'

const getCustomInitialProps = async ({ agility, channelName, languageCode }:any) => {

	//TODO: pass the locale and preview mode as props...

	const locale = "en-US"
	const preview = false
	const config = { locale, locales: [locale] }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })

  const { categories, brands } = await siteInfoPromise
  return {
      categories,
      brands,
  }



}

export default {
	getCustomInitialProps
}
