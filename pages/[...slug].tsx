import type {
	GetStaticPathsContext,
	GetStaticPropsContext,
	InferGetStaticPropsType,

} from 'next'


import { Layout } from '@components/common'
import { missingLocaleInPages } from '@lib/usage-warns'

import { getAgilityPageProps, getAgilityPaths } from "@agility/nextjs/node"
import { handlePreview } from "@agility/nextjs"

import { defaultPageProps } from '@lib/defaults'
import AgilityPage from "components/agility-global/AgilityPage"
import { getConfig } from '@framework/api'
import getProduct from '@framework/api/operations/get-product'
import  getModuleData  from "framework/module-data"

import getAllProductPaths from '@framework/api/operations/get-all-product-paths'


export async function getStaticProps({ preview, params, locale, locales, defaultLocale }: GetStaticPropsContext<{ slug: string[] }>) {
	try {
		let productCode: string | null = null

		//check if this page is a product...
		if (params?.slug.length === 2
			&& params?.slug[0] === "product") {
			productCode = params.slug[1]
			params.slug[1] = "product-details"
		}

		//add any global components (header, footer) that need agility data here
		const globalComponents = {
			// "header": GlobalHeader,
			// "footer": GlobalFooter
		}

		const agilityProps = await getAgilityPageProps({ preview, params, locale, getModule: getModuleData, defaultLocale, globalComponents });


		let rebuildFrequency = 10

		let productDetail:any = null

		if (productCode) {
			const config = getConfig({ locale })
			const { product } = await getProduct({
				variables: { slug: productCode },
				config,
				preview,
			})

			if (product !== null) {

				//moderate hack: use the Product as the dynamic page item for product detail pages
				agilityProps.dynamicPageItem = product
				rebuildFrequency = 60 * 60 //once per hour for products
			} else {
				throw new Error(`Product not found`)
			}
		}

		if (!agilityProps) {
			// We throw to make sure this fails at build time as this is never expected to happen
			throw new Error(`Page not found`)
		}

		return {
			props: { ...defaultPageProps, agilityProps },
			revalidate: rebuildFrequency
		}
	} catch (err) {
		var e = new Error();
		const st = e.stack;

		console.log("Error getting page props", params, err)

		return {
			props: {
				error: `Params: ${params}, Error: ${err}, Stack: ${st}`,
				header: null,
				agilityProps: null
			},
			revalidate: 60000
		}
	}
}

export async function getStaticPaths({ defaultLocale, locales }: GetStaticPathsContext) {

	//get the paths configured in agility
	let agilityPaths = await getAgilityPaths({ preview: false, defaultLocale, locales })

	//remove product/product-details from the agility paths (special details page...)
	agilityPaths = agilityPaths.filter(p => p !== "/product/product-details")

	//get the product paths from the commerce api
	const { products } = await getAllProductPaths()
	const productPaths = products.map(p => `/product${p.node.path}`)

	const paths = [...agilityPaths, ...productPaths]

	return {
		paths,
		fallback: true,
	}
}

export default function Pages(props: InferGetStaticPropsType<typeof getStaticProps>) {

	return (
		<AgilityPage  {...props} />
	)
}

Pages.Layout = Layout
