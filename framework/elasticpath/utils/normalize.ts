import {
	gateway as MoltinGateway
} from '@moltin/sdk'
const Moltin = MoltinGateway({
	client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
})
import { Product, ProductImage } from '@commerce/types/product'

const getPrices = (prices:any) => {

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

async function normalizeProductImages (product:any, allImages?:boolean): Promise< ProductImage[]> {

	let fileCalls = [],
			fileData = product.relationships?.files?.data || [];


		for(let {id} of fileData) {
			id && fileCalls.push(Moltin.Files.Get(id));
		}
	

	try{
		let allFileRes = await Promise.allSettled(fileCalls);
		let allFiles:ProductImage[] = [];
		allFileRes.filter((item) => {
			if(item.status === 'fulfilled') {
				let {data} = item.value;
				allFiles.push({
					"url": data?.link?.href || '',
					"alt": data?.file_name || 'no image'
				});
			}
		});
		return allFiles;
	} catch(err) {
		return [{
			"url": '/',
			"alt": 'no image'
		}];
	}
}

export const normalizeProduct = async(product:any, allImages?: boolean) => {
	return {
		"id":  product.id,
		"name": product.attributes?.name,
		"path": "/"+product.attributes?.slug,
		"slug": product.attributes?.slug,
		"price": getPrices(product.attributes?.price)[0],
		"description": product.attributes?.description,
		"images":  await normalizeProductImages(product, allImages),
		"variants": [
			{
				id: '',
				options: [{
					id: '',
					displayName: '',
					values: [{
							label: ''
					}]
				}]
			}
	],
		"options": []
	}
};

const normalizeProducts = async(products:any) => {
	let allProducts:Product[] = [];

	for (let index in products) {
		let product = products[index];
		allProducts.push(await normalizeProduct(product));
	}
	return allProducts;
}

export default normalizeProducts;