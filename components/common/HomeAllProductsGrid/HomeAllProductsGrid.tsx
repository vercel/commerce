import { FC } from 'react'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'
import { Category } from '@commerce/types/site'

interface Props {
  categories?: Category[]
  brands?: any
  products?: Product[]
}

const HomeAllProductsGrid: FC<Props> = ({
  categories = [],
  brands,
  products = [],
}) => {
  return (
    <div className={s.root}>
      <div className="flex-1">
        {categories.map((category) => (
          <div>
            <div className="text-primary font-bold">{category.name}</div>
            <div className="flex">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.path}
                  product={product}
                  variant="simple"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeAllProductsGrid
