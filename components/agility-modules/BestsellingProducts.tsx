import React, { FC } from 'react'

import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'

interface Fields {
}

interface Props {
	fields: Fields,
	customData: any
}

const BestsellingProducts:FC<Props> = ({fields, customData}) => {

	const bestSelling  = customData.bestSelling

	return (
		<Marquee variant="secondary">
        {bestSelling.slice(0, 12).map(({ node }:any) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
            imgLayout="fixed"
          />
        ))}
      </Marquee>
	)
}

export default BestsellingProducts

