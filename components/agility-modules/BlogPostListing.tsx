import React from "react";
import Link from "next/link";
import Image from "next/image"

import { ModuleWithInit, AgilityImage } from '@agility/nextjs'
import products from "pages/api/catalog/products";

interface ICustomData {

	posts: []

}

interface IModule {

}

const PostsListing: ModuleWithInit<IModule, ICustomData> = ({ customData, module, languageCode, isDevelopmentMode, isPreview }) => {
	// get posts
	const { posts } = customData;

	// set up href for internal links
	let href = "/pages/[...slug]";

	// if there are no posts, display message on frontend
	if (posts.length <= 0) {
		return (
			<div className="mt-44 px-6 flex flex-col items-center justify-center">
				<h1 className="text-3xl text-center font-bold">No posts available.</h1>
				<div className="my-10">
					<Link href={href} as="/home">
						<a className="px-4 py-3 my-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:shadow-outline-primary transition duration-300">
							Return Home
						</a>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="relative px-8 mb-12">
			<div className="max-w-screen-xl mx-auto">
				<div className="sm:grid sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post: any, index) => (
						<Link href={post.url} key={index}>
							<a>
								<div className="flex-col group mb-8 md:mb-0">
								<div className="relative h-64">
										<AgilityImage
											src={post.imageSrc}
											alt={post.imageAlt}
											className="object-cover object-center rounded-t-lg"
											layout="fill"

										/>
										<div className="absolute right-0" style={{bottom: "-60px"}}>
											<Image src={post.productImageSrc} alt={post.productName} width={200} height={200} layout="fixed" />
										</div>
									</div>

									<div className="bg-gray-100 p-8 border-2 border-t-0 rounded-b-lg">
										<div className="uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose">
											{post.productName}
										</div>
										<div className="border-b-2 border-primary-500 w-8"></div>
										<div className="mt-4 uppercase text-gray-600 italic font-semibold text-xs">
											{post.date}
										</div>
										<h2 className="text-secondary-500 mt-1 font-black text-2xl group-hover:text-primary-500 transition duration-300">
											{post.title}
										</h2>
									</div>
								</div>
							</a>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};




export default PostsListing;
