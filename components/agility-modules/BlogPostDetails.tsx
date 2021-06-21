import React from "react";
import Head from "next/head";
import { renderHTML } from "@agility/nextjs";
import { AgilityImage } from "@agility/nextjs";
import truncate from "truncate-html";
import Link from "next/link";
import Image from "next/image"

const PostDetails = ({ dynamicPageItem }: any) => {

	// post fields
	const post = dynamicPageItem.fields;

	const productJSON = post.product
	const product = JSON.parse(productJSON)

	// format date
	const dateStr = new Date(post.date).toLocaleDateString();

	const description = truncate(post.content, {
		length: 160,
		decodeEntities: true,
		stripTags: true,
		reserveLastWord: true,
	});

	let imageSrc = post.image?.url || null;


	// post image alt
	let imageAlt = post.image?.label || null;


	let ogImageSrc = `${imageSrc}?w=1600&h=900`

	let imageHeight = 900
	let imageWidth = 1600


	return (
		<>
			<Head>
				<meta property="twitter:image" content={ogImageSrc} />
				<meta property="twitter:card" content="summary_large_image" />
				<meta name="og:title" content={post.title} />
				<meta property="og:image" content={ogImageSrc} />
				<meta property="og:image:width" content={`${imageWidth}`} />
				<meta property="og:image:height" content={`${imageHeight}`} />
				<meta name="description" content={description} />
				<meta name="og:description" content={description} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:title" content={post.title} />
			</Head>
			<div className="relative px-8">

				<div className="max-w-screen-xl mx-auto">
					<div className="h-64 md:h-96 aspect-w-16 aspect-h-9 relative">
						<AgilityImage
							src={imageSrc}
							alt={imageAlt}
							className="object-cover object-center rounded-lg"
							layout="fill"
						/>

						<Link href={`/product${product.slug}`}>
						<a className="absolute" style={{bottom: "-80px", right: "-20px"}}>
								<Image src={product.imageUrl} alt={product.name} width={300} height={300} layout="fixed" />
						</a>
						</Link>
					</div>
					<div className="max-w-2xl mx-auto mt-4">
						<Link href={`/product${product.slug}`}><a className="uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose">{product.name}</a></Link>
						<div className="border-b-2 border-primary-500 w-8"></div>
						<div className="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
							{dateStr}
						</div>
						<h1 className="font-display text-4xl font-bold my-6 text-secondary-500">
							{post.title}
						</h1>

						<div
							className="prose max-w-full mb-20"
							dangerouslySetInnerHTML={renderHTML(post.content)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};


PostDetails.getCustomInitialProps = async () => {
	return {
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME
	}
}

export default PostDetails;
