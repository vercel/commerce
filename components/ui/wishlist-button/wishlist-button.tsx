import type { Product, ProductVariant } from 'lib/storm/types/product'
import { cn } from 'lib/utils'
import { Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { FC, useState } from 'react'

type Props = {
  productId: Product['id']
  variant: ProductVariant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const t = useTranslations('ui.button')

  // @ts-ignore Wishlist is not always enabled
  // const itemInWishlist = data?.items?.find(
  //   // @ts-ignore Wishlist is not always enabled
  //   (item) => item.product_id === productId && item.variant_id === variant.id
  // )

  const handleWishlistChange = async (e: any) => {
    e.preventDefault()

    if (loading) return

    // A login is required before adding an item to the wishlist
    // if (!customer) {
    //   setModalView('LOGIN_VIEW')
    //   return openModal()
    // }

    // setLoading(true)

    // try {
    //   if (itemInWishlist) {
    //     await removeItem({ id: itemInWishlist.id! })
    //   } else {
    //     await addItem({
    //       productId,
    //       variantId: variant?.id!,
    //     })
    //   }

    //   setLoading(false)
    // } catch (err) {
    //   setLoading(false)
    // }
  }

  return (
    <button
      aria-label={t('wishList')}
      className={cn(
        'w-10 h-10 text-high-contrast bg-app border border-high-contrast flex items-center justify-center font-semibold cursor-pointer text-sm duration-200 ease-in-out transition-[color,background-color,opacity] ',
        className
      )}
      // onClick={handleWishlistChange}
      {...props}
    >
      <Heart
        className={cn(
          'duration-200 ease-in-out w-5 h-5 transition-[transform,fill] text-current',
          {
            ['fill-low-contrast']: loading,
            // ['fill-high-contrast']: itemInWishlist,
          }
        )}
      />
    </button>
  )
}

export default WishlistButton
