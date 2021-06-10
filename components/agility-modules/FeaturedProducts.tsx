import { FC } from "react"
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import { ModuleWithInit } from "@agility/nextjs"

interface ICustomData {
	featured: any
}

interface IModule {
}


const FeaturedProducts: ModuleWithInit<IModule, ICustomData> = ({ customData }) => {

	if (! customData) {
		return <div>No featured products returned.</div>
	}

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

