const agilityContentSync = require("@agility/content-sync");
const agilityFileSystem = require("@agility/content-sync/src/store-interface-filesystem");

const agilityConfig = {
  guid: process.env.AGILITY_GUID, //Set your guid here
  fetchAPIKey: process.env.AGILITY_API_FETCH_KEY, //Set your fetch apikey here
  previewAPIKey: process.env.AGILITY_API_PREVIEW_KEY, //set your preview apikey
  languageCode: "en-us", //the language for your website in Agility CMS
  channelName: "website", //the name of your channel in Agility CMS
  securityKey: process.env.AGILITY_SECURITY_KEY, //the website security key used to validate and generate preview keys
};

const getSyncClient = ({ isPreview, isDevelopmentMode }) => {
  let cachePath = `node_modules/@agility/content-sync/cache/${
    isPreview ? "preview" : "live"
  }`;

  if (!isDevelopmentMode) {
    //we are in prod and need to use a different directory that Vercel understands
    cachePath = `/tmp/agilitycache/${isPreview ? "preview" : "live"}`;
  }

  console.log(`Agility CMS => Content cache path is ${cachePath}`);
  const apiKey = isPreview
    ? agilityConfig.previewAPIKey
    : agilityConfig.fetchAPIKey;

  if (!agilityConfig.guid) {
    console.log("Agility CMS => No GUID was provided.");
    return null;
  }

  return agilityContentSync.getSyncClient({
    guid: agilityConfig.guid,
    apiKey: apiKey,
    isPreview: isPreview,
    languages: [agilityConfig.languageCode],
    channels: [agilityConfig.channelName],
    store: {
      interface: agilityFileSystem,
      options: {
        rootPath: cachePath,
      },
    },
  });
};

module.exports = {
  agilityConfig,
  getSyncClient,
};
