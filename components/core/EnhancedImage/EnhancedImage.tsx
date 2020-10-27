import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

type Props = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading'
> & {
  src: string
  quality?: string
  priority?: boolean
  loading?: readonly ['lazy', 'eager', undefined]
  unoptimized?: boolean
} & (
    | {
        width: number | string
        height: number | string
        unsized?: false
      }
    | {
        width?: number | string
        height?: number | string
        unsized: true
      }
  )

const EnhancedImage: FC<Props & JSX.IntrinsicElements['img']> = ({
  ...props
}) => {
  const [ref] = useInView({
    triggerOnce: true,
    rootMargin: '220px 0px',
  })

  return (
    <div ref={ref}>
      <Image {...props} />
    </div>
  )
}

export default EnhancedImage
