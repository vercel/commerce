import { Trash } from '@components/icon'
import { useCommerce } from '@lib/bigcommerce'
import formatVariantPrice from 'utils/format-item-price'

const CartItem = ({
  item,
  currencyCode,
}: {
  item: any
  currencyCode: string
}) => {
  const { locale } = useCommerce()
  const { price } = formatVariantPrice({
    listPrice: item.extended_list_price,
    salePrice: item.extended_sale_price,
    currencyCode,
    locale,
  })

  console.log('ITEM', item)

  return (
    <li className="flex flex-row space-x-6">
      <div className="h-12 w-12 bg-violet"></div>
      <div className="flex-1 flex flex-col">
        <span>{item.name}</span>
        <div className="py-2">
          <span>-</span>
          <input
            className="w-6 border-gray-300 border mx-3 rounded text-center text-sm"
            defaultValue="1"
          />
          <span>+</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <span>{price}</span>
        <span className="flex justify-end">
          <Trash />
        </span>
      </div>
    </li>
  )
}

export default CartItem
