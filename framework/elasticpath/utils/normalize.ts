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
			fileData = product?.relationships?.files?.data || [];


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

const getVariants = (variations: any) => {

	let allVariants: any = [
		{
			"id": '',
			"options": []
		},
		{
			"id": '',
			"options": []
		}
	]

	if(variations){
		for(let i in variations){
			if(variations[i] !== 'undefined'){
				if(variations[i].name === 'Color'){
					allVariants[i].id = variations[i].id;
					variations[i].options.map((opt: any) => {
						allVariants[i].options.push({
							"id": opt.id,
							"displayName": opt.name,
							"values": [{
								"label": opt.name.toLowerCase(),
								"hexColors": [opt.name]
							}]
						})
					})
				}	
				if(variations[i].name === 'Size'){
					allVariants[i].id = variations[i].id;
					variations[i].options.map((opt: any) => {
						allVariants[i].options.push({
							"id": opt.id,
							"displayName": opt.name,
							"values": [{
								"label": opt.name.length > 2 ? opt.name.slice(0, 1) : opt.name
							}]
						})
					})
				}	
			}
		}
	}
	return allVariants
}

const getOptions = (variations: any) => {
	let allOptions: any = [
		{
			"id": '',
			"displayName": '',
			"values": []
		},
		{
			"id": '',
			"displayName": '',
			"values": []
		}
	]

	if(variations){
		for(let i in variations){
			if(variations[i] !== 'undefined'){
				variations[i].options.map((opt: any) => {
					if(variations[i].name === 'Color'){
						allOptions[i].id = variations[i].id;
						allOptions[i].displayName = variations[i].name;
						
						allOptions[i].values.push({
							"label": opt.name.toLowerCase(),
							"hexColors": [opt.name]
						})
					}
					if(variations[i].name === 'Size'){
						allOptions[i].id = variations[i].id;
						allOptions[i].displayName = variations[i].name;
						
						allOptions[i].values.push({
							"label": opt.name.slice(0, 1)
						})
					}
				})
			}
		}
		return allOptions;
	}
}

export const normalizeProduct = async(product:any, allImages?: boolean) => {
	let emptyVariant: any = [
		{
			"id": '',
			"options": []
		}
	]
	let emptyOption: any = []
	
	return {
		"id":  product?.id,
		"name": product?.attributes?.name,
		"path": "/"+product?.attributes?.slug,
		"slug": product?.attributes?.slug,
		"price": getPrices(product?.attributes?.price)[0],
		"description": product?.attributes?.description,
		"images":  await normalizeProductImages(product, allImages),
		"variants": (product?.meta?.variations) ? getVariants(product?.meta?.variations) : emptyVariant,
		"options": (product?.meta?.variations) ? getOptions(product?.meta?.variations) : emptyOption
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