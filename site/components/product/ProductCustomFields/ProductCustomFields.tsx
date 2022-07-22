import type { ProductCustomField } from '@framework/types/product'

const ProductCustomFields = ({ fields }: { fields: ProductCustomField[] }) => {
  return (
    <ul className="flex flex-col space-y-2 divide-y divide-dashed">
      {fields.map((m) => (
        <li
          className="flex space-x-2 justify-start items-start text-sm pt-2"
          key={m.key}
        >
          <span className="font-bold capitalize whitespace-nowrap">
            {m.name}
          </span>
          :
          {m.htmlValue ? (
            <div
              dangerouslySetInnerHTML={{
                __html: m.htmlValue,
              }}
            />
          ) : (
            <span>{m.value}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ProductCustomFields
