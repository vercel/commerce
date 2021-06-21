import pageTemplates from "components/agility-pageTemplates"
import Head from 'next/head'

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
				<div className="m-8 text-center" >Page not found.</div>
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
				</Head>
				<AgilityPageTemplate {...agilityProps} />
			</>
		)
	} else {
		return null
	}


}

export default AgilityPage