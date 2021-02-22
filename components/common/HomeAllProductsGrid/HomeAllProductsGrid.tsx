import { FC } from 'react'
import Link from 'next/link'
import type { Product } from '@commerce/types'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'
import wishlist from '@framework/api/wishlist'

interface Props {
  categories?: any
  brands?: any
  products?: Product[]
  wishlist?: boolean
}

const HomeAllProductsGrid: FC<Props> = ({
  categories,
  brands,
  products = [],
  wishlist = false,
}) => {
  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>All Collections</a>
              </Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accents-8 text-base">
                <Link href={getCategoryPath(cat.path)}>
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Grid layout="normal">
          {products.map((product) => (
            <ProductCard
              key={product.path}
              product={product}
              variant="simple"
              imgProps={{
                width: 480,
                height: 480,
              }}
              wishlist={wishlist}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default HomeAllProductsGrid
