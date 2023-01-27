import type { FC } from 'react'
import type { Metafields } from '@commerce/types/common'
import Text from '@components/ui/Text'

interface Props {
  metafields: Metafields
  /**
   *  The namespace of the metafields to display.
   */
  namespace: string
}

const ProductMetafields: FC<Props> = ({ metafields, namespace }) => {
  return (
    <>
      {Object.values(metafields[namespace] ?? {}).map((field) => (
        <div
          key={field.key}
          className="flex gap-2 border-b py-3 border-accent-2 border-dashed last:border-b-0"
        >
          <strong className="leading-7">{field.name}:</strong>
          <Text html={field.parsedValue || field.value} className="!mx-0" />
        </div>
      ))}
    </>
  )
}

export default ProductMetafields
