import { FC } from 'react'
import { Trash } from '@components/icons'
import s from './WishlistCard.module.css'

interface Props {
  className?: string
  children?: any
  data?: ProductData
}

interface ProductData {
  name: string
  images: any
  prices: any
  path: string
}

const WishlistCard: FC<Props> = ({ className, data }) => {
  return (
    <div className={s.root}>
      <div className={`col-span-3 ${s.productBg}`} />
      <div className="col-span-7">
        <h3 className="text-2xl mb-2">Jacket</h3>
        <p className="mb-4">
          Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
        </p>
        <button className="py-1 px-3 border border-secondary rounded-md shadow-sm hover:bg-primary-hover">
          Add to cart
        </button>
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="flex justify-end font-bold">$ 50.00</div>
        <div className="flex justify-end">
          <Trash />
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
