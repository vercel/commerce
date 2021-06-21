import pageTemplates from "components/agility-pageTemplates"
import Head from 'next/head'
import { Text } from '@components/ui'

const AgilityPage = ({ agilityProps, error, revalidate }: { agilityProps: any, error?: any, revalidate?: any }) => {

	if (!agilityProps) {
		console.error(`Page object or template was not found.`)
		return null
	}

	let pageTitle = "Commerce Storefront"

	if (agilityProps.globalData?.sitedata) {
		pageTitle = agilityProps.globalData?.sitedata.name
	}

	if (agilityProps.notFound === true) {
		return (
			<>
				<Head>
					<title>Page Not Found - {pageTitle}</title>
				</Head>
				<div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
					<Text variant="heading">Not Found</Text>
					<Text className="">
						The requested page doesn't exist or you don't have access to it.
					</Text>
				</div>
			</>
		)
	}

	if (agilityProps.pageTemplateName) {

		let AgilityPageTemplate = pageTemplates(agilityProps.pageTemplateName)
		if (!AgilityPageTemplate) {
			console.error(`${agilityProps.pageTemplateName} not found.`)
			return null
		}

		return (
			<>
				<Head>
					<title>{agilityProps.sitemapNode?.title} - {pageTitle}</title>
					<meta name="description" content={agilityProps.page?.seo?.metaDescription} />
					<meta name="generator" content="Agility CMS" />
					<meta name="agility_timestamp" content={new Date().toLocaleString()} />
				</Head>
				<AgilityPageTemplate {...agilityProps} />
			</>
		)
	} else {
		return null
	}


}

export default AgilityPage