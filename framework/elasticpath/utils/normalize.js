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
			console.error(fileId, error);
		}
	}

	const getPrices = (prices) => {

		if(!prices) {
			return [{
				"value": 0,
				"currencyCode": 'USD'
			}];
		}

		let allPrices = []
		for(let key in prices) {
			allPrices.push({
				"value": prices[key].amount/100,
				"currencyCode": key
			})
		}
		return allPrices
	} 

	const normalizeProductImages = async(productId) => {
		let fileId = productId.relationships?.files?.data[0]?.id;
		if (fileId) {
			let productImageObject = await productImageGet(fileId);
			return productImageObject?.data?.link?.href || '/assets/lightweight-jacket-0.png';
		}
		return '';
	}

	for (let index in products) {
		let product = products[index];
		
		normalizeProducts.push({
			"id":  product.id,
			"name": product.attributes?.name,
			"vendor": "trika",
			"path": "/"+product.attributes?.slug,
			"slug": product.attributes?.slug,
			"price": getPrices(product.attributes?.price)[0],
			"descriptionHtml": product.attributes?.description,
			"images": [{
				"url": await normalizeProductImages(product),
				"altText": "Shirt",
				"width": 1000,
				"height": 1000
			}],
			"variants": [{
				"options": []
			}],
			"options": []
		})
	}
	return normalizeProducts;
}

export default normalizeProduct;