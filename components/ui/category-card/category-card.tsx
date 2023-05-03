'use client'

import SanityImage from 'components/ui/sanity-image'
import { cn } from 'lib/utils'
import Link from 'next/link'
import { FC } from 'react'


interface Props {
  className?: string
  category: any
}

const placeholderImg = '/product-img-placeholder.svg'

const CategoryCard: FC<Props> = ({ category, className }) => {
  const rootClassName = cn(
    'w-1/2 min-w-0 grow-0 shrink-0 group relative box-border overflow-hidden transition-transform ease-linear cursor-pointer basis-[50%]',
    className
  )

  return (
    <Link
      href={`${category.slug}`}
      className={rootClassName}
      aria-label={category.name}
    >
      <div className={'flex flex-col flex-1 justify-center w-full h-full'}>
        <div className="w-full h-full aspect-[3/4] relative">
          <SanityImage
            image={category.image}
            alt={category.name || 'Category Image'}
            width={300}
            height={400}
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute font-medium bg-high-contrast text-white py-3 px-6 md:py-5 md:px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {category.title}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
