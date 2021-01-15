import React, { Component, useState } from 'react';
import Link from 'next/link';

import {expandLinkedList} from "@agility/utils"

const GlobalFooter = (props) => {
	const { globalFooterProps } = props;

	return (
		<div>FOOTER</div>
	)

}

GlobalFooter.getCustomInitialProps = async function ({agility, languageCode, channelName}) {

	const api = agility;

	let contentItem = null;

	//hack
	return {}

	try {
		//get the global footer
		let contentItemList = await api.getContentList({
			referenceName: "globalfooter",
			languageCode: languageCode
		});

		if (contentItemList?.length > 0) {
			contentItem = contentItemList[0];

			//resolve the links...
			contentItem = await expandLinkedList({ agility, contentItem, languageCode,
				fieldName: "column2Links",
				sortIDField: "column2SortIDs"
			})

			contentItem = await expandLinkedList({ agility, contentItem, languageCode,
				fieldName: "column3Links",
				sortIDField: "column3SortIDs"
			})

			contentItem = await expandLinkedList({ agility, contentItem, languageCode,
				fieldName: "column4Links",
				sortIDField: "column4SortIDs"
			})

		}


	} catch (error) {
		if (console) console.error("Could not load global footer item.", error);
	}

	//return a clean object...
	return {
		siteName: contentItem.fields.siteName,
		siteDescription: contentItem.fields.siteDescription,
		column2Title: contentItem.fields.column2Title,
		column3Title: contentItem.fields.column3Title,
		column4Title: contentItem.fields.column4Title,
		facebookURL: contentItem.fields.facebookURL,
		twitterURL: contentItem.fields.twitterURL,
		youTubeURL: contentItem.fields.youTubeURL,
		column2Links: contentItem.fields.column2Links.map(link => link.fields.link),
		column3Links: contentItem.fields.column3Links.map(link => link.fields.link),
		column4Links: contentItem.fields.column4Links.map(link => link.fields.link),

	}
}


export default GlobalFooter