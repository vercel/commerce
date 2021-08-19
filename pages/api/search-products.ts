
import { NextApiRequest, NextApiResponse } from "next"

import commerce from '@lib/api/commerce'
import truncate from "truncate-html";


import { Product } from '@commerce/types/product'


const SORT: { [key: string]: string | undefined } = {
	latest: 'id',
	trending: 'total_sold',
	price: 'price',
}

const LIMIT = 12

// Return current cart info
const getProducts = async ({ search, config }: any) => {
	// Use a dummy base as we only care about the relative path
	const url = new URL('/v3/catalog/products', 'http://a')

	url.searchParams.set('is_visible', 'true')
	url.searchParams.set('limit', String(LIMIT))

	if (search) url.searchParams.set('keyword', search)

	//   if (categoryId && Number.isInteger(Number(categoryId)))
	//     url.searchParams.set('categories:in', String(categoryId))

	//   if (brandId && Number.isInteger(Number(brandId)))
	//     url.searchParams.set('brand_id', String(brandId))

	//   if (sort) {
	//     const [_sort, direction] = sort.split('-')
	//     const sortValue = SORT[_sort]

	//     if (sortValue && direction) {
	//       url.searchParams.set('sort', sortValue)
	//       url.searchParams.set('direction', direction)
	//     }
	//   }

	// We only want the id of each product
	url.searchParams.set('include_fields', 'id')

	const commerceConfig = commerce.provider.config

	const { data } = await commerceConfig.storeApiFetch(
		url.pathname + url.search
	)

	const ids = data.map((p: any) => String(p.id))
	const found = ids.length > 0

	// We want the GraphQL version of each product
	const graphqlData = await commerce.getAllProducts({
		variables: { first: LIMIT, ids },
		config,
	})

	// Put the products in an object that we can use to get them by id
	const productsById = graphqlData.products.reduce((prods: any, p: any) => {
		prods[Number(p.id)] = p
		return prods
	}, {})

	const products: Product[] = found ? [] : graphqlData.products

	// Populate the products array with the graphql products, in the order
	// assigned by the list of entity ids
	ids.forEach((id: any) => {
		const product = productsById[id]
		if (product) products.push(product)
	})

	return products
}


export default async (req: NextApiRequest, res: NextApiResponse) => {


	//cors stuff
	res.setHeader('Access-Control-Allow-Credentials', "true")
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)

	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}

	try {
		const search = `${req.query.search}`.toLowerCase()

		// const products = await getProducts({filter})


		const locale = "en-us"
		const preview = false

		const config = { locale, locales: [locale] }

		// const { products } = await commerce.getAllProducts({
		// 	variables: { first: 100 },
		// 	config,
		// 	preview,
		// })


		// const ret = products
		// 	.filter(p => {
		// 		return filter === ""
		// 			|| p.name.toLowerCase().indexOf(filter) !== -1
		// 			|| p.description.toLowerCase().indexOf(filter) !== -1
		// 	})
		// 	.map(p => {

		// 		return {
		// 			name: p.name,
		// 			imageUrl: p.images[0].url,
		// 			price: p.price,
		// 			id: p.id,
		// 			description: p.description,
		// 			slug: p.path || p.slug
		// 		}
		// 	}).sort((a, b) => {
		// 		if (a.name > b.name) return 1
		// 		return -1
		// 	})

		// res.statusCode = 200
		// res.json(ret)

		const products = (await getProducts({ search, config }))
			.map(p => {

				const description = truncate(p.description, {
					length: 500,
					decodeEntities: true,
					stripTags: true,
					reserveLastWord: true,
				});

				return {
					name: p.name,
					imageUrl: p.images[0].url,
					price: p.price,
					id: p.id,
					description,
					slug: p.path || p.slug
				}
			}).sort((a, b) => {
				if (a.name > b.name) return 1
				return -1
			})

		res.setHeader("Content-Type", "application/json")
		res.statusCode = 200
		res.json(products)



	} catch (e) {

		res.statusCode = 500
		res.json({ message: "An error occurred ", error: e })

	}
}


