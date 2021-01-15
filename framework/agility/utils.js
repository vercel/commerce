const renderHTML = (html) => {
	if (!html) return { __html: "" };
	return { __html: cleanHTML(html) };
}

const cleanHTML = (html) => {
	if (!html) return ""

	//fix '~' in links in HTML
	return html.replace(/href="~\//gi, 'href="/')
}

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}


const expandContentList = async ({ agility, contentItems, languageCode, depth }) => {

	asyncForEach(contentItems, async (contentItem) => {
		await expandContentItem({agility, contentItem, languageCode, depth})
	})

}

const expandContentItem = async ({ agility, contentItem, languageCode, depth = 1 }) => {
	if (!contentItem) return null;



	const api = agility;

	if (depth > 0) {
		//make this work for the .fields or the .customFields property...
		let fields = contentItem.fields;
		if (!fields) fields = contentItem.customFields;

		for (const fieldName in fields) {
			const fieldValue = fields[fieldName];

			if (fieldValue.contentid > 0) {
				//single linked item
				const childItem = await api.getContentItem({ contentID: fieldValue.contentid, languageCode, depth: depth - 1 });
				if (childItem != null) fields[fieldName] = childItem;
			} else if (fieldValue.sortids && fieldValue.sortids.split) {
				//multi linked item
				const sortIDAry = fieldValue.sortids.split(',');
				const childItems = [];
				for (const childItemID of sortIDAry) {
					const childItem = await api.getContentItem({ contentID: childItemID, languageCode, depth: depth - 1 });
					if (childItem != null) childItems.push(childItem);
				}
				fields[fieldName] = childItems;
			}
		}
	}
	return contentItem;
}

const expandLinkedList = async ({ agility, contentItem, languageCode, fieldName, sortIDField  }) => {
	if (!contentItem) return null;

	let fieldObj = contentItem.fields[fieldName]
	if (! fieldObj) throw Error(`The field ${fieldName} was not found on the content item.`)

	const referenceName = fieldObj.referencename
	if (! referenceName) throw Error(`A referencename property was not found on the ${fieldName} value.`)

	//grab the content list...
	let listItems = await agility.getContentList({referenceName, languageCode})
	if (listItems?.length > 0) {
		let sortIDs = contentItem.fields[sortIDField]
		if (sortIDs?.length > 0 && sortIDs?.split) {
			//if we have sort ids, assemble the values in the list based on those...
			const sortIDAry = sortIDs.split(',');
			const sortedItems = [];
			for (const idStr of sortIDAry) {
				const childContentID = parseInt(idStr)

				const childItemIndex = listItems.findIndex(item => item.contentID === childContentID)
				if (childItemIndex >= 0) {
					sortedItems.push(listItems[childItemIndex]);
					listItems.splice(childItemIndex, 1)

				}
			}

			listItems = sortedItems.concat(listItems)
		}
	}

	contentItem.fields[fieldName] = listItems;
	return contentItem;

}



module.exports = {
	renderHTML,
	cleanHTML,
	asyncForEach,
	expandContentItem,
	expandContentList,
	expandLinkedList
}