import pageTemplates from "components/agility-pageTemplates"

const AgilityPage = ({ header, agilityProps, error, revalidate }: {header:any, agilityProps: any, error?: any, revalidate?: any}) => {

	if (!agilityProps) {
		console.error(`Page object or template was not found.`)
		return null
	}

	let AgilityPageTemplate = pageTemplates(agilityProps.pageTemplateName)
	if (! AgilityPageTemplate) {
		console.error(`${agilityProps.pageTemplateName} not found.`)
		return null
	}

	return (
		<AgilityPageTemplate {...agilityProps} />
	)


}

export default AgilityPage