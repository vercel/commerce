import { FC } from "react"
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'

interface Fields {
}

interface Props {
	fields: Fields,
	customData: any
}

const FeaturedProducts:FC<Props> = ({fields, customData}) => {
	const featured:any = customData.featured

	return (
		<Grid layout="B">
        {featured.map(({ node }:any, i:number) => (
          <ProductCard
            key={node.path}
            product={node}
            imgWidth={i === 1 ? 1080 : 540}
            imgHeight={i === 1 ? 1080 : 540}
          />
        ))}
      </Grid>
	)
}

export default FeaturedProducts

