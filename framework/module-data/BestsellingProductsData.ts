import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'

import rangeMap from '@lib/range-map'

const nonNullable = (v: any) => v

const BestsellingProductsInit = async function ({ item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem }: any) {
	//TODO: pass the locale and preview mode as props...


	const locale = "en-US"
	const preview = false

	const config = getConfig({ locale })

	  // Get Best Selling Products
	  const { products: bestSellingProducts } = await getAllProducts({
		variables: { field: 'bestSellingProducts', first: 6 },
		config,
		preview,
	  })

	  // Get Best Newest Products
	  const { products: newestProducts } = await getAllProducts({
		variables: { field: 'newestProducts', first: 12 },
		config,
		preview,
	  })

	// These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { bestSelling } = (() => {

    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

	return {
		bestSelling
	}


}

export default BestsellingProductsInit