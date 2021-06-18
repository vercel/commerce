
import { NextApiRequest, NextApiResponse } from "next"

import commerce from '@lib/api/commerce'
import { truncate } from "fs/promises"

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
		const filter = `${req.query.search}`.toLowerCase()

		// const products = await getProducts({filter})


		const locale = "en-us"
		const preview = false

		const config = { locale, locales: [locale] }
		const { products } = await commerce.getAllProducts({
			variables: { first: 1000 },
			config,
			preview,
		})


		const ret = products
			.filter(p => {
				return filter === ""
					|| p.name.toLowerCase().indexOf(filter) !== -1
					|| p.description.toLowerCase().indexOf(filter) !== -1
			})
			.map(p => {

				return {
					name: p.name,
					imageUrl: p.images[0].url,
					price: p.price,
					id: p.id,
					description: p.description,
					slug: p.path || p.slug
				}
			}).sort((a, b) => {
				if (a.name > b.name) return 1
				return -1
			})

		res.statusCode = 200
		res.json(ret)

	} catch (e) {

		res.statusCode = 500
		res.json({ message: "An error occurred ", error: e })

	}
}


