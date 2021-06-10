// import { NextApiRequest, NextApiResponse } from "next"
// import getProducts from "../../shopify-api/get-products"



// const searchProducts = async (req:NextApiRequest, res:NextApiResponse) => {

// 	//cors stuff
// 	res.setHeader('Access-Control-Allow-Credentials', "true")
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
// 	)

// 	if (req.method === 'OPTIONS') {
// 		res.status(200).end()
// 		return
// 	}

// 	try {
// 		const filter = req.query.filter ?? ""

// 		const products = await getProducts({filter})

// 		res.statusCode = 200
// 		res.json(products)

// 	} catch (e) {

// 		res.statusCode = 500
// 		res.json({ message: "An error occurred ", error: e })

// 	}
// }


// export default searchProducts