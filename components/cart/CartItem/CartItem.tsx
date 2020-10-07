import { Trash } from '@components/icon'
import { useCommerce } from '@lib/bigcommerce'
import useUpdateItem from '@lib/bigcommerce/cart/use-update-item'
import { useEffect, useState } from 'react'
import formatVariantPrice from 'utils/format-item-price'
import styles from './CartItem.module.css'

const CartItem = ({
  item,
  currencyCode,
}: {
  item: any
  currencyCode: string
}) => {
  const { locale } = useCommerce()
  const updateItem = useUpdateItem()
  const [quantity, setQuantity] = useState(item.quantity)
  const { price } = formatVariantPrice({
    listPrice: item.extended_list_price,
    salePrice: item.extended_sale_price,
    currencyCode,
    locale,
  })
  const handleBlur = async () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      const data = await updateItem({
        itemId: item.id,
        item: {
          productId: item.product_id,
          variantId: item.variant_id,
          quantity: val,
        },
      })
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== quantity) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  console.log('ITEM', item)

  return (
    <li className="flex flex-row space-x-6">
      <div className="h-12 w-12 bg-violet"></div>
      <div className="flex-1 flex flex-col">
        <span>{item.name}</span>
        <div className="py-2">
          <span>-</span>
          <input
            type="number"
            className={styles.quantity}
            value={quantity}
            onChange={(e) => {
              const val = Number(e.target.value)

              if (Number.isInteger(val) && val >= 0) {
                setQuantity(e.target.value)
              }
            }}
            onBlur={handleBlur}
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
