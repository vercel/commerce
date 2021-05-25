import { ChangeEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { Trash, Plus, Minus, Cross } from '@components/icons'
import { useUI } from '@components/ui/context'
import type { LineItem } from '@framework/types'
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
  noEdit = false,
  ...rest
}: {
  noEdit?: boolean
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
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)

  const updateQuantity = async (val: number) => {
    await updateItem({ quantity: val })
  }

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(Number(e.target.value))
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
      className={cn(s.root, {
        'opacity-50 pointer-events-none': removing,
      })}
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
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
              className="font-medium cursor-pointer leading-6"
              onClick={() => closeSidebarIfPresent()}
            >
              {item.name}
            </span>
          </Link>
          {options && options.length > 0 ? (
            <div className="">
              {options.map((option: ItemOption, i: number) => (
                <div
                  key={`${item.id}-${option.name}`}
                  className="text-sm font-semibold text-accent-7 inline-flex items-center justify-center"
                >
                  {option.name}
                  {option.name === 'Color' ? (
                    <span
                      className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: `${option.value}`,
                      }}
                    ></span>
                  ) : (
                    <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden">
                      {option.value}
                    </span>
                  )}
                  {i === options.length - 1 ? '' : <span className="mr-3" />}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>{price}</span>
        </div>
      </div>
      {!noEdit ? (
        <div className="flex flex-row h-9">
          <button className={s.actions} onClick={handleRemove}>
            <Cross width={20} height={20} />
          </button>
          <label className="w-full border-accent-3 border ml-2">
            <input
              type="number"
              max={99}
              min={0}
              className="bg-transparent px-4 w-full h-full focus:outline-none"
              value={quantity}
              onChange={handleQuantity}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="button"
            onClick={() => increaseQuantity(-1)}
            className={s.actions}
            style={{ marginLeft: '-1px' }}
          >
            <Minus width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={() => increaseQuantity(1)}
            className={cn(s.actions)}
            style={{ marginLeft: '-1px' }}
          >
            <Plus width={18} height={18} />
          </button>
        </div>
      ) : (
        <div>x{quantity}</div>
      )}
    </li>
  )
}

export default CartItem
