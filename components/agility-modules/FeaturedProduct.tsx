import React, { FC } from 'react'
import { URLField, Module, ImageField, AgilityImage } from "@agility/nextjs"
import Link from 'next/link'
import Image from "next/image"


interface Fields {
	title: string
	description: string
	cTA?: URLField
	product: string
	image: ImageField
	imagePosition: 'left' | 'right'

}

const HeroModule: Module<Fields> = ({ module: { fields } }) => {

	const productJSON = fields.product
	const product = JSON.parse(productJSON)

	return (
		<div className="relative px-4">
			<div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-10 md:py-10 items-center">
				<div className="md:w-6/12 flex-shrink-0 relative pb-20">
					{fields.cTA ? (
						<Link href={fields.cTA.href}>
							<AgilityImage
								src={fields.image.url}
								alt={fields.image.label}
								width="768"
								height="400"
								className="rounded-lg object-cover object-center cursor-pointer"
							/>
						</Link>
					) : (
						<AgilityImage
							src={fields.image.url}
							alt={fields.image.label}
							width="768"
							height="400"
							className="rounded-lg object-cover object-center"
						/>
					)}

					<Link href={`/product${product.slug}`}>
						<a className="absolute" style={{ bottom: "-10px", left: "-20px" }}>
							<img src={product.imageUrl} alt={product.name} width={300} height={300} />
						</a>
					</Link>

				</div>
				<div
					className={`md:w-6/12 mt-10 md:mt-0 ${fields.imagePosition != "right"
						? `md:ml-4 lg:ml-8 md:order-last`
						: `md:mr-4 lg:mr-8 md:order-first`
						}`}
				>
					<div className="g:py-8 text-center md:text-left">
						{product && (
							<span className="font-bold text-primary-500 text-sm text-center md:text-left uppercase">
								{product.name}
							</span>
						)}
						<h2 className="font-display text-4xl font-black text-secondary-500 md:text-3xl lg:text-5xl tracking-wide text-center mt-4 lg:leading-tight md:text-left">
							{fields.title}
						</h2>
						<p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200">
							{fields.description}
						</p>
						{fields.cTA &&
							<Link href={fields.cTA.href}>
								<a className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent leading-6 font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:border-primary-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
									{fields.cTA.text}
								</a>
							</Link>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroModule

