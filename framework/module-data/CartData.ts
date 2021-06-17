import commerce from '@lib/api/commerce'

const getCustomInitialProps = async function ({   }):Promise<{pages:any, categories: any}> {
	const languageCode = "en-us"
	const preview = false
	const config = { locale: languageCode, locales: [languageCode] }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  return {
     pages, categories
  }

}

export default {getCustomInitialProps}