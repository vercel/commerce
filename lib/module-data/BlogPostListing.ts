
const getCustomInitialProps = async ({
	agility,
	channelName,
	languageCode,
}:any) => {
	// set up api
	const api = agility;



	// get sitemap...
	let sitemap = await api.getSitemap({
		channelName: channelName,
		languageCode,
	});

	// get posts...
	let rawPosts = await api.getContentList({
		referenceName: "blogposts",
		languageCode,
		take: 50,
		contentLinkDepth: 2,
		depth: 2
	});

	// resolve dynamic urls
	const dynamicUrls: [] = resolvePostUrls(sitemap, rawPosts.items);
	const posts: [] = rawPosts.items.map((post: any) => {

		const productJSON = post.fields.product
		const product = JSON.parse(productJSON)

		const productName = product.name
		const productImageSrc = product.imageUrl

		// date
		const date = new Date(post.fields.date).toLocaleDateString();

		// url
		const url = dynamicUrls[post.contentID] || "#";

		// post image src
		let imageSrc = post.fields.image?.url || null

		// post image alt
		let imageAlt = post.fields.image?.label || null;

		return {
			contentID: post.contentID,
			title: post.fields.title,
			date,
			url,
			productName,
			productImageSrc,
			imageSrc,
			imageAlt,
		};
	});

	//sort newest first...
	posts.sort((a: any, b: any) => {
		return b.date.localeCompare(a.date);
	})

	return {
		posts,
	};


};

// function to resole post urls
const resolvePostUrls = function (sitemap: any, posts: any): any {
	let dynamicUrls: any = {};
	posts.forEach((post: any) => {
		Object.keys(sitemap).forEach((path) => {
			if (sitemap[path].contentID === post.contentID) {
				dynamicUrls[post.contentID] = path;
			}
		});
	});
	return dynamicUrls;
};

export default { getCustomInitialProps }