import React, { Component, useState } from 'react';
import Link from 'next/link';


const GlobalHeader = (props) => {
	const { globalHeaderProps, sitemapNode, page } = props;

	const globalHeaderItem = globalHeaderProps.contentItem;
	let siteName = globalHeaderItem?.fields.siteName || "Agility Starter 2020"
	let logo = globalHeaderItem?.fields.logo || nulll

	return (
		<div>HEADER</div>
	)

}

GlobalHeader.getCustomInitialProps = async function (props) {

	const api = props.agility;
	const languageCode = props.languageCode;
	const channelName = props.channelName;
	let contentItem = null;
	let links = [];

	//hack
	return {}

	try {
		//get the global header
		let contentItemList = await api.getContentList({
			referenceName: "globalheader",
			languageCode: languageCode
		});

		if (contentItemList && contentItemList.length) {
			contentItem = contentItemList[0];

		}
	} catch (error) {
		if (console) console.error("Could not load global header item.", error);
	}


	try {
		//get the nested sitemap
		let sitemap = await api.getSitemapNested({
			channelName: channelName,
			languageCode: languageCode,
		});

		//grab the top level links that are visible on menu
		links = sitemap
			.filter(node => node.visible.menu)
			.map(node => {
				return {
					text: node.menuText || node.title,
					path: node.path
				}
			})

	} catch (error) {
		if (console) console.error("Could not load nested sitemap.", error);
	}

	return {
		contentItem,
		links
	}
}


export default GlobalHeader