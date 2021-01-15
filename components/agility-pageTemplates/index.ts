import MainTemplate from "./MainTemplate"

interface TemplateObj {
	name:string,
	template:any
}

const allTemplates:[TemplateObj] =[
	{ name: "MainTemplate", template:MainTemplate }
]

const getPageTemplate = (templateName:string):any => {
	const obj = allTemplates.find(m => m.name.toLowerCase() === templateName.toLowerCase())
	if (! obj) return null
	return obj?.template
}

export default getPageTemplate