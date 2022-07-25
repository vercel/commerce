import type { ProductCustomField } from '@commerce/types/product'

const ProductCustomFields = ({ fields }: { fields: ProductCustomField[] }) => {
  return (
    <ul className="flex flex-col space-y-2.5 divide-y divide-accent-2 divide-dashed">
      {fields.map((m) => (
        <li
          className="flex space-x-2 justify-start items-start pt-2.5 text-sm"
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
