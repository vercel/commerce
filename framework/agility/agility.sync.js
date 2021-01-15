/*
THIS FILE IS ONLY EXECUTED LOCALLY
WHEN DOING A LOCAL SYNC ON DEMAND
IN DEVELOPMENT MODE
*/

require("dotenv").config({
	path: `.env.local`,
})

const { getSyncClient } = require('./agility.config')


const runSync = async () => {

	const agilitySyncClient = getSyncClient({ isPreview: true, isDevelopmentMode: true })
	if (! agilitySyncClient) {
		console.log("Agility CMS => Sync client could not be accessed.")
		return;
	}

	await agilitySyncClient.runSync();
}

const clearSync = async () => {

	const agilitySyncClient = getSyncClient({ isPreview: true, isDevelopmentMode: true })
	if (! agilitySyncClient) {
		console.log("Agility CMS => Sync client could not be accessed.")
		return;
	}
	await agilitySyncClient.clearSync();

}


if (process.argv[2]) {
	if (process.argv[2] === "clear") {
		//clear everything
		return clearSync();
	} else if (process.argv[2] === "sync") {
		//run the sync
		return runSync()

	}
}

module.exports = {
	clearSync,
	runSync
}