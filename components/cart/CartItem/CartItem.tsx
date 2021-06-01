import { ChangeEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { Trash, Plus, Minus } from '@components/icons'
import { useUI } from '@components/ui/context'
import type { LineItem } from '@commerce/types/cart'
import usePrice from '@framework/product/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

const CartItem = ({
  item,
  currencyCode,
  ...rest
}: {
  item: LineItem
  currencyCode: string
}) => {
  const { closeSidebarIfPresent } = useUI()

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  })

  const updateItem = useUpdateItem({ item })
  const removeItem = useRemoveItem()
  const [quantity, setQuantity] = useState<number | ''>(item.quantity)
  const [removing, setRemoving] = useState(false)

  const updateQuantity = async (val: number) => {
    await updateItem({ quantity: val })
  }

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = !e.target.value ? '' : Number(e.target.value)

    if (!val || (Number.isInteger(val) && val >= 0)) {
      setQuantity(val)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item)
    } catch (error) {
      setRemoving(false)
    }
  }
  // TODO: Add a type for this
  const options = (item as any).options

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <li
      className={cn('flex flex-row space-x-8 py-8', {
        'opacity-75 pointer-events-none': removing,
      })}
      {...rest}
    >
      <div className="w-16 h-16 bg-violet relative overflow-hidden cursor-pointer">
        <Link href={`/product/${item.path}`}>
          <Image
            onClick={() => closeSidebarIfPresent()}
            className={s.productImage}
            width={150}
            height={150}
            src={item.variant.image!.url}
            alt={item.variant.image!.altText}
            unoptimized
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col text-base">
        <Link href={`/product/${item.path}`}>
          <span
            className="font-bold text-lg cursor-pointer leading-6"
            onClick={() => closeSidebarIfPresent()}
          >
            {item.name}
          </span>
        </Link>
        {options && options.length > 0 ? (
          <div className="">
            {options.map((option: ItemOption, i: number) => (
              <span
                key={`${item.id}-${option.name}`}
                className="text-sm font-semibold text-accents-7"
              >
                {option.value}
                {i === options.length - 1 ? '' : ', '}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-center mt-3">
          <button type="button" onClick={() => increaseQuantity(-1)}>
            <Minus width={18} height={18} />
          </button>
          <label>
            <input
              type="number"
              max={99}
              min={0}
              className={s.quantity}
              value={quantity}
              onChange={handleQuantity}
              onBlur={handleBlur}
            />
          </label>
          <button type="button" onClick={() => increaseQuantity(1)}>
            <Plus width={18} height={18} />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 text-base">
        <span>{price}</span>
        <button
          className="flex justify-end outline-none"
          onClick={handleRemove}
        >
          <Trash />
        </button>
      </div>
    </li>
  )
}

export default CartItem
