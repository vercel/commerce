import type {
	GetStaticPathsContext,
	GetStaticPropsContext,
	InferGetStaticPropsType,

} from 'next'



import { Layout } from '@components/common'
import { missingLocaleInPages } from '@lib/usage-warns'

import { defaultPageProps } from '@lib/defaults'

import AgilityPage from "components/agility-global/AgilityPage"

import { getConfig } from '@framework/api'
import getProduct from '@framework/api/operations/get-product'

import { getAgilityPageProps, getAgilityPaths } from "framework/agility/agility.node";
import getAllProductPaths from '@framework/api/operations/get-all-product-paths'


export async function getStaticProps({ preview, params, locale }: GetStaticPropsContext<{ slug: string[] }>) {

	let productCode: string | null = null

	//check if this page is a product...
	if (params?.slug.length === 2
		&& params?.slug[0] === "product") {
		productCode = params.slug[1]
		params.slug[1] = "product-details"
	}

	const page = await getAgilityPageProps({ preview, params, locale });

	if (productCode) {
		const config = getConfig({ locale })
		const { product } = await getProduct({
			variables: { slug: productCode },
			config,
			preview,
		})

		if (product !== null) {
			page.dynamicPageItem = product
		} else {
			throw new Error(`Product not found`)
		}
	}

	const pages = await getAgilityPaths()

	if (!page) {
		// We throw to make sure this fails at build time as this is never expected to happen
		throw new Error(`Page not found`)
	}

	return {
		props: { ...defaultPageProps, pages, page },
		revalidate: 60 * 60, // Every hour
	}
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {

	//get the paths configured in agility
	let agilityPaths = await getAgilityPaths()

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

export default function Pages({ page }: InferGetStaticPropsType<typeof getStaticProps>) {

	return (
		<AgilityPage  {...page} />
	)
}

Pages.Layout = Layout
