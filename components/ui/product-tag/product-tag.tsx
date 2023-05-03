'use client'

import { cn } from 'lib/utils'
import dynamic from 'next/dynamic'
const Text = dynamic(() => import('components/ui/text'))

interface ProductTagProps {
  className?: string
  name: string
  price: string
  variant?: 'productView' | 'cardView'
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  className = '',
  variant = 'cardView',
}) => {
  return (
    <div
      className={cn('text-high-contrast flex items-start flex-col', className)}
    >
      <Text
        className={
          variant === 'cardView'
            ? ''
            : '!text-[32px] !leading-[32px] !font-normal'
        }
        variant={variant === 'cardView' ? 'listChildHeading' : 'pageHeading'}
      >
        {name}
      </Text>
      <Text
        className={
          variant === 'cardView'
            ? '!text-sm !font-semibold !leading-tight lg:!text-base'
            : '!font-bold !text-[32px] !leading-[32px]'
        }
        variant="paragraph"
      >
        {price}
      </Text>
    </div>
  )
}

export default ProductTag
