import {
	gateway as MoltinGateway
} from '@moltin/sdk'
const Moltin = MoltinGateway({
	client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
})

const normalizeProduct = async(products) => {
	let normalizeProducts = []

	const productImageGet = async(fileId) => {
		try {
			let apiImage = await Moltin.Files.Get(fileId);
			return apiImage;
		} catch (error) {

		}
	}

	const normalizeProductImages = async(productId) => {
		let fileId;
		if (productId.relationships.hasOwnProperty("main_image")) {
			fileId = productId.relationships.main_image.data.id;
			let productImageObject = await productImageGet(fileId);
			return productImageObject.data.link.href;
		}
		return '';
	}

	const normalizeProductVariants = (productVariants) => {
		return '';
	}

	for (let index in products) {
		let product = products[index];

		normalizeProducts.push({
			"id": product.hasOwnProperty("id") ? product.id : null,
			"name": product.hasOwnProperty("name") ? product.name : null,
			"vendor": "trika",
			"path": product.hasOwnProperty("name") ? "/" + product.name : null,
			"slug": `${product.hasOwnProperty("slug") ? product.slug:null}`,
			"price": {
				"value": product.hasOwnProperty("price") ? product.price[0].hasOwnProperty("amount") ? product.price[0].amount : null : null,
				"currencyCode": product.hasOwnProperty("price") ? product.price[0].hasOwnProperty("currency") ? product.price[0].currency : null : null
			},
			"descriptionHtml": product.hasOwnProperty("description") ? product.description : null,
			"images": [{
				"url": await normalizeProductImages(product),
				"altText": "Shirt",
				"width": 1000,
				"height": 1000
			}],
			"variants": normalizeProductVariants(product),
			"options": [{
					"id": "option-color",
					"displayName": "Color",
					"values": [{
						"label": "color",
						"hexColors": [
							"#222"
						]
					}]
				},
				{
					"id": "option-size",
					"displayName": "Size",
					"values": [{
							"label": "S"
						},
						{
							"label": "M"
						},
						{
							"label": "L"
						}
					]
				}
			]
		})
	}
	return normalizeProducts;
}

export default normalizeProduct;