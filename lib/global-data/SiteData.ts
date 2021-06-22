import { ComponentWithInit } from "@agility/nextjs"
import commerce from '@lib/api/commerce'

interface ICustomData {
	name: any,
	logo: any,
	links: any[]
}

const SiteData:ComponentWithInit<ICustomData> = ({ globalData, sitemapNode, page }) => {
	return null
}

SiteData.getCustomInitialProps = async function ({ agility, languageCode, channelName }) {
	// set up api
	const api = agility;

	// set up content item
	let contentItem = null;

	// set up links
	let links = [];

	let categoryLinks = []



	try {
		// try to fetch our site header
		let header = await api.getContentList({
			referenceName: "sitedata",
			languageCode: languageCode,
			take: 1
		});

		// if we have a header, set as content item
		if (header && header.items.length > 0) {
			contentItem = header.items[0];

			// else return null
		} else {
			throw new Error("The Site Data item did not have any content.")
		}
	} catch (error) {
		throw new Error(`Could not load site data item: ${error}`)
	}

	try {
		// get the nested sitemap
		let sitemap = await api.getSitemapNested({
			channelName: channelName,
			languageCode: languageCode,
		});

		// grab the top level links that are visible on menu
		links = sitemap
			.filter((node:any) => node.visible.menu)
			.map((node:any) => {
				return {
					name: node.menuText || node.title,
					url: node.path,
				};
			});
	} catch (error) {
		throw new Error(`Could not load nested sitemap: ${error}`)
	}

	try {

		const locale = "en-US"
		const preview = false
		const config = { locale, locales: [locale] }

		const siteInfoPromise = commerce.getSiteInfo({ config, preview })
		const { categories, brands } = await siteInfoPromise

		categoryLinks = categories

	} catch (error) {
		throw new Error(`Could not load ecommerce categories: ${error}`)
	}

	// return clean object...
	return {
		name: contentItem.fields.name,
		logo: contentItem.fields.logo,
		links,
		categoryLinks
	};
};


export default SiteData