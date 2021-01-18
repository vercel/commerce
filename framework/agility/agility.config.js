const agilityContentSync = require("@agility/content-sync");
const nextFileSystem = require("./next.file.sync");

const path = require("path")
const fs = require('fs-extra');

const agilityConfig = {
	guid: process.env.AGILITY_GUID, //Set your guid here
	fetchAPIKey: process.env.AGILITY_API_FETCH_KEY, //Set your fetch apikey here
	previewAPIKey: process.env.AGILITY_API_PREVIEW_KEY, //set your preview apikey
	languageCode: "en-us", //the language for your website in Agility CMS
	channelName: "website", //the name of your channel in Agility CMS
	securityKey: process.env.AGILITY_SECURITY_KEY, //the website security key used to validate and generate preview keys
};

const getSyncClient = ({ isPreview, isDevelopmentMode, isIncremental }) => {

	const rootPath = process.cwd()

	let cachePath = `${rootPath}/.next/cache/agility/${isPreview ? "preview" : "live" }`;

	//if we are in "incremental" mode, we need to use the tmp folder...
	if (isIncremental) {
		cachePath = `/tmp/agilitycache/${isPreview ? "preview" : "live"}`;
	}

	console.log(`AgilityCMS => Content cache path is ${cachePath}`);
	const apiKey = isPreview
		? agilityConfig.previewAPIKey
		: agilityConfig.fetchAPIKey;

	if (!agilityConfig.guid) {
		console.log("AgilityCMS => No GUID was provided.");
		return null;
	}

	return agilityContentSync.getSyncClient({
		guid: agilityConfig.guid,
		apiKey: apiKey,
		isPreview: isPreview,
		languages: [agilityConfig.languageCode],
		channels: [agilityConfig.channelName],
		store: {
			interface: nextFileSystem,
			options: {
				rootPath: cachePath
			},
		},
	});
};


const prepIncrementalMode = async () => {

	const rootPath = process.cwd()
	let cachePath = `${rootPath}/.next/cache/agility/`;
	const tempPath = `/tmp/agilitycache/`;

	const buildFilePath = path.join(tempPath, "build.log")

	//check for the build file in here...
	if (!fs.existsSync(buildFilePath)) {
		console.log(`Copying Agility Content files to temp folder: ${tempPath}`)
		//copy everything across from cachePath
		await fs.copy(cachePath, tempPath)
	}
}



module.exports = {
	agilityConfig,
	getSyncClient,
	prepIncrementalMode
};
