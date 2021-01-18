const fs = require('fs')
const os = require('os')
const path = require('path')

const { lockSync, unlockSync, checkSync, check }  = require("proper-lockfile")

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}


const getFilePath = ({ options, itemType, languageCode, itemID }) => {

	const fileName = `${itemID}.json`;
	return path.join(options.rootPath, languageCode, itemType, fileName);
}

const saveItem = async ({ options, item, itemType, languageCode, itemID }) => {

	let filePath = getFilePath({ options, itemType, languageCode, itemID });

	let dirPath = path.dirname(filePath);


	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}

	let json = JSON.stringify(item);
	fs.writeFileSync(filePath, json);
}

const deleteItem = async ({ options, itemType, languageCode, itemID }) => {

	let filePath = getFilePath({ options, itemType, languageCode, itemID });

	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}

}

const mergeItemToList = async ({ options, item, languageCode, itemID, referenceName, definitionName }) => {

	let contentList = await getItem({ options, itemType: "list", languageCode, itemID: referenceName });

	if (contentList == null) {
		//initialize the list
		contentList = [item];
	} else {
		//replace the item...
		const cIndex = contentList.findIndex((ci) => {
			return ci.contentID === itemID;
		});

		if (item.properties.state === 3) {
			//*** deleted item (remove from the list) ***
			if (cIndex >= 0) {
				//remove the item
				contentList.splice(cIndex, 1);
			}

		} else {
			//*** regular item (merge) ***
			if (cIndex >= 0) {
				//replace the existing item
				contentList[cIndex] = item;
			} else {
				//and it to the end of the
				contentList.push(item);
			}
		}
	}

	await saveItem({ options, item: contentList, itemType: "list", languageCode, itemID: referenceName });
}

const getItem = async ({ options, itemType, languageCode, itemID }) => {
	let filePath = getFilePath({ options, itemType, languageCode, itemID });

	if (!fs.existsSync(filePath)) return null;

	let json = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(json);
}

const clearItems = async ({ options }) => {
	fs.rmdirSync(options.rootPath, { recursive: true })
}

const waitOnLock = async (lockFile) => {

	while (await check(lockFile)) {
		await sleep(100)
	}

}

const mutexLock = async () => {


	const dir = os.tmpdir();
	const lockFile = `${dir}/${"agility-sync"}.mutex`
	if (! fs.existsSync(lockFile)) {
		fs.writeFileSync(lockFile, "agility-sync");
	}

	//THE LOCK IS ALREADY HELD - WAIT UP!
	await waitOnLock(lockFile)

	try {
		return lockSync(lockFile)
	} catch (err) {
		if (`${err}`.indexOf("Lock file is already being held") !== -1) {

			//this error happens when 2 processes try to get a lock at the EXACT same time (very rare)
			await sleep(100)
			await waitOnLock(lockFile)

			try {
				return lockSync(lockFile)
			} catch (e2) {
				if (`${err}`.indexOf("Lock file is already being held") !== -1) {

					//this error happens when 2 processes try to get a lock at the EXACT same time (very rare)
					await sleep(100)
					await waitOnLock(lockFile)
					return lockSync(lockFile)
				}
			}
		}

		throw Error("The mutex lock could not be obtained.")
	}

}





module.exports = {
	saveItem,
	deleteItem,
	mergeItemToList,
	getItem,
	clearItems,
	mutexLock
}