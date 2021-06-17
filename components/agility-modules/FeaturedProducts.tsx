import { FC } from "react"
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import { ModuleWithInit } from "@agility/nextjs"

interface ICustomData {
	products: any
}

interface IModule {
}


const FeaturedProducts: ModuleWithInit<IModule, ICustomData> = ({ customData }) => {

	if (! customData) {
		return <div>No featured products returned.</div>
	}

	const products:any = customData.products

	return (
		<Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
	)
}

export default FeaturedProducts

