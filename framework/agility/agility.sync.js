
const fs = require('fs')

require("dotenv").config({
	path: `.env.local`,
})

const { getSyncClient } = require('./agility.config')


const runSync = async () => {
	setBuildLog(false)

	const agilitySyncClient = getSyncClient({ isPreview: true, isDevelopmentMode: true })
	if (! agilitySyncClient) {
		console.log("AgilityCMS => Sync client could not be accessed.")
		return;
	}

	await agilitySyncClient.runSync();
}

const setBuildLog = (builtYN) => {
	//clear out a file saying WE HAVE SYNC'D
	const rootPath = process.cwd()
	const filePath = `${rootPath}/.next/cache/agility/build.log`
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}

	if (builtYN) {
		//write out the build log so we know that we are up to date
		fs.writeFileSync(filePath, "BUILT");
	} else {
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
	}
}

const preBuild = async () => {

	//clear the build log
	setBuildLog(false)

	//sync preview mode
	let agilitySyncClient = getSyncClient({ isPreview: true, isDevelopmentMode: false })
	if (! agilitySyncClient) {
		console.log("AgilityCMS => Sync client could not be accessed.")
		return;
	}

	await agilitySyncClient.runSync();

	//sync production mode
	agilitySyncClient = getSyncClient({ isPreview: false, isDevelopmentMode: false })
	if (! agilitySyncClient) {
		console.log("AgilityCMS => Sync client could not be accessed.")
		return;
	}

	await agilitySyncClient.runSync();


}

const postBuild = async() => {
	//mark the build log as BUILT
	setBuildLog(true)
}

const clearSync = async () => {

	setBuildLog(false)

	const agilitySyncClient = getSyncClient({ isPreview: true, isDevelopmentMode: true })
	if (! agilitySyncClient) {
		console.log("AgilityCMS => Sync client could not be accessed.")
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

	} else if (process.argv[2] === "prebuild") {
		//pre build actions
		return preBuild()

	} else if (process.argv[2] === "postbuild") {
		//post build actions
		return postBuild()
	}
}

module.exports = {
	clearSync,
	runSync
}