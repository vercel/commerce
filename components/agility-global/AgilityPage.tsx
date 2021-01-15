import pageTemplates from "components/agility-pageTemplates"

const AgilityPage = (props:any) => {

	if (!props || !props.pageTemplateName) {
		console.error(`Page object or template was not found.`)
		return null
	}

	let AgilityPageTemplate = pageTemplates(props.pageTemplateName)
	if (! AgilityPageTemplate) {
		console.error(`${props.pageTemplateName} not found.`)
		return null
	}

	return (
		<AgilityPageTemplate {...props} />
	)


}

export default AgilityPage