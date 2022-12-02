import { ProductCustomField } from '@commerce/types/product'

interface Props {
  customFields: ProductCustomField[]
}

const ProductCustomFields: React.FC<Props> = ({ customFields }) => {
  return (
    <>
      {customFields.map((field) => (
        <div
          key={field.id}
          className="flex gap-2 border-b py-3 border-accent-2 border-dashed last:border-b-0"
        >
          <strong className="leading-7">{field.name}:</strong>
          <span>{field.value}</span>
        </div>
      ))}
    </>
  )
}

export default ProductCustomFields
