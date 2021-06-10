import React, { FC } from 'react'

import useWishlist from '@framework/wishlist/use-wishlist'

import { Heart } from '@components/icons'
import { Text, Container } from '@components/ui'
import { WishlistCard } from '@components/wishlist'
import { Module } from '@agility/nextjs'


interface Fields {
	heading: string,
	emptyMessage: string,
	addItemsMessage?: string
}

const Wishlist: Module<Fields> = ({ module: { fields } }) => {
	const { data, isEmpty } = useWishlist({ includeProducts: true })

	return (
		<Container>
			<div className="mt-3 mb-20">
				<Text variant="pageHeading">{fields.heading}</Text>
				<div className="group flex flex-col">
					{isEmpty ? (
						<div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
							<span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
								<Heart className="absolute" />
							</span>
							<h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
								{fields.emptyMessage}
							</h2>
							<p className="text-accents-6 px-10 text-center pt-2">
								{fields.addItemsMessage}
							</p>
						</div>
					) : (
						data &&
						data.items?.map((item) => (
							<WishlistCard key={item.id} item={item} />
						))
					)}
				</div>
			</div>
		</Container>
	)
}

export default Wishlist